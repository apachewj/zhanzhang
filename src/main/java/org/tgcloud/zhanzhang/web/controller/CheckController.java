package org.tgcloud.zhanzhang.web.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZAgriculture;
import org.tgcloud.zhanzhang.entity.ZCompany;
import org.tgcloud.zhanzhang.entity.ZCrowd;
import org.tgcloud.zhanzhang.entity.ZCrowdHongshizi;
import org.tgcloud.zhanzhang.entity.ZCrowdShenfen;
import org.tgcloud.zhanzhang.entity.ZCrowdYiyuan;
import org.tgcloud.zhanzhang.entity.ZCrowdZhanghao;
import org.tgcloud.zhanzhang.entity.ZFindwork;
import org.tgcloud.zhanzhang.entity.ZFindworker;
import org.tgcloud.zhanzhang.entity.ZMarry;
import org.tgcloud.zhanzhang.entity.ZNoticeBaoming;
import org.tgcloud.zhanzhang.entity.ZNoticeFankui;
import org.tgcloud.zhanzhang.entity.ZNoticeQiuzheng;
import org.tgcloud.zhanzhang.entity.ZNoticeTongzhi;
import org.tgcloud.zhanzhang.entity.ZNoticeZhengqiu;
import org.tgcloud.zhanzhang.entity.ZPeopleNeed;
import org.tgcloud.zhanzhang.entity.ZPeopleService;
import org.tgcloud.zhanzhang.entity.ZProduct;
import org.tgcloud.zhanzhang.entity.ZReportInfo;
import org.tgcloud.zhanzhang.entity.ZSearchInfo;
import org.tgcloud.zhanzhang.entity.ZTravelGuide;
import org.tgcloud.zhanzhang.entity.ZTravelScenic;
import org.tgcloud.zhanzhang.entity.ZUser;
import org.tgcloud.zhanzhang.entity.ZUserPingbi;

