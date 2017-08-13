package org.tgcloud.zhanzhang.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.tgcloud.zhanzhang.core.PhoneUtil;

import org.tgcloud.zhanzhang.core.pay.alipay.config.AlipayConfig;
import org.tgcloud.zhanzhang.core.pay.alipay.util.AlipayCore;
import org.tgcloud.zhanzhang.core.pay.alipay.util.AlipaySubmit;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.HttpClientUtil;
import org.tgcloud.zhanzhang.core.ResultMessage;
import org.tgcloud.zhanzhang.core.StringUtil;

import org.tgcloud.zhanzhang.core.pay.weipay.GenerateQrCodeUtil;
import org.tgcloud.zhanzhang.core.pay.weipay.QueryRequest;
import org.tgcloud.zhanzhang.core.pay.weipay.TelRequest;
import org.tgcloud.zhanzhang.core.pay.weipay.WeiConfig;
import org.tgcloud.zhanzhang.core.pay.weipay.ZHIRequest;
import org.tgcloud.zhanzhang.entity.ZAdApply;
import org.tgcloud.zhanzhang.entity.ZCrowdDonate;
import org.tgcloud.zhanzhang.entity.ZPay;
import org.tgcloud.zhanzhang.entity.ZUser;
import org.tgcloud.zhanzhang.core.BaseLogger;
import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.tx.Tx;

public class OrderService extends BaseLogger {

