package org.tgcloud.zhanzhang.core.pay.weipay;

import org.tgcloud.zhanzhang.core.BaseLogger;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.StringUtil;
import org.tgcloud.zhanzhang.core.pay.alipay.util.AlipayCore;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2015/12/16 0016.
 */
public class TelRequest extends BaseLogger {

    /*
    * 公众账号ID
    * 必须
    * String(32)
    * wxd678efh567hg6787
    * 微信分配的公众账号ID（企业号corpid即为此appId）
    */
    private String appid;

    /*
    * 商户号
    * 必须
    * String(32)
    * 1230000109
    * 微信支付分配的商户号
    * */
    private String mch_id;

    /*
    * 设备号
    * 可选
    * String(32)
    * 013467007045764
    * 终端设备号(门店号或收银设备ID)，注意：PC网页或公众号内支付请传"WEB"
    * */
    private String device_info;

    /**
     * 随机字符串
     * 必须
     * String(32)
     * 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
     * 随机字符串，不长于32位。推荐随机数生成算法：https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_3
     */
    private String nonce_str;

    /**
     * 签名
     * 必须
     * String(32)
     * C380BEC2BFD727A4B6845133519F3AD6
     * 签名，详见签名生成算法：https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_3
     */
    private String sign;

    /**
     * 商品描述
     * 必须
     * 	String(32)
     * 	Ipad mini  16G  白色
     * 	商品或支付单简要描述
     */
    private String body;

    /**
     * 商品详情
     * 可选
     * String(8192)
     * Ipad mini  16G  白色
     * 商品名称明细列表
     */
    private String detail;

    /**
     * 附加数据
     * 可选
     * String(127)
     * 深圳分店
     * 附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
     */
    private String attach;

    /**
     * 商户订单号
     * 必须
     * String(32)
     * 20150806125346
     * 商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号：https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_2
     */
    private String out_trade_no;

    /**
     * 货币类型
     * 可选
     * String(16)
     * CNY
     * 符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型:https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_2
     */
    private String fee_type;

    /**
     * 总金额
     * 必须
     * int
     * 888
     * 订单总金额，单位为分，详见支付金额:https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_2
     */
    private int total_fee;

    /**
     * 终端IP
     * 必须
     * String(16)
     * 123.12.12.123
     * APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP。
     */
    private String spbill_create_ip;

    /**
     * 交易起始时间
     * 可选
     * String(14)
     * 20091225091010
     * 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
     */
    private String time_start;

    /**
     * 交易结束时间
     * 可选
     * String(14)
     * 20091227091010
     * 订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。其他详见时间规则
     * 注意：最短失效时间间隔必须大于5分钟
     */
    private String time_expire;

    /**
     * 商品标记
     * 可选
     * String(32)
     * WXG
     * 	商品标记，代金券或立减优惠功能的参数，说明详见代金券或立减优惠:https://pay.weixin.qq.com/wiki/doc/api/sp_coupon.php?chapter=12_1
     */
    private String goods_tag;

    /**
     * 通知地址
     * 必须
     * String(256)
     * http://www.weixin.qq.com/wxpay/pay.php
     * 接收微信支付异步通知回调地址，通知url必须为直接可访问的url，不能携带参数。
     */
    private String notify_url;

    /**
     * 交易类型
     * 必须
     * String(16)
     * JSAPI
     * 取值如下：JSAPI，NATIVE，APP，详细说明见参数规定:https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=4_2
     */
    private String trade_type;

    /**
     * 商品ID
     * 可选
     * String(32)
     * 12235413214070356458058
     * trade_type=NATIVE，此参数必传。此id为二维码中包含的商品ID，商户自行定义。
     */
    private String product_id;

    /**
     * 指定支付方式
     * 可选
     * String(32)
     * no_credit
     * no_credit--指定不能使用信用卡支付
     */
    private String limit_pay;

    /**
     * 用户标识
     * 可选
     * String(128)
     * oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
     * trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。openid如何获取，可参考【获取openid】。企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
     */
    private String openid;

    public TelRequest() {}

    public TelRequest(String body,String detail,String attach,String out_trade_no,int total_fee,String spbill_create_ip,
                      String notify_url,String trade_type,String product_id,String limit_pay,String openid)
    {
        this.mch_id = WeiConfig.client_mch_id;
        this.appid = WeiConfig.client_appId;
        this.body = body;
        this.detail = detail;
        this.attach = attach;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 20;i++)
        {
            sb.append(StringUtil.getRandomChar());
        }
        this.nonce_str = sb.toString();
        this.out_trade_no = out_trade_no + "_" + nonce_str.substring(0,5);
        /*默认人民币*/
        this.fee_type = "CNY";
        this.spbill_create_ip = spbill_create_ip;
        this.total_fee = total_fee;
        this.spbill_create_ip = spbill_create_ip;
        this.notify_url = notify_url;
        this.trade_type = trade_type;
        this.openid = openid;
        this.product_id = product_id;
        this.limit_pay = limit_pay;
    }

    public TelRequest(String body,String out_trade_no,int total_fee,String spbill_create_ip,String trade_type)
    {
        this(body,null,null,out_trade_no,total_fee,spbill_create_ip,WeiConfig.notify_url,trade_type,null,null,null);
    }

    /*app支付*/
    public TelRequest(String body,String out_trade_no,int total_fee,String spbill_create_ip)
    {
        this(body,null,null,out_trade_no,total_fee,spbill_create_ip,WeiConfig.notify_url,"APP",null,null,null);
    }

    /**
     * 获取返回给手机端的响应
     *
     * @return
     */
    public String getTelResponse() {

        //除去数组中的空值和签名参数
        Map<String, String> sPara = AlipayCore.paraFilter(getParams());
        //生成签名结果
        String mySign = StringUtil.MD5Encode(AlipayCore.createLinkString(sPara) + "&key=" + (WeiConfig.client_key)).toUpperCase();
        //签名结果与签名方式加入请求提交参数组中
        try {
            sPara.put("sign", URLEncoder.encode(mySign, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            logger.warn("encode出错");
            e.printStackTrace();
        }
        return StringUtil.mapToXmlStrWithOrder(sPara);
    }

    /*获得支付参数值字典*/
    public Map<String,String> getParams() {

        Map<String, String> sParaTemp = new HashMap<String, String>();
        sParaTemp.put("appid",this.appid);
        sParaTemp.put("attach",this.attach);
        sParaTemp.put("body",this.body);
        sParaTemp.put("detail",this.detail);
        sParaTemp.put("device_info",this.device_info);
        sParaTemp.put("fee_type",this.fee_type);
        sParaTemp.put("mch_id",this.mch_id);
        sParaTemp.put("limit_pay",this.limit_pay);
        sParaTemp.put("goods_tag",this.goods_tag);
        sParaTemp.put("nonce_str",this.nonce_str);
        sParaTemp.put("notify_url",this.notify_url);
        sParaTemp.put("trade_type",this.trade_type);
        sParaTemp.put("out_trade_no",this.out_trade_no);
        sParaTemp.put("openid",this.openid);
        sParaTemp.put("product_id",this.product_id);
        sParaTemp.put("spbill_create_ip",this.spbill_create_ip);
        sParaTemp.put("time_expire",this.time_expire);
        sParaTemp.put("time_start",this.time_start);
        sParaTemp.put("total_fee",String.valueOf(this.total_fee));
        return sParaTemp;
    }

    public static boolean verify(Map<String, String> params)
    {
        return false;
    }
}
