package org.tgcloud.zhanzhang.web.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.tgcloud.zhanzhang.entity.ZFindworker;
import org.tgcloud.zhanzhang.entity.ZMaster;
import org.tgcloud.zhanzhang.service.UserService;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class MasterController extends BaseController {
	
	 private UserService userService = Enhancer.enhance(UserService.class);
	 @Before({Tx.class, POST.class})
	    public void userNum()
	    {
		 //SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		 	String day = getPara("day",null);
	        Integer type = getParaToInt("type",null);
	        Map a=new HashMap();
	        if(type==1){
	        	a.put("mainuser", Db.queryFirst("select count(id) as usernum from z_user where convert(nvarchar(10),create_time,120) <=convert(nvarchar(10),getDate(),120)"));
	        	a.put("adduser", Db.queryFirst("select count(id) as addnum from z_user where convert(nvarchar(10),create_time,120) =convert(nvarchar(10),getDate(),120)"));
	        }
	        if(type==2){
	        	a.put("mainuser", Db.queryFirst("select count(id) as usernum from z_user where convert(nvarchar(10),create_time,120) <=convert(nvarchar(10),dateadd(day,-1,getdate()),120)"));
	        	a.put("adduser", Db.queryFirst("select count(id) as addnum from z_user where convert(nvarchar(10),create_time,120) =convert(nvarchar(10),dateadd(day,-1,getdate()),120)"));
	        }
	        if(type==3){
	        	a.put("mainuser", Db.queryFirst("select count(id) as usernum from z_user where convert(nvarchar(10),create_time,120) <=convert(nvarchar(10),getDate(),120)"));
	        	a.put("adduser", Db.queryFirst("select count(id) as addnum from z_user where convert(nvarchar(10),create_time,120) <=convert(nvarchar(10),getDate(),120) and convert(nvarchar(10),create_time,120) >convert(nvarchar(10),dateadd(day,-30,getdate()),120)"));
	        }
	        if(type==4){
	        	a.put("mainuser", Db.queryFirst("select count(id) as usernum from z_user where convert(nvarchar(10),create_time,120) <='"+day+"'"));
	        	a.put("adduser", Db.queryFirst("select count(id) as addnum from z_user where convert(nvarchar(10),create_time,120) ='"+day+"'"));
	        }
	        renderJson(a);
	    }

	 @Before({Tx.class, POST.class})
	    public void clickNum()
	    {
		 //SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		 	String day = getPara("day",null);
	        Integer type = getParaToInt("type",null);
	        List a=new ArrayList();
	        if(type==1){
	        	a=Db.find("select info_type,sum(nums) as clicknum from z_click_info where convert(nvarchar(10),create_time,120) =convert(nvarchar(10),getDate(),120) group by info_type");
	        	}
	        if(type==2){
	        	a=Db.find("select info_type,sum(nums) as clicknum from z_click_info where convert(nvarchar(10),create_time,120) =convert(nvarchar(10),dateadd(day,-1,getdate()),120) group by info_type");
	        }
	        if(type==3){
	        	a=Db.find("select info_type,sum(nums) as clicknum from z_click_info where convert(nvarchar(10),create_time,120) <=convert(nvarchar(10),getDate(),120) and convert(nvarchar(10),create_time,120) >convert(nvarchar(10),dateadd(day,-30,getdate()),120) group by info_type");
	        }
	        if(type==4){
	        	a=Db.find("select info_type,sum(nums) as clicknum from z_click_info where convert(nvarchar(10),create_time,120) ='"+day+"' group by info_type");
	        }
	        renderJson(a);
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void moneyNum()
	    {
		 //SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		 	String day = getPara("day",null);
	        Integer type = getParaToInt("type",null);
	        Map a=new HashMap();
	        if(type==1){
	        	a.put("adnum", Db.queryFirst("SELECT case when sum(money)>0 then sum( money) else 0 end FROM z_ad_apply where status=1 and convert(nvarchar(10),create_time,120) =convert(nvarchar(10),getDate(),120)"));
	        	a.put("sumnum","0");
	        }
	        if(type==2){
	        	a.put("adnum", Db.queryFirst("SELECT case when sum(money)>0 then sum( money) else 0 end FROM z_ad_apply where status=1 and convert(nvarchar(10),create_time,120) =convert(nvarchar(10),dateadd(day,-1,getdate()),120)"));
	        	a.put("sumnum","0");
	        }
	        if(type==3){
	        	a.put("adnum", Db.queryFirst("SELECT case when sum(money)>0 then sum( money) else 0 end FROM z_ad_apply where status=1 and convert(nvarchar(10),create_time,120) <=convert(nvarchar(10),getDate(),120) and convert(nvarchar(10),create_time,120) >convert(nvarchar(10),dateadd(day,-30,getdate()),120)"));
	        	a.put("sumnum","0");
	        }
	        if(type==4){
	        	a.put("adnum", Db.queryFirst("SELECT case when sum(money)>0 then sum( money) else 0 end FROM z_ad_apply where status=1 and convert(nvarchar(10),create_time,120) ='"+day+"' "));
	        	a.put("sumnum","0");
	        }
	        renderJson(a);
	    }
}
