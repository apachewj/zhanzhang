package org.tgcloud.zhanzhang.web.controller;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZAd;
import org.tgcloud.zhanzhang.entity.ZAdApply;
import org.tgcloud.zhanzhang.entity.ZAdApplyDays;
import org.tgcloud.zhanzhang.entity.ZContextPath;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class AdController extends BaseController {
	 @Before({Tx.class, POST.class})
	    public void addAd()
	    {
		 //BigDecimal
		 	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
	        Date startday =getParaToDate("startday",null);
	        Date endday =getParaToDate("endday",null);
	        int user_id = (int)getSession().getAttribute("user_id");
	        String first = getPara("first",null);
	        String second = getPara("second",null);
	        String third = getPara("third",null);
	        String fourth = getPara("fourth",null);
	        Integer type = getParaToInt("type",0);
	        if (Strings.isNullOrEmpty(first))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(second))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(third))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(fourth))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        BigDecimal first1=new BigDecimal(first);
	        BigDecimal second1=new BigDecimal(second);
	        BigDecimal third1=new BigDecimal(third);
	        BigDecimal fourth1=new BigDecimal(fourth);
	        if(type==1){
	        	if(Db.findFirst("select * from z_ad where type=1")==null){
			        ZAd news= new ZAd();
			        news.setFirst(first1);
			        news.setSecond(second1);
			        news.setThird(third1);
			        news.setFourth(fourth1);
			        news.setType(1);
				    news.save();
				    renderJson("{\"data\":\"SUCCESS\"}");
	        	}else{
	        		renderJson("{\"data\":\"1002\"}");
	        	}
	        }else if(type==2){
	        	if (startday==null)
		        {
		            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		        }else{
		        if (endday==null)
		        {
		        	endday=startday;
		        }
		        if(Db.findFirst("select * from z_ad where status=1 and ((convert(nvarchar(10),'"+sdf.format(startday)+"',120)>=convert(nvarchar(10),startday,120) and convert(nvarchar(10),'"+sdf.format(startday)+"',120)<=convert(nvarchar(10),endday,120)) or (convert(nvarchar(10),'"+sdf.format(endday)+"',120)>=convert(nvarchar(10),startday,120) and convert(nvarchar(10),'"+sdf.format(endday)+"',120)<=convert(nvarchar(10),endday,120)))")!=null){
		        	renderJson("{\"data\":\"1003\"}");
		        }else{
	        	ZAd news= new ZAd();
	        	news.setStartday(new java.sql.Date(startday.getTime()));
	        	news.setEndday(new java.sql.Date(endday.getTime()));
		        news.setFirst(first1);
		        news.setSecond(second1);
		        news.setThird(third1);
		        news.setFourth(fourth1);
		        news.setType(2);
			    news.save();
			    renderJson("{\"data\":\"SUCCESS\"}");
		        }
		        }
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
		    
	        }
	 
	 @Before({Tx.class, POST.class})
	    public void changeAd()
	    {
		 //BigDecimal
		 	//SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
	        int user_id = (int)getSession().getAttribute("user_id");
	        String money = getPara("money",null);
	        Integer type = getParaToInt("type",0);
	        
	        Integer ad_id = getParaToInt("ad_id",0);
	        if (Strings.isNullOrEmpty(money))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        	BigDecimal money1=new BigDecimal(money);
	        if (type==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (ad_id==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	       ZAd news= ZAd.dao.findById(ad_id);
	       if(news==null){
	    	   renderJson("{\"data\":\"ERROR\"}");
	       }else{
	        if(type==1){
	        	news.setFirst(money1);
				news.update();
	        }else if(type==2){
			    news.setSecond(money1);
				news.update();
	        }else if(type==3){
			    news.setThird(money1);
				news.update();
	        }else if(type==4){
			    news.setFourth(money1);
				news.update();
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
		    renderJson("{\"data\":\"SUCCESS\"}");
	        }
	        }
	        }
	 
		@Before({Tx.class, POST.class})
	    public void AdDelete()
	    {
			int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer info_id = getParaToInt("info_id",null);
	        ZAd.dao.deleteById(info_id);
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
		@Before({Tx.class, POST.class})
	    public void AdList()
	    {
			int pageNum = getParaToInt("pageNum",1);//当前页面
	        int pageSize = getParaToInt("PageSize",10);//一页显示数量
			int user_id = (int)getSession().getAttribute("user_id");
			StringBuilder sbs = new StringBuilder("select *");
			StringBuilder sb = new StringBuilder(" from z_ad");
			Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
	        checkResult(info.getList(),this,info.getTotalPage());
	    }
		@Before({Tx.class, POST.class})
	    public void addAdApply()
	    {
			Integer AdApply_id = getParaToInt("AdApply_id",0);
			Integer type = getParaToInt("type",0);
			Integer store_id = getParaToInt("store_id",0);
	        int user_id = (int)getSession().getAttribute("user_id");
	        String location = getPara("location",null);
	        String img = getPara("img",null);
	        String imgcontext = getPara("imgcontext",null);
	        String title = getPara("title",null);
	        String c_image = getPara("c_image",null);
	        String c_context = getPara("c_context",null);
	        String[] c_images=null;
	        String[] c_contexts=null;
	        if(c_image!=null){
	        	c_images = c_image.split(",");
	        }
	        if(c_context!=null){
	        	c_contexts = c_context.split(",");
	        }
	        Integer status = getParaToInt("status",0);
	        if(status<2||status>3){
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (AdApply_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (Strings.isNullOrEmpty(img))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (store_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        	ZAdApply news=ZAdApply.dao.findById(AdApply_id);
	        	if(news==null){
	        		renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		        }else{
	        if(type==1){
			        news.setImg(img);
			        news.setImgcontext(imgcontext);
			        news.setType(1);
			        news.setLocation(location);
			        news.setStoreId(store_id);
			        news.setUserId(user_id);
			        news.setStatus(status);
			        if(status==2){
			        	news.setStatus(1);
			        }
				    news.update();
				    renderJson("{\"AdApply_id\":\""+news.getId()+"\"}");
	        }else if(type==2){
	        	if (Strings.isNullOrEmpty(title))
		        {
		            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		        }else{
		        news.setImg(img);
		        news.setImgcontext(imgcontext);
		        news.setLocation(location);
		        news.setStoreId(store_id);
		        news.setTitle(title);
		        news.setUserId(user_id);
		        news.setStatus(status);
		        if(status==2){
		        	news.setStatus(1);
		        }
		        news.setType(2);
			    news.update();
			    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
		        {
		            for (int i = 0; i < c_images.length;i++)
		            {
		                new ZContextPath(news.getId(),c_images[i],c_contexts[i], GlobalStatic.c_ad_apply).save();
		            }
		        }
			    renderJson("{\"AdApply_id\":\""+news.getId()+"\"}");
		        }
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        }}}}}
	    }
		@Before({Tx.class, POST.class})
	    public void changeAdApply()
	    {
			Integer AdApply_id = getParaToInt("AdApply_id",0);
			Integer type = getParaToInt("type",0);
			Integer store_id = getParaToInt("store_id",0);
	        int user_id = (int)getSession().getAttribute("user_id");
	        String location = getPara("location",null);
	        String img = getPara("img",null);
	        String imgcontext = getPara("imgcontext",null);
	        String title = getPara("title",null);
	        String c_image = getPara("c_image",null);
	        String c_context = getPara("c_context",null);
	        String[] c_images=null;
	        String[] c_contexts=null;
	        if(c_image!=null){
	        	c_images = c_image.split(",");
	        }
	        if(c_context!=null){
	        	c_contexts = c_context.split(",");
	        }
	        Integer status = getParaToInt("status",0);
	        if(status<2||status>3){
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (AdApply_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        	ZAdApply news=ZAdApply.dao.findById(AdApply_id);
	        if(type==0){
	        	type=news.getType();
	        }
	        if(type==1){
	        		news.setType(1);
	        		if(!Strings.isNullOrEmpty(img)){
	        			news.setImg(img);
	        		}
	        		if(!Strings.isNullOrEmpty(imgcontext)){
	        			news.setImgcontext(imgcontext);
	        		}
	        		if(!Strings.isNullOrEmpty(location)){
	        			news.setLocation(location);
	        		}
	        		if(store_id!=null){
	        			news.setStoreId(store_id);
	        		}
			        news.setStatus(status);
			        if(status==2){
			        	news.setStatus(1);
			        }
				    news.update();
				    
				    List<ZContextPath> aaaa=ZContextPath.dao.find("select content,img_path from z_context_path where info_id = "+ news.getId() + " and info_type = " + GlobalStatic.c_ad_apply);
			        if(aaaa!=null&&aaaa.size()>0){
			        	for (ZContextPath ac: aaaa)
			            {
			                ac.delete();
			            }
			        }
				    renderJson("{\"AdApply_id\":\""+news.getId()+"\"}");
	        }else if(type==2){
	        	news.setType(2);
	        	if (!Strings.isNullOrEmpty(title))
		        {
	        		news.setTitle(title);
		        }
	        	if(!Strings.isNullOrEmpty(img)){
        			news.setImg(img);
        		}
        		if(!Strings.isNullOrEmpty(imgcontext)){
        			news.setImgcontext(imgcontext);
        		}
        		if(!Strings.isNullOrEmpty(location)){
        			news.setLocation(location);
        		}
        		if(store_id!=null){
        			news.setStoreId(store_id);
        		}
		        news.setStatus(status);
		        if(status==2){
		        	news.setStatus(1);
		        }
			    news.update();
			    
			    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
		        {
			    	List<ZContextPath> aaaa=ZContextPath.dao.find("select id,content,img_path from z_context_path where info_id = "+ news.getId() + " and info_type = " + GlobalStatic.c_ad_apply);
			        if(aaaa!=null&&aaaa.size()>0){
			        	for (ZContextPath ac: aaaa)
			            {
			                ac.delete();
			            }
			        }
		            for (int i = 0; i < c_images.length;i++)
		            {
		                new ZContextPath(news.getId(),c_images[i],c_contexts[i], GlobalStatic.c_ad_apply).save();
		            }
		        }
			    renderJson("{\"AdApply_id\":\""+news.getId()+"\"}");
		        
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        }
	        }
	    }
		@Before({Tx.class, POST.class})
	    public void applyDays()
	    {
			Integer showtype = getParaToInt("showtype",0);
	        String month = getPara("month",null);
	        if(showtype==0){
        		renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        	}else{
	        if (Strings.isNullOrEmpty(month))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        checkResult(Db.find("select substring(convert(nvarchar(10),a.day,120),9,10) as day from z_ad_apply_days a left join z_ad_apply b on a.ad_apply_id=b.id where b.pass=1 and b.status=1 and b.showtype="+showtype+" and substring(convert(nvarchar(10),a.day,120),1,7)='"+month+"'"),this);
        	}}
        	}
		
		@Before({Tx.class, POST.class})
	    public void applyMoney()
	    {
	        String days = getPara("days",null);
	        Integer showtype = getParaToInt("showtype",0);
	        String[] d=days.split("，");
	        d=getParaValues("days");
	        BigDecimal money=BigDecimal.ZERO;
	        for(String c:d){
	        	String sql="select ";
	        	String sql1="";
	        	if(showtype==1){
	        		sql1="first";
	        	}else if(showtype==2){
	        		sql1="second";
	        	}
	        	else if(showtype==3){
	        		sql1="third";
	        	}
	        	else if(showtype==4){
	        		sql1="fourth";
	        	}else{
	        		renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        	}
	        	
	        	sql=sql+sql1+" from z_ad where status=1 and ('"+c+"'>=convert(nvarchar(10),startday,120) and '"+c+"'<=convert(nvarchar(10),endday,120) and type=2)";
	        	BigDecimal mm=Db.queryColumn(sql);
	        	if(mm==null){
	        		money=money.add((BigDecimal)Db.queryColumn("select "+sql1+" from z_ad where status=1 and type=1"));
	        	}else{
	        		money=money.add(mm);
	        	}
	        }
	        renderJson("{\"money\":\""+money.toString().substring(0,money.toString().lastIndexOf('.')+3)+"\"}");
	    }
		
		@Before({Tx.class, POST.class})
	    public void addAdApplyDays() throws ParseException
	    {
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Integer province_id = getParaToInt("province_id");
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
			Integer showtype = getParaToInt("showtype",0);
			String money = getPara("money",null);
	        String[] days = getParaValues("days");//2012-06-01
	        if (Strings.isNullOrEmpty(money))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        BigDecimal money1=new BigDecimal(money);
	        if (province_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (city_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (county_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (showtype==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        	if (days == null || days.length == 0)
		        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        	ZAdApply news= new ZAdApply();
		        news.setShowtype(showtype);
		        news.setProvinceId(province_id);
		        news.setCityId(city_id);
		        news.setCountyId(county_id);
		        news.setMoney(money1);
		        news.save();
//		        List<ZAdApplyDays> aaaa=ZAdApplyDays.dao.find("select * from z_ad_apply_days where ad_apply_id="+news.getId());
//		        if(aaaa!=null&&aaaa.size()>0){
//		        	for (ZAdApplyDays ac: aaaa)
//		            {
//		                ac.delete();
//		            }
//		        }
		            for (String c: days)
		            {
		                new ZAdApplyDays(news.getId(),new java.sql.Date(sdf.parse(c).getTime())).save();
		            }
			    renderJson("{\"AdApply_id\":\""+news.getId()+"\"}");
	        }}}}}}
	    }
		@Before({Tx.class, POST.class})
	    public void changeAdApplyDays() throws ParseException
	    {
			Integer AdApply_id = getParaToInt("AdApply_id",0);
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Integer province_id = getParaToInt("province_id");
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
			Integer showtype = getParaToInt("showtype",0);
	        String[] days = getParaValues("days");//2012-06-01
	        String money = getPara("money",null);
	        
	        ZAdApply news= ZAdApply.dao.findById(AdApply_id);
	        
	        if(news==null){
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (province_id!=null)
	        {
	        	news.setProvinceId(province_id);
	        }
	        if (city_id!=null)
	        {
	        	news.setCityId(city_id);
	        }
	        if (county_id!=null)
	        {
	        	news.setCountyId(county_id);
	        }
	        if (showtype!=null)
	        {
	        	news.setShowtype(showtype);
	        }
	        if (!Strings.isNullOrEmpty(money))
	        {
	        	BigDecimal money1=new BigDecimal(money);
	        	news.setMoney(money1);
	        }
	        
	        news.update();
		        
	        if(days!=null&&days.length>0){
			    if (days != null && days.length != 0)
		        {
			    	List<ZAdApplyDays> aaaa=ZAdApplyDays.dao.find("select * from z_ad_apply_days where ad_apply_id="+news.getId());
			        if(aaaa!=null&&aaaa.size()>0){
			        	for (ZAdApplyDays ac: aaaa)
			            {
			                ac.delete();
			            }
			        }
		            for (String c: days)
		            {
		                new ZAdApplyDays(news.getId(),new java.sql.Date(sdf.parse(c).getTime())).save();
		            }
		        }
	        }
			    renderJson("{\"AdApply_id\":\""+news.getId()+"\"}");
	        }
	    }
		@Before({Tx.class, POST.class})
	    public void ownAdApplyList() throws ParseException
	    {
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Integer showtype = getParaToInt("showtype",0);
			int pageNum = getParaToInt("pageNum",1);//当前页面
	        int pageSize = getParaToInt("PageSize",10);//一页显示数量
			int user_id = (int)getSession().getAttribute("user_id");
			StringBuilder sbs = new StringBuilder("");
			StringBuilder sb = new StringBuilder("");
			List a=new ArrayList();
	        if(showtype==1){
	        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'发布中/待' as status,a.type");
	        	sb.append("  from z_ad_apply a" +
	        			" left join (select ad_apply_id,Max(day) as day " +
	        			"from z_ad_apply_days group by ad_apply_id) b on b.ad_apply_id=a.id" +
	        			" where a.status=1 and a.pass=1 " +
	        			" and a.user_id="+user_id+" "+
	        			"and convert(nvarchar(10),b.day,120)>=convert(nvarchar(10),getDate(),120) order by a.create_time");
	        	
	        }
	        if(showtype==2){
	        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'已结束' as status,a.type ");
	        	sb.append(" from z_ad_apply a " +
	        			" left join (select ad_apply_id,Max(day) as day " +
	        			"from z_ad_apply_days group by ad_apply_id) b on b.ad_apply_id=a.id" +
	        			" where a.status=1 and a.pass=1 " +
	        			" and a.user_id="+user_id+" "+
	        			"and convert(nvarchar(10),b.day,120)<convert(nvarchar(10),getDate(),120) order by a.create_time");
	        	
	        }
	        if(showtype==3){
	        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'草稿' as status,a.type ");
	        	sb.append(" from z_ad_apply a" +
	        			" where a.status=3 and a.pass=0" +
	        			" and a.user_id="+user_id+" "+
	        			" order by a.create_time");
	        	
	        }
	        if(showtype==4){
	        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'审核中' as status,a.type ");
	        	sb.append(" from z_ad_apply a" +
	        			" where a.status=1 and a.pass=0" +
	        			" and a.user_id="+user_id+" "+
	        			" order by a.create_time");
	        	
	        }
	        if(showtype==0){
	        	sbs.append("select z.id,z.img,z.imgcontext,z.create_time,z.location,z.status,z.type ");
	        	sb.append("from ((select a.id,a.img,a.imgcontext,a.create_time,case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'发布中/待' as status,a.type  from z_ad_apply a" +
	        			" left join (select ad_apply_id,Max(day) as day " +
	        			"from z_ad_apply_days group by ad_apply_id) b on b.ad_apply_id=a.id" +
	        			" where a.status=1 and a.pass=1 " +
	        			" and a.user_id="+user_id+" "+
	        			"and convert(nvarchar(10),b.day,120)>=convert(nvarchar(10),getDate(),120))"+
	        			" union all (select a.id,a.img,a.imgcontext,a.create_time,case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'已结束' as status,a.type  from z_ad_apply a " +
	        			" left join (select ad_apply_id,Max(day) as day from " +
	        			"z_ad_apply_days group by ad_apply_id) b on b.ad_apply_id=a.id" +
	        			" where a.status=1 and a.pass=1 " +
	        			" and a.user_id="+user_id+" "+
	        			"and convert(nvarchar(10),b.day,120)<convert(nvarchar(10),getDate(),120))"+
	        			" union all (select a.id,a.img,a.imgcontext,a.create_time,case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'草稿' as status,a.type  from z_ad_apply a" +
	        			" where a.status=3 and a.pass=0" +
	        			" and a.user_id="+user_id+" "+
	        			") "+
	        			" union all (select a.id,a.img,a.imgcontext,a.create_time," +
	        			"case a.location when '01' then '主页1'" +
	        			" when '02' then '主页2'" +
	        			" when '1' then '餐饮'" +
	        			" when '2' then '住宿'" +
	        			" when '3' then '门店'" +
	        			" when '4' then '房屋租售'" +
	        			" when '5' then '的士顺车'" +
	        			" when '6' then '生活助手'" +
	        			" when '7' then '便民服务'" +
	        			" when '8' then '智能通讯'" +
	        			" when '9' then '招聘征婚'" +
	        			" when '10' then '二手'" +
	        			" when '11' then '便民通知'" +
	        			" when '12' then '询价'" +
	        			" when '13' then '农林牧渔'" +
	        			" when '14' then '爱心众筹'" +
	        			" when '15' then '本地企业'" +
	        			" when '16' then '金融保险'" +
	        			" when '17' then '本地特产'" +
	        			" when '18' then '旅游娱乐'" +
	        			" end as location,'审核中' as status,a.type  from z_ad_apply a" +
	        			" where a.status=1 and a.pass=0" +
	        			" and a.user_id="+user_id+" "+
	        			")) z order by z.create_time");
	        }
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	                if(record != null && record.get("id") != null)
	                {	
	                	List<Record> record0 = Db.find("select " +
	                			"case DATEDIFF(year,day,dateadd (year, 1, getdate ())) " +
	                			"when 1" +
	                			" then substring(convert(nvarchar(10),day,120),6,11) " +
	                			"else convert(nvarchar(10),day,120)" +
	                			" end as day from z_ad_apply_days where ad_apply_id =" + record.get("id"));
	                    if(record0 != null)
	                    {
	                        record.set("days", record0);
	                    }
	                }
	            }
	        }
	        checkResult(info.getList(),this,info.getTotalPage());
	        }
		
		
		@Before({Tx.class, POST.class})
	    public void AdApplyList() throws ParseException
	    {
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Integer location = getParaToInt("location",0);
			Integer showtype = getParaToInt("showtype",1);
			int pageNum = getParaToInt("pageNum",1);//当前页面
	        int pageSize = getParaToInt("PageSize",10);//一页显示数量
			int user_id = (int)getSession().getAttribute("user_id");
			StringBuilder sb = new StringBuilder("");
			StringBuilder sbs = new StringBuilder("");
			List a=new ArrayList();
			if(location==0){
		        if(showtype==1){
		        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,b.nickname");
	        	sb.append(" from z_ad_apply a " +
		        			" left join z_user b on a.user_id=b.id" +
		        			" left join (select ad_apply_id,Max(day) as day " +
		        			"from z_ad_apply_days group by ad_apply_id) c on c.ad_apply_id=a.id" +
		        			" where a.status=1 and a.pass=1 " +
		        			"and convert(nvarchar(10),c.day,120)>=convert(nvarchar(10),getDate(),120)"+
		        			" order by a.create_time");
		        	
		        }
		        if(showtype==2){
		        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,b.nickname");
	        	sb.append("  from z_ad_apply a " +
		        			" left join z_user b on a.user_id=b.id" +
		        			" left join (select ad_apply_id,Max(day) as day " +
		        			"from z_ad_apply_days group by ad_apply_id) c on c.ad_apply_id=a.id" +
		        			" where a.status=1 and a.pass=0 " +
		        			"and convert(nvarchar(10),c.day,120)>=convert(nvarchar(10),getDate(),120)"+
		        			" order by a.create_time");
		        	
		        }
		    }else{
		    	if(showtype==1){
		        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,b.nickname");
	        	sb.append(" from z_ad_apply a " +
		        			" left join z_user b on a.user_id=b.id" +
		        			" left join (select ad_apply_id,Max(day) as day " +
		        			"from z_ad_apply_days group by ad_apply_id) c on c.ad_apply_id=a.id" + 
		        			" where a.status=1 and a.pass=1 " +
		        			"and location="+location+
		        			"and convert(nvarchar(10),c.day,120)>=convert(nvarchar(10),getDate(),120)"+
		        			" order by a.create_time");
		        	
		        }
		        if(showtype==2){
		        	sbs.append("select a.id,a.img,a.imgcontext,a.create_time,b.nickname");
	        	sb.append("  from z_ad_apply a " +
		        			" left join z_user b on a.user_id=b.id" +
		        			" left join (select ad_apply_id,Max(day) as day " +
		        			"from z_ad_apply_days group by ad_apply_id) c on c.ad_apply_id=a.id" +
		        			" where a.status=1 and a.pass=0 " +
		        			"and location="+location+
		        			"and convert(nvarchar(10),c.day,120)>=convert(nvarchar(10),getDate(),120)"+
		        			" order by a.create_time");
		        	
		        }
		    }
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	                if(record != null && record.get("id") != null)
	                {	
	                	List<Record> record0 = Db.find("select " +
	                			"case DATEDIFF(year,day,dateadd (year, 1, getdate ())) " +
	                			"when 1" +
	                			" then substring(convert(nvarchar(10),day,120),6,11) " +
	                			"else convert(nvarchar(10),day,120)" +
	                			" end as day from z_ad_apply_days where ad_apply_id =" + record.get("id"));
	                    if(record0 != null)
	                    {
	                        record.set("days", record0);
	                    }
	                }
	            }
	        }
	        checkResult(info.getList(),this);
	        }
		
		@Before({Tx.class, POST.class})
	    public void AdApplyPass()
	    {
			int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer info_id = getParaToInt("info_id",null);
	        Integer pass = getParaToInt("pass",null);
	        ZAdApply a =ZAdApply.dao.findById(info_id);
	        if(a!=null){
	        a.setPass(pass);
	        a.update();
	        renderJson("{\"data\":\"SUCCESS\"}");
	        }else{
	        	renderJson("{\"data\":\"ERROR\"}");
	        }
	    }
		
		@Before({Tx.class, POST.class})
	    public void AdApplyDelete()
	    {
			int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer info_id = getParaToInt("info_id",null);
	        Integer pass = getParaToInt("pass",null);
	        ZAdApply a =ZAdApply.dao.findById(info_id);
	        if(a!=null){
	        a.setStatus(0);
	        a.update();
	        renderJson("{\"data\":\"SUCCESS\"}");
	        }else{
	        	renderJson("{\"data\":\"ERROR\"}");
	        }
	    }
		
		@Before({Tx.class, POST.class})
	    public void AdApply()
	    {
	        Integer info_id = getParaToInt("info_id",null);
	        Record record = Db.findFirst("select s.*,a.nickname from z_ad_apply s " +
	        		"left join z_user a on s.user_id=a.id "+
	                "where s.id = " + info_id);
	        if (record != null)
	        {
	        	if(record.getInt("type")==2){
	        		String aa=new String("");
	        		String bb=new String("");
	        		for(Object a:Db.query("select img_path from z_context_path where status=1 and info_id = "+ info_id + " and info_type = " + GlobalStatic.c_ad_apply)){
	        			aa=aa+a+",";
	        		}
	        		for(Object b:Db.query("select content from z_context_path where status=1 and info_id = "+ info_id + " and info_type = " + GlobalStatic.c_ad_apply)){
	        			bb=bb+b+",";
	        		}
	        		record.set("c_image",aa);//正文 
	        		record.set("c_context",bb);//正文 
	        	}
	            record.set("days",Db.find("select day from z_ad_apply_days where ad_apply_id = "+ info_id));//正文 
	            renderJson(record);
	        }else{
	        renderJson("{\"data\":\"ERROR\"}");
	        }
	    }
		
		@Before({Tx.class, POST.class})
	    public void AdImgs()
	    {
			int user_id = (int)getSession().getAttribute("user_id");
	        List<Record> record = Db.find("select top 4 img from z_ad_apply " +
	                "where user_id = " + user_id);
	        checkResult(record,this);
	    }
}
