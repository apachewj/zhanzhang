package org.tgcloud.zhanzhang.web.controller;

import com.google.common.base.Strings;
import com.google.common.collect.Maps;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.jfinal.upload.UploadFile;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tgcloud.zhanzhang.core.MatrixUtil;
import org.tgcloud.zhanzhang.core.ResultMessage;
import org.tgcloud.zhanzhang.core.StringUtil;
import org.tgcloud.zhanzhang.core.pay.alipay.util.AlipayCore;
import org.tgcloud.zhanzhang.core.pay.alipay.util.AlipayNotify;
import org.tgcloud.zhanzhang.core.pay.weipay.GenerateQrCodeUtil;
import org.tgcloud.zhanzhang.core.pay.weipay.WeiConfig;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.JSONUtil;
import org.tgcloud.zhanzhang.entity.*;
import org.tgcloud.zhanzhang.service.OrderService;
import org.tgcloud.zhanzhang.service.UserService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Administrator on 2016/1/5 0005.
 */
public class IndexController extends BaseController {

    private UserService userService = Enhancer.enhance(UserService.class);
    
    private OrderService orderService = Enhancer.enhance(OrderService.class);

    public Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * 车首页
     */
    //@Before(GET.class)
    //public void index(){
    //    redirect("/zhanzhang");
    //}

   // public void zhanzhang()
    //{
   //     render("car_index.html");
   // }

