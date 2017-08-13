package org.tgcloud.zhanzhang.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZContextPath;
import org.tgcloud.zhanzhang.entity.ZManager;
import org.tgcloud.zhanzhang.entity.ZMaster;
import org.tgcloud.zhanzhang.entity.ZMasterNotice;
import org.tgcloud.zhanzhang.entity.ZMasterP;

import com.jfinal.aop.Before;
import com.jfinal.core.JFinal;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class ManagerController extends BaseController {
	@Before({Tx.class, POST.class})
    public void addMaster()
    {
        int user_id = (int)getSession().getAttribute("user_id");
        
        if(user_id==1){
        ZMaster user =ZMaster.dao.findById(user_id);
        Integer province_id = getParaToInt("province_id",0);
        Integer city_id = getParaToInt("city_id",0);
        Integer county_id = getParaToInt("county_id",0);
        String name = getPara("name",null);
        String idcard = getPara("idcard",null);
        String id_imgs = getPara("id_imgs",null);
        String sign_imgs = getPara("sign_imgs",null);
        String tel = getPara("tel",null);
        if(province_id==0){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if(name==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if(tel==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        	
        }else{
        	ZMaster user1 =ZMaster.dao.findFirst("select * from z_master where tel like '"+tel+"'");
        	ZManager user2 =ZManager.dao.findFirst("select * from z_manager where tel like '"+tel+"'");
        	if(user1==null&&user2==null){
		        ZMaster a=new ZMaster();
		        a.setUserId(user_id);
		        a.setProvinceId(province_id);
		        a.setCityId(city_id);
		        a.setCountyId(county_id);
		        a.setName(name);
		        a.setIdcard(idcard);
		        a.setIdImgs(id_imgs);
		        a.setSignImgs(sign_imgs);
		        a.setTel(tel);
		        a.save();
		        renderJson(a);
        	}else{
        		renderJson("{\"data\":\"used tel\",\"key\":\"1003\"}");
        	}
        }
        }}
        }else{
        	ZMaster user =ZMaster.dao.findById(user_id);
            Integer province_id = getParaToInt("province_id",0);
            Integer city_id = getParaToInt("city_id",0);
            Integer county_id = getParaToInt("county_id",0);
            String name = getPara("name",null);
            String idcard = getPara("idcard",null);
            String id_imgs = getPara("id_imgs",null);
            String sign_imgs = getPara("sign_imgs",null);
            String tel = getPara("tel",null);
            if(province_id==0){
            	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }else{
            if(name==null){
            	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }else{
            if(tel==null){
            	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }else{
            	ZMaster user1 =ZMaster.dao.findFirst("select * from z_master where tel like '"+tel+"'");
            	ZManager user2 =ZManager.dao.findFirst("select * from z_manager where tel like '"+tel+"'");
            	if(user1==null&&user2==null){
//            if(user.getProvinceId()==0||(user.getProvinceId()==province_id&(user.getCityId()==0||(user.getCityId()==city_id&user.getCountyId()==0))))
            	if(user.getProvinceId().intValue()==0||user.getProvinceId().intValue()==province_id.intValue())
        	{
            	if(user.getCityId().intValue()==0||user.getCityId().intValue()==city_id.intValue()){ 
            		if(user.getCountyId().intValue()==0){
	            ZMaster a=new ZMaster();
	            a.setUserId(user_id);
	            a.setProvinceId(province_id);
	            a.setCityId(city_id);
	            a.setCountyId(county_id);
	            a.setName(name);
	            a.setIdcard(idcard);
	            a.setIdImgs(id_imgs);
	            a.setSignImgs(sign_imgs);
	            a.setTel(tel);
	            a.save();
	            renderJson(a);
            		}else{
                		renderJson("{\"data\":\"1002\"}");
                	}
            	}else{
            		renderJson("{\"data\":\"1002\"}");
            	}
        	}else{
        		renderJson("{\"data\":\"1002\"}");
        	}
            	}else{
            		renderJson("{\"data\":\"used tel\",\"key\":\"1003\"}");
            	}
        }}}
        }
    }
	@Before({Tx.class, POST.class})
    public void addManager()
    {
        int user_id = (int)getSession().getAttribute("user_id");
        String name = getPara("name",null);
        String tel = getPara("tel",null);
        if(name==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if(tel==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	ZManager user2 =ZManager.dao.findFirst("select * from z_manager where tel like '"+tel+"'");
        	ZMaster user1 =ZMaster.dao.findFirst("select * from z_master where tel like '"+tel+"'");
        	
        	if(user1==null&&user2==null){
	        ZManager b=new ZManager();
	        b.setName(name);
	        b.setTel(tel);
	        if((int)getSession().getAttribute("type")==4){
	        	ZManager user3 =ZManager.dao.findById(user_id);
	        	b.setUserId(user3.getUserId());
	        	}else{
	        		b.setUserId(user_id);
	        	}
	        b.save();
	        renderJson(b);
        	}else{
        		renderJson("{\"data\":\"used tel\",\"key\":\"1003\"}");
        	}
        }
        }
    }
	@Before({Tx.class, POST.class})
    public void addManagerPower()
    {
		Integer manager_id = getParaToInt("manager_id",null);
		Integer money = getParaToInt("money",0);
		Integer ad = getParaToInt("ad",0);
		Integer report = getParaToInt("report",0);
		Integer message = getParaToInt("message",0);
		Integer master = getParaToInt("master",0);
		 if(manager_id==null){
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        ZMasterP a=new ZMasterP();
	        a.setMasterId(manager_id);
	        a.setMoney(money);
	        a.setAd(ad);
	        a.setReport(report);
	        a.setMessage(message);
	        a.setMaster(master);
	        a.save();
	        renderJson("{\"data\":\"SUCCESS\"}");
	        }
    }
	@Before({Tx.class, POST.class})
    public void Master()
    {
		int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer info_id = getParaToInt("info_id",null);
        Record record=Db.findById("z_master", info_id);
        if(record!=null){
        	if(record.get("province_id") != null&&record.getInt("province_id").intValue()!=0){
            	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + record.get("province_id"));
                if(record0 != null)
                {
                    record.setColumns(record0);
                }
            	}
            	if(record.get("city_id") != null&&record.getInt("city_id").intValue()!=0){
                Record record1 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + record.get("city_id"));
                if(record1 != null)
                {
                    record.setColumns(record1);
                }
            	}
            	if(record.get("county_id") != null&&record.getInt("county_id").intValue()!=0){
                Record record2 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + record.get("county_id"));
                if(record2 != null)
                {
                    record.setColumns(record2);
                }
            	}
        renderJson(record);
        }else{
        	renderJson("{\"data\":\"ERROR\"}");
        }
    }
	
	@Before({Tx.class, POST.class})
    public void MasterDelete()
    {
		int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer info_id = getParaToInt("info_id",null);
        ZMaster a=ZMaster.dao.findById(info_id);
        a.setStatus(2);
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
	@Before({Tx.class, POST.class})
    public void ManagerDelete()
    {
		int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer info_id = getParaToInt("info_id",null);
        ZManager a=ZManager.dao.findById(info_id);
        a.setStatus(2);
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
	@Before({Tx.class, POST.class})
    public void MasterList()
    {
		int user_id = (int)getSession().getAttribute("user_id");
		Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String searchname = getPara("searchname",null);
        Integer type = getParaToInt("type",0);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder(" SELECT *");
        	sb.append(" FROM z_master"+
        			" WHERE 1=1 AND status = 1");
	        if (searchname != null) {
	            sb.append(" and name like '%" + searchname + "%'");
	        }
	        if(type==1){
	        	if(province_id!=null&&province_id!=0){
	        		sb.append(" and province_id="+province_id);
		        	}else{
		        		sb.append(" and province_id>0");
		        	}
	        	sb.append(" and city_id=0 and county_id=0");
	        }else if(type==2){
	        	if(province_id!=null&&province_id!=0){
	        		sb.append(" and province_id="+province_id);
		        	}else{
		        		sb.append(" and province_id>0");
		        	}
	        	if(city_id!=null&&city_id!=0){
	        	sb.append(" and city_id="+city_id);
	        	}else{
	        		sb.append(" and city_id>0");
	        	}
	 	       sb.append(" and county_id=0");
	 	        }else if(type==3){
	        	if(province_id!=null&&province_id!=0){
	        		sb.append(" and province_id="+province_id);
		        	}else{
		        		sb.append(" and province_id>0");
		        	}
	        	if(city_id!=null&&city_id!=0){
		        	sb.append(" and city_id="+city_id);
		        	}else{
		        		sb.append(" and city_id>0");
		        	}
	        	if(county_id!=null&&county_id!=0){
		        	sb.append(" and county_id="+county_id);
		        	}else{
		        		sb.append(" and county_id>0");
		        	}
	 	        }else{
	 	        	if(province_id!=null&&province_id!=0){
		        		sb.append(" and province_id="+province_id);
			        	}
		        	if(city_id!=null&&city_id!=0){
			        	sb.append(" and city_id="+city_id);
			        	}
		        	if(county_id!=null&&county_id!=0){
			        	sb.append(" and county_id="+county_id);
			        	}
	 	        }
	        sb.append(" order by create_time desc");     
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null )
                {	
                	if(record.get("province_id") != null&&record.getInt("province_id").intValue()!=0){
                	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + record.get("province_id"));
                    if(record0 != null)
                    {
                        record.setColumns(record0);
                    }
                	}
                	if(record.get("city_id") != null&&record.getInt("city_id").intValue()!=0){
                    Record record1 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + record.get("city_id"));
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                	}
                	if(record.get("county_id") != null&&record.getInt("county_id").intValue()!=0){
                    Record record2 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + record.get("county_id"));
                    if(record2 != null)
                    {
                        record.setColumns(record2);
                    }
                	}
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
	
	@Before({Tx.class, POST.class})
    public void ManagerList()
    {
		int user_id = (int)getSession().getAttribute("user_id");
		int type = (int)getSession().getAttribute("type");
		if(type==4){
			user_id=ZManager.dao.findById(user_id).getUserId();
		}
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sbs = new StringBuilder(" SELECT *");
        StringBuilder sb = new StringBuilder("");
        	sb.append(" FROM z_manager"+
        			" WHERE 1=1 AND status = 1 and user_id="+user_id);
	        sb.append(" order by create_time desc");     
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        checkResult(info.getList(),this,info.getTotalPage());
    }
	
	@Before({Tx.class, POST.class})
    public void ManagerPower()
    {
		Integer manager_id = getParaToInt("manager_id",null);
		
		 if(manager_id==null){
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{   
	        	ZMasterP a=ZMasterP.dao.findFirst("select * from z_master_p where master_id="+manager_id);
	        	if(a!=null){
	                renderJson(a);
	                }else{
	                	renderJson("{\"data\":\"ERROR\"}");
	                }
	        }
    }
	
	@Before({Tx.class, POST.class})
    public void addMasterNotice()
    {
		int user_id = (int)getSession().getAttribute("user_id");
        String title = getPara("title",null);
        String ids = getPara("ids",null);
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
        if(ids==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if(title==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
	        ZMasterNotice b=new ZMasterNotice();
	        b.setRecive(","+ids+",");
	        b.setTitle(title);
	        b.setUserId(user_id);
	        b.save();
	        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
	        {
	            for (int i = 0; i < c_images.length;i++)
	            {
	                new ZContextPath(b.getId(),c_images[i],c_contexts[i], GlobalStatic.c_master_notice).save();
	            }

	        }
	        renderJson("{\"data\":\"SUCCESS\"}");
        }
        }
    }
	
    @Before({POST.class})
    public void masterNotice()
    {
        int info_id = getParaToInt("info_id");
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Record record = Db.findFirst("select * from z_master_notice " +
                "where id = " + info_id);
        if (record != null)
        {
        	String aa=new String("");
    		String bb=new String("");
    		for(Object a:Db.query("select img_path from z_context_path where status=1 and info_id = "+ info_id + " and info_type = " + GlobalStatic.c_master_notice)){
    			aa=aa+a+",";
    		}
    		for(Object b:Db.query("select content from z_context_path where status=1 and info_id = "+ info_id + " and info_type = " + GlobalStatic.c_master_notice)){
    			bb=bb+b+",";
    		}
    		record.set("c_image",aa);//正文 
    		record.set("c_context",bb);//正文 
            renderJson(record);
        }
        else
        {
            renderJson("{\"data\":\"ERROR\"}");
        }
    }
    
    
    @Before({POST.class})
    public void masterNoticeList()
    {
    	int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        StringBuilder sbs = new StringBuilder("select s.title,s.id");
        StringBuilder sb = new StringBuilder(" from z_master_notice s where recive like '%,"+user_id+",%'");
        sb.append(" order by s.id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                record.set("content", Db.queryStr("select top 1 content from z_context_path where info_id = " + record.get("id") + " and info_type = 11 order by id desc"));
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
    
    @Before({POST.class})
    public void myMasterNoticeList()
    {
    	int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        StringBuilder sbs = new StringBuilder("select s.title,s.id");
        StringBuilder sb = new StringBuilder(" from z_master_notice s where user_id="+user_id);
        sb.append(" order by s.id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                record.set("content", Db.queryStr("select top 1 content from z_context_path where info_id = " + record.get("id") + " and info_type = 1 order by id desc"));
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
    
}
