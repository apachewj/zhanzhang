package org.tgcloud.zhanzhang.web.controller;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZContextPath;
import org.tgcloud.zhanzhang.entity.ZInfoUrl;
import org.tgcloud.zhanzhang.entity.ZTravelGuide;
import org.tgcloud.zhanzhang.entity.ZTravelScenic;
import org.tgcloud.zhanzhang.service.CommonService;
import org.tgcloud.zhanzhang.service.TravelService;
import org.tgcloud.zhanzhang.service.UserService;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by Administrator on 2016/6/1.
 */
public class TravelController extends BaseController{

    private TravelService travelService = Enhancer.enhance(TravelService.class);

    private CommonService commonService = Enhancer.enhance(CommonService.class);

    /**
     * 获取查询的列表数据
     */
    @Before(POST.class)
    public void travel_list() throws UnsupportedEncodingException {
        /*pageSize,pageNum,city_id（城市编号）,区县county_id，params模糊关键字*/
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int PageSize = getParaToInt("PageSize",10);//一页显示数量
        Integer city_id = getParaToInt("city_id",null);
        Integer county = getParaToInt("county_id",null);
        String params = getPara("params",null);
        int type = getParaToInt("type",1);
        if (type == 1)
        {
            /*景区*/
        	Page<Record> info=travelService.selectTravelList(pageNum,PageSize,city_id,county,params);
            checkResult(info.getList(),this,info.getTotalPage());
        }
        else
        {
            /*陪游*/
            Page<Record> info=travelService.selectTravelGuideList(pageNum,PageSize,city_id,county,params);
            checkResult(info.getList(),this,info.getTotalPage());
        }

    }

