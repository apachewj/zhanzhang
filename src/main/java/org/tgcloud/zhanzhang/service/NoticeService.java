package org.tgcloud.zhanzhang.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZContextPath;
import org.tgcloud.zhanzhang.entity.ZInfoUrl;
import org.tgcloud.zhanzhang.entity.ZNoticeBaoming;

import com.google.common.base.Strings;

public class NoticeService {

	public String addBaoming(String main_img,
	        int user_id,
	        Integer province_id,
	        Integer city_id,
	        Integer county_id,
	        String location_x,
	        String location_y,
	        String title,
		    Integer status,
		    Integer showincontent,
		    Integer getbaoming,
		    Integer getjingfei,
		    String baomingfei,
		    String jingfei,
		    String b_starttime,
		    String b_endtime,
		    String starttime,
		    String endtime,
		    Integer issex,
		    Integer nums,
		    Integer mannums,
		    Integer womanums,
		    String[] c_images,
	        String[] c_contexts,
	        String[] c_urls,
	        String[] url_contents) throws ParseException{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		if (Strings.isNullOrEmpty(title))
        {
            return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        
        if (status==null)
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
        if (Strings.isNullOrEmpty(location_x))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(location_y))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if(getbaoming!=0){
        	if (Strings.isNullOrEmpty(baomingfei))
            {
        		return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
            }
    	}
        if(getjingfei!=0){
        	if (Strings.isNullOrEmpty(jingfei))
            {
        		return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
            }
    	}
        if (Strings.isNullOrEmpty(b_starttime))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(b_endtime))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(starttime))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if (Strings.isNullOrEmpty(endtime))
        {
        	return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
        }
        if(issex!=0){
        	nums=mannums+womanums;
        	if (mannums==0)
            {
        		return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
            }
        	if (womanums==0)
            {
        		return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
            }
    	}else{
    		if (nums==0)
            {
    			return "{\"data\":\"parameter miss\",\"key\":\"1001\"}";
            }
    	}
	    ZNoticeBaoming a= new ZNoticeBaoming();
	    a.setCityId(city_id);
	    a.setCountyId(county_id);
	    a.setLocationX(location_x);
	    a.setLocationY(location_y);
	    a.setMainImg(main_img);
	    a.setProvinceId(province_id);
	    a.setStatus(status);
	    a.setTitle(title);
	    a.setUserId(user_id);
	    a.setShowincontent(showincontent);
	    a.setGetbaoming(getbaoming);
	    a.setGetjingfei(getjingfei);
	    a.setStarttime(new Date(sdf.parse(starttime).getTime()));
	    a.setEndtime(new Date(sdf.parse(endtime).getTime()));
	    a.setBStarttime(new Date(sdf.parse(b_starttime).getTime()));
	    a.setBEndtime(new Date(sdf.parse(b_endtime).getTime()));
	    if(getbaoming!=0){
	    	a.setBaomingfei(new BigDecimal(baomingfei));
	    }
	    if(getjingfei!=0){
	    	a.setBaomingfei(new BigDecimal(jingfei));
	    }
	    if(issex!=0){
	    	a.setMannums(mannums);
	    	a.setWomanums(womanums);
	    }
	    a.setIssex(issex);
	    a.setNums(nums);
	    a.save();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_baoming).save();
            }
        }
	    if ((c_urls != null && c_urls.length != 0) && (url_contents != null && url_contents.length != 0) && c_urls.length == url_contents.length)
        {
            for (int i = 0; i < c_urls.length;i++)
            {
                new ZInfoUrl(a.getId(),c_urls[i],url_contents[i], GlobalStatic.c_notice_baoming).save();
            }
        }
	    return "{\"data\":\"SUCCESS\"}";
	}
}
