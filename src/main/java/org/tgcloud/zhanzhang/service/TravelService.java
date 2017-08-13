package org.tgcloud.zhanzhang.service;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.ResultMessage;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/6/1.
 */
public class TravelService {

    public Page<Record> selectTravelList(int pageNum, int pageSize, Integer city_id, Integer county, String params) {
    	StringBuilder sbs = new StringBuilder("select s.main_img,s.title,s.id,s.location_x,s.location_y");
        StringBuilder sb = new StringBuilder(" from z_travel_scenic s where s.status=1");
        if (city_id != null) {
            sb.append(" and s.city_id=" + city_id);
        }
        if (county != null) {
            sb.append(" and s.county_id=" + county);
        }
        if (params != null) {
            sb.append(" and s.title like'%" + params + "%'");
        }
        sb.append(" order by s.id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                record.set("content", Db.queryStr("select top 1 content from z_context_path where info_id = " + record.get("id") + " and info_type = 1 order by id desc"));
            }
        }
        return info;
    }

    public Page<Record> selectTravelGuideList(int pageNum, int pageSize, Integer city_id, Integer county, String params) {
    	StringBuilder sbs = new StringBuilder("select s.car_c,s.user_status,s.price,s.hours,s.message,s.age,s.username,s.sex,s.id,s.location_x,s.location_y");
        StringBuilder sb = new StringBuilder(" from z_travel_guide s where s.status=1");
        if (city_id != null) {
            sb.append(" and s.city_id=" + city_id);
        }
        if (county != null) {
            sb.append(" and s.county_id=" + county);
        }
        if (params != null) {
            sb.append(" and s.username like'%" + params + "%'");
        }
        sb.append(" order by s.id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
                    Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_guide + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                }
            }
        }
        return info;
    }

    public Record selectScenicInfo(int info_id, int user_id) {
        Record record = Db.findFirst("select s.id,s.main_img,s.title,s.id,s.location_x,s.location_y,s.show_status,ISNULL(i.id,0) as store,ISNULL(p.id,0) as report,(r.REGION_NAME + r1.REGION_NAME + r2.REGION_NAME) as address " +
                "from z_travel_scenic s " +
                "LEFT OUTER JOIN region r on r.REGION_ID = s.province_id " +
                "LEFT OUTER JOIN region r1 on r1.REGION_ID = s.city_id " +
                "LEFT OUTER JOIN region r2 on r2.REGION_ID = s.county_id " +
                "LEFT OUTER JOIN z_store_info i on i.info_id = s.id and i.info_type = " + GlobalStatic.store_praise_scenic + " and i.user_id = " + user_id  +
                "LEFT OUTER JOIN z_report_info p on p.info_id = s.id and p.info_type = " + GlobalStatic.store_praise_scenic + " and p.user_id = " + user_id +
                "where s.id =" + info_id);
        if (record != null)
        {
            record.set("contexts",Db.find("select content,img_path from z_context_path where info_id = "+ info_id + " and info_type = " + GlobalStatic.c_scenic));//图文信息
            record.set("links",Db.find("select url,content from z_info_url where info_id = "+ info_id + " and info_type = " + GlobalStatic.c_scenic));//链接
        }
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
        return record;
    }

    public Record selectGuideInfo(int info_id, int user_id) {
        Record record = Db.findFirst("select s.*,ISNULL(i.id,0) as store,ISNULL(p.id,0) as report from z_travel_guide s " +
                "LEFT OUTER JOIN z_store_info i on i.info_id = s.id and i.info_type = " + GlobalStatic.store_praise_guide + " and i.user_id = " + user_id  +
                "LEFT OUTER JOIN z_report_info p on p.info_id = s.id and p.info_type = " + GlobalStatic.store_praise_guide + " and p.user_id = " + user_id +
                "where s.id = " + info_id);
        if (record != null)
        {
            record.set("guide_info",Db.find("select content,img_path from z_context_path where info_id = "+ info_id + " and info_type = " + GlobalStatic.c_guide));//导游
            record.set("place_info",Db.find("select content,img_path from z_context_path where info_id = "+ info_id + " and info_type = " + GlobalStatic.c_guide_place));//景点
            record.set("car_info",Db.find("select content,img_path from z_context_path where info_id = "+ info_id + " and info_type = " + GlobalStatic.c_guide_car));//车辆
        }
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
        return record;
    }
}