    @Before({Tx.class, POST.class})
    public void MasterPwSet()
    {
        String tel = getPara("tel",null);
        String code = getPara("code",null);
        String password = getPara("password",null);
        
        if (Strings.isNullOrEmpty(tel))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(code))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(password))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if(userService.checkVerity(tel, code, 40).equals("SUCCESS")){
        	ZMaster a=ZMaster.dao.findFirst("select * from z_master where tel="+tel);
	        a.setPassword(password);
	        a.update();
	        renderJson("{\"data\":\"SUCCESS\"}");
        }else{
        	renderJson("{\"data\":\""+userService.checkVerity(tel, code, 40)+"\"}");
        }
	        
        }
    
    @Before({Tx.class, POST.class})
    public void sigin()
    {
        String tel = getPara("tel",null);
        String code = getPara("code",null);
        String password = getPara("password",null);
        
        if (Strings.isNullOrEmpty(tel))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(code))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(password))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if(userService.checkVerity(tel, code, 10).equals("SUCCESS")){
        	ZUser a=new ZUser();
        	a.setUsername(tel);
	        a.setPassword(password);
	        a.save();
	        renderJson("{\"data\":\"SUCCESS\"}");
        }else{
        	renderJson("{\"data\":\""+userService.checkVerity(tel, code, 10)+"\"}");
        }
	        
        }
    
    @Before({Tx.class, POST.class})
    public void logout()
    {
    	
       getSession().removeAttribute("user_id");
       getSession().removeAttribute("flag");
       getSession().removeAttribute("type");
       HttpServletRequest request;
       HttpServletResponse response=this.getResponse();
       Cookie cookie = new Cookie("user_id","");
       Cookie cookies = new Cookie("type","");
       Cookie cookie1 = new Cookie("ad","");
       Cookie cookie2 = new Cookie("money","");
       Cookie cookie3 = new Cookie("report","");
       Cookie cookie4 = new Cookie("message","");
       Cookie cookie5 = new Cookie("master","");
       Cookie cookie6 = new Cookie("user_type","");
       Cookie cookie7 = new Cookie("province","");
       Cookie cookie8 = new Cookie("city","");
       Cookie cookie9 = new Cookie("county","");
       cookie.setMaxAge(0);
       cookie1.setMaxAge(0);
       cookie2.setMaxAge(0);
       cookie3.setMaxAge(0);
       cookie4.setMaxAge(0);
       cookie5.setMaxAge(0);
       cookie6.setMaxAge(0);
       cookie7.setMaxAge(0);
       cookie8.setMaxAge(0);
       cookie9.setMaxAge(0);
       cookies.setMaxAge(0);
       response.addCookie(cookie1);
       response.addCookie(cookie2);
       response.addCookie(cookie3);
       response.addCookie(cookie4);
       response.addCookie(cookie5);
       response.addCookie(cookies);
       response.addCookie(cookie);
       response.addCookie(cookie6);
       response.addCookie(cookie7);
       response.addCookie(cookie8);
       response.addCookie(cookie9);
       renderJson("{\"data\":\"SUCCESS\"}");
        }
    
    @Before({Tx.class, POST.class})
    public void click()
    {
        Integer info_type = getParaToInt("info_type",null);
        if (info_type==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        	ZClickInfo a=ZClickInfo.dao.findFirst("select * from z_click_info where convert(nvarchar(10),create_time,120)=convert(nvarchar(10),getDate(),120) and info_type="+info_type);
	        if(a!=null){
	        	a.setNums(a.getNums()+1);
		        a.update();
	        }else{
	        	ZClickInfo b=new ZClickInfo();
	        	b.setNums(1);
	        	b.setInfoType(info_type);
	        	b.save();
	        }
	        renderJson("{\"data\":\"SUCCESS\"}");   
        }
    
    @Before({Tx.class, POST.class})
    public void PwSet()
    {
        String tel = getPara("tel",null);
        String code = getPara("code",null);
        String password = getPara("password",null);
        
        if (Strings.isNullOrEmpty(tel))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(code))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(password))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if(userService.checkVerity(tel, code, 20).equals("SUCCESS")){
        	ZUser a=ZUser.dao.findFirst("select * from z_user where username="+tel);
	        a.setPassword(password);
	        a.update();
	        renderJson("{\"data\":\"SUCCESS\"}");
        }else{
        	renderJson("{\"data\":\""+userService.checkVerity(tel, code, 40)+"\"}");
        }
	        
        }
    
    /**
     * 登录
     */
    public void masterLogin()
    {
        if (getRequest().getMethod().equals("POST"))
        {
            String tel = getPara("tel");
            String pass = getPara("password");
            if (!(Strings.isNullOrEmpty(tel) && !Strings.isNullOrEmpty(pass)))
            {
                String SQL = "SELECT id FROM z_master WHERE status=1 and tel like '"+tel+"' and password like '"+pass+"'";
                Integer user_id = Db.queryInt(SQL);
                
                if(user_id != null){
                    getSession().setAttribute("flag",true);
                    getSession().setAttribute("user_id",user_id);
                    String SQL1 = "SELECT * FROM z_master WHERE id =?";
                    ZMaster aaa = ZMaster.dao.findFirst(SQL1,user_id);
                    getSession().setAttribute("type",aaa.getType());
                    HttpServletRequest request;
                	HttpServletResponse response=this.getResponse();
                    Cookie cookie = new Cookie("user_id",user_id.toString());
                    Cookie cookies = new Cookie("type",aaa.getType()+"");
                    response.addCookie(cookies);
                    response.addCookie(cookie);
                    if(aaa.getType()==2){
                    	if(aaa.getCityId()==0){
                    		Cookie cookie1 = new Cookie("user_type","1");
                    		response.addCookie(cookie1);
                    	}else if(aaa.getCountyId()==0){
                    		Cookie cookie1 = new Cookie("user_type","2");
                    		response.addCookie(cookie1);
                    	}else{
                    		Cookie cookie1 = new Cookie("user_type","3");
                    		response.addCookie(cookie1);
                    	}
                        Cookie cookie2 = new Cookie("province",aaa.getProvinceId()+"");
                        response.addCookie(cookie2);
                        Cookie cookie3 = new Cookie("city",aaa.getCityId()+"");
                        response.addCookie(cookie3);
                        Cookie cookie4 = new Cookie("county",aaa.getCountyId()+"");
                        response.addCookie(cookie4);
                    }
                    renderJson("{\"data\":\"SUCCESS\"}");
                }
                else
                {
                	String SQL2 = "SELECT id FROM z_manager WHERE status=1 and tel like '"+tel+"' and password like '"+pass+"'";
                    Integer user_id1 = Db.queryInt(SQL2);                   
                    if(user_id1 != null){
                    	ZMasterP bbb=ZMasterP.dao.findFirst("select * from z_master_p where master_id="+user_id1);
                    	if(bbb==null){
                    		ZManager.dao.deleteById(user_id1);
                    		renderJson("{\"data\":\"ERROR\"}");
                    		}else{
		                        getSession().setAttribute("flag",true);
		                        getSession().setAttribute("user_id",user_id1);
		                        getSession().setAttribute("type",4);
		                        HttpServletRequest request;
		                    	HttpServletResponse response=this.getResponse();
		                        Cookie cookie = new Cookie("user_id",user_id1.toString());
		                        Cookie cookies = new Cookie("type","4");
		                        Cookie cookie1 = new Cookie("ad",bbb.getAd()+"");
		                        Cookie cookie2 = new Cookie("money",bbb.getMoney()+"");
		                        Cookie cookie3 = new Cookie("report",bbb.getReport()+"");
		                        Cookie cookie4 = new Cookie("message",bbb.getMessage()+"");
		                        Cookie cookie5 = new Cookie("master",bbb.getMaster()+"");
		                        response.addCookie(cookie1);
		                        response.addCookie(cookie2);
		                        response.addCookie(cookie3);
		                        response.addCookie(cookie4);
		                        response.addCookie(cookie5);
		                        response.addCookie(cookies);
		                        response.addCookie(cookie);
		                        renderJson("{\"data\":\"SUCCESS\"}");
                    		}
                    }
                    else
                    {
                        renderJson("{\"data\":\"ERROR\"}");
                    }
                }
            }else
            {
            	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }

        }
        else if (getRequest().getMethod().equals("GET"))
        {
            render("zhuce.html");
        }

    }
    
    public void doapp_identify()
    {
    	String telephone = getPara("telephone");
        Integer type = getParaToInt("type");
        ZPhonemsm a=new ZPhonemsm(telephone,type);
        String b=userService.doInsertIdentifyCode(a);
        renderJson("{\"data\":\""+b+"\"}");
    }

    /**
     * 登录
     */
    public void login()
    {
        if (getRequest().getMethod().equals("POST"))
        {
            String username = getPara("username");
            String pass = getPara("password");
            if (!(Strings.isNullOrEmpty(username) && !Strings.isNullOrEmpty(pass)))
            {
                Integer user_id = userService.login(username,pass);
                if(user_id != null){
                	ZUserPingbi record=ZUserPingbi.dao.findFirst("select * from z_user_pingbi where end_time>=getDate() and user_id="+user_id);
                	if(record!=null&&record.getId()>0){
                		renderJson("{\"data\":\"因在平台内非正当操作，已被当前区域站长屏蔽"+record.getDays()+"天\"}");
                	}else{
                	HttpServletRequest request;
                	HttpServletResponse response=this.getResponse();
                    getSession().setAttribute("flag",true);
                    getSession().setAttribute("user_id",user_id);
                    getSession().setAttribute("type",3);
                    Cookie cookie = new Cookie("user_id",user_id.toString());
                    Cookie cookies = new Cookie("type","3");
                    response.addCookie(cookies);
                    response.addCookie(cookie);
                    List<Map> aaa=Db.query("SELECT  Store_Id as id FROM SUMiddleSet where user_id="+user_id);
                    if(aaa!=null){
                    	renderJson("{\"data\":\"SUCCESS\",\"user_id\":\""+user_id+"\",\"store_id\":\""+aaa+"\"}");
                    }else{
                    	renderJson("{\"data\":\"SUCCESS\",\"user_id\":\""+user_id+"\"}");
                    }
                	}
                }
                else
                {
                    renderJson("{\"data\":\"ERROR\"}");
                }
            }else
            {
            	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }

        }
        else if (getRequest().getMethod().equals("GET"))
        {
        	String username = getPara("username");
            String pass = getPara("password");
            if (!(Strings.isNullOrEmpty(username) && !Strings.isNullOrEmpty(pass)))
            {
                Integer user_id = userService.login(username,pass);
                if(user_id != null){
                	HttpServletRequest request;
                	HttpServletResponse response=this.getResponse();
                    getSession().setAttribute("flag",true);
                    getSession().setAttribute("user_id",user_id);
                    getSession().setAttribute("type",3);
                    Cookie cookie = new Cookie("user_id",user_id.toString());
                    Cookie cookies = new Cookie("type","3");
                    response.addCookie(cookies);
                    response.addCookie(cookie);
                    List<Map> aaa=Db.query("SELECT  Store_Id as id FROM SUMiddleSet where user_id="+user_id);
                    if(aaa!=null){
                    	renderJson("{\"data\":\"SUCCESS\",\"user_id\":\""+user_id+"\",\"store_id\":\""+aaa+"\"}");
                    }else{
                    	renderJson("{\"data\":\"SUCCESS\",\"user_id\":\""+user_id+"\"}");
                    }
                }
                else
                {
                    renderJson("{\"data\":\"ERROR\"}");
                }
            }else
            {
            	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }
        }

    }

    /**
     * 注册
     */
    public void submit(){
        if (getRequest().getMethod().equals("POST"))
        {
            String username = getPara("username");
            String password = getPara("pass");
            if (!(Strings.isNullOrEmpty(username)||Strings.isNullOrEmpty(password)))
            {
                Integer result = userService.saveUser(username,password);
                if(result != null)
                {
                    renderJson("{\"data\":\"SUCCESS\"}");
                }
                else
                {
                    renderJson("{\"data\":\"ERROR\"}");
                }
            }
        }
        else if (getRequest().getMethod().equals("GET"))
        {
            render("zhuce.html");
        }
    }

    /**
     * 上传文件
     */
    @Before(POST.class)
    public void uploadFile()
    {
        UploadFile file = getFile("up_file");
        Map<String,String> params = Maps.newHashMap();
        //params.put("data",GlobalStatic.base_url + "/upload/" + file.getFileName());
        params.put("data", "http://localhost:8080/upload/" + file.getFileName());
        renderJson(params);
    }

    @Before(POST.class)
    public void checkIsLogin()
    {
        Boolean flag = getSessionAttr("flag");
        if (flag != null && flag == true)
        {
            Integer user_id = getSessionAttr("user_id");
            ZUser user = ZUser.dao.findById(user_id);
            Map<String,Object> maps = Maps.newHashMap();
            maps.put("user_id",user.get("id"));
            maps.put("username",user.get("username"));
            renderJson(maps);
        }
        else
            renderJson("{\"data\":\"ERROR\"}");
    }
    public void outAddress()
    {
		List<Record> list1 = Db.find("select REGION_ID as id,REGION_NAME as name from region where PARENT_ID =1");
		List<Map<String,Object>> list5 =new ArrayList();
		for(Record a:list1){
			List<Record> list2 = Db.find("select REGION_ID as id,REGION_NAME as name from region where PARENT_ID ="+a.get("id").toString());
			List<Map<String,Object>> list4 =new ArrayList();
			if(list2.size()>0){
				for(Record b:list2){
					List<Record> list3 = Db.find("select REGION_ID as id,REGION_NAME as name from region where PARENT_ID ="+b.get("id").toString());
					Map<String,Object> bb=b.getColumns();
					List<Map<String,Object>> list6 =new ArrayList();
					if(list3.size()>0){
						for(Record c:list3){
							list6.add(c.getColumns());
						}
					}
					bb.put("district", list6);
					list4.add(bb);
				}
			}
			Map<String,Object> aa=a.getColumns();
			aa.put("city", list4);
			list5.add(aa);
		}
		 FileOutputStream out = null;   

	        int count=1000;//写文件行数   

	        try {   

	            out = new FileOutputStream(new File("D:/add.txt"));   

	            long begin = System.currentTimeMillis();   

	            for (int i = 0; i < count; i++) {   

	                out.write(new String(JSONUtil.toJson(list5)).getBytes()); 

	            }   

	            out.close();  
	            System.out.println(JSONUtil.toJson(list5));
	        }catch (Exception e) {   

	            e.printStackTrace();   

	        }
    }
    @Before(POST.class)
    public void findAd()
    {
    	Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location = getPara("location",null);
        
        StringBuilder sb = new StringBuilder("select MAX(a.id) as id,MAX(a.type) as type,MAX(a.img) as img,MAX(a.imgcontext) as imgcontext,a.showtype from z_ad_apply a right join z_ad_apply_days b on a.id=b.ad_apply_id where a.status=1 and location="+location);
        sb.append(" and DATEDIFF(day,b.day,getdate())=0");
        if(city_id!=null){
        	sb.append(" and a.city_id="+city_id);
        }
        if(county_id!=null){
        	sb.append(" and a.county_id="+county_id);
        }
        sb.append(" group by a.showtype");
        List<Record> lrecord=Db.find(sb.toString());
        for(int i=1;i<5;i++){
        	int j=0;
        	for(Record c:lrecord){
        		if(c.getInt("showtype")==i){
        		j++;
        		}
        	}
        	if(j==0){
        		Map a=new HashMap();
        		if(i==1){
        		a.put("img", GlobalStatic.imgpath1);
        		a.put("imgcontext", GlobalStatic.imgcontent1);
        		}
        		else if(i==2){
            		a.put("img", GlobalStatic.imgpath2);
            		a.put("imgcontext", GlobalStatic.imgcontent2);
            		}
        		else if(i==3){
            		a.put("img", GlobalStatic.imgpath3);
            		a.put("imgcontext", GlobalStatic.imgcontent3);
            		}
        		else if(i==4){
            		a.put("img", GlobalStatic.imgpath4);
            		a.put("imgcontext", GlobalStatic.imgcontent4);
            		}
        		a.put("showtype", i);
        		lrecord.add(new Record().setColumns(a));
        	}
        }
        checkResult(lrecord,this);
    }
    
    @Before({Tx.class, POST.class})
    public void addDonate() throws ParseException
    {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String content = getPara("content",null);//分类
        Integer crowd_id = getParaToInt("crowd_id",null);
        String moneys = getPara("money",null);
        String name = getPara("name",null);
        String tel = getPara("tel",null);
        String address = getPara("address",null);
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        ZUser u=ZUser.dao.findById(user_id);
        if (Strings.isNullOrEmpty(moneys))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (crowd_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        BigDecimal money=new BigDecimal(moneys);
        	 
	    ZCrowdDonate a= new ZCrowdDonate();
	    a.setMoney(money);
	    a.setName(name);
	    a.setAddress(address);
	    a.setContent(content);
	    a.setCrowdId(crowd_id);
	    a.setMoney(money);
	    a.setTel(tel);
	    a.setUsername(u.getNickname());
	    a.setUserId(user_id);
	    a.save();
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}
        }
    
    
    /**
     * 手机支付异步回调接口，进行订单数据修改
     *
     * @return
     */
    @Before({Tx.class, POST.class})
    public void zhi_back(HttpServletRequest request, HttpServletResponse response) throws IOException {

        /*获取request里的参数*/
        Map<String, String> params = Maps.newHashMap();
        Map requestParams = request.getParameterMap();
        for (Iterator iterator = requestParams.keySet().iterator(); iterator.hasNext(); ) {
            String name = (String) iterator.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            params.put(name, valueStr);
        }
        /*本系统订单号码*/
        String my_order_id = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");
        /*支付宝交易号*/
        String zhi_order_id = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");
        /*交易状态*/
        String trade_status = new String("TRADE_FINISHED".getBytes("ISO-8859-1"), "UTF-8");
        PrintWriter out = response.getWriter();
        if (AlipayNotify.verify(params)) {

//            退款成功： 全额退款情况： trade_status= TRADE_CLOSED，而refund_status=REFUND_SUCCESS 非全额退款情况： trade_status= TRADE_SUCCESS，而 refund_status=REFUND_SUCCESS
            if (trade_status.equals("TRADE_FINISHED")) {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
                System.out.println("tel_notify-2");
            } else if (trade_status.equals("TRADE_SUCCESS")) { 
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

//                if (message1.getKey() != 1)
//                {
//                    out.println("fail");	//请不要修改或删除
//                }
                //注意：
                //付款完成后，支付宝系统发送该交易状态通知

                /*更新订单状态为已支付*/
            }
           String  message = orderService.doFinishOrder(my_order_id, zhi_order_id, GlobalStatic.zhi_pay);
            if (message != null && message.equals("success")) {
                out.println("success");    //请不要修改或删除
            } else {
                out.println("fail");    //请不要修改或删除
            }
        } else {//验证失败
            out.println("fail");
        }

    }

