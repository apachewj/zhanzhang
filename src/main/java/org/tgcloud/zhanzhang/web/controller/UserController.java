package org.tgcloud.zhanzhang.web.controller;

import com.alibaba.fastjson.support.odps.udf.CodecCheck.A;
import com.google.common.base.Strings;
import com.google.common.collect.Maps;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.jfinal.upload.UploadFile;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.ResultMessage;
import org.tgcloud.zhanzhang.entity.*;
import org.tgcloud.zhanzhang.service.CommonService;
import org.tgcloud.zhanzhang.service.OrderService;
import org.tgcloud.zhanzhang.service.UserService;
import org.tgcloud.zhanzhang.web.validator.*;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/1/4 0004.
 */
public class UserController extends BaseController {

    private UserService userService = Enhancer.enhance(UserService.class);

    private CommonService commonService = Enhancer.enhance(CommonService.class);

    private OrderService orderService = Enhancer.enhance(OrderService.class);
    /**
     * 车生活个人中心
     */
    public void index() {
        redirect("/user/car_center");
    }

    public void car_center()
    {
        render("user_center.html");
    }
    
    @Before({Tx.class, POST.class})
    public void PwChange()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
        String oldpassword = getPara("oldpassword",null);
        String password = getPara("password",null);
        
        if (Strings.isNullOrEmpty(oldpassword))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(password))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        	ZUser a=ZUser.dao.findFirst("select * from z_user where id="+user_id+" and password="+oldpassword);
        	if(a!=null){
	        a.setPassword(password);
	        a.update();
        	}
	        renderJson("{\"data\":\"SUCCESS\"}");
	        
        }
    /**
     * 房屋个人中心
     */
    public void house_center() {

        renderFreeMarker("/house_personal.html");
    }

    /*获取出租车记录*/
    @Before(GET.class)
    public void txtRecord()
    {
        int txt_id = getParaToInt("txt_id",GlobalStatic.int_no_data);
        if (txt_id == GlobalStatic.int_no_data)
        {
            renderJson("{\"data\":\"parameter miss\"}");
        }
        else
        {
            List<Record> list = Db.find("select t.create_time,u.username from car_want_txt t,car_user u where t.txt_id = " + txt_id + " and u.id = t.user_id order by t.id desc");
            checkResult(list,this);
        }

    }
    /**
     * 登出
     */
    @Before(GET.class)
    public void logout()
    {
        getSession().removeAttribute("flag");
        getSession().removeAttribute("user_id");
        redirect("/");
    }

    /*发布需求信息*/
    @Before(AddNeedsValidator.class)
    public void save_people_need()
    {
    	 String method = getRequest().getMethod();
         if (method.equals("POST"))
         {
             ZPeopleNeed needs = getModel(ZPeopleNeed.class,"ZPeopleNeed");
             int user_id = (int)getSession().getAttribute("user_id");
             int city_id = getParaToInt("ZPeopleNeed.city_id",GlobalStatic.int_no_data);
             int county_id = getParaToInt("ZPeopleNeed.county_id",GlobalStatic.int_no_data);
             int status = getParaToInt("ZPeopleNeed.status",GlobalStatic.int_no_data);
             String location_x=getPara("ZPeopleNeed.location_x",GlobalStatic.string_no_data);
             String location_Y=getPara("ZPeopleNeed.location_y",GlobalStatic.string_no_data);
             String imgss=getPara("imgs",GlobalStatic.string_no_data);
             String[] imgs=imgss.split(",");
             needs.set("status", (short)status);
             needs.set("user_id",user_id);
             needs.set("create_time",new Date(System.currentTimeMillis()));
             needs.set("city_id",city_id);
             needs.set("county_id",county_id);
             needs.set("location_x",location_x);
             needs.set("location_y",location_Y);
             needs.save();
             int id=needs.getId();
             for(int i=0;i<imgs.length;i++){
             new ZImgPath()
             				.set("info_id", id)
             				.set("info_type", GlobalStatic.people_need)
             				.set("img_path", imgs[i])
             				.set("status", GlobalStatic.enabled)
             				.set("create_time",new Date(System.currentTimeMillis())).save();
             }
             renderJson("{\"data\":\"SUCCESS\"}");
         }
         else
         {
             render("user_add_buy.html");
         };

    }
    
    /*发布服务信息*/
    @Before(AddServiceValidator.class)
    public void save_people_service()
    {
    	 String method = getRequest().getMethod();
         if (method.equals("POST"))
         {
             ZPeopleService needs = getModel(ZPeopleService.class,"ZPeopleService");
             int user_id = (int)getSession().getAttribute("user_id");
             int city_id = getParaToInt("ZPeopleService.city_id",GlobalStatic.int_no_data);
             int county_id = getParaToInt("ZPeopleService.county_id",GlobalStatic.int_no_data);
             int status = getParaToInt("ZPeopleService.status",GlobalStatic.int_no_data);
             String location_x=getPara("ZPeopleService.location_x",GlobalStatic.string_no_data);
             String location_Y=getPara("ZPeopleService.location_y",GlobalStatic.string_no_data);
             String imgss=getPara("imgs",GlobalStatic.string_no_data);
             String[] imgs=imgss.split(",");
             needs.set("status", (short)status);
             needs.set("user_id",user_id);
             needs.set("create_time",new Date(System.currentTimeMillis()));
             needs.set("city_id",city_id);
             needs.set("county_id",county_id);
             needs.set("location_x",location_x);
             needs.set("location_y",location_Y);
             needs.save();
             int id=needs.getId();
             for(int i=0;i<imgs.length;i++){
             new ZImgPath()
             				.set("info_id", id)
             				.set("info_type", GlobalStatic.people_service)
             				.set("img_path", imgs[i])
             				.set("status", GlobalStatic.enabled)
             				.set("create_time",new Date(System.currentTimeMillis())).save();
             }
             renderJson("{\"data\":\"SUCCESS\"}");
         }
         else
         {
             render("user_add_buy.html");
         };

    }

    /*发布需求信息*/
    @Before(POST.class)
    public void upload_people_need()
    {
    	 String method = getRequest().getMethod();
         if (method.equals("POST"))
         {
             int user_id = (int)getSession().getAttribute("user_id");
             int id = getParaToInt("ZPeopleNeed.id",GlobalStatic.int_no_data);
             ZPeopleNeed needs =ZPeopleNeed.dao.findById(id);
             String  title=getPara("ZPeopleNeed.title",GlobalStatic.string_no_data);
             int  money=getParaToInt("ZPeopleNeed.money",GlobalStatic.int_no_data);
             String  unit=getPara("ZPeopleNeed.unit",GlobalStatic.string_no_data);
             int  type=getParaToInt("ZPeopleNeed.type",GlobalStatic.int_no_data);
             String  content=getPara("ZPeopleNeed.content",GlobalStatic.string_no_data);
             String  linkman=getPara("ZPeopleNeed.linkman",GlobalStatic.string_no_data);
             String  telephone=getPara("ZPeopleNeed.telephone",GlobalStatic.string_no_data);
             int city_id = getParaToInt("ZPeopleNeed.city_id",GlobalStatic.int_no_data);
             int county_id = getParaToInt("ZPeopleNeed.county_id",GlobalStatic.int_no_data);
             int status = getParaToInt("ZPeopleNeed.status",GlobalStatic.int_no_data);
             String location_x=getPara("ZPeopleNeed.location_x",GlobalStatic.string_no_data);
             String location_Y=getPara("ZPeopleNeed.location_y",GlobalStatic.string_no_data);
             String imgss=getPara("imgs",GlobalStatic.string_no_data);
             String[] imgs=imgss.split(",");
             if(title!=null){
            	 needs.set("title",title);
             }
             if(money!=0){
            	 needs.set("money",money);
             }
             if(unit!=null){
            	 needs.set("unit",unit);
             }
             if(type!=0){
            	 needs.set("type",type);
             }
             if(content!=null){
            	 needs.set("content",content);
             }
             if(linkman!=null){
            	 needs.set("linkman",linkman);
             }
             if(telephone!=null){
            	 needs.set("telephone",telephone);
             }
             if(city_id!=0){
            	 needs.set("city_id",city_id);
             }
             if(county_id!=0){
            	 needs.set("county_id",county_id);
             }
             if(location_x!=null){
            	 needs.set("location_x",location_x);
             }
             if(location_Y!=null){
            	 needs.set("location_y",location_Y);
             }
             if(status!=0){
            	 needs.set("status",(short)status);
             }
             needs.update();
             if(imgs!=null&&imgs.length>0){
            	 for(ZImgPath a:ZImgPath.dao.find("select * from z_img_path where  info_id="+id+" and info_type="+GlobalStatic.people_need)){
            		 a.delete();
            	 }
	             for(int i=0;i<imgs.length;i++){
	             new ZImgPath()
	             				.set("info_id", id)
	             				.set("info_type", GlobalStatic.people_need)
	             				.set("img_path", imgs[i])
	             				.set("status", GlobalStatic.enabled)
	             				.set("create_time",new Date(System.currentTimeMillis())).save();
	             }
             }
             renderJson("{\"data\":\"SUCCESS\"}");
         }
         else
         {
             render("user_add_buy.html");
         };

    }
    
    /*发布服务信息*/
    @Before(POST.class)
    public void upload_people_service()
    {
    	 String method = getRequest().getMethod();
         if (method.equals("POST"))
         {
        	 int user_id = (int)getSession().getAttribute("user_id");
             int id = getParaToInt("ZPeopleService.id",GlobalStatic.int_no_data);
             ZPeopleService needs =ZPeopleService.dao.findById(id);
             String  title=getPara("ZPeopleService.title",GlobalStatic.string_no_data);
             int  money=getParaToInt("ZPeopleService.money",GlobalStatic.int_no_data);
             String  unit=getPara("ZPeopleService.unit",GlobalStatic.string_no_data);
             int  type=getParaToInt("ZPeopleService.type",GlobalStatic.int_no_data);
             String  content=getPara("ZPeopleService.content",GlobalStatic.string_no_data);
             String  linkman=getPara("ZPeopleService.linkman",GlobalStatic.string_no_data);
             String  telephone=getPara("ZPeopleService.telephone",GlobalStatic.string_no_data);
             int city_id = getParaToInt("ZPeopleService.city_id",GlobalStatic.int_no_data);
             int county_id = getParaToInt("ZPeopleService.county_id",GlobalStatic.int_no_data);
             int status = getParaToInt("ZPeopleService.status",GlobalStatic.int_no_data);
             String location_x=getPara("ZPeopleService.location_x",GlobalStatic.string_no_data);
             String location_Y=getPara("ZPeopleService.location_y",GlobalStatic.string_no_data);
             String imgss=getPara("imgs",GlobalStatic.string_no_data);
             String[] imgs=imgss.split(",");
             if(title!=null){
            	 needs.set("title",title);
             }
             if(money!=0){
            	 needs.set("money",money);
             }
             if(unit!=null){
            	 needs.set("unit",unit);
             }
             if(type!=0){
            	 needs.set("type",type);
             }
             if(content!=null){
            	 needs.set("content",content);
             }
             if(linkman!=null){
            	 needs.set("linkman",linkman);
             }
             if(telephone!=null){
            	 needs.set("telephone",telephone);
             }
             if(city_id!=0){
            	 needs.set("city_id",city_id);
             }
             if(county_id!=0){
            	 needs.set("county_id",county_id);
             }
             if(location_x!=null){
            	 needs.set("location_x",location_x);
             }
             if(location_Y!=null){
            	 needs.set("location_y",location_Y);
             }
             if(status!=0){
            	 needs.set("status",(short)status);
             }
             needs.update();
             if(imgs!=null&&imgs.length>0){
            	 for(ZImgPath a:ZImgPath.dao.find("select * from z_img_path where  info_id="+id+" and info_type="+GlobalStatic.people_service)){
            		 a.delete();
            	 }
	             for(int i=0;i<imgs.length;i++){
	             new ZImgPath()
	             				.set("info_id", id)
	             				.set("info_type", GlobalStatic.people_service)
	             				.set("img_path", imgs[i])
	             				.set("status", GlobalStatic.enabled)
	             				.set("create_time",new Date(System.currentTimeMillis())).save();
	             }
             }
             renderJson("{\"data\":\"SUCCESS\"}");
         }
         else
         {
             render("user_add_buy.html");
         };

    }
    
    /**
     * 删除文件
     */
    @Before(POST.class)
    public void deleteFile()
    {
    	
    	ZImgPath img=new ZImgPath().findById(getParaToInt("img_id"));
    	if(img!=null){
    		new ZImgPath().deleteById(getParaToInt("img_id"));
    		 renderJson("{\"data\":\"SUCCESS\"}");
    	}else{
    	renderJson("{\"data\":\"ERROR\"}");
    	}
    }
    
    /**
     * 添加文件
     */
    @Before(POST.class)
    public void uploadFile()
    { 	
    	int id = getParaToInt("id",GlobalStatic.int_no_data);
    	int type = getParaToInt("id",GlobalStatic.int_no_data);
    	if(id>0&&type>0){
	    	 UploadFile file = getFile("up_file");
	         Map<String,String> params = Maps.newHashMap();
	         params.put("data",GlobalStatic.base_url + "/upload/" + file.getFileName());
	         new ZImgPath()
				.set("info_id", id)
				.set("info_type", type)
				.set("img_path", GlobalStatic.base_url + "/upload/" + file.getFileName())
				.set("status", GlobalStatic.enabled)
				.set("create_time",new Date(System.currentTimeMillis())).save();
         	renderJson(params);
    	}else{
        	renderJson("{\"data\":\"ERROR\"}");
        	}
    }
    
    /**
     * 获取查询的列表数据
     */
    @Before(GET.class)
    public void people_need_list() throws UnsupportedEncodingException {
        /*pageSize,pageNum,info_type（找车找货）,出发时间（日）start_time，start_l起点,end_l终点*/
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("pageSize",10);//一页显示数量
        Integer city_id = getParaToInt("city_id",null);
        Integer county = getParaToInt("county_id",null);
        int type = getParaToInt("type",GlobalStatic.int_no_data);
        String searchname = getPara("searchname",GlobalStatic.string_no_data);
        int types=getParaToInt("types",GlobalStatic.int_no_data);
        StringBuilder sb = new StringBuilder();
        StringBuilder sbs = new StringBuilder("select id,title,money,unit,location_x,location_y,substring(CONVERT (varchar(100),create_time, 120),0,14) as create_time");
        if(types==1){
        	sb.append(" from z_people_need where status=1 ");
        }else{
        	sb.append(" from z_people_service where status=1 ");
        }
        if(searchname!=null){
        	sb.append(" and title like '%" + searchname + "%'");
        }
        if(type!=0){
        	sb.append(" and type =" + type);
        }
        if (city_id != null) {
            sb.append(" and city_id=" + city_id);
        }
        if (county != null) {
            sb.append(" and county_id=" + county);
        }
        sb.append(" order by id desc");
        if(types==1){
        	Page<ZPeopleNeed> info = ZPeopleNeed.dao.paginate(pageNum,pageSize,sbs.toString(),sb.toString());
        	List<Map> need=new ArrayList();
        	if(info.getList().size()>0){
	        	for(ZPeopleNeed a:info.getList()){
	        		Map aa=a.toRecord().getColumns();
	        		String img=Db.queryFirst("select img_path from z_img_path where status=1 and info_id="+a.getId()+" and info_type="+GlobalStatic.people_need);
	        		aa.put("img", img);
	        		need.add(aa);
	        	}
        	}
        	checkResult(need,this,info.getTotalPage());
        }else{
        	Page<ZPeopleService> info = ZPeopleService.dao.paginate(pageNum,pageSize,sbs.toString(),sb.toString());
        	List<Map> service=new ArrayList();
        	if(info.getList().size()>0){
	        	for(ZPeopleService a:info.getList()){
	        		Map aa=a.toRecord().getColumns();
	        		String img=Db.queryFirst("select img_path from z_img_path where status=1 and info_id="+a.getId()+" and info_type="+GlobalStatic.people_service);
	        		aa.put("img", img);
	        		service.add(aa);
	        	}
        	}
        	checkResult(service,this,info.getTotalPage());
        }   
    }
    
    /**
     * 获取便民需求详情数据
     */
    @Before(POST.class)
    public void people_need_detail() {
        /*pageSize,pageNum,info_type（找车找货）,出发时间（日）start_time，start_l起点,end_l终点*/
    	String id_code = getPara("id",null);
        if (id_code == null)
        {
            renderJson("{\"data\":\"error\"}");
        }
        else
        {
            Record record =Db.findFirst("select * from z_people_need where id = ?",id_code);
            if (record != null)
            {
            	record.set("contexts",Db.find("select id as img_id,img_path from z_img_path where info_id = ? and info_type=?",id_code,GlobalStatic.people_need));
                
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
            
            else
            {
                renderJson("{\"data\":\"not exist\"}");
            }
        }
    }
    
    /**
     * 获取便民服务详情数据
     */
    @Before(POST.class)
    public void people_service_detail() {
        /*pageSize,pageNum,info_type（找车找货）,出发时间（日）start_time，start_l起点,end_l终点*/
    	String id_code = getPara("id",null);
        if (id_code == null)
        {
            renderJson("{\"data\":\"error\"}");
        }
        else
        {
            Record record =Db.findFirst("select * from z_people_service where id = ?",id_code);
            if (record != null)
            {
            	record.set("contexts",Db.find("select id as img_id,img_path from z_img_path where info_id = ? and info_type=?",id_code,GlobalStatic.people_service));
                
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
            else
            {
                renderJson("{\"data\":\"not exist\"}");
            }
        }
    }


    /*点赞-取消点赞*/
    /*info_type:1-景区，2-陪游，3-。。*/
    @Before(POST.class)
    public void praise()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int info_id = getParaToInt("info_id");
        int info_type = getParaToInt("info_type");
        ZPraiseInfo record = ZPraiseInfo.dao.findFirst("select * from z_praise_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
            new ZPraiseInfo(user_id,info_id,info_type).save();
            renderJson("{\"praise\":\"1\"}");
        }
        else
        {
            record.delete();
            renderJson("{\"praise\":\"2\"}");
        }
    }
    /*举报-取消举报*/
    /*info_type:1-景区，2-陪游，3-继续补充*/
    @Before(POST.class)
    public void showpraise()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int info_id = getParaToInt("info_id");
        int info_type = getParaToInt("info_type");
        ZPraiseInfo record = ZPraiseInfo.dao.findFirst("select * from z_praise_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
        	renderJson("{\"praise\":\"2\"}");
        }
        else
        {
        	renderJson("{\"praise\":\"1\"}");
        }
    }
    /*收藏-取消收藏*/
    /*info_type:1-景区，2-陪游，3-继续补充*/
    @Before(POST.class)
    public void store()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int info_id = getParaToInt("info_id");
        int info_type = getParaToInt("info_type");
        ZStoreInfo record = ZStoreInfo.dao.findFirst("select * from z_store_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
            new ZStoreInfo(user_id,info_id,info_type).save();
            renderJson("{\"store\":\"1\"}");
        }
        else
        {
            record.delete();
            renderJson("{\"store\":\"2\"}");
        }
    }

    @Before(POST.class)
    public void showstore()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int info_id = getParaToInt("info_id");
        int info_type = getParaToInt("info_type");
        ZStoreInfo record = ZStoreInfo.dao.findFirst("select * from z_store_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
        	renderJson("{\"store\":\"2\"}");
        }
        else
        {
        	renderJson("{\"store\":\"1\"}");
        }
        
    }
    
    
    /*举报-取消举报*/
    /*info_type:1-景区，2-陪游，3-继续补充*/
    @Before(POST.class)
    public void report()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int info_id = getParaToInt("info_id");
        int info_type = getParaToInt("info_type");
        ZReportInfo record = ZReportInfo.dao.findFirst("select * from z_report_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
            new ZReportInfo(user_id,info_id,info_type).save();
            renderJson("{\"report\":\"1\"}");
        }
        else
        {
            record.delete();
            renderJson("{\"report\":\"2\"}");
        }
        
    }
    
    /*举报-取消举报*/
    /*info_type:1-景区，2-陪游，3-继续补充*/
    @Before(POST.class)
    public void showreport()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int info_id = getParaToInt("info_id");
        int info_type = getParaToInt("info_type");
        ZReportInfo record = ZReportInfo.dao.findFirst("select * from z_report_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
        	renderJson("{\"report\":\"2\"}");
        }
        else
        {
        	renderJson("{\"report\":\"1\"}");
        }
    }
    
    @Before(POST.class)
    public void click()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int info_id = getParaToInt("info_id");
        int info_type = getParaToInt("info_type");
        commonService.doClickOrNotInfo(user_id,info_id,info_type);
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void store_List()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer type = getParaToInt("types",0);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder("");
        if(type==1){
        	sbs.append("SELECT a.*,c.id as storeid,b.content as content,1 AS types,c.create_time as storetime");
        			sb.append(" FROM z_travel_scenic a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_scenic+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==2){
        	sbs.append("SELECT a.*,c.id as storeid,2 AS types,b.img_path as img_path,c.create_time as storetime");
			sb.append(" FROM z_travel_guide a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_context_path"+
                  " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_guide+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append("order by c.create_time desc");
	    }
        if(type==3){
        	sbs.append("SELECT a.*,c.id as storeid,3 AS types,b.img_path,c.create_time as storetime");
			sb.append(" FROM z_people_service a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_service+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==4){
        	sbs.append(" SELECT a.*,c.id as storeid,4 AS types,b.img_path,c.create_time as storetime");
			sb.append(" FROM z_people_need a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_need+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==5){
        	sbs.append(" SELECT a.*,c.id as storeid,5 AS types,c.create_time as storetime");
			sb.append(" FROM z_marry a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==6){
        	sbs.append(" SELECT a.*,c.id as storeid,6 AS types,c.create_time as storetime");
			sb.append(" FROM z_findwork a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==7){
        	sbs.append(" SELECT a.*,c.id as storeid,7 AS types,c.create_time as storetime");
			sb.append(" FROM z_findworker a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==8){
        	sbs.append(" SELECT a.*,c.id as storeid,8 AS types,c.create_time as storetime");
			sb.append(" FROM z_agriculture a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==9){
        	sbs.append(" SELECT a.*,c.id as storeid,b.content,9 AS types,c.create_time as storetime");
			sb.append(" FROM z_crowd a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==10){
        	sbs.append(" SELECT a.*,c.id as storeid,10 AS types,c.create_time as storetime");
			sb.append(" FROM z_company a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==11){
        	sbs.append("SELECT a.*,c.id as storeid,b.content as content,11 AS types,b.img as img_path,c.create_time as storetime");
			sb.append(" FROM z_product a"+
        			" LEFT JOIN (SELECT info_id, info_type,Max(img_path) as img,Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_product+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==12){
        	sbs.append("SELECT a.*,c.id as storeid,b.content as content,12 AS types,d.wartchs,c.create_time as storetime");
			sb.append(" FROM z_notice_tongzhi a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_tongzhi+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==13){
        	sbs.append("SELECT a.*,c.id as storeid,b.content as content,13 AS types,d.wartchs,c.create_time as storetime");
			sb.append(" FROM z_notice_baoming a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_baoming+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==14){
        	sbs.append("SELECT a.*,c.id as storeid,b.content as content,14 AS types,d.wartchs,c.create_time as storetime");
			sb.append(" FROM z_notice_fankui a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_fankui+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==15){
        	sbs.append("SELECT a.*,c.id as storeid,b.content as content,15 AS types,d.wartchs,c.create_time as storetime");
			sb.append(" FROM z_notice_qiuzheng a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_qiuzheng+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==16){
        	sbs.append("SELECT a.*,c.id as storeid,b.content as content,16 AS types,d.wartchs,c.create_time as storetime");
			sb.append(" FROM z_notice_zhengqiu a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_zhengqiu+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_store_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
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
            	if(type==9){
            		Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_crowd + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                    Record record2 = Db.findFirst("select sum(money) as have from z_crowd_donate where crowd_id = " + record.get("id") + " and status=1");
                    if(record2 != null)
                    {
                        record.setColumns(record2);
                    }
            	}
            	if(type==13){
                	record.set("havenum",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and baoming_id="+record.getInt("id")));
                	record.set("haveman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=1 and baoming_id="+record.getInt("id")));
                	record.set("havewoman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=2 and baoming_id="+record.getInt("id")));
                	}
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
    
    @Before(POST.class)
    public void Store_Delete()
    {
		Integer storeid = getParaToInt("storeid",null);
        if(storeid==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
       }
            ZStoreInfo.dao.deleteById(storeid);
            renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before(POST.class)
    public void Store_Delete_All()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        for(Record a:Db.find("select * from z_store_info where user_id="+user_id)){
            Db.delete("z_store_info", a);
        }
            renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void click_List()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer type = getParaToInt("types",0);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sbs = new StringBuilder("");
        StringBuilder sb = new StringBuilder("");
        if(type==1){
        	sbs.append("SELECT a.*,c.id as clickid,b.content as content,1 AS types,c.create_time as clicktime");
			sb.append(" FROM z_travel_scenic a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_scenic+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==2){
        	sbs.append("SELECT a.*,c.id as clickid,2 AS types,b.img_path as img_path,c.create_time as clicktime");
			sb.append(" FROM z_travel_guide a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_context_path"+
                  " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_guide+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append("order by c.create_time desc");
	    }
        if(type==3){
        	sbs.append("SELECT a.*,c.id as clickid,3 AS types,b.img_path,c.create_time as clicktime");
			sb.append(" FROM z_people_service a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_service+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==4){
        	sbs.append(" SELECT a.*,c.id as clickid,4 AS types,b.img_path,c.create_time as clicktime");
			sb.append(" FROM z_people_need a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_need+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==5){
        	sbs.append(" SELECT a.*,c.id as clickid,5 AS types,c.create_time as clicktime");
			sb.append(" FROM z_marry a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==6){
        	sbs.append(" SELECT a.*,c.id as clickid,6 AS types,c.create_time as clicktime");
			sb.append(" FROM z_findwork a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==7){
        	sbs.append(" SELECT a.*,c.id as clickid,7 AS types,c.create_time as clicktime");
			sb.append(" FROM z_findworker a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==8){
        	sbs.append(" SELECT a.*,c.id as clickid,8 AS types,c.create_time as clicktime");
			sb.append(" FROM z_agriculture a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==9){
        	sbs.append(" SELECT a.*,c.id as clickid,b.content,9 AS types,c.create_time as clicktime");
			sb.append(" FROM z_crowd a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==10){
        	sbs.append(" SELECT a.*,c.id as clickid,10 AS types,c.create_time as clicktime");
			sb.append(" FROM z_company a"+
        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==11){
        	sbs.append("SELECT a.*,c.id as clickid,b.content as content,11 AS types,b.img as img_path,c.create_time as clicktime");
			sb.append(" FROM z_product a"+
        			" LEFT JOIN (SELECT info_id, info_type,Max(img_path) as img,Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_product+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==12){
        	sbs.append("SELECT a.*,c.id as clickid,b.content as content,12 AS types,c.create_time as clicktime");
			sb.append(" FROM z_notice_tongzhi a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_tongzhi+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==13){
        	sbs.append("SELECT a.*,c.id as clickid,b.content as content,13 AS types,c.create_time as clicktime");
			sb.append(" FROM z_notice_baoming a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_baoming+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==14){
        	sbs.append("SELECT a.*,c.id as clickid,b.content as content,14 AS types,c.create_time as clicktime");
			sb.append(" FROM z_notice_fankui a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_fankui+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==15){
        	sbs.append("SELECT a.*,c.id as clickid,b.content as content,15 AS types,c.create_time as clicktime");
			sb.append(" FROM z_notice_qiuzheng a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_qiuzheng+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
        if(type==16){
        	sbs.append("SELECT a.*,c.id as clickid,b.content as content,16 AS types,c.create_time as clicktime");
			sb.append(" FROM z_notice_zhengqiu a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_zhengqiu+
                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where status=1 and user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
					" WHERE 1=1 AND a.status = 1 and c.info_id>0");
	        sb.append(" order by c.create_time desc");
	    }
//        if(type==1){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,b.content as content,a.create_time AS createtime,a.user_id,1 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_travel_scenic a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_scenic+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==2){
//        	sb.append("SELECT a.id,c.id as storeid,a.username+' '+convert(varchar(20),a.price)+'元  '+convert(varchar(20),a.hours)+'小时/天' as title,a.places as content,a.create_time AS createtime,a.user_id,2 AS type,b.img_path as img_path,c.create_time as reporttime"+
//        			" FROM z_travel_guide a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
//                    " FROM z_context_path"+
//                  " WHERE status = 1"+
//                  " GROUP BY info_id, info_type) b"+
//                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_guide+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append("order by c.create_time desc");
//	    }
//        if(type==3){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,a.content,a.create_time AS createtime,a.user_id,3 AS type,b.img_path,c.create_time as reporttime"+
//        			" FROM z_people_service a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
//                    " FROM z_img_path"+
//                   " WHERE status = 1"+
//                  " GROUP BY info_id, info_type) b"+
//                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_service+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==4){
//        	sb.append(" SELECT a.id,c.id as storeid,a.title,a.content,a.create_time AS createtime,a.user_id,4 AS type,b.img_path,c.create_time as reporttime"+
//        			" FROM z_people_need a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
//                    " FROM z_img_path"+
//                   " WHERE status = 1"+
//                  " GROUP BY info_id, info_type) b"+
//                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_need+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==5){
//        	sb.append(" SELECT a.id,c.id as storeid,a.nickname as title,a.requirements as content,a.create_time AS createtime,a.user_id,5 AS type,a.imgs as img_path,c.create_time as reporttime"+
//        			" FROM z_marry a"+
//        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==6){
//        	sb.append(" SELECT a.id,c.id as storeid,a.title,a.name as content,a.create_time AS createtime,a.user_id,6 AS type,a.img as img_path,c.create_time as reporttime"+
//        			" FROM z_findwork a"+
//        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==7){
//        	sb.append(" SELECT a.id,c.id as storeid,a.title,a.companyname as content,a.create_time AS createtime,a.user_id,7 AS type,a.imgs as img_path,c.create_time as reporttime"+
//        			" FROM z_findworker a"+
//        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==8){
//        	sb.append(" SELECT a.id,c.id as storeid,a.title,a.content,a.create_time AS createtime,a.user_id,8 AS type,a.imgs as img_path,c.create_time as reporttime"+
//        			" FROM z_agriculture a"+
//        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==9){
//        	sb.append(" SELECT a.id,c.id as storeid,a.title,b.content,a.create_time AS createtime,a.user_id,9 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_crowd a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==10){
//        	sb.append(" SELECT a.id,c.id as storeid,a.com_name as title,a.message as content,a.create_time AS createtime,a.user_id,10 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_company a"+
//        			" right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==11){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,b.content as content,a.createtime AS createtime,'' as user_id,11 AS type,b.img as img_path,c.create_time as reporttime"+
//        			" FROM z_product a"+
//        			" LEFT JOIN (SELECT info_id, info_type,Max(img_path) as img,Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_product+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==12){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,b.content as content,a.create_time AS createtime,a.user_id,12 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_notice_tongzhi a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_tongzhi+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==13){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,b.content as content,a.create_time AS createtime,a.user_id,13 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_notice_baoming a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_baoming+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==14){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,b.content as content,a.create_time AS createtime,a.user_id,14 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_notice_fankui a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_fankui+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==15){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,b.content as content,a.create_time AS createtime,a.user_id,15 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_notice_qiuzheng a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_qiuzheng+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
//        if(type==16){
//        	sb.append("SELECT a.id,c.id as storeid,a.title,b.content as content,a.create_time AS createtime,a.user_id,16 AS type,a.main_img as img_path,c.create_time as reporttime"+
//        			" FROM z_notice_zhengqiu a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_zhengqiu+
//                  " right JOIN (select id,info_id,info_type,user_id,create_time  from z_userclick_info where user_id="+user_id+" ) c on a.id = c.info_id AND c.info_type ="+type+
//        			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
//	        sb.append(" order by c.create_time desc");
//	    }
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
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
            	if(type==9){
            		Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_crowd + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                    Record record2 = Db.findFirst("select sum(money) as have from z_crowd_donate where crowd_id = " + record.get("id") + " and status=1");
                    if(record2 != null)
                    {
                        record.setColumns(record2);
                    }
            	}
            	if(type==13){
                	record.set("havenum",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and baoming_id="+record.getInt("id")));
                	record.set("haveman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=1 and baoming_id="+record.getInt("id")));
                	record.set("havewoman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=2 and baoming_id="+record.getInt("id")));
                	}
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
    
    @Before(POST.class)
    public void Click_Delete()
    {
		Integer storeid = getParaToInt("clickid",null);
        if(storeid==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
       }
        ZUserclickInfo a=ZUserclickInfo.dao.findById(storeid);
        a.delete();
            renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before(POST.class)
    public void Click_Delete_All()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        for(ZUserclickInfo a:ZUserclickInfo.dao.find("select * from z_userclick_info where user_id="+user_id)){
        	a.delete();
        }
            renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void My_List()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer type = getParaToInt("types",0);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder("");
//        if(type==1){
//        	sb.append("SELECT a.id,a.title,b.content as content,a.create_time AS createtime,a.user_id,1 AS type,a.main_img as img_path"+
//        			" FROM z_travel_scenic a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_scenic+
//        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==2){
//        	sb.append("SELECT a.id,a.username+' '+convert(varchar(20),a.price)+'元  '+convert(varchar(20),a.hours)+'小时/天' as title,a.places as content,a.create_time AS createtime,a.user_id,2 AS type,b.img_path as img_path"+
//        			" FROM z_travel_guide a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
//                    " FROM z_context_path"+
//                  " WHERE status = 1"+
//                  " GROUP BY info_id, info_type) b"+
//                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_guide+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append("order by a.create_time desc");
//	    }
//        if(type==3){
//        	sb.append("SELECT a.id,a.title,a.content,a.create_time AS createtime,a.user_id,3 AS type,b.img_path"+
//        			" FROM z_people_service a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
//                    " FROM z_img_path"+
//                   " WHERE status = 1"+
//                  " GROUP BY info_id, info_type) b"+
//                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_service+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==4){
//        	sb.append(" SELECT a.id,a.title,a.content,a.create_time AS createtime,a.user_id,4 AS type,b.img_path"+
//        			" FROM z_people_need a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
//                    " FROM z_img_path"+
//                   " WHERE status = 1"+
//                  " GROUP BY info_id, info_type) b"+
//                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_need+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==5){
//        	sb.append(" SELECT a.id,a.nickname as title,a.requirements as content,a.create_time AS createtime,a.user_id,5 AS type,a.imgs as img_path"+
//        			" FROM z_marry a"+
//        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.createtime desc");
//	    }
//        if(type==6){
//        	sb.append(" SELECT a.id,a.title,a.name+' '+a.income+' '+a.degrees as content,a.create_time AS createtime,a.user_id,6 AS type,a.img as img_path"+
//        			" FROM z_findwork a"+
//        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.createtime desc");
//	    }
//        if(type==7){
//        	sb.append(" SELECT a.id,a.title,a.name+' '+a.income+' '+a.nums+'人' as content,a.create_time AS createtime,a.user_id,7 AS type,a.imgs as img_path"+
//        			" FROM z_findworker a"+
//        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.createtime desc");
//	    }
//        if(type==8){
//        	sb.append(" SELECT a.id,a.title,a.content,a.create_time AS createtime,a.user_id,8 AS type,a.imgs as img_path"+
//        			" FROM z_agriculture a"+
//        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==9){
//        	sb.append(" SELECT a.id,a.title,b.content,a.create_time AS createtime,a.user_id,9 AS type,a.main_img as img_path"+
//        			" FROM z_crowd a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==10){
//        	sb.append(" SELECT a.id,a.com_name as title,a.message as content,a.create_time AS createtime,a.user_id,10 AS type,a.main_img as img_path"+
//        			" FROM z_company a"+
//        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==11){
//        	sb.append("SELECT a.id,a.title,b.content as content,a.createtime AS createtime,'' as user_id,11 AS type,b.img as img_path"+
//        			" FROM z_product a"+
//        			" LEFT JOIN (SELECT info_id, info_type,Max(img_path) as img,Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_product+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.createtime desc");
//	    }
//        if(type==12){
//        	sb.append("SELECT a.id,a.title,b.content as content,a.create_time AS createtime,a.user_id,12 AS type,a.main_img as img_path"+
//        			" FROM z_notice_tongzhi a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_tongzhi+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==13){
//        	sb.append("SELECT a.id,a.title,b.content as content,a.create_time AS createtime,a.user_id,13 AS type,a.main_img as img_path"+
//        			" FROM z_notice_baoming a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_baoming+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==14){
//        	sb.append("SELECT a.id,a.title,b.content as content,a.create_time AS createtime,a.user_id,14 AS type,a.main_img as img_paths"+
//        			" FROM z_notice_fankui a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_fankui+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==15){
//        	sb.append("SELECT a.id,a.title,b.content as content,a.create_time AS createtime,a.user_id,15 AS type,a.main_img as img_path"+
//        			" FROM z_notice_qiuzheng a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_qiuzheng+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
//        if(type==16){
//        	sb.append("SELECT a.id,a.title,b.content as content,a.create_time AS createtime,a.user_id,16 AS type,a.main_img as img_path"+
//        			" FROM z_notice_zhengqiu a"+
//        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
//                    "FROM z_context_path "+
//                   "WHERE status = 1 "+
//                  "GROUP BY info_id, info_type) b "+
//                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_zhengqiu+
//                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
//	        sb.append(" order by a.create_time desc");
//	    }
        if(type==1){
        	sbs.append("SELECT a.*,b.content,1 AS types ");
			sb.append(" FROM z_travel_scenic a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_scenic+
        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==2){
        	sbs.append("SELECT a.*,b.img_path,2 AS types");
			sb.append(" FROM z_travel_guide a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_context_path"+
                  " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_guide+
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append("order by a.create_time desc");
	    }
        if(type==3){
        	sbs.append("SELECT a.*,b.img_path,3 AS types");
			sb.append(" FROM z_people_service a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_service+
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==4){
        	sbs.append(" SELECT a.*,b.img_path,4 AS types");
			sb.append(" FROM z_people_need a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_need+
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==5){
        	sbs.append(" SELECT a.*,5 AS types");
			sb.append(" FROM z_marry a"+
        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.createtime desc");
	    }
        if(type==6){
        	sbs.append(" SELECT a.*,6 AS types,b.province_id,b.city_id,b.county_id ");
			sb.append(" FROM z_findwork a"+
        			" left join z_findwork_place b on b.f_id=a.id "+
        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.createtime desc");
	    }
        if(type==7){
        	sbs.append(" SELECT a.*,7 AS types");
			sb.append(" FROM z_findworker a"+
        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.createtime desc");
	    }
        if(type==8){
        	sbs.append(" SELECT a.*,8 AS types");
			sb.append(" FROM z_agriculture a"+
        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==9){
        	sbs.append(" SELECT a.*,9 AS types,d.mans,DATEDIFF(day,getdate(),a.endtime) as leftday");
			sb.append(" FROM z_crowd a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
                  " left join (select count(user_id) as mans,crowd_id from z_crowd_donate group by crowd_id) d on a.id=d.crowd_id"+
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==10){
        	sbs.append(" SELECT a.*,10 AS types");
			sb.append(" FROM z_company a"+
        			" WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==11){
        	sbs.append("SELECT a.*,b.img as img_path,11 AS types");
			sb.append(" FROM z_product a"+
        			" LEFT JOIN (SELECT info_id, info_type,Max(img_path) as img,Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_product+
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.createtime desc");
	    }
        if(type==12){
        	sbs.append("SELECT a.*,b.content,12 AS types,d.wartchs");
			sb.append(" FROM z_notice_tongzhi a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_tongzhi+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==13){
        	sbs.append("SELECT a.*,b.content,13 AS types,d.wartchs");
			sb.append(" FROM z_notice_baoming a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_baoming+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+ 
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==14){
        	sbs.append("SELECT a.*,b.content,14 AS types,d.wartchs");
			sb.append(" FROM z_notice_fankui a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_fankui+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
                  
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==15){
        	sbs.append("SELECT a.*,b.content,15 AS types,d.wartchs");
			sb.append(" FROM z_notice_qiuzheng a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_qiuzheng+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
                  
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        if(type==16){
        	sbs.append("SELECT a.*,b.content,16 AS types,d.wartchs");
			sb.append(" FROM z_notice_zhengqiu a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_zhengqiu+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+type+" group by info_id,info_type) d on a.id=d.info_id "+
                  
                  " WHERE 1=1 AND a.status = 1 and a.user_id="+user_id);
	        sb.append(" order by a.create_time desc");
	    }
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
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
            	if(type==9){
            		Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_crowd + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                    Record record2 = Db.findFirst("select sum(money) as have from z_crowd_donate where crowd_id = " + record.get("id") + " and status=1");
                    if(record2 != null)
                    {
                        record.setColumns(record2);
                    }
            	}
            	if(type==13){
                	record.set("havenum",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and baoming_id="+record.getInt("id")));
                	record.set("haveman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=1 and baoming_id="+record.getInt("id")));
                	record.set("havewoman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=2 and baoming_id="+record.getInt("id")));
                	}
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
    @Before(POST.class)
    public void userinfo()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
        ZUser a=ZUser.dao.findById(user_id);
        renderJson(a);
    }
    @Before(POST.class)
    public void up_userinfo()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
        Integer sex = getParaToInt("sex",null);
        String  nickname=getPara("nickname",GlobalStatic.string_no_data);
        String  img=getPara("img",GlobalStatic.string_no_data);
        ZUser a=ZUser.dao.findById(user_id);
        if (!Strings.isNullOrEmpty(nickname))
        {
		a.setNickname(nickname);
        }
        if (!Strings.isNullOrEmpty(img))
        {
		a.setImg(img);
        }
        if (sex!=null)
        {
		a.setSex(sex);
        }
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    @Before(POST.class)
    public void up_useradrinfo()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
        String  getname=getPara("getname",GlobalStatic.string_no_data);
        String  gettel=getPara("gettel",GlobalStatic.string_no_data);
        String  getadr=getPara("getadr",GlobalStatic.string_no_data);
        String  getzipcode=getPara("getzipcode",GlobalStatic.string_no_data);
        ZUser a=ZUser.dao.findById(user_id);
        if (!Strings.isNullOrEmpty(getname))
        {
		a.setGetname(getname);
        }
        if (!Strings.isNullOrEmpty(gettel))
        {
		a.setGettel(gettel);
        }
        if (!Strings.isNullOrEmpty(getadr))
        {
		a.setGetadr(getadr);
        }
        if (!Strings.isNullOrEmpty(getzipcode))
        {
		a.setGetzipcode(getzipcode);
        }
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before(POST.class)
    public void addCards()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
    	String  cardtype=getPara("cardtype",GlobalStatic.string_no_data);
        String  card_id=getPara("card_id",GlobalStatic.string_no_data);
        String  bank=getPara("bank",GlobalStatic.string_no_data);
        String  ownername=getPara("ownername",GlobalStatic.string_no_data);
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String  bankname=getPara("bankname",GlobalStatic.string_no_data);
        String  cardstatus=getPara("cardstatus",GlobalStatic.string_no_data);
        String tel = getPara("tel",null);
        String code = getPara("code",null);
        String aaaa=userService.checkVerity(tel, code, 60);
        if(aaaa.equals("SUCCESS")){
        	renderJson(commonService.addcards(user_id,cardstatus, cardtype, card_id, bank, ownername, province_id, city_id, county_id, bankname));
        }else{
        	renderJson("{\"data\":\""+aaaa+"\"}");
        }
        }
    @Before(POST.class)
    public void deleteCards()
    {
        String  card_id=getPara("card_id",GlobalStatic.string_no_data);
        ZCards aa=ZCards.dao.findById(card_id);
        if(aa!=null){
        aa.delete();
        }else{
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        renderJson("{\"data\":\"SUCCESS\"}");
        }
    @Before(POST.class)
    public void chanCardsDefault()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
        Integer card_id = getParaToInt("card_id",null);
        for(ZCards b:ZCards.dao.find("select * from z_cards where user_id="+user_id)){
        	b.setIsdefault(0);
        	b.update();
        }
        ZCards a=ZCards.dao.findById(card_id);
        a.setIsdefault(1);
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before(POST.class)
    public void searchDefault()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
        Map<String,Object> ac=new HashMap();
        String hot=new String("");
        String his=new String("");
//        for(Object a:Db.query("select context from z_search_info")){
//        	if(a!=null){
//        	hot=hot+a.toString()+",";
//        	}
//        	
//        }
        
        for(Object b:Db.query("select context from z_search_info where user_id="+user_id)){
        	if(b!=null){
        	his=his+b.toString()+",";
        	}
        }
        ac.put("hotsearch", GlobalStatic.hotcontent);
        ac.put("hissearch", his);
        renderJson(ac);
    }
    @Before(POST.class)
    public void cardsList()
    {
    	int user_id = (int)getSession().getAttribute("user_id");
    	int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        Page<Record> info =Db.paginate(pageNum, pageSize,"select id, SUBSTRING(card_id,1,4)+' **** **** '+SUBSTRING(card_id,len(card_id)-3,len(card_id)) as card_id, bank, ownername, province_id, city_id, county_id, bankname, isdefault, status, createtime, user_id, cardtype,cardstatus","  from z_cards where user_id="+user_id);
    	checkResult(info.getList(),this,info.getTotalPage());
        
    }
    
    @Before({Tx.class, POST.class})
    public void MyDelete()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer type = getParaToInt("types",0);
        Integer id = getParaToInt("id",null);
        if(type==1){
        	ZTravelScenic a=ZTravelScenic.dao.findById(id);
        	a.setStatus(2);
        	a.update();
        }
        if(type==2){
        	ZTravelGuide a=ZTravelGuide.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==3){
        	ZPeopleService a=ZPeopleService.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==4){
        	ZPeopleNeed a=ZPeopleNeed.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==5){
        	ZMarry a=ZMarry.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==6){
        	ZFindwork a=ZFindwork.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==7){
        	ZFindworker a=ZFindworker.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==8){
        	ZAgriculture a=ZAgriculture.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==9){
        	ZCrowd a=ZCrowd.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==10){
        	ZCompany a=ZCompany.dao.findById(id);
        	a.setStatus(2);
        	a.update();
        }
        if(type==11){
        	ZProduct a=ZProduct.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==12){
        	ZNoticeTongzhi a=ZNoticeTongzhi.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==13){
        	ZNoticeBaoming a=ZNoticeBaoming.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==14){
        	ZNoticeFankui a=ZNoticeFankui.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==15){
        	ZNoticeQiuzheng a=ZNoticeQiuzheng.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        if(type==16){
        	ZNoticeZhengqiu a=ZNoticeZhengqiu.dao.findById(id);
        	a.setStatus(2);
        	a.update();
	    }
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    @Before({Tx.class, POST.class})
    public void MyReflash()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer type = getParaToInt("types",0);
        Integer id = getParaToInt("id",null);
        if(type==1){
        	ZTravelScenic a=ZTravelScenic.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
        }
        if(type==2){
        	ZTravelGuide a=ZTravelGuide.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==3){
        	ZPeopleService a=ZPeopleService.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==4){
        	ZPeopleNeed a=ZPeopleNeed.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==5){
        	ZMarry a=ZMarry.dao.findById(id);
        	a.setCreatetime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==6){
        	ZFindwork a=ZFindwork.dao.findById(id);
        	a.setCreatetime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==7){
        	ZFindworker a=ZFindworker.dao.findById(id);
        	a.setCreatetime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==8){
        	ZAgriculture a=ZAgriculture.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==9){
        	ZContextPath a=ZContextPath.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==10){
        	ZCompany a=ZCompany.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
        }
        if(type==11){
        	ZProduct a=ZProduct.dao.findById(id);
        	a.setCreatetime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==12){
        	ZNoticeTongzhi a=ZNoticeTongzhi.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==13){
        	ZNoticeBaoming a=ZNoticeBaoming.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==14){
        	ZNoticeFankui a=ZNoticeFankui.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==15){
        	ZNoticeQiuzheng a=ZNoticeQiuzheng.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        if(type==16){
        	ZNoticeZhengqiu a=ZNoticeZhengqiu.dao.findById(id);
        	a.setCreateTime(new java.sql.Date((new java.util.Date()).getTime()));
        	a.update();
	    }
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void qrcodeBackOrder() {
    	int user_id = (int)getSession().getAttribute("user_id");
    	String moneys = getPara("money",null);
    	BigDecimal money=new BigDecimal(moneys);
    	ZPay order = ZPay.dao.findFirst("select top 1 * from z_pay where in_id ="+user_id+" and money="+money+" order by id desc");
        renderJson("{\"data\":\""+orderService.doBackOrder(order.getOrderId(),order.getPayType())+"\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void moneyOut() {
    	int user_id = (int)getSession().getAttribute("user_id");
    	ZUser uu=ZUser.dao.findById(user_id);
    	String moneys = getPara("money",null);
    	BigDecimal money=new BigDecimal(moneys);
    	if(uu.getMoney().compareTo(money)<0){
    		renderJson("{\"data\":\"余额不足\"}");
    	}else{
    		uu.setMoney(uu.getMoney().subtract(money));
    		uu.update();
    		ZCards c=ZCards.dao.findFirst("select * from z_cards where isdefault=1 and user_id="+user_id);
    		if(c!=null&&c.getCardId()!=null){
    		ZMoneyOut a=new ZMoneyOut();
            a.setBank(c.getBank());
            a.setBankname(c.getBankname());
            a.setCardId(c.getCardId());
            a.setCardtype(c.getCardtype());
            a.setCityId(c.getCityId());
            a.setCountyId(c.getCountyId());
            a.setOwnername(c.getOwnername());
            a.setProvinceId(c.getProvinceId());
            a.setUserId(user_id);
            a.setMoney(money);
            a.save();
            renderJson("{\"data\":\"SUCCESS\"}");
    		}else{
    			renderJson("{\"data\":\"请先设置默认银行卡！\"}");
    		}
    	}
        //renderJson("{\"data\":\""+orderService.doBackOrder(order.getOrderId(),order.getPayType())+"\"}");
    }
}
