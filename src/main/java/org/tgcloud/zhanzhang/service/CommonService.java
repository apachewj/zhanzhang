package org.tgcloud.zhanzhang.service;

import java.sql.Date;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.tx.Tx;
import org.tgcloud.zhanzhang.core.BaseLogger;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZCards;
import org.tgcloud.zhanzhang.entity.ZClickInfo;
import org.tgcloud.zhanzhang.entity.ZPraiseInfo;
import org.tgcloud.zhanzhang.entity.ZReportInfo;
import org.tgcloud.zhanzhang.entity.ZStoreInfo;
import org.tgcloud.zhanzhang.entity.ZUserclickInfo;

/**
 * Created by Administrator on 2016/6/1.
 */
public class CommonService extends BaseLogger {

    @Before(Tx.class)
    public void doPraiseOrCancelInfo(int user_id, int info_id, int info_type) {
    	ZPraiseInfo record = ZPraiseInfo.dao.findFirst("select * from z_praise_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
            new ZPraiseInfo(user_id,info_id,info_type).save();
        }
        else
        {
            record.delete();
        }
    }

    public void doStoreOrNotInfo(int user_id, int info_id, int info_type) {
        ZStoreInfo record = ZStoreInfo.dao.findFirst("select * from z_store_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
            new ZStoreInfo(user_id,info_id,info_type).save();
        }
        else
        {
            record.delete();
        }
    }
    
    public void doReportOrNotInfo(int user_id, int info_id, int info_type) {
    	ZReportInfo record = ZReportInfo.dao.findFirst("select * from z_report_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
            new ZReportInfo(user_id,info_id,info_type).save();
        }
        else
        {
            record.delete();
        }
    }
    
    public void doClickOrNotInfo(int user_id, int info_id, int info_type) {
    	ZUserclickInfo record = ZUserclickInfo.dao.findFirst("select * from z_userclick_info where user_id = " + user_id + " and info_id=" + info_id + " and info_type =" + info_type);
        if (record == null)
        {
            new ZUserclickInfo(user_id,info_id,info_type).save();
        }
        else
        {
        	record.setCreateTime(new java.sql.Date(new java.util.Date().getTime()));
        	record.update();
        }
    }
    public String addcards(int user_id,String  cardstatus,
	String  cardtype,String  card_id,String  bank,String  ownername,Integer province_id,
	Integer city_id,Integer county_id,String  bankname){
    	if (Strings.isNullOrEmpty(cardstatus))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
    	if (Strings.isNullOrEmpty(cardtype))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(card_id))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(bank))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(ownername))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(bankname))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (province_id==null)
        {
            return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (city_id==null)
        {
            return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (county_id==null)
        {
            return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        ZCards a=new ZCards();
        a.setCardstatus(cardstatus);
        a.setBank(bank);
        a.setBankname(bankname);
        a.setCardId(card_id);
        a.setCardtype(cardtype);
        a.setCityId(city_id);
        a.setCountyId(county_id);
        a.setOwnername(ownername);
        a.setProvinceId(province_id);
        a.setUserId(user_id);
        a.save();
        return  "{\"data\":\"SUCCESS\"}";
    }
}