import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class CheckController extends BaseController {

	@Before({Tx.class, POST.class})
    public void Report_List()
    {
	 	String searchname = getPara("searchname",null);
        Integer type = getParaToInt("type",1);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder("");
        if(type==1){
        	sb.append("SELECT hi.nickname,a.*,b.content,1 AS types,c.create_time as reporttime,c.times ");
        	sbs.append(		" FROM z_travel_scenic a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_scenic+
                  " left join z_user hi on hi.id=a.user_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==2){
        	sb.append("SELECT hi.nickname,a.*,b.img_path,2 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_travel_guide a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_context_path"+
                  " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_guide+
                  " left join z_user hi on hi.id=a.user_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.username like '%" + searchname + "%'");
	        }
	        sbs.append("order by a.create_time desc");
	    }
        if(type==3){
        	sb.append("SELECT hi.nickname,a.*,b.img_path,3 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_people_service a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_service+
                  " left join z_user hi on hi.id=a.user_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==4){
        	sb.append(" SELECT hi.nickname,a.*,b.img_path,4 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_people_need a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_need+
                  " left join z_user hi on hi.id=a.user_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==5){
        	sb.append(" SELECT hi.nickname,a.id,a.nickname as nick_name,a.hunyingguan,a.sex,a.age,a.high,a.weight,a.degrees,a.faith,a.job,a.position,a.ismarried,a.address,a.income,a.house,a.car,a.smoke,a.drink,a.hoppy,a.requirements,a.sign,a.createtime,a.status,a.user_id,a.backimg,a.imgs,a.city_id,a.county_id,a.location_x,a.location_y,a.pass,a.truename,a.birthaddress,a.stayaddress,a.idcard,a.idimgs,a.tel,5 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_marry a"+
        			" left join z_user hi on hi.id=a.user_id "+
                    " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
          			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sb.append(" and a.nickname like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.createtime desc");
	    }
        if(type==6){
        	sb.append(" SELECT hi.nickname,a.*,6 AS types,b.province_id,b.city_id,b.county_id,c.create_time as reporttime,c.times ");
        	sbs.append(" FROM z_findwork a"+
        			" left join z_findwork_place b on b.f_id=a.id "+
        			" left join z_user hi on hi.id=a.user_id "+
                    " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
          			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.createtime desc");
	    }
        if(type==7){
        	sb.append(" SELECT hi.nickname,a.*,7 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_findworker a"+
        			" left join z_user hi on hi.id=a.user_id "+
                    " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
          			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.createtime desc");
	    }
        if(type==8){
        	sb.append(" SELECT hi.nickname,a.*,8 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_agriculture a"+
        			" left join z_user hi on hi.id=a.user_id "+
                    " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
          			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==9){
        	sb.append(" SELECT hi.nickname,a.*,9 AS types,d.mans,DATEDIFF(day,getdate(),a.endtime) as leftday,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_crowd a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
                  " left join (select count(user_id) as mans,crowd_id from z_crowd_donate group by crowd_id) d on a.id=d.crowd_id"+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==10){
        	sb.append(" SELECT hi.nickname,a.*,10 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_company a"+
        			" left join z_user hi on hi.id=a.user_id "+
                    " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
          			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sb.append(" and a.com_name like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==11){
        	sb.append("SELECT hi.nickname,a.*,b.img as img_path,11 AS types,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_product a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type,Max(img_path) as img,Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_product+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.createtime desc");
	    }
        if(type==12){
        	sb.append("SELECT hi.nickname,a.*,b.content,12 AS types,d.wartchs,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_notice_tongzhi a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_tongzhi+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==13){
        	sb.append("SELECT hi.nickname,a.*,b.content,13 AS types,d.wartchs,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_notice_baoming a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_baoming+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+ 
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==14){
        	sb.append("SELECT hi.nickname,a.*,b.content,14 AS types,d.wartchs,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_notice_fankui a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_fankui+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==15){
        	sb.append("SELECT hi.nickname,a.*,b.content,15 AS types,d.wartchs,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_notice_qiuzheng a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_qiuzheng+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        if(type==16){
        	sb.append("SELECT hi.nickname,a.*,b.content,16 AS types,d.wartchs,c.create_time as reporttime,c.times");
        			sbs.append(" FROM z_notice_zhengqiu a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_zhengqiu+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
                  " right JOIN (select info_id,info_type,count(id) times,max(user_id) as user_id,max(create_time) as create_time  from z_report_info group by info_id,info_type) c on a.id = c.info_id AND c.info_type ="+type+
      			" WHERE 1=1 AND a.status = 1 and c.info_id>0");
        	if (searchname != null) {
	            sbs.append(" and a.title like '%" + searchname + "%'");
	        }
	        sbs.append(" order by a.create_time desc");
	    }
        Page<Record> info = Db.paginate(pageNum, pageSize, sb.toString(),sbs.toString());
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
    public void Report_Delete()
    {
		Integer type = getParaToInt("info_type",null);
		Integer info_id = getParaToInt("info_id",null);
        if(type==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if(info_id==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
       }else{
            if(type==1){
                ZTravelScenic.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==2){
            	ZTravelGuide.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==3){
            	ZPeopleService.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==4){
            	ZPeopleNeed.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==5){
            	ZMarry.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==6){
            	ZFindwork.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==7){
            	ZFindworker.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==8){
            	ZAgriculture.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==9){
            	ZCrowd.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==10){
            	ZCompany.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==11){
            	ZProduct.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==12){
            	ZNoticeTongzhi.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==13){
            	ZNoticeBaoming.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==14){
            	ZNoticeFankui.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==15){
            	ZNoticeQiuzheng.dao.findById(info_id).set("status", 2).update();
    	    }
            if(type==16){
            	ZNoticeZhengqiu.dao.findById(info_id).set("status", 2).update();
    	    }
            renderJson("{\"data\":\"SUCCESS\"}");
       }
        }
    }
	
	@Before(POST.class)
    public void Review_List()
    {
		String searchname = getPara("searchname",null);
        Integer status = getParaToInt("status",0);
        Integer type = getParaToInt("type",0);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder("");
        if(type==0){
        	sbs.append(" select g.id,g.title,g.content,g.createtime,g.user_id,g.type,g.status");
        	sb.append(" from ((SELECT a.id,a.nickname as title,'找对象身份证审核' as content,a.createtime,a.user_id,1 AS type,case a.pass when 2 then '待审核' when 1 then '通过审核' when 3 then '未通过审核' end as status"+
        	" FROM z_marry a"+
        			" WHERE 1=1 AND a.status = 1 and a.pass<>0 ");
	        if (searchname != null) {
	            sb.append(" and a.nickname like '%" + searchname + "%'");
	        }
	        if(status==1){
	        	sb.append(" and a.pass=2");
	        }
	        if(status==2){
	        	sb.append(" and a.pass=1");
	        }
	        if(status==3){
	        	sb.append(" and a.pass=3");
	        }
	        sb.append(" ) union all ");
        	sb.append(" (SELECT c.id,a.title,b.content,c.create_time AS createtime,a.user_id,c.type AS type,case c.pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status"+
        			" FROM z_crowd a"+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
                   " right join (select pass,crowd_id,id,create_time,21 as type from z_crowd_hongshizi" +
                   " union all select pass,crowd_id,id,create_time,22 as type from z_crowd_shenfen" +
                   " union all select pass,crowd_id,id,create_time,23 as type from z_crowd_yiyuan" +
                   " union all select pass,crowd_id,id,create_time,24 as type from z_crowd_zhanghao" +
                   ") c on c.crowd_id=a.id"+
                  
        			" WHERE 1=1 AND a.status = 1 ");
	        if (searchname != null) {
	            sb.append(" and a.nickname like '%" + searchname + "%'");
	        }
	        if(status==1){
	        	sb.append(" and a.pass=2");
	        }
	        if(status==2){
	        	sb.append(" and a.pass=1");
	        }
	        if(status==3){
	        	sb.append(" and a.pass=3");
	        }
	        sb.append(" ) union all ");
        	sb.append(" (SELECT a.id,a.com_name as title,'本地企业证件审核' as content,a.create_time AS createtime,a.user_id,3 AS type,case a.pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status"+
        			" FROM z_company a"+
                  " WHERE 1=1 AND a.status = 1");
	        if (searchname != null) {
	            sb.append(" and a.com_name like '%" + searchname + "%'");
	        }
	        if(status==1){
	        	sb.append(" and a.pass=0");
	        }
	        if(status==2){
	        	sb.append(" and a.pass=1");
	        }
	        if(status==3){
	        	sb.append(" and a.pass=2");
	        }
	        sb.append(") union all (SELECT a.id,a.nickname as title,'政府单位证件审核' as content,a.create_time AS createtime,a.id as user_id,4 AS type,case a.type when 2 then '待审核' when 3 then '通过审核' when 4 then '未通过审核' end as status"+
        			" FROM z_user a"+
                  " WHERE 1=1 AND a.status = 1 and a.type>=2");
	        if (searchname != null) {
	            sb.append(" and a.nickname like '%" + searchname + "%'");
	        }
	        if(status==1){
	        	sb.append(" and a.type=1");
	        }
	        if(status==2){
	        	sb.append(" and a.type=2");
	        }
	        if(status==3){
	        	sb.append(" and a.type=3");
	        }
	        sb.append(")) g order by g.createtime desc");
        }
            if(type==1){
            	sbs.append(" SELECT a.id,a.nickname as title,'找对象身份证审核' as content,a.createtime,a.user_id,1 AS type,case a.pass when 2 then '待审核' when 1 then '通过审核' when 3 then '未通过审核' end as status");
            	sb.append(" FROM z_marry a"+
            			" WHERE 1=1 AND a.status = 1 and a.pass<>0 ");
    	        if (searchname != null) {
    	            sb.append(" and a.nickname like '%" + searchname + "%'");
    	        }
    	        if(status==1){
    	        	sb.append(" and a.pass=2");
    	        }
    	        if(status==2){
    	        	sb.append(" and a.pass=1");
    	        }
    	        if(status==3){
    	        	sb.append(" and a.pass=3");
    	        }
    	        sb.append(" order by a.createtime desc");
    	    }
            if(type==2){
            	sbs.append(" SELECT c.id,a.title,b.content,c.create_time AS createtime,a.user_id,c.type AS type,case c.pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status");
            	sb.append(" FROM z_crowd a"+
            			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                        "FROM z_context_path "+
                       "WHERE status = 1 "+
                      "GROUP BY info_id, info_type) b "+
                      " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
                       " right join (select pass,crowd_id,id,create_time,21 as type from z_crowd_hongshizi" +
                       " union all select pass,crowd_id,id,create_time,22 as type from z_crowd_shenfen" +
                       " union all select pass,crowd_id,id,create_time,23 as type from z_crowd_yiyuan" +
                       " union all select pass,crowd_id,id,create_time,24 as type from z_crowd_zhanghao" +
                       ") c on c.crowd_id=a.id"+
                      
            			" WHERE 1=1 AND a.status = 1 ");
    	        if (searchname != null) {
    	            sb.append(" and a.nickname like '%" + searchname + "%'");
    	        }
    	        if(status==1){
    	        	sb.append(" and c.pass=0");
    	        }
    	        if(status==2){
    	        	sb.append(" and c.pass=1");
    	        }
    	        if(status==3){
    	        	sb.append(" and c.pass=2");
    	        }
    	        sb.append(" order by c.create_time desc");
            }
            if(type==3){
            	sbs.append(" SELECT a.id,a.com_name as title,'本地企业证件审核' as content,a.create_time AS createtime,a.user_id,3 AS type,case a.pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status");
            	sb.append(" FROM z_company a"+
                      " WHERE 1=1 AND a.status = 1");
    	        if (searchname != null) {
    	            sb.append(" and a.com_name like '%" + searchname + "%'");
    	        }
    	        if(status==1){
    	        	sb.append(" and a.pass=0");
    	        }
    	        if(status==2){
    	        	sb.append(" and a.pass=1");
    	        }
    	        if(status==3){
    	        	sb.append(" and a.pass=2");
    	        }
    	        sb.append(" order by a.create_time desc");
    	    }
            if(type==4){
            	sbs.append(" SELECT a.id,a.nickname as title,'政府单位证件审核' as content,a.create_time AS createtime,a.id as user_id,4 AS type,case a.type when 2 then '待审核' when 3 then '通过审核' when 4 then '未通过审核' end as status");
            	sb.append(" FROM z_user a"+
                      " WHERE 1=1 AND a.status = 1 and a.type=2");
    	        if (searchname != null) {
    	            sb.append(" and a.nickname like '%" + searchname + "%'");
    	        }
    	        if(status==1){
    	        	sb.append(" and a.type=2");
    	        }
    	        if(status==2){
    	        	sb.append(" and a.type=3");
    	        }
    	        if(status==3){
    	        	sb.append(" and a.type=4");
    	        }
    	        sb.append(" order by a.create_time desc");
    	    }
            Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
            checkResult(info.getList(),this,info.getTotalPage());
    }
	
	@Before(POST.class)
    public void Review_Detail()
    {
		Integer info_id=getParaToInt("info_id",null);
        Integer type = getParaToInt("type",null);
        String sb = new String();
        if(type==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if(info_id==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
            if(type==1){
            	sb=" SELECT a.id,a.truename,a.birthaddress,a.stayaddress,a.idcard,a.idimgs,case a.pass when 2 then '待审核' when 1 then '通过审核' when 3 then '未通过审核' end as status,a.tel,1 as type"+
            			" FROM z_marry a"+
            			" WHERE 1=1 AND a.status = 1 and a.id="+info_id;
    	    }
            if(type==22){
            	sb="SELECT id,truename,idnumber,imgs,case pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status,22 AS type"+
            			" FROM z_crowd_shenfen"+
                      " WHERE 1=1 AND status = 1 and id="+info_id;
            }
			if(type==23){
				sb="SELECT id,imgs,case pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status,23 AS type"+
            			" FROM z_crowd_yiyuan"+
                      " WHERE 1=1 AND status = 1 and id="+info_id;
			}
			if(type==24){
				sb="SELECT id,owner,cardnum,bank,bindtel,case pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status,24 AS type"+
            			" FROM z_crowd_zhanghao"+
                      " WHERE 1=1 AND status = 1 and id="+info_id;
			}
			if(type==21){
				sb="SELECT id,imgs,link_name,link_tel,case pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status,21 AS type"+
            			" FROM z_crowd_hongshizi"+
                      " WHERE 1=1 AND status = 1 and id="+info_id;
			}
            if(type==3){
            	sb=" SELECT a.id,a.com_name,a.message,a.id_img,a.paper_img,case pass when 0 then '待审核' when 1 then '通过审核' when 2 then '未通过审核' end as status,3 AS type"+
            			" FROM z_company a"+
                      " WHERE 1=1 AND a.status = 1 and a.id="+info_id;
    	    }
            if(type==4){
            	sb=" SELECT a.id,a.nickname,'政府单位证件审核' as title,a.paper_img,4 AS type,case a.type when 2 then '待审核' when 3 then '通过审核' when 4 then '未通过审核' end as status"+
            			" FROM z_user a"+
                      " WHERE 1=1 AND a.status = 1 and a.type>=2 and a.id="+info_id;
    	    }
            renderJson(Db.findFirst(sb));
    }
	@Before(POST.class)
    public void Review_Pass()
    {
		Integer info_id=getParaToInt("info_id",null);
        Integer type = getParaToInt("type",null);
        Integer pass = getParaToInt("pass",null);
        StringBuilder sb = new StringBuilder("");
        if(type==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if(info_id==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if(pass==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else if(pass==1){
        	if(type==1){
        		ZMarry.dao.findById(info_id).set("pass", 1).update();
    	    }if(type==22){
    	    	ZCrowdShenfen.dao.findById(info_id).set("pass", 1).update();
            }
			if(type==23){
				ZCrowdYiyuan.dao.findById(info_id).set("pass", 1).update();
			}
			if(type==24){
				ZCrowdZhanghao.dao.findById(info_id).set("pass", 1).update();
			}
			if(type==21){
				ZCrowdHongshizi.dao.findById(info_id).set("pass", 1).update();
			}
            if(type==3){
            	ZCompany.dao.findById(info_id).set("pass", 1).update();
    	    }
            if(type==4){
            	ZUser.dao.findById(info_id).set("type", 3).update();
    	    }
            renderJson("{\"data\":\"SUCCESS\"}");
        }else if(pass==2){
        	if(type==1){
        		ZMarry.dao.findById(info_id).set("pass",3).update();
    	    }if(type==22){
    	    	ZCrowdShenfen.dao.findById(info_id).set("pass",2).update();
            }
			if(type==23){
				ZCrowdYiyuan.dao.findById(info_id).set("pass",2).update();
			}
			if(type==24){
				ZCrowdZhanghao.dao.findById(info_id).set("pass",2).update();
			}
			if(type==21){
				ZCrowdHongshizi.dao.findById(info_id).set("pass",2).update();
			}
            if(type==3){
            	ZCompany.dao.findById(info_id).set("pass",2).update();
    	    }
            if(type==4){
            	ZUser.dao.findById(info_id).set("type", 4).update();
    	    }
            renderJson("{\"data\":\"SUCCESS\"}");
        }else{
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        
    }
	
	@Before(POST.class)
    public void UserManager_List()
    {
		String searchname = getPara("searchname",null);
        Integer type = getParaToInt("type",0);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder("");
        if(type==0){
        	sbs.append(" SELECT a.id,a.nickname+' '+a.username as title,a.create_time,a.status,1 as type");
        			sb.append(" FROM z_user a"+
                  " WHERE 1=1");
	        if (searchname != null) {
	            sb.append(" and (a.nickname like '%" + searchname + "%'");
	            sb.append(" or a.username like '%" + searchname + "%')");
	        }
	        sb.append(" order by a.create_time desc");
    }
        if(type==1){
            	sbs.append(" SELECT a.id,a.nickname+' '+a.username as title,a.create_time,a.status,1 as type");
            	sb.append(" FROM z_user a"+
                      " WHERE 1=1");
    	        if (searchname != null) {
    	            sb.append(" and (a.nickname like '%" + searchname + "%'");
    	            sb.append(" or a.username like '%" + searchname + "%')");
    	        }
    	        sb.append(" order by a.create_time desc");
        }
        if(type==2){
        	sbs.append(" SELECT a.id,a.nickname+' '+a.username as title,a.create_time,a.status,2 as type");
        	sb.append(" FROM z_user a"+
                  " WHERE 1=1");
	        if (searchname != null) {
	            sb.append(" and (a.nickname like '%" + searchname + "%'");
	            sb.append(" or a.username like '%" + searchname + "%')");
	        }
	        sb.append(" order by a.create_time desc");
    }
            Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
            checkResult(info.getList(),this,info.getTotalPage());
    }
	@Before(POST.class)
    public void UserManager_Change()
    {
		Integer info_id = getParaToInt("info_id",null);
        Integer days = getParaToInt("days",0);
        ZUserPingbi record=new ZUserPingbi();
        record.setUserId(info_id);
        record.setDays(days);
        Date date=new Date();
        Calendar   calendar   =   new   GregorianCalendar(); 
        calendar.setTime(date); 
        calendar.add(calendar.DATE,days);//把日期往后增加一天.整数往后推,负数往前移动 
        date=calendar.getTime();
        record.setEndTime(new java.sql.Date(date.getTime()));
        record.save();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
	
	@Before(POST.class)
    public void UserManager_Cancel()
    {
		Integer info_id = getParaToInt("info_id",null);
        ZUserPingbi record=ZUserPingbi.dao.findFirst("select * from z_user_pingbi where user_id="+info_id);
        renderJson("{\"data\":\"SUCCESS\"}");
    }
	
	@Before({Tx.class, POST.class})
    public void AllList()
    {
		String searchname = getPara("searchname",null);
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer type = getParaToInt("types",1);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder("");
        Integer typea = (int)getSession().getAttribute("type");
        if(typea!=null&&typea==3){
        	if(Db.find("select * from z_search_info where context like '"+searchname+"'")==null){
	        	ZSearchInfo ac=new ZSearchInfo();
	        	ac.setUserId(user_id);
	        	if (searchname != null) {
	        	ac.setContext(searchname);
	        	ac.save();
        	}
        	}
        	
        }
        if(type==1){
        	sbs.append("SELECT hi.nickname,a.*,b.content,1 AS types ");
        			sb.append(" FROM z_travel_scenic a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_scenic+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==2){
        	sbs.append("SELECT hi.nickname,a.*,b.img_path,2 AS types");
        			sb.append(" FROM z_travel_guide a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_context_path"+
                  " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_guide+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.username like '%" + searchname + "%'");
	        }
	        sb.append("order by a.create_time desc");
	    }
        if(type==3){
        	sbs.append("SELECT hi.nickname,a.*,b.img_path,3 AS types");
        			sb.append(" FROM z_people_service a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_service+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==4){
        	sbs.append(" SELECT hi.nickname,a.*,b.img_path,4 AS types");
        			sb.append(" FROM z_people_need a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (img_path) AS img_path"+
                    " FROM z_img_path"+
                   " WHERE status = 1"+
                  " GROUP BY info_id, info_type) b"+
                  " ON a.id = b.info_id AND b.info_type ="+GlobalStatic.people_need+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==5){
        	sbs.append(" SELECT hi.nickname,a.id,a.nickname as nick_name,a.hunyingguan,a.sex,a.age,a.high,a.weight,a.degrees,a.faith,a.job,a.position,a.ismarried,a.address,a.income,a.house,a.car,a.smoke,a.drink,a.hoppy,a.requirements,a.sign,a.createtime,a.status,a.user_id,a.backimg,a.imgs,a.city_id,a.county_id,a.location_x,a.location_y,a.pass,a.truename,a.birthaddress,a.stayaddress,a.idcard,a.idimgs,a.tel,5 AS types");
        			sb.append(" FROM z_marry a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.nickname like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.createtime desc");
	    }
        if(type==6){
        	sbs.append(" SELECT hi.nickname,a.*,6 AS types,b.province_id,b.city_id,b.county_id ");
        			sb.append(" FROM z_findwork a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" left join z_findwork_place b on b.f_id=a.id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.createtime desc");
	    }
        if(type==7){
        	sbs.append(" SELECT hi.nickname,a.*,7 AS types");
        			sb.append(" FROM z_findworker a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.createtime desc");
	    }
        if(type==8){
        	sbs.append(" SELECT hi.nickname,a.*,8 AS types");
        	sb.append(" FROM z_agriculture a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==9){
        	sbs.append(" SELECT hi.nickname,a.*,9 AS types,d.mans,DATEDIFF(day,getdate(),a.endtime) as leftday");
        			sb.append(" FROM z_crowd a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_crowd+
                  " left join (select count(user_id) as mans,crowd_id from z_crowd_donate group by crowd_id) d on a.id=d.crowd_id"+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==10){
        	sbs.append(" SELECT hi.nickname,a.*,10 AS types");
        			sb.append(" FROM z_company a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.com_name like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==11){
        	sbs.append("SELECT hi.nickname,a.*,b.img as img_path,11 AS types");
        			sb.append(" FROM z_product a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type,Max(img_path) as img,Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_product+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.createtime desc");
	    }
        if(type==12){
        	sbs.append("SELECT hi.nickname,a.*,b.content,12 AS types,d.wartchs");
        			sb.append(" FROM z_notice_tongzhi a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_tongzhi+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==13){
        	sbs.append("SELECT hi.nickname,a.*,b.content,13 AS types,d.wartchs");
        			sb.append(" FROM z_notice_baoming a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_baoming+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+ 
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==14){
        	sbs.append("SELECT hi.nickname,a.*,b.content,14 AS types,d.wartchs");
        			sb.append(" FROM z_notice_fankui a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_fankui+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==15){
        	sbs.append("SELECT hi.nickname,a.*,b.content,15 AS types,d.wartchs");
        			sb.append(" FROM z_notice_qiuzheng a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_qiuzheng+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        sb.append(" order by a.create_time desc");
	    }
        if(type==16){
        	sbs.append("SELECT hi.nickname,a.*,b.content,16 AS types,d.wartchs");
        			sb.append(" FROM z_notice_zhengqiu a"+
        			" left join z_user hi on hi.id=a.user_id "+
        			" LEFT JOIN (SELECT info_id, info_type, Max (content) AS content "+
                    "FROM z_context_path "+
                   "WHERE status = 1 "+
                  "GROUP BY info_id, info_type) b "+
                  "ON a.id = b.info_id AND b.info_type ="+GlobalStatic.c_notice_zhengqiu+
                  " left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(type)+" group by info_id,info_type) d on a.id=d.info_id "+
        			" WHERE 1=1 AND a.status = 1");
        	if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
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
	
	@Before({Tx.class, POST.class})
    public void storeList()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer id = getParaToInt("user_id",1);
        List<Map> b=new ArrayList();
        for(int i=1;i<8;i++){
        Map a=new HashMap();
        a.put("id", i);
        a.put("storename", "商店"+i);
        b.add(a);
        }
        checkResult(b,this);
    }
	
}
