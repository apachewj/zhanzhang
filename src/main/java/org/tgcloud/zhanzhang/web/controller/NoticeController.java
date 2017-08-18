package org.tgcloud.zhanzhang.web.controller;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.*;
import org.tgcloud.zhanzhang.service.NoticeService;
import org.tgcloud.zhanzhang.service.TravelService;
import org.tgcloud.zhanzhang.service.UserService;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

/**
 * @author
 */
public class NoticeController extends BaseController {
	
	private NoticeService noticeService = Enhancer.enhance(NoticeService.class);
	private UserService userService = Enhancer.enhance(UserService.class);

	@Before({Tx.class, POST.class})
    public void addNoticeTongzhi() throws ParseException
    {
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        String[] c_urls = getParaValues("c_url");
        String[] url_contents = getParaValues("url_content");
        if (Strings.isNullOrEmpty(title))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        
        if (status==null)
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
        if (Strings.isNullOrEmpty(location_x))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(location_y))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{	 
	    ZNoticeTongzhi a= new ZNoticeTongzhi();
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
	    a.save();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_tongzhi).save();
            }
        }
	    if ((c_urls != null && c_urls.length != 0) && (url_contents != null && url_contents.length != 0) && c_urls.length == url_contents.length)
        {
            for (int i = 0; i < c_urls.length;i++)
            {
                new ZInfoUrl(a.getId(),c_urls[i],url_contents[i], GlobalStatic.c_notice_tongzhi).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}}}}
        }
	@Before({Tx.class, POST.class})
    public void changeNoticeTongzhi() throws ParseException
    {
		Integer info_id = getParaToInt("info_id",null);
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        String[] c_urls = getParaValues("c_url");
        String[] url_contents = getParaValues("url_content");
        
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	ZNoticeTongzhi a=ZNoticeTongzhi.dao.findById(info_id);
        if (city_id!=null)
        {
	    a.setCityId(city_id);
        }
        if (county_id!=null)
        {
	    a.setCountyId(county_id);
        }
        if (!Strings.isNullOrEmpty(location_x))
        {
	    a.setLocationX(location_x);
        }
        if (!Strings.isNullOrEmpty(location_y))
        {
	    a.setLocationY(location_y);
        }
        if (!Strings.isNullOrEmpty(main_img))
        {
	    a.setMainImg(main_img);
        }
	    a.setProvinceId(province_id);
	    if (status!=0)
        {
	    a.setStatus(status);
        }
	    if (!Strings.isNullOrEmpty(title))
        {
	    a.setTitle(title);
        }
	    if (showincontent!=0)
        {
	    a.setShowincontent(showincontent);
        }
	    a.update();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
	    	for(ZContextPath b:ZContextPath.dao.find("select * from z_context_path where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_tongzhi)){
	        	b.setStatus(2);
	        	b.update();
	        }
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_tongzhi).save();
            }
        }
	    if ((c_urls != null && c_urls.length != 0) && (url_contents != null && url_contents.length != 0) && c_urls.length == url_contents.length)
        {
	    	for(ZInfoUrl b:ZInfoUrl.dao.find("select * from z_info_url where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_tongzhi)){
	        	b.delete();
	        }
            for (int i = 0; i < c_urls.length;i++)
            {
                new ZInfoUrl(a.getId(),c_urls[i],url_contents[i], GlobalStatic.c_notice_tongzhi).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
        }
	@Before({Tx.class, POST.class})
    public void addNoticeBaoming() throws ParseException
    {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    Integer getbaoming= getParaToInt("getbaoming",0);
	    Integer getjingfei= getParaToInt("getjingfei",0);
	    String baomingfei = getPara("baomingfei",null);
	    String jingfei = getPara("jingfei",null);
	    String b_starttime = getPara("b_starttime",null);
	    String b_endtime = getPara("b_endtime",null);
	    String starttime = getPara("starttime",null);
	    String endtime = getPara("endtime",null);
	    Integer issex= getParaToInt("issex",0);
	    Integer nums= getParaToInt("nums",0);
	    Integer mannums= getParaToInt("mannums",0);
	    Integer womanums= getParaToInt("womannums",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        String[] c_urls = getParaValues("c_url");
        String[] url_contents = getParaValues("url_content");
	    renderJson(noticeService.addBaoming(main_img,user_id,province_id,city_id,county_id,location_x,location_y,title,status,showincontent,getbaoming,
	    	    getjingfei,baomingfei,jingfei,b_starttime,b_endtime,starttime,endtime,issex,nums,mannums,womanums,c_images,c_contexts,
	            c_urls,url_contents));
        }
	
	@Before({Tx.class, POST.class})
    public void changeNoticeBaoming() throws ParseException
    {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Integer info_id = getParaToInt("info_id",null);
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",null);
	    Integer showincontent= getParaToInt("showincontent",null);
	    Integer getbaoming= getParaToInt("getbaoming",null);
	    Integer getjingfei= getParaToInt("getjingfei",null);
	    String baomingfei = getPara("baomingfei",null);
	    String jingfei = getPara("jingfei",null);
	    String b_starttime = getPara("b_starttime",null);
	    String b_endtime = getPara("b_endtime",null);
	    String starttime = getPara("starttime",null);
	    String endtime = getPara("endtime",null);
	    Integer issex= getParaToInt("issex",0);
	    Integer nums= getParaToInt("nums",0);
	    Integer mannums= getParaToInt("mannums",0);
	    Integer womanums= getParaToInt("womanums",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        String[] c_urls = getParaValues("c_url");
        String[] url_contents = getParaValues("url_content");
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
	    ZNoticeBaoming a= ZNoticeBaoming.dao.findById(info_id);
	    if (city_id!=null)
	    {
	    a.setCityId(city_id);
    }
    if (county_id!=null)
    {
	    a.setCountyId(county_id);
    }
    if (!Strings.isNullOrEmpty(location_x))
    {
	    a.setLocationX(location_x);
    }
    if (!Strings.isNullOrEmpty(location_y))
    {
	    a.setLocationY(location_y);
    }
    if (!Strings.isNullOrEmpty(main_img))
    {
	    a.setMainImg(main_img);
    }
    if (province_id!=null)
    {
	    a.setProvinceId(province_id);
    }
	    if (status!=null)
        {
	    a.setStatus(status);
        }
	    if (!Strings.isNullOrEmpty(title))
        {
	    a.setTitle(title);
        }
    if (showincontent!=null)
    {
	    a.setShowincontent(showincontent);
    }
    if (getbaoming!=null)
    {
	    a.setGetbaoming(getbaoming);
    }
    if (getjingfei!=null)
    {
	    a.setGetjingfei(getjingfei);
    }
	    if (!Strings.isNullOrEmpty(starttime))
        {
	    a.setStarttime(new Date(sdf.parse(starttime).getTime()));
        }
	    if (!Strings.isNullOrEmpty(endtime))
        {
	    a.setEndtime(new Date(sdf.parse(endtime).getTime()));
        }
	    if (!Strings.isNullOrEmpty(b_starttime))
        {
	    a.setBStarttime(new Date(sdf.parse(b_starttime).getTime()));
        }
	    if (!Strings.isNullOrEmpty(b_endtime))
        {
	    a.setBEndtime(new Date(sdf.parse(b_endtime).getTime()));
        }
	    if(getbaoming!=0){
	    	a.setBaomingfei(new BigDecimal(baomingfei));
	    }
	    if(getjingfei!=0){
	    	a.setBaomingfei(new BigDecimal(jingfei));
	    }
	    if(issex!=0){
	    	if(mannums!=0){
	    	a.setMannums(mannums);
	    	}
	    	if(womanums!=0){
	    	a.setWomanums(womanums);
	    	}
	    	a.setIssex(issex);
	    }
	    if(nums!=0){
	    a.setNums(nums);
	    }
	    a.update();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
	    	for(ZContextPath b:ZContextPath.dao.find("select * from z_context_path where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_baoming)){
	        	b.setStatus(2);
	        	b.update();
	        }
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_baoming).save();
            }
        }
	    if ((c_urls != null && c_urls.length != 0) && (url_contents != null && url_contents.length != 0) && c_urls.length == url_contents.length)
        {
	    	for(ZInfoUrl b:ZInfoUrl.dao.find("select * from z_info_url where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_baoming)){
	        	b.delete();
	        }
            for (int i = 0; i < c_urls.length;i++)
            {
                new ZInfoUrl(a.getId(),c_urls[i],url_contents[i], GlobalStatic.c_notice_baoming).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
	}
	@Before({Tx.class, POST.class})
    public void addNoticeFankui() throws ParseException
    {
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer shownickname= getParaToInt("shownickname",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        if (Strings.isNullOrEmpty(title))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        
        if (status==null)
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
        if (Strings.isNullOrEmpty(location_x))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(location_y))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{	 
	    ZNoticeFankui a= new ZNoticeFankui();
	    a.setCityId(city_id);
	    a.setCountyId(county_id);
	    a.setLocationX(location_x);
	    a.setLocationY(location_y);
	    a.setMainImg(main_img);
	    a.setProvinceId(province_id);
	    a.setStatus(status);
	    a.setTitle(title);
	    a.setUserId(user_id);
	    a.setShownickname(shownickname);
	    a.setShowincontent(showincontent);
	    a.save();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_fankui).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}}}}
        }
	@Before({Tx.class, POST.class})
    public void changeNoticeFankui() throws ParseException
    {
		Integer info_id = getParaToInt("info_id",null);
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        String[] c_urls = getParaValues("c_url");
        String[] url_contents = getParaValues("url_content");
        
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	ZNoticeFankui a=ZNoticeFankui.dao.findById(info_id);
        if (city_id!=null)
        {
	    a.setCityId(city_id);
        }
        if (county_id!=null)
        {
	    a.setCountyId(county_id);
        }
        if (!Strings.isNullOrEmpty(location_x))
        {
	    a.setLocationX(location_x);
        }
        if (!Strings.isNullOrEmpty(location_y))
        {
	    a.setLocationY(location_y);
        }
        if (!Strings.isNullOrEmpty(main_img))
        {
	    a.setMainImg(main_img);
        }
	    a.setProvinceId(province_id);
	    if (status!=0)
        {
	    a.setStatus(status);
        }
	    if (!Strings.isNullOrEmpty(title))
        {
	    a.setTitle(title);
        }
	    if (showincontent!=0)
        {
	    a.setShowincontent(showincontent);
        }
	    a.update();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
	    	for(ZContextPath b:ZContextPath.dao.find("select * from z_context_path where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_fankui)){
	        	b.setStatus(2);
	        	b.update();
	        }
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_fankui).save();
            }
        }
	    if ((c_urls != null && c_urls.length != 0) && (url_contents != null && url_contents.length != 0) && c_urls.length == url_contents.length)
        {
	    	for(ZInfoUrl b:ZInfoUrl.dao.find("select * from z_info_url where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_fankui)){
	        	b.delete();
	        }
            for (int i = 0; i < c_urls.length;i++)
            {
                new ZInfoUrl(a.getId(),c_urls[i],url_contents[i], GlobalStatic.c_notice_fankui).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
        }
	@Before({Tx.class, POST.class})
    public void addNoticeQiuzheng() throws ParseException
    {
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        if (Strings.isNullOrEmpty(title))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        
        if (status==null)
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
        if (Strings.isNullOrEmpty(location_x))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(location_y))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{	 
	    ZNoticeQiuzheng a= new ZNoticeQiuzheng();
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
	    a.save();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_qiuzheng).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}}}}
        }
	@Before({Tx.class, POST.class})
    public void changeNoticeQiuzheng() throws ParseException
    {
		Integer info_id = getParaToInt("info_id",null);
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	ZNoticeQiuzheng a=ZNoticeQiuzheng.dao.findById(info_id);
        if (city_id!=null)
        {
	    a.setCityId(city_id);
        }
        if (county_id!=null)
        {
	    a.setCountyId(county_id);
        }
        if (!Strings.isNullOrEmpty(location_x))
        {
	    a.setLocationX(location_x);
        }
        if (!Strings.isNullOrEmpty(location_y))
        {
	    a.setLocationY(location_y);
        }
        if (!Strings.isNullOrEmpty(main_img))
        {
	    a.setMainImg(main_img);
        }
	    a.setProvinceId(province_id);
	    if (status!=0)
        {
	    a.setStatus(status);
        }
	    if (!Strings.isNullOrEmpty(title))
        {
	    a.setTitle(title);
        }
	    if (showincontent!=0)
        {
	    a.setShowincontent(showincontent);
        }
	    a.update();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
	    	for(ZContextPath b:ZContextPath.dao.find("select * from z_context_path where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_qiuzheng)){
	        	b.setStatus(2);
	        	b.update();
	        }
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_qiuzheng).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
        }
	@Before({Tx.class, POST.class})
    public void addNoticeZhengqiu() throws ParseException
    {
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        if (Strings.isNullOrEmpty(title))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        
        if (status==null)
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
        if (Strings.isNullOrEmpty(location_x))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(location_y))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{	 
	    ZNoticeZhengqiu a= new ZNoticeZhengqiu();
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
	    a.save();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_zhengqiu).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}}}}
        }
	@Before({Tx.class, POST.class})
    public void changeNoticeZhengqiu() throws ParseException
    {
		Integer info_id = getParaToInt("info_id",null);
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
	    Integer status= getParaToInt("status",0);
	    Integer showincontent= getParaToInt("showincontent",0);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	ZNoticeZhengqiu a=ZNoticeZhengqiu.dao.findById(info_id);
        if (city_id!=null)
        {
	    a.setCityId(city_id);
        }
        if (county_id!=null)
        {
	    a.setCountyId(county_id);
        }
        if (!Strings.isNullOrEmpty(location_x))
        {
	    a.setLocationX(location_x);
        }
        if (!Strings.isNullOrEmpty(location_y))
        {
	    a.setLocationY(location_y);
        }
        if (!Strings.isNullOrEmpty(main_img))
        {
	    a.setMainImg(main_img);
        }
	    a.setProvinceId(province_id);
	    if (status!=0)
        {
	    a.setStatus(status);
        }
	    if (!Strings.isNullOrEmpty(title))
        {
	    a.setTitle(title);
        }
	    if (showincontent!=0)
        {
	    a.setShowincontent(showincontent);
        }
	    a.update();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
	    	for(ZContextPath b:ZContextPath.dao.find("select * from z_context_path where info_id="+a.getId()+" and info_type="+GlobalStatic.c_notice_zhengqiu)){
	        	b.setStatus(2);
	        	b.update();
	        }
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_notice_zhengqiu).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
        }
	@Before({Tx.class, POST.class})
    public void noticeList()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        String searchname = getPara("searchname",null);
        String location_x = getPara("location_x");
        String location_y = getPara("location_y");
        
        Integer type = getParaToInt("type",0);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        Integer locationorder=getParaToInt("locationorder",null);
        Integer timeorder=getParaToInt("timeorder",null);
        Integer wartchorder=getParaToInt("wartchorder",null);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        if (Strings.isNullOrEmpty(location_x))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(location_y))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (type==0)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        StringBuilder sb = new StringBuilder("");
        StringBuilder sbs = new StringBuilder("select a.*,b.wartchs");
        if(type==1){
        	sb.append(" from z_notice_tongzhi a");
        }
        if(type==2){
        	sb.append(" from z_notice_baoming a");
        }
        if(type==3){
        	sb.append(" from z_notice_fankui a");
        }
        if(type==4){
        	sb.append(" from z_notice_qiuzheng a");
        }
        if(type==5){
        	sb.append(" from z_notice_zhengqiu a");
        }
        sb.append(" left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(11+type)+" group by info_id,info_type) b on a.id=b.info_id ");
        sb.append("where 1=1 and a.status=1");
        if (city_id != null) {
            sb.append(" and a.city_id=" + city_id);
        }
        if (county_id != null) {
            sb.append(" and a.county_id=" + county_id);
        }
        if (searchname != null) {
            sb.append(" and a.title like '%" + searchname + "%'");
        }
        if(timeorder!=null&&timeorder ==1) {
            sb.append(" order by a.create_time asc");
        }else if(timeorder!=null&&timeorder ==2){
        	sb.append(" order by a.create_time desc");
        }else if(locationorder!=null&&locationorder ==1) {
            sb.append(" order by ((convert(decimal,a.location_x)-" + location_x + ")*(convert(decimal,a.location_y)-" + location_x + ")) desc");
        }else if(locationorder!=null&&locationorder ==2){
        	sb.append(" order by ((convert(decimal,a.location_x)-" + location_x + ")*(convert(decimal,a.location_y)-" + location_x + ")) asc");
        }else if(wartchorder!=null&&wartchorder ==1) {
            sb.append(" order by b.wartchs asc");
        }else if(wartchorder!=null&&wartchorder ==2){
        	sb.append(" order by b.wartchs desc");
        }else{
        	sb.append(" order by a.create_time desc");
        }
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if(type==2){
        	for(Record record:info.getList()){
        	record.set("havenum",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and baoming_id="+record.getInt("id")));
        	record.set("haveman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=1 and baoming_id="+record.getInt("id")));
        	record.set("havewoman",Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=2 and baoming_id="+record.getInt("id")));
        	}
        	}
        checkResult(info.getList(),this,info.getTotalPage());
    }
	@Before({Tx.class, POST.class})
	 public void Notice()
	    {
	        Integer type = getParaToInt("type",0);
	        Integer info_id = getParaToInt("info_id",0);
	        if (type==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (info_id==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        StringBuilder sb = new StringBuilder("");
	        if(type==1){
	        	sb.append("select a.*,1 as types,b.wartchs from z_notice_tongzhi a ");
	        }
	        if(type==2){
	        	sb.append("select a.*,2 as types,b.wartchs from z_notice_baoming a ");
	        }
	        if(type==3){
	        	sb.append("select a.*,3 as types,b.wartchs,c.nickname from z_notice_fankui a left join z_user c on c.id=a.user_id ");
	        }
	        if(type==4){
	        	sb.append("select a.*,4 as types,b.wartchs from z_notice_qiuzheng a ");
	        }
	        if(type==5){
	        	sb.append("select a.*,5 as types,b.wartchs from z_notice_zhengqiu a ");
	        }
	        sb.append(" left join (select count(id) as wartchs,info_id,info_type from z_userclick_info where info_type="+(11+type)+" group by info_id,info_type) b on a.id=b.info_id ");
	        sb.append(" where 1=1 and a.status=1 and a.id="+info_id);

	        Record record=Db.findFirst(sb.toString());

                if (record != null) {
                    if (record != null && record.get("city_id") != null) {
                        Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID = (select top 1 PARENT_ID from region where REGION_ID = " + record.get("city_id") + ")");
                        if (record0 != null) {
                            record.setColumns(record0);
                        }
                        Record record1 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + record.get("city_id"));
                        if (record1 != null) {
                            record.setColumns(record1);
                        }
                        Record record2 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + record.get("county_id"));
                        if (record2 != null) {
                            record.setColumns(record2);
                        }
                    }
                    if (type == 1) {
                        record.set("content", Db.find("select content,img_path from z_context_path where info_id = " + info_id + " and info_type = " + GlobalStatic.c_notice_tongzhi));
                        record.set("url", Db.find("select content,url from z_info_url where info_id = " + info_id + " and info_type = " + GlobalStatic.c_notice_tongzhi));
                    }
                    if (type == 2) {
                        record.set("content", Db.find("select content,img_path from z_context_path where info_id = " + info_id + " and info_type = " + GlobalStatic.c_notice_baoming));
                        record.set("url", Db.find("select content,url from z_info_url where info_id = " + info_id + " and info_type = " + GlobalStatic.c_notice_baoming));
                        record.set("havenum", Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and baoming_id=" + info_id));
                        record.set("haveman", Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=1 and baoming_id=" + info_id));
                        record.set("havewoman", Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=2 and baoming_id=" + info_id));
                    }
                    if (type == 3) {
                        record.set("content", Db.find("select content,img_path from z_context_path where info_id = " + info_id + " and info_type = " + GlobalStatic.c_notice_fankui));
                    }
                    if (type == 4) {
                        record.set("content", Db.find("select content,img_path from z_context_path where info_id = " + info_id + " and info_type = " + GlobalStatic.c_notice_qiuzheng));
                    }
                    if (type == 5) {
                        record.set("content", Db.find("select content,img_path from z_context_path where info_id = " + info_id + " and info_type = " + GlobalStatic.c_notice_zhengqiu));
                    }
                    ZUserclickInfo zUserclickInfo = new ZUserclickInfo();
                    zUserclickInfo.set("user_id",1872).set("info_id",info_id).set("info_type",11+type)
                            .set("create_time",new Date(System.currentTimeMillis())).set("status",1).save();
                }
                renderJson(record);
	        }}
	    }
	
	@Before({Tx.class, POST.class})
	 public void  NoticePraise()
	    {
		int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer type = getParaToInt("type",0);
	        Integer info_id = getParaToInt("info_id",0);
	        Integer apply = getParaToInt("apply",1);
	        if (type<1||type>3)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (info_id==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        	ZNoticePraise c=ZNoticePraise.dao.findFirst("select * from z_notice_praise where user_id="+user_id+" and info_id="+info_id+" and info_type="+type);
	        	if(c!=null){
	        		renderJson("{\"data\":\"already did\"}");
	        	}else{
	        	ZNoticePraise a=new ZNoticePraise(user_id,info_id,type,apply);
	        	a.save();
	        	if(type==1){
	        		ZNoticeQiuzheng b=ZNoticeQiuzheng.dao.findById(info_id);
	        		if (b==null)
	    	        {
	    	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	    	        }
	        		if(apply==1){
	        		b.setTruenum(b.getTruenum()+1);
	        		}else if(apply==2){
	        		b.setFalsenum(b.getFalsenum()+1);
	        		}else if(apply==3){
	        		b.setNotsurenum(b.getNotsurenum()+1);
	        		}
	        		b.update();
	        	}else if(type==2){
	        		ZNoticeZhengqiu b=ZNoticeZhengqiu.dao.findById(info_id);
	        		if (b==null)
	    	        {
	    	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	    	        }
	        		if(apply==1){
		        		b.setTruenum(b.getTruenum()+1);
		        		}else if(apply==2){
		        		b.setFalsenum(b.getFalsenum()+1);
		        		}
	        		b.update();
	        	}
	        	else if(type==3){
	        		ZNoticeFankui b=ZNoticeFankui.dao.findById(info_id);
	        		if (b==null)
	    	        {
	    	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	    	        }
	        		b.setPraisenum(b.getPraisenum()+1);
	        		b.update();
	        	}
	        renderJson("{\"data\":\"SUCCESS\"}");
	        	}
	        }}
	    }
	@Before({Tx.class, POST.class})
    public void addNoticePinglun() throws ParseException
    {
        String content = getPara("content",null);
        Integer info_id = getParaToInt("info_id",null);
        Integer type = getParaToInt("type",null);
        int user_id = (int)getSession().getAttribute("user_id");
        ZUser u=ZUser.dao.findById(user_id);
        if (type==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(content))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        ZNoticePinglun a= new ZNoticePinglun();
	    a.setContent(content);
	    a.setNoticeId(info_id);
	    a.setUserId(user_id);
	    a.setName(u.getNickname());
	    a.setType(type);
	    a.save();
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}
        }
	@Before({Tx.class, POST.class})
    public void addNoticeReply() throws ParseException
    {
        String content = getPara("content",null);
        Integer info_id = getParaToInt("info_id",null);
        int user_id = (int)getSession().getAttribute("user_id");
        ZUser u=ZUser.dao.findById(user_id);
        if (Strings.isNullOrEmpty(content))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        ZNoticeReply a= new ZNoticeReply();
	    a.setContent(content);
	    a.setPinglunId(info_id);
	    a.setUserId(user_id);
	    a.setName(u.getNickname());
	    a.save();
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
	
    @Before({Tx.class, POST.class})
    public void NoticePinglun()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
    	
        Integer info_id = getParaToInt("info_id",null);
        Integer type = getParaToInt("type",null);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        if (type==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	StringBuilder sbs = new StringBuilder("select a.*,b.img");
        StringBuilder sb = new StringBuilder(" from z_notice_pinglun a left join z_user b on a.user_id=b.id  where a.notice_id = " + info_id + " and a.type="+type+" order by a.id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
                	List<Record> records1 = Db.find("select * from z_notice_reply where pinglun_id = " + record.get("id") + " order by id desc");
                    if(records1 != null)
                    {
                    	record.set("reply", records1);
                    }
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
        }}
        }
    
	@Before({Tx.class, POST.class})
    public void doNoticeBaoming() throws ParseException
    {
		
		Integer info_id = getParaToInt("info_id",null);
		String name = getPara("name",null);
        String content = getPara("content",null);
        Integer sex = getParaToInt("sex",0);
        Integer age = getParaToInt("age",0);
        String tel = getPara("tel",null);
        String code = getPara("code",null);
        int user_id = (int)getSession().getAttribute("user_id");
        ZUser u=ZUser.dao.findById(user_id);
        if (Strings.isNullOrEmpty(name))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(tel))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	String acs=userService.checkVerity(tel, code, 70);
        	if(acs.equals("SUCCESS")){
        if (info_id==0)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (sex==0)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (age==0)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        
        	Integer num=Db.queryInt("select nums from z_notice_baoming where id="+info_id);
        	Integer mannum=Db.queryInt("select nums from z_notice_baoming where id="+info_id);
        	Integer womannum=Db.queryInt("select womanums from z_notice_baoming where id="+info_id);
        	Integer issexs=Db.queryInt("select issex from z_notice_baoming where id="+info_id);
        	Integer havenum=Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and baoming_id="+info_id);
        	Integer havemannum=Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=1 and baoming_id="+info_id);
        	Integer havewomannum=Db.queryInt("select count(id) as num from z_notice_baoming_apply where pass=1 and sex=2 and baoming_id="+info_id);
        	Integer nums=num!=null?num:0;
        	Integer mannums=mannum!=null?mannum:0;
        	Integer womannums=womannum!=null?womannum:0;
        	Integer issex=issexs!=null?issexs:0;
        	Integer havenums=havenum!=null?havenum:0;
        	Integer havemannums=havemannum!=null?havemannum:0;
        	Integer havewomannums=havewomannum!=null?havewomannum:0;
        	if(nums==null||nums<=havenums||(issex==1&sex==1&mannums<=havemannums)||(issex==1&sex==2&womannums<=havewomannums)){
        		renderJson("{\"data\":\"already get\"}");
        	}else{
        	
        	if(Db.findFirst("select * from z_notice_baoming_apply where baoming_id="+info_id+" and user_id="+user_id)!=null)
        	{
        		renderJson("{\"data\":\"already did\"}");
        	}else{
        ZNoticeBaomingApply a= new ZNoticeBaomingApply();
	    a.setContent(content);
	    a.setName(name);
	    a.setUserId(user_id);
	    a.setAge(age);
	    a.setSex(sex);
	    a.setTel(tel);
	    a.setBaomingId(info_id);
	    a.save();
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}}}
    }else{
    	renderJson("{\"data\":\""+acs+"\"}");
    }}}
        }
	@Before({Tx.class, POST.class})
    public void passNoticeBaomingList() throws ParseException
    {
		Integer info_id = getParaToInt("info_id",null);
        int user_id = (int)getSession().getAttribute("user_id");
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        ZUser u=ZUser.dao.findById(user_id);
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	StringBuilder sbs = new StringBuilder("select *");
            StringBuilder sb = new StringBuilder(" from z_notice_Baoming_apply where baoming_id="+info_id);
            Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
            checkResult(info.getList(),this,info.getTotalPage());
        }
        }
	@Before({Tx.class, POST.class})
    public void DoPassNoticeBaoming() throws ParseException
    {
		Integer info_id = getParaToInt("info_id",null);
		Integer pass = getParaToInt("pass",1);
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	
        	ZNoticeBaomingApply a=ZNoticeBaomingApply.dao.findById(info_id);
        	a.setPass(pass);
        	a.update();
        	renderJson("{\"data\":\"SUCCESS\"}");
        }
        }
	
	@Before({Tx.class, POST.class})
    public void checkNoticeBaoming() throws ParseException
    {
		
		Integer info_id = getParaToInt("info_id",null);
        int user_id = (int)getSession().getAttribute("user_id");
        ZUser u=ZUser.dao.findById(user_id);
        if (info_id==0)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	if(Db.findFirst("select * from z_notice_Baoming_apply where baoming_id="+info_id+" and user_id="+user_id)!=null)
        	{
        		renderJson("{\"data\":\"already did\"}");
        	}else{
        		renderJson("{\"data\":\"SUCCESS\"}");
        	}
        	}
        }
	
	@Before({Tx.class, POST.class})
    public void setFankui()
    {
		
		Integer info_id = getParaToInt("info_id",null);
        if (info_id==0)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	ZNoticeFankui a=ZNoticeFankui.dao.findById(info_id);
        	a.setPass(1);
        	a.update();
        		renderJson("{\"data\":\"SUCCESS\"}");
        	}
        }
	
	@Before({Tx.class, POST.class})
    public void upPaperImg()
    {
		
		String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        if (Strings.isNullOrEmpty(main_img))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	ZUser a=ZUser.dao.findById(user_id);
        	a.setPaperImg(main_img);
        	a.setType(2);
        	a.update();
        		renderJson("{\"data\":\"SUCCESS\"}");
        	}
        }
	@Before({Tx.class, POST.class})
    public void checkPaper()
    {
		
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        	ZUser a=ZUser.dao.findById(user_id);
        	if(a.getType()==3){
        		renderJson("{\"data\":\"aleady pass\"}");
        	}else{
        		renderJson("{\"data\":\"not pass\"}");
        	}
        }
}