//    /*微信统一下单接口*/
//    @RequestMapping(value = "/wei_pay", method = RequestMethod.POST)
//    public ResultMessage weiPay(HttpServletRequest request,
//                                @RequestParam String order_id) { 	
//        return orderService.selectWeiPayInfo((long)1, orderMapper.selectByOrderId(order_id), getRemoteHost(request));
//    }
//
//    /*微信回调*/
//    @Before({Tx.class, POST.class})
//    public void wei_back(HttpServletRequest request, HttpServletResponse response) throws IOException, DocumentException {
//        String inputLine;
//        String notityXml = "";
//        try {
//            while ((inputLine = request.getReader().readLine()) != null) {
//                notityXml += inputLine;
//            }
//            request.getReader().close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        Map<String, String> params = new HashMap<>();
//        Document document = DocumentHelper.parseText(notityXml);
//        Element nodesElement = document.getRootElement();
//        List nodes = nodesElement.elements();
//        for (Iterator its = nodes.iterator(); its.hasNext(); ) {
//            Element nodeElement = (Element) its.next();
//            params.put(nodeElement.getName(), nodeElement.getStringValue());
//        }
//        String sign = params.remove("sign");
//        Map<String, String> sPara = AlipayCore.paraFilter(params);
//        //生成签名结果
//        String my_order_id = params.get("out_trade_no").split("_")[0];
//        ZPay order = ZPay.dao.findById(my_order_id);
//        if (order != null)
//        {
//            if (order.getStatus() == GlobalStatic.order_generator)
//            {
//                String mySign = StringUtil.MD5Encode(AlipayCore.createLinkStringNoYinHao(sPara) + "&key=" +WeiConfig.client_key).toUpperCase();
//                if (mySign.equals(sign)) {
//                    if("SUCCESS".equals(params.get("return_code"))){
//                        //此处就是你的逻辑代码
//                    	renderJson("{\"data\":\""+orderService.doFinishOrder(my_order_id, params.get("transaction_id"), GlobalStatic.wei_pay)+"\"}");
////                        return orderService.doFinishOrder(my_order_id, params.get("transaction_id"), GlobalStatic.wei_pay);
////                        if (message != null && message.getKey() == 1000) {
////                            logger.error("微信回调处理成功");
////                            response.getWriter().write(setXML("SUCCESS", ""));    //请不要修改或删除
////                        } else {
////                            logger.error("订单业务处理失败");
////                            response.getWriter().write(setXML("FAIL", ""));    //请不要修改或删除
////                        }
//                    }
//                }else
//                {
//                    logger.error("微信签名解签失败");
//                    response.getWriter().write(setXML("FAIL", ""));
//                }
//            }
//            else
//            {
//                if (order.getStatus() == GlobalStatic.order_cancel)
//                {
//                    /*退款操作*/
//                }
//                logger.error("订单已经完成或者已经被取消，无需理会微信回调");
//                response.getWriter().write(setXML("SUCCESS", ""));
//            }
//        }
//        else
//        {
//            logger.error("订单不存在--" + my_order_id);
//            response.getWriter().write(setXML("SUCCESS", ""));
//        }
//    }

    public static String setXML(String return_code, String return_msg) {
        return "<xml><return_code><![CDATA[" + return_code
                + "]]></return_code><return_msg><![CDATA[" + return_msg
                + "]]></return_msg></xml>";
    }


    /**
     * 支付状态回调接口，查看订单支付状态
     *
     * @param session
     * @param order_id 本平台的订单号
     * @return
     */
    @Before({Tx.class, POST.class})
    public void backOrder() {
    	int user_id = (int)getSession().getAttribute("user_id");
    	String order_id = getPara("order_id",null);//分类
        Integer pay_type = getParaToInt("pay_type",null);
        renderJson("{\"data\":\""+orderService.doBackOrder(order_id,pay_type)+"\"}");
    }
    
    
    @Before({Tx.class, POST.class})
    public void getQrcode() {
    	int user_id = (int)getSession().getAttribute("user_id");
    	String moneys = getPara("money",null);
    	GenerateQrCodeUtil.encodeQrcode("http://localhost:8080/doRecharge?inid="+user_id+"&money="+moneys, this.getResponse());
        //renderJson("{\"data\":\""+orderService.doBackOrder(user_id, order_id,pay_type)+"\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void unQrcode() {
    	int user_id = (int)getSession().getAttribute("user_id");
    	String file = getPara("file",null);
//    	GenerateQrCodeUtil.encodeQrcode("http://localhost:8080/doRecharge?inid="+user_id+"&money="+moneys, this.getResponse());
        renderJson("{\"data\":\""+MatrixUtil.decode(new File(file))+"\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void userMoney() {
    	int user_id = (int)getSession().getAttribute("user_id");
    	List<ZCrowdDonate> dd=ZCrowdDonate.dao.find("select a.* from z_crowd_donate a left join z_crowd b on a.crowd_id=b.id where b.id>0 and a.status=1 and b.endtime<getdate() and a.user_id="+user_id);
    	String mainmoney=Db.queryStr("select Sum(a.money) from z_crowd_donate a left join z_crowd b on a.crowd_id=b.id where b.id>0 and a.status=1 and b.endtime>getdate() and a.user_id="+user_id);
    	ZUser aaa=ZUser.dao.findById(user_id);
    	for(ZCrowdDonate zc:dd){
    		aaa.setMoney(aaa.getMoney().add(zc.getMoney()));
    		zc.setStatus(3);//转入余额
    		zc.update();
    	}
    	aaa.update();
    	Map<String,String> cc=new HashMap();
    	cc.put("money", ""+aaa.getMoney());
    	cc.put("totalmoney",mainmoney);
    	//GenerateQrCodeUtil.encodeQrcode("http://localhost:8080/doRecharge?inid="+user_id+"&money="+moneys, this.getResponse());
        renderJson(cc);
    }
    
    
    @Before({Tx.class, POST.class})
    public void getCodeOrder() throws ParseException
    {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String body = getPara("body",null);//分类
        Integer inid = getParaToInt("inid",null);
        Integer app_type = getParaToInt("app_type",null);//1余额2支付宝3微信
        String moneys = getPara("money",null);
            	if (app_type==null)
                {
                    renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
                }else{
                	if (Strings.isNullOrEmpty(moneys))
                    {
                        renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
                    }else{
                    	if (Strings.isNullOrEmpty(body))
                        {
                            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
                        }else{
				        	BigDecimal money=new BigDecimal(moneys);
				        	HttpServletRequest request;
	                    	HttpServletResponse response=this.getResponse();
	                    	response.setHeader("Content-type", "text/html;charset=UTF-8");
	                    	ZPay order = new ZPay();
	                        	if(inid!=null){
	                        	order.setInId(inid);
	                        	}
	                        	order.setMoney(money);
	                        	order.setOrderId(org.tgcloud.zhanzhang.core.PhoneUtil.generateOrderId());
	                        	order.setStatus(2);
	                        	order.setType(2);
	                        	order.save();
	                    		renderJson("{\"data\":\""+order.getOrderId()+"\"}");
                        }
	                    	
                    }
                }
            }
    @Before({Tx.class, POST.class})
    public void moneyList() {
        renderJson(Db.query("select * from z_money_out where status=1 order by id desc"));
    }
    @Before({Tx.class, POST.class})
    public void moneyOK() {
    	Integer id = getParaToInt("id",null);
    	ZMoneyOut mo=ZMoneyOut.dao.findById(id);
    	if(mo==null){
    		renderJson("{\"data\":\"提现不存在！\"}");
    	}else{
    	mo.setStatus(2);
    	mo.update();
    	renderJson("{\"data\":\"SUCCESS\"}");
    	}
    }
    @Before({Tx.class, POST.class})
    public void doRecharge() throws ParseException
    {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String body = getPara("body",null);//分类
        Integer inid = getParaToInt("inid",null);
        Integer outid = getParaToInt("outid",null);
        Integer info_id = getParaToInt("info_id",null);
        Integer type = getParaToInt("type",null);//1充值2付款3广告4捐款5收款
        Integer app_type = getParaToInt("app_type",null);//1余额2支付宝3微信
        String order_id= getPara("order_id",null);//订单号
        String moneys = getPara("money",null);
        
        	if (type==null)
            {
                renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }else{
            	if (outid==null)
            {
                renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }else{
            	if (app_type==null)
                {
                    renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
                }else{
                	if (Strings.isNullOrEmpty(moneys))
                    {
                        renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
                    }else{
                    	if (Strings.isNullOrEmpty(body))
                        {
                            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
                        }else{
				        	BigDecimal money=new BigDecimal(moneys);
				        	HttpServletRequest request;
	                    	HttpServletResponse response=this.getResponse();
	                    	response.setHeader("Content-type", "text/html;charset=UTF-8");
	                    	if(app_type!=2){
					        renderJson(orderService.doRecharge(info_id,inid, outid, type, money, app_type, body,this.getResponse(),order_id));
	                    	}else{
	                    		renderJson(orderService.doRecharge(info_id,inid, outid, type, money, body,this.getResponse(),order_id));
	                    	}
	                    	
                        }
	                    	
                    }
                }
            }
        }
    }
}
