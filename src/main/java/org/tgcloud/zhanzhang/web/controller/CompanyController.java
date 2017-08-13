package org.tgcloud.zhanzhang.web.controller;

import java.util.List;

import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZCompany;
import org.tgcloud.zhanzhang.entity.ZCompanyContact;
import org.tgcloud.zhanzhang.entity.ZCompanyGoods;
import org.tgcloud.zhanzhang.entity.ZCompanyLink;
import org.tgcloud.zhanzhang.entity.ZCompanyNews;
import org.tgcloud.zhanzhang.entity.ZCompanySupport;
import org.tgcloud.zhanzhang.entity.ZCompanyWork;
import org.tgcloud.zhanzhang.entity.ZContextPath;
import org.tgcloud.zhanzhang.entity.ZInfoUrl;
import org.tgcloud.zhanzhang.entity.ZUser;
import org.tgcloud.zhanzhang.service.CompanyService;
import org.tgcloud.zhanzhang.service.TravelService;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class CompanyController extends BaseController {

	 private CompanyService companyService = Enhancer.enhance(CompanyService.class);
	 @Before({Tx.class, POST.class})
	    public void add_Com_News()
	    {
	        String title = getPara("title");//标题
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String[] c_images = getParaValues("c_image");
	        String[] c_contexts = getParaValues("c_context");
	        int com_id=Db.queryInt("select id from z_company where status=1 and user_id="+user_id);
	        if (Strings.isNullOrEmpty(title))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        ZCompanyNews news= new ZCompanyNews(title,user_id,com_id);
	        news.save();
	        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
	        {
	            for (int i = 0; i < c_images.length;i++)
	            {
	                new ZContextPath(news.getId(),c_images[i],c_contexts[i], GlobalStatic.c_com_news).save();
	            }
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	 @Before({Tx.class, POST.class})
	    public void change_Com_News()
	    {
		 int info_id = getParaToInt("news_id");
	        String title = getPara("title");//标题
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String[] c_images = getParaValues("c_image");
	        String[] c_contexts = getParaValues("c_context");
	        int com_id=Db.queryInt("select id from z_company where status=1 and user_id="+user_id);
	        if (Strings.isNullOrEmpty(title))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        ZCompanyNews news=ZCompanyNews.dao.findById(info_id);
	        news.setTitle(title);
	        news.update();
	        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
	        {
	        	for(ZContextPath b:ZContextPath.dao.find("select * from z_context_path where info_id="+news.getId()+" and info_type="+GlobalStatic.c_com_news)){
		        	b.setStatus(2);
		        	b.update();
		        }
	            for (int i = 0; i < c_images.length;i++)
	            {
	                new ZContextPath(news.getId(),c_images[i],c_contexts[i], GlobalStatic.c_com_news).save();
	            }
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	    /*查看导游*/
	    @Before({POST.class})
	    public void news()
	    {
	        int info_id = getParaToInt("news_id");
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        ZCompanyNews news=ZCompanyNews.dao.findById(info_id);
	        news.setNums(news.getNums()+1);
	        ZCompanyNews.dao.update();
	        Record record = companyService.selectNewsInfo(info_id,user_id);
	        if (record != null)
	        {
	        	renderJson(record);
	        }
	        else
	        {
	            renderJson("{\"data\":\"ERROR\"}");
	        }
	    }
	    
	    /*查看产品*/
	    @Before({POST.class})
	    public void goods()
	    {
	        int info_id = getParaToInt("goods_id");
	        Record record=Db.findById("z_company_goods",info_id);
	        if (record != null)
	        {
	        	renderJson(record);
	        }
	        else
	        {
	            renderJson("{\"data\":\"ERROR\"}");
	        }
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void add_Com_Support()
	    {
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String[] c_images = getParaValues("c_image");
	        String[] c_contexts = getParaValues("c_context");
	        int com_id=Db.queryInt("select id from z_company where status=1 and user_id="+user_id);
	        Record record=Db.findFirst("select * from z_company_support where status=1 and com_id ="+com_id);
	        if(record==null){
	        ZCompanySupport Support= new ZCompanySupport(user_id,com_id);
	        Support.save();
	        
	        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
	        {
	            for (int i = 0; i < c_images.length;i++)
	            {
	                new ZContextPath(Support.getId(),c_images[i],c_contexts[i], GlobalStatic.c_com_support).save();
	            }
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        }else{
	        	ZCompanySupport Support= new ZCompanySupport(record.getInt("id"),user_id,com_id);
		        Support.update();

		        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
		        {
			        List<Record> a=Db.find("select * from z_context_path where info_id ="+Support.getId()+"and info_type="+GlobalStatic.c_com_support);
			        for(Record b:a){
			        	Db.delete("z_context_path", b);
			        }
		            for (int i = 0; i < c_images.length;i++)
		            {
		                new ZContextPath(Support.getId(),c_images[i],c_contexts[i], GlobalStatic.c_com_support).save();
		            }
		        }
	        }
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void add_Com_Goods()
	    {
	        String title = getPara("title");//标题
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String etitle = getPara("etitle");//副标题
	        String content = getPara("content");//内容
	        String imgs=getPara("imgs",GlobalStatic.string_no_data);
	        int status = getParaToInt("status",0);
	        if (status==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(title))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(content))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        int com_id=Db.queryInt("select id from z_company where status=1 and user_id="+user_id);
	        ZCompanyGoods news= new ZCompanyGoods(title,user_id,com_id,etitle,content,imgs,status);
	        news.save();
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void change_Com_Goods()
	    {
		 int info_id = getParaToInt("goods_id");
	        String title = getPara("title");//标题
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String etitle = getPara("etitle");//副标题
	        String content = getPara("content");//内容
	        String imgs=getPara("imgs",GlobalStatic.string_no_data);
	        int status = getParaToInt("status",0);
	        ZCompanyGoods news=ZCompanyGoods.dao.findById(info_id);
	        news.setTitle(title);
	        news.setEtitle(etitle);
			news.setContent(content);
			news.setUserId(user_id);
			news.setImgs(imgs);
			news.setStatus(status);
	        news.update();
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void add_Com_Contact()
	    {
	        String email = getPara("email");//标题
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String address = getPara("address");//副标题
	        int iswork = getParaToInt("iswork",0);
	        String holiworkstart = getPara("holiworkstart");//开始时间
	        String holiworkend = getPara("holiworkend");//结束时间
	        String[] nikname = getParaValues("nikname");
	        String[] tel = getParaValues("tel");
	        if (iswork!=0&&(holiworkstart==null||holiworkend==null))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	       // if (Strings.isNullOrEmpty(email))
	       // {
	       //     renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	       // }
	       // if (Strings.isNullOrEmpty(address))
	       // {
	       //     renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	       // }
	        String[] startday = getParaValues("startday");
	        String[] endday = getParaValues("endday");
	        String[] starttime = getParaValues("starttime");
	        String[] endtime = getParaValues("endtime");
	        
	        if (starttime == null || starttime.length == 0||endtime == null || endtime.length == 0||startday == null || startday.length == 0||endday == null || endday.length == 0)
	        {
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	             
	       // if (!((nikname != null && nikname.length != 0) && (tel != null && tel.length != 0) && nikname.length == tel.length))
	       // {
	       // 	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	       // }
	        
	        int com_id=Db.queryInt("select id from z_company where status=1 and user_id="+user_id);
	        Record record=Db.findFirst("select * from z_company_contact where status=1 and com_id ="+com_id);
	        if(record==null){
	        ZCompanyContact news= new ZCompanyContact(email,user_id,com_id,address,iswork,holiworkstart,holiworkstart);
	        news.save();
	        if ((nikname != null && nikname.length != 0) && (tel != null && tel.length != 0) && nikname.length == tel.length)
	        {
	            for (int i = 0; i < nikname.length;i++)
	            {
	                new ZCompanyLink(news.getId(),nikname[i],tel[i]).save();
	            }
	        }
	        if (starttime != null && starttime.length != 0 && endtime != null && endtime.length != 0 && startday != null && startday.length != 0 && endday != null && endday.length != 0 )
	        {
	        	for (int i = 0; i < nikname.length;i++)
	            {
	                new ZCompanyWork(news.getId(),startday[i],endday[i],starttime[i],endtime[i]).save();
	            }
	        }
	        }else{
	        	
	        	ZCompanyContact news= new ZCompanyContact(record.getInt("id"),email,user_id,com_id,address,iswork,holiworkstart,holiworkstart);
		        news.update();

		        if ((nikname != null && nikname.length != 0) && (tel != null && tel.length != 0) && nikname.length == tel.length)
		        {
			        List<Record> a=Db.find("select * from z_company_link where contact_id ="+news.getId());
			        for(Record b:a){
			        	Db.delete("z_company_link", b);
			        }
		            for (int i = 0; i < nikname.length;i++)
		            {
		                new ZCompanyLink(news.getId(),nikname[i],tel[i]).save();
		            }
		        }
		        if (starttime != null && starttime.length != 0 && endtime != null && endtime.length != 0 && startday != null && startday.length != 0 && endday != null && endday.length != 0 )
		        {
		        	 List<Record> a=Db.find("select * from z_company_work where contact_id ="+news.getId());
				        for(Record b:a){
				        	Db.delete("z_company_work", b);
				        }
		        	for (int i = 0; i < nikname.length;i++)
		            {
		                new ZCompanyWork(news.getId(),startday[i],endday[i],starttime[i],endtime[i]).save();
		            }
		        }
	        }

	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void add_Com()
	    {
	        String com_name = getPara("com_name");//公司名
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String message = getPara("message");//简介
	        String main_img=getPara("main_img",GlobalStatic.string_no_data);
	        String id_img=getPara("id_img",GlobalStatic.string_no_data);
	        String paper_img=getPara("paper_img",GlobalStatic.string_no_data);
	        String location_x=getPara("location_x",GlobalStatic.string_no_data);
	        String location_y=getPara("location_y",GlobalStatic.string_no_data);
	        int status = getParaToInt("status",0);
	        Integer city_id = getParaToInt("city_id",0);
	        Integer county_id = getParaToInt("county_id",0);
	        if (Strings.isNullOrEmpty(com_name))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(location_x))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(location_y))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(message))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (city_id==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (county_id==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (status==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        ZCompany news= new ZCompany(com_name,user_id,message,main_img,id_img,paper_img,status,city_id,county_id,location_x,location_y);
	        news.save();
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void change_Com()
	    {
	        String com_name = getPara("com_name",null);//公司名
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String message = getPara("message",null);//简介
	        String main_img=getPara("main_img",GlobalStatic.string_no_data);
	        String id_img=getPara("id_img",GlobalStatic.string_no_data);
	        String paper_img=getPara("paper_img",GlobalStatic.string_no_data);
	        String location_x=getPara("location_x",GlobalStatic.string_no_data);
	        String location_y=getPara("location_y",GlobalStatic.string_no_data);
	        Integer status = getParaToInt("status",null);
	        Integer com_id = getParaToInt("com_id",null);
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        ZCompany news=ZCompany.dao.findById(com_id);
	        if (!Strings.isNullOrEmpty(location_x))
	        {
	        	news.setLocationX(location_x);
	        }
	        if (!Strings.isNullOrEmpty(location_y))
	        {
	        	news.setLocationY(location_y);
	        }
	        if (!Strings.isNullOrEmpty(com_name))
	        {
	        news.setComName(com_name);
	        }
	        if (!Strings.isNullOrEmpty(message))
	        {
	        news.setMessage(message);
	        }
	        if (!Strings.isNullOrEmpty(main_img))
	        {
	        news.setMainImg(main_img);
	        }
	        if (!Strings.isNullOrEmpty(id_img))
	        {
	        news.setIdImg(id_img);
	        }
	        if (!Strings.isNullOrEmpty(paper_img))
	        {
	        news.setPaperImg(paper_img);
	        }
	        if (status!=null)
	        {
	        news.setStatus(status);
	        }
	        if (city_id!=null)
	        {
			news.setCityId(city_id);
				if (county_id!=null)
		        {
					news.setCountyId(county_id);
				
		        }
	        }
	        news.update();
	        renderJson("{\"data\":\"SUCCESS\"}");
	    }
	 
	 @Before({POST.class})
	    public void com_list()
	    {
	        String name = getPara("name",null);//公司名
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        int pageNum = getParaToInt("pageNum",1);//当前页面
	        int PageSize = getParaToInt("PageSize",10);//一页显示数量
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county = getParaToInt("county_id",null);
	        checkResult(companyService.selectComList(pageNum,PageSize,city_id,county,name),this);
	    }
	 
	 @Before({POST.class})
	    public void com_detail()
	    {
	        String com_id = getPara("com_id");//公司名
	        if (Strings.isNullOrEmpty(com_id))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        Record record =Db.findFirst("select * from z_company where id="+com_id);
	        if(record != null && record.get("city_id") != null)
            {	
            	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID = (select top 1 PARENT_ID from region where REGION_ID = " + record.get("city_id")+")");
                if(record0 != null)
                {
                    record.setColumns(record0);
                }
                Record record1 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + record.get("city_id"));
                if(record1 != null)
                {
                    record.setColumns(record1);
                }
                Record record2 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + record.get("county_id"));
                if(record2 != null)
                {
                    record.setColumns(record2);
                }
            }
	        renderJson(record);
	    }
	 
	 @Before({POST.class})
	    public void com_detail_info()
	    {
	        String com_id = getPara("com_id");//公司名
	        if (Strings.isNullOrEmpty(com_id))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        int pageNum = getParaToInt("pageNum",1);//当前页面
	        int PageSize = getParaToInt("PageSize",10);//一页显示数量
	        int type=getParaToInt("type",1);
	        checkResult(companyService.selectComDetail(pageNum,PageSize,com_id,type),this);
	    }
	 
	 @Before(POST.class)
	    public void iscompany()
	    {
		 int user_id = (int)getSession().getAttribute("user_id");
		 Record com=new Record();
		 if(Db.queryInt("select id from z_company where status=1 and user_id="+user_id)!=null){
			 int com_id=Db.queryInt("select id from z_company where status=1 and user_id="+user_id);
			 com=Db.findById("z_company", com_id);
			 com.set("dohave", 1);
		 }else{
			 com.set("dohave", 2);
		 }
		 renderJson(com);
	    }
}