    /*发布导游*/
    @Before({POST.class,Tx.class})
    public void add_guide()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        String[] c_images = getParaValues("c_image");//导游图
        String[] c_contexts = getParaValues("c_context");
        String username = getPara("username");
        Integer age = getParaToInt("age");
        Integer sex = getParaToInt("sex");
        Integer price = getParaToInt("price");
        Integer hours = getParaToInt("hours");
        Integer city_id = getParaToInt("city_id");
        Integer county_id = getParaToInt("county_id");
        Integer province_id = getParaToInt("province_id");
        String configure = getPara("configure");
        String places = getPara("place");
        String location_x = getPara("location_x");
        String location_y = getPara("location_y");
        String[] place_images = getParaValues("place_img");//景点图
        String[] place_contexts = getParaValues("place_context");
        String brand = getPara("brand");
        String category = getPara("category");
        Integer car_price = getParaToInt("car_price");
        Integer car_hours = getParaToInt("car_hours");
        String message = getPara("message");
        Integer car_c = getParaToInt("car_c");//1：提供车辆，2：不提供车辆
        String telephone = getPara("telephone");
        String[] car_images = getParaValues("car_img");//车辆图
        String[] car_contexts = getParaValues("car_context");
        Integer status = getParaToInt("status");//1:保存，3：草稿
        if (Strings.isNullOrEmpty(telephone) || Strings.isNullOrEmpty(username) || sex == null || age == null || price == null || hours == null || city_id == null || province_id == null || county_id == null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        ZTravelGuide guide = new ZTravelGuide(user_id,username,age,sex,price,hours,province_id,city_id,county_id,configure,places,brand,category,car_price,car_hours,message,telephone,status,car_c,location_x,location_y);
        guide.save();
        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(guide.getId(),c_images[i],c_contexts[i], GlobalStatic.c_guide).save();
            }

        }
        if ((place_images != null && place_images.length != 0) && (place_contexts != null && place_contexts.length != 0) && place_images.length == place_contexts.length)
        {
            for (int i = 0; i < place_images.length;i++)
            {
                new ZContextPath(guide.getId(),place_images[i],place_contexts[i], GlobalStatic.c_guide_place).save();
            }
        }
        if ((car_images != null && car_images.length != 0) && (car_contexts != null && car_contexts.length != 0) && car_images.length == car_contexts.length)
        {
            for (int i = 0; i < car_images.length;i++)
            {
                new ZContextPath(guide.getId(),car_images[i],car_contexts[i], GlobalStatic.c_guide_car).save();
            }
        }
        renderJson("{\"data\":\"SUCCESS\"}");
    }

    @Before({POST.class,Tx.class})
    public void change_guide()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer guide_id = getParaToInt("guide_id");
        String[] c_images = getParaValues("c_image");//导游图
        String[] c_contexts = getParaValues("c_context");
        String username = getPara("username",null);
        Integer age = getParaToInt("age",null);
        Integer sex = getParaToInt("sex",null);
        Integer price = getParaToInt("price",null);
        Integer hours = getParaToInt("hours",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        Integer province_id = getParaToInt("province_id",null);
        String configure = getPara("configure",null);
        String places = getPara("place",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String[] place_images = getParaValues("place_img");//景点图
        String[] place_contexts = getParaValues("place_context");
        String brand = getPara("brand",null);
        String category = getPara("category",null);
        Integer car_price = getParaToInt("car_price",null);
        Integer car_hours = getParaToInt("car_hours",null);
        String message = getPara("message",null);
        Integer car_c = getParaToInt("car_c",null);//1：提供车辆，2：不提供车辆
        String telephone = getPara("telephone",null);
        String[] car_images = getParaValues("car_img");//车辆图
        String[] car_contexts = getParaValues("car_context");
        Integer status = getParaToInt("status",null);//1:保存，3：草稿
        
        ZTravelGuide guide =ZTravelGuide.dao.findById(guide_id);
        if (!Strings.isNullOrEmpty(username))
        {
        guide.setUsername(username);
        }
        if (age!=null)
        {
        	guide.setAge(age);
        }
        if (sex!=null)
        {
        	guide.setSex(sex);
        }
        if (price!=null)
        {
        	guide.setPrice(new BigDecimal(price));
        }
        if (hours!=null)
        {
        	guide.setHours(hours);
        }
        if (province_id!=null)
        {
        	guide.setProvinceId(province_id);
        }
        if (city_id!=null)
        {
        	guide.setCityId(city_id);
        }
        if (county_id!=null)
        {
        	guide.setCountyId(county_id);
        }
        if (!Strings.isNullOrEmpty(configure))
        {
        	guide.setConfigure(configure);
        }
        if (!Strings.isNullOrEmpty(places))
        {
        	guide.setPlaces(places);
        }
        if (!Strings.isNullOrEmpty(brand))
        {
        	guide.setCarBrand(brand);
        }
        if (!Strings.isNullOrEmpty(category))
        {
        	guide.setCarCate(category);
        }
        if (car_price!=null)
        {
        	guide.setCarPrice(new BigDecimal(car_price == null?0:car_price));
        }
        if (car_hours!=null)
        {
        	guide.setCarHours(car_hours);
        }
        if (!Strings.isNullOrEmpty(message))
        {
        	guide.setMessage(message);
        }
        if (status!=null)
        {
        	guide.setStatus(status);
        }
        if (!Strings.isNullOrEmpty(telephone))
        {
        	guide.setTelephone(telephone);
        }
        if (car_c!=null)
        {
        	guide.setCarC(car_c);
        }
        if (!Strings.isNullOrEmpty(location_x))
        {
        	guide.setLocationX(location_x);
        }
        if (!Strings.isNullOrEmpty(location_y))
        {
        	guide.setLocationX(location_y);
        }
        guide.update();
        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
        	List<Record> a=Db.find("select * from z_context_path where info_id ="+guide.getId()+"and info_type="+GlobalStatic.c_guide);
	        for(Record b:a){
	        	Db.delete("z_context_path", b);
	        }
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(guide.getId(),c_images[i],c_contexts[i], GlobalStatic.c_guide).save();
            }

        }
        if ((place_images != null && place_images.length != 0) && (place_contexts != null && place_contexts.length != 0) && place_images.length == place_contexts.length)
        {
        	List<Record> a=Db.find("select * from z_context_path where info_id ="+guide.getId()+"and info_type="+GlobalStatic.c_guide_place);
	        for(Record b:a){
	        	Db.delete("z_context_path", b);
	        }
            for (int i = 0; i < place_images.length;i++)
            {
                new ZContextPath(guide.getId(),place_images[i],place_contexts[i], GlobalStatic.c_guide_place).save();
            }
        }
        if ((car_images != null && car_images.length != 0) && (car_contexts != null && car_contexts.length != 0) && car_images.length == car_contexts.length)
        {
        	List<Record> a=Db.find("select * from z_context_path where info_id ="+guide.getId()+"and info_type="+GlobalStatic.c_guide_car);
	        for(Record b:a){
	        	Db.delete("z_context_path", b);
	        }
            for (int i = 0; i < car_images.length;i++)
            {
                new ZContextPath(guide.getId(),car_images[i],car_contexts[i], GlobalStatic.c_guide_car).save();
            }
        }
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    /*发布景区*/
    @Before({Tx.class, POST.class})
    public void add_Scenic()
    {
        String title = getPara("title",null);//标题
        Integer show_status = getParaToInt("show_status",null);//1：显示主图，2：不显示主图
        String main_img = getPara("main_img",null);//主图
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        Integer province_id = getParaToInt("province_id",null);
        Integer status = getParaToInt("status",null);//1:保存，3：草稿
        Integer user_id = (int)getSession().getAttribute("user_id");//发布人
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        String[] c_urls = getParaValues("c_url");
        String[] url_contents = getParaValues("url_content");
        if (Strings.isNullOrEmpty(title))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (show_status == 1 && Strings.isNullOrEmpty(main_img))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(location_x) || Strings.isNullOrEmpty(location_y))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        ZTravelScenic scenic = new ZTravelScenic(main_img,title,show_status,city_id,province_id,county_id,status,user_id,location_x,location_y);
        scenic.save();
        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(scenic.getId(),c_images[i],c_contexts[i], GlobalStatic.c_scenic).save();
            }
        }
        if ((c_urls != null && c_urls.length != 0) && (url_contents != null && url_contents.length != 0) && c_urls.length == url_contents.length)
        {
            for (int i = 0; i < c_urls.length;i++)
            {
                new ZInfoUrl(scenic.getId(),c_urls[i],url_contents[i], GlobalStatic.c_scenic).save();
            }
        }
        renderJson("{\"data\":\"SUCCESS\"}");
    }

    @Before({Tx.class, POST.class})
    public void change_Scenic()
    {
    	Integer scenic_id = getParaToInt("scenic_id");
        String title = getPara("title",null);//标题
        Integer show_status = getParaToInt("show_status",null);//1：显示主图，2：不显示主图
        String main_img = getPara("main_img",null);//主图
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        Integer province_id = getParaToInt("province_id",null);
        Integer status = getParaToInt("status",null);//1:保存，3：草稿
        Integer user_id = (int)getSession().getAttribute("user_id");//发布人
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        String[] c_urls = getParaValues("c_url");
        String[] url_contents = getParaValues("url_content");
        ZTravelScenic scenic = ZTravelScenic.dao.findById(scenic_id);
        if (!Strings.isNullOrEmpty(main_img))
        {
        	scenic.setMainImg(main_img);
        }
        if (!Strings.isNullOrEmpty(title))
        {
        	scenic.setTitle(title);
        }
        if (show_status!=null)
        {
        	scenic.setShowStatus(show_status);
        }
        if (city_id!=null)
        {
        	scenic.setCityId(city_id);
        }
        if (county_id!=null)
        {
        	scenic.setCountyId(county_id);
        }
        if (province_id!=null)
        {
        	scenic.setProvinceId(province_id);
        }
        if (status!=null)
        {
        	scenic.setStatus(status);
        }
        if (!Strings.isNullOrEmpty(location_y))
        {
        	scenic.setLocationY(location_y);
        }
        if (!Strings.isNullOrEmpty(location_x))
        {
        	scenic.setLocationX(location_x);
        }
        scenic.update();
        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
        	List<Record> a=Db.find("select * from z_context_path where info_id ="+scenic.getId()+"and info_type="+GlobalStatic.c_scenic);
	        for(Record b:a){
	        	Db.delete("z_context_path", b);
	        }
        	
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(scenic.getId(),c_images[i],c_contexts[i], GlobalStatic.c_scenic).save();
            }
        }
        if ((c_urls != null && c_urls.length != 0) && (url_contents != null && url_contents.length != 0) && c_urls.length == url_contents.length)
        {
        	List<Record> a=Db.find("select * from z_info_url where info_id ="+scenic.getId()+"and info_type="+GlobalStatic.c_scenic);
	        for(Record b:a){
	        	Db.delete("z_info_url", b);
	        }
            for (int i = 0; i < c_urls.length;i++)
            {
                new ZInfoUrl(scenic.getId(),c_urls[i],url_contents[i], GlobalStatic.c_scenic).save();
            }
        }
        renderJson("{\"data\":\"SUCCESS\"}");
    }

    
    /*查看导游*/
    @Before({POST.class})
    public void guide()
    {
        int info_id = getParaToInt("info_id");
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Record record = travelService.selectGuideInfo(info_id,user_id);
        if (record != null)
        {
            renderJson(record);
        }
        else
        {
            renderJson("{\"data\":\"ERROR\"}");
        }
    }

    /*查看景区*/
    @Before({POST.class})
    public void scenic()
    {
        int info_id = getParaToInt("info_id");
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Record record = travelService.selectScenicInfo(info_id,user_id);
        if (record != null)
        {
            renderJson(record);
        }
        else
        {
            renderJson("{\"data\":\"ERROR\"}");
        }
    }
    
    @Before({POST.class})
    public void setUserStatus()
    {
        int info_id = getParaToInt("info_id");
        ZTravelGuide a=ZTravelGuide.dao.findById(info_id);
        if (a != null)
        {
            a.setUserStatus(2/a.getUserStatus());
            a.update();
            renderJson("{\"data\":\"SUCCESS\"}");
        }
        else
        {
            renderJson("{\"data\":\"ERROR\"}");
        }
    }
}
