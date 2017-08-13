package org.tgcloud.zhanzhang.service;

import java.util.List;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZUser;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

public class CompanyService {
    public Record selectNewsInfo(int info_id, int user_id) {
        Record record = Db.findFirst("select s.*,ISNULL(i.id,0) as store,ISNULL(p.id,0) as report from z_company_news s " +
                " LEFT OUTER JOIN z_store_info i on i.info_id = s.id and i.info_type = " + GlobalStatic.store_praise_guide + " and i.user_id = " + user_id  +
                " LEFT OUTER JOIN z_report_info p on p.info_id = s.id and p.info_type = " + GlobalStatic.store_praise_guide + " and p.user_id = " + user_id +
                " where s.id = " + info_id);
        if (record != null)
        {
        	record.set("username", ZUser.dao.findById(record.get("user_id")).getNickname());
            record.set("main_info",Db.find("select content,img_path from z_context_path where status=1 and info_id = "+ info_id + " and info_type = " + GlobalStatic.c_com_news));//导游
        }
        return record;
    }
    
    public List selectComList(int pageNum, int pageSize, Integer city_id, Integer county, String params) {
        StringBuilder sbs = new StringBuilder("select s.id,s.main_img,s.com_name,s.message,s.location_x,s.location_y ");
        StringBuilder sb = new StringBuilder(" from z_company s " +
        		"where 1=1 and s.status=1 and s.pass=1");
        if (city_id != null) {
            sb.append(" and s.city_id=" + city_id);
        }
        if (county != null) {
            sb.append(" and s.county_id=" + county);
        }
        if (params != null) {
            sb.append(" and s.com_name like'%" + params + "%'");
        }
        sb.append(" order by s.id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        return info.getList();
    }

	public Object selectComDetail(int pageNum, int pageSize, String com_id,
			int type) {
		// TODO Auto-generated method stub
		if(type==1){
			StringBuilder sbs = new StringBuilder("select id,title,nums");
        StringBuilder sb = new StringBuilder(" from z_company_news "
		+" where com_id="+com_id);
        sb.append(" order by id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
            	if(Db.findFirst("select top 1 content,img_path from z_context_path where status=1 and info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_com_news + " order by id desc")!=null){
            		record.setColumns(Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_com_news + " order by id desc"));
            	}
            	}
        }
        return info.getList();
		}else if(type==2){
			StringBuilder sbs = new StringBuilder("select s.id as goods_id,s.imgs,s.title,s.content");
			StringBuilder sb = new StringBuilder(" from z_company_goods s"
					+" where s.com_id="+com_id);
			        sb.append(" order by s.id desc");
			        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
			        return info.getList();
		}else if(type==3){
			Record record = Db.findFirst("select s.* from z_company_support s " +
	                " where s.com_id = " + com_id);
	        if (record != null)
	        {
	            record.set("main_info",Db.find("select content,img_path from z_context_path where status=1 and info_id = "+ record.getInt("id") + " and info_type = " + GlobalStatic.c_com_support));//导游
	        }
	        return record;
		}else if(type==4){
			Record record = Db.findFirst("select s.* from z_company_contact s " +
	                " where s.com_id = " + com_id);
	        if (record != null)
	        {
	            record.set("link_info",Db.find("select nikname,tel from z_company_link where status =1 and contact_id = "+ record.getInt("id")));//导游
	            record.set("work_info",Db.find("select startday,endday,starttime,endtime from z_company_work where status =1 and contact_id = "+ record.getInt("id")));//导游
	        }
	        return record;
		}else{
			StringBuilder sbs = new StringBuilder("select id,title,nums");
	        StringBuilder sb = new StringBuilder(" from z_company_news "
	        		+" where com_id="+com_id);
	                sb.append(" order by id desc");
	                Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
	                if (!BeanUtil.isNullList(info.getList())) {
	                    for (Record record : info.getList()) {
	                    	if(Db.findFirst("select top 1 content,img_path from z_context_path where status=1 and info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_com_news + " order by id desc")!=null){
	                    		record.setColumns(Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_com_news + " order by id desc"));
	                    	}
	                    }
	                }
	                return info.getList();
		}
	}
}