    private HttpClientUtil clientUtil;

    
    public String selectWeiPayInfo(Integer useId, ZPay order, String spbill_create_ip,HttpServletResponse responsea) {
        TelRequest request = new TelRequest( "正蓝旗易速电子商务", order.getOrderId(), order.getMoney().multiply(new BigDecimal(100)).setScale(2, BigDecimal.ROUND_HALF_UP).intValue(), spbill_create_ip,"NATIVE");
//        TelRequest request = new TelRequest(1,"南京车位帮网络科技有限公司",order_id,1,spbill_create_ip);//金额单位为分
        HttpPost post = new HttpPost("https://api.mch.weixin.qq.com/pay/unifiedorder");
        StringEntity entity = null;
        try {
            entity = new StringEntity(request.getTelResponse(), "utf-8");
            post.addHeader("Content-Type", "text/xml");
            post.setEntity(entity);
            HttpResponse response = clientUtil.client.execute(post);
            if (response.getStatusLine().getStatusCode() == 200) {
                Map<String, String> params = new HashMap<>();
                String result = EntityUtils.toString(response.getEntity(), Charset.forName("UTF-8"));
                Document document = DocumentHelper.parseText(result);
                Element nodesElement = document.getRootElement();
                List nodes = nodesElement.elements();
                for (Iterator its = nodes.iterator(); its.hasNext(); ) {
                    Element nodeElement = (Element) its.next();
                    params.put(nodeElement.getName(), nodeElement.getStringValue());
                }
                String sign = params.remove("sign");
                Map<String, String> sPara = AlipayCore.paraFilter(params);
                //生成签名结果
                String mySign = StringUtil.MD5Encode(AlipayCore.createLinkString(sPara) + "&key=" + WeiConfig.client_key).toUpperCase();
                if (mySign.equals(sign)) {
                    if ("SUCCESS".equals(params.get("return_code")) && "SUCCESS".equals(params.get("result_code"))) {
//                        ResultMessage message = new ResultMessage(1015, "微信支付信息生成完毕");
                        new ZHIRequest( params.get("prepay_id")).getTelResponse();
                        GenerateQrCodeUtil.encodeQrcode(params.get("code_url"), responsea);
                        return "微信支付信息生成完毕";
                    } else {
                    	logger.error("微信支付订单申请失败");
                        return "微信支付订单申请失败";
                    }
                } else {
                	logger.error("签名不匹配");
                    return "签名不匹配";
                }
            } else {
            	logger.error("状态不为200");
                return "微信出错，请重试";
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("微信出错，请重试");
            return "微信出错，请重试";
        }


    }

    /*统一下单接口*/
    public void doPayOrder() {

    }

    @Before(Tx.class)
    public String doBackOrder( String order_id, Integer pay_type) {
    	ZPay order = ZPay.dao.findFirst("select * from z_pay where order_id like '"+order_id+"'");
        if (order == null) {
            return "订单无效";
        }
        if (order.getStatus() == GlobalStatic.order_finish) {
            return "支付成功";
        } else if (order.getStatus() == GlobalStatic.order_cancel) {
            return "订单被取消";
        } else {
            /*到第三方查询下订单是否完成*/
            switch (pay_type) {
                case GlobalStatic.zhi_pay:

                    break;
                case GlobalStatic.wei_pay:
                    QueryRequest request = new QueryRequest( null, order.getOrderId());
                    HttpPost post = new HttpPost("https://api.mch.weixin.qq.com/pay/orderquery");
                    StringEntity entity = null;
                    try {
                        entity = new StringEntity(request.getTelResponse(), "utf-8");
                        post.addHeader("Content-Type", "text/xml");
                        post.setEntity(entity);
                        HttpResponse response = clientUtil.client.execute(post);
                        if (response.getStatusLine().getStatusCode() == 200) {
                            Map<String, String> params = new HashMap<>();
                            String result = EntityUtils.toString(response.getEntity(), Charset.forName("UTF-8"));
                            Document document = DocumentHelper.parseText(result);
                            Element nodesElement = document.getRootElement();
                            List nodes = nodesElement.elements();
                            for (Iterator its = nodes.iterator(); its.hasNext(); ) {
                                Element nodeElement = (Element) its.next();
                                params.put(nodeElement.getName(), nodeElement.getStringValue());
                            }
                            String sign = params.remove("sign");
                            Map<String, String> sPara = AlipayCore.paraFilter(params);
                            //生成签名结果
                            String mySign = StringUtil.MD5Encode(AlipayCore.createLinkString(sPara) + "&key=" +WeiConfig.client_key).toUpperCase();
                            if (mySign.equals(sign)) {
                                if ("SUCCESS".equals(params.get("return_code")) && "SUCCESS".equals(params.get("result_code"))) {
                                    String trade_state = params.get("trade_state");
                                    if ("SUCCESS".equals(trade_state)) {
                                        /*更新订单信息*/
                                        //return doFinishOrder(params.get("out_trade_no"), params.get("transaction_id"), GlobalStatic.wei_pay);
                                    } else {
                                        return "支付还未完成，";
                                    }
                                } else {
                                    return "微信查询订单申请失败";
                                }
                            } else {
                                return "签名不匹配";
                            }
                        } else {
                            return "微信出错，请重试";
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        return "微信出错，请重试";
                    }
            }
            return "订单未完成";
        }
    }

    /*第三方支付回调*/
    @Before(Tx.class)
    public String doFinishOrder(String my_order_id, String zhi_order_id, Integer pay_type) throws IOException {
    	ZPay order = ZPay.dao.findFirst("select * from z_pay where order_id like '"+my_order_id+"'");
        if (order == null)
        {
            logger.error("订单不存在，但是支付回调成功");
            return "success";
        }
        if (Strings.isNullOrEmpty(order.getThirdId()) && order.getStatus() == 3)
        {
            /*当订单被取消，但是客户已经支付需要返还金额*/
        }
        if (order.getStatus() == 3) {
            logger.error("支付回调，但是订单已经被取消");
            return "success";
        }
        if (order.getStatus() == 1) {
        	return "success";
        }
        if(order.getStatus() == 2){
        Date date=new Date();
        if(order.getType()==3){
        	ZAdApply news=ZAdApply.dao.findById(order.getInfoId());
        	news.setFinishTime(new java.sql.Date(date.getTime()));
        	news.setStatus(1);
        	news.setPayType(pay_type);
        	news.setThirdId(zhi_order_id);
        	news.update();
        }
        if(order.getType()==4){
        	ZCrowdDonate zc=ZCrowdDonate.dao.findById(order.getInfoId());
        	zc.setFinishTime(new java.sql.Date(date.getTime()));
        	zc.setStatus(1);
        	zc.setPayType(pay_type);
        	zc.setThirdId(zhi_order_id);
        	zc.update();
        	
        }
        
        order.setFinishTime(new java.sql.Date(date.getTime()));
		order.setStatus(1);
		order.setPayType(pay_type);
		order.setThirdId(zhi_order_id);
		order.update();
		if(order.getType()!=4){
			if(order.getInId()!=null&&order.getInId()>0){
	        	ZUser zu=ZUser.dao.findById(order.getInId());
	        	zu.setMoney(zu.getMoney().add(order.getMoney()));
	        	zu.update();
	        }
		}
        /*订单完成，跟新相关业务操作的状态*/
        return "success";
        }
        return "success";
    }
    
    /*充值*/
    public String doRecharge(Integer info_id,Integer inid,Integer outid, Integer type,
    		BigDecimal money, Integer app_type,String body,HttpServletResponse response,String order_id) {
    	ZPay order = new ZPay();
    	if(type==2&&order_id!=null&&!order_id.equals("")){
    		order = ZPay.dao.findById(order_id);
        	if(inid!=null){
        	order.setInId(inid);
        	}
        	order.setMoney(money);
        	order.setOutId(outid);
        	order.setOrderId(org.tgcloud.zhanzhang.core.PhoneUtil.generateOrderId());
        	order.setStatus(2);
        	order.setType(type);
        	if(info_id!=null){
        	order.setInfoId(info_id);
        	}
        	order.update();
    	}else{
        	if(inid!=null){
        	order.setInId(inid);
        	}
        	order.setMoney(money);
        	order.setOutId(outid);
        	order.setOrderId(org.tgcloud.zhanzhang.core.PhoneUtil.generateOrderId());
        	order.setStatus(2);
        	order.setType(type);
        	if(info_id!=null){
        	order.setInfoId(info_id);
        	}
        	order.save();
    	}
        switch (app_type)
        {
        	case GlobalStatic.balance_pay:
        		if(order.getOutId()!=null&&order.getOutId()>0){
                	ZUser zu=ZUser.dao.findById(order.getOutId());
                	if(zu.getMoney().compareTo(order.getMoney())>=0){
                		zu.setMoney(zu.getMoney().subtract(order.getMoney()));
                    	zu.update();
                    	order.setFinishTime(new java.sql.Date((new Date()).getTime()));
                		order.setStatus(1);
                		order.setPayType(1);
                		order.update();
                	}else{
                		return "余额不足,请充值,或用其他方式支付！";
                	}
                	
                }
        		
            case GlobalStatic.wei_pay:
                return selectWeiPayInfo(outid,order,localIp(),response);
            case GlobalStatic.zhi_pay:
//            	buildRequest request = new WebPayRequest("E",order.getMoney().toString(),body,null);
            	Map<String,String> sParaTemp=new HashMap();
            	sParaTemp.put("out_trade_no", order.getOrderId());//商户订单号
            	if(type==1){//1充值2付款3广告4捐款
            		sParaTemp.put("subject", "充值");//订单名称
            		sParaTemp.put("body", "充值");//商品描述
            	}else if(type==2){
            		sParaTemp.put("subject", "1");//订单名称
            		sParaTemp.put("body", "1");//商品描述
            	}else if(type==3){
            		sParaTemp.put("subject", "广告");//订单名称
            		sParaTemp.put("body", "广告");//商品描述
            	}else if(type==4){
            		sParaTemp.put("subject", "捐款");//订单名称
            		sParaTemp.put("body", "捐款");//商品描述
            	}
            	sParaTemp.put("service", AlipayConfig.service);
                sParaTemp.put("partner", AlipayConfig.partner);
                sParaTemp.put("seller_id", AlipayConfig.seller_id);
                sParaTemp.put("_input_charset", AlipayConfig.input_charset);
        		sParaTemp.put("payment_type", AlipayConfig.payment_type);
        		sParaTemp.put("notify_url", AlipayConfig.notify_url);
        		sParaTemp.put("return_url", AlipayConfig.return_url);
            	sParaTemp.put("total_fee", order.getMoney().toString());//付款金额
            	sParaTemp.put("WIDshow_url", "1");//商品展示网址
                return AlipaySubmit.buildRequest(sParaTemp,"get", "确认");
            	//return sParaTemp;
            default:
                return "支付类型有误";
        }
    }
    
    public Map<String,String> doRecharge(Integer info_id,Integer inid,Integer outid, Integer type,
    		BigDecimal money,String body,HttpServletResponse response,String order_id) {
    	ZPay order = new ZPay();
    	if(type==2&&order_id!=null&&!order_id.equals("")){
    		order = ZPay.dao.findFirst("select * from z_pay where order_id= "+order_id);
        	if(inid!=null){
        	order.setInId(inid);
        	}
        	order.setMoney(money);
        	order.setOutId(outid);
        	order.setStatus(2);
        	order.setType(type);
        	if(info_id!=null){
        	order.setInfoId(info_id);
        	}
        	order.update();
    	}else{
        	if(inid!=null){
        	order.setInId(inid);
        	}
        	order.setMoney(money);
        	order.setOutId(outid);
        	order.setOrderId(org.tgcloud.zhanzhang.core.PhoneUtil.generateOrderId());
        	order.setStatus(2);
        	order.setType(type);
        	if(info_id!=null){
        	order.setInfoId(info_id);
        	}
        	order.save();
    	}
//            	buildRequest request = new WebPayRequest("E",order.getMoney().toString(),body,null);
            	Map<String,String> sParaTemp=new HashMap();
            	sParaTemp.put("out_trade_no", order.getOrderId());//商户订单号
            	if(type==1){//1充值2付款3广告4捐款
            		sParaTemp.put("subject", "充值");//订单名称
            		sParaTemp.put("body", "充值");//商品描述
            	}else if(type==2){
            		sParaTemp.put("subject", "付款");//订单名称
            		sParaTemp.put("body", "付款");//商品描述
            	}else if(type==3){
            		sParaTemp.put("subject", "广告");//订单名称
            		sParaTemp.put("body", "广告");//商品描述
            	}else if(type==4){
            		sParaTemp.put("subject", "捐款");//订单名称
            		sParaTemp.put("body", "捐款");//商品描述
            	}
            	if(body!=null){
            		sParaTemp.put("body", body);
            	}
            	sParaTemp.put("service", AlipayConfig.service);
                sParaTemp.put("partner", AlipayConfig.partner);
                sParaTemp.put("seller_id", AlipayConfig.seller_id);
                sParaTemp.put("_input_charset", AlipayConfig.input_charset);
        		sParaTemp.put("payment_type", AlipayConfig.payment_type);
        		sParaTemp.put("notify_url", AlipayConfig.notify_url);
        		sParaTemp.put("return_url", AlipayConfig.return_url);
            	sParaTemp.put("total_fee", order.getMoney().toString());//付款金额
            	sParaTemp.put("show_url", "1");//商品展示网址
            	
                //return AlipaySubmit.buildRequest(sParaTemp,"post", "确认支付");
            	Map<String, String> sPara = AlipaySubmit.buildRequestPara(sParaTemp);
            	logger.error(sPara.get("sign"));
            	System.out.println(sPara.get("sign"));
            	return sPara;
    }
    /**
     * 获取本机Ip 
     *  
     *  通过 获取系统所有的networkInterface网络接口 然后遍历 每个网络下的InterfaceAddress组。
     *  获得符合 <code>InetAddress instanceof Inet4Address</code> 条件的一个IpV4地址
     * @return
     */
    @SuppressWarnings("rawtypes")
    private String localIp(){
        String ip = null;
        Enumeration allNetInterfaces;
        try {
            allNetInterfaces = NetworkInterface.getNetworkInterfaces();            
            while (allNetInterfaces.hasMoreElements()) {
                NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
                List<InterfaceAddress> InterfaceAddress = netInterface.getInterfaceAddresses();
                for (InterfaceAddress add : InterfaceAddress) {
                    InetAddress Ip = add.getAddress();
                    if (Ip != null && Ip instanceof Inet4Address) {
                        ip = Ip.getHostAddress();
                    }
                }
            }
        } catch (SocketException e) {
            // TODO Auto-generated catch block        
            logger.warn("获取本机Ip失败:异常信息:"+e.getMessage());
        }
        return ip;
    }

//    public SealPowerUp selectOrderByOrderId(String order_id) {
//        SealPowerUp order = orderMapper.selectByOrderId(order_id);
//        return order;
//    }
}
