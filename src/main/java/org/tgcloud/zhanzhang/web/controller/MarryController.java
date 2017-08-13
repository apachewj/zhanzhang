package org.tgcloud.zhanzhang.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.LocationUtil;
import org.tgcloud.zhanzhang.entity.ZContextPath;
import org.tgcloud.zhanzhang.entity.ZFindwork;
import org.tgcloud.zhanzhang.entity.ZFindworkPlace;
import org.tgcloud.zhanzhang.entity.ZFindworker;
import org.tgcloud.zhanzhang.entity.ZMarry;
import org.tgcloud.zhanzhang.service.UserService;


import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class MarryController extends BaseController {
	private UserService userService = Enhancer.enhance(UserService.class);
	 @Before({Tx.class, POST.class})
	    public void add_Marry()
	    {
	        String nickname = getPara("nickname",null);
	        int user_id = (int)getSession().getAttribute("user_id");
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        String location_x = getPara("location_x",null);
	        String location_y = getPara("location_y",null);
	        String hunyingguan = getPara("hunyingguan",null);
	        Integer sex = getParaToInt("sex",null);
	        Integer age = getParaToInt("age",null);
	        Integer high = getParaToInt("high",null);
	        Integer weight = getParaToInt("weight",null);
	        String degrees = getPara("degrees",null);
	        String faith = getPara("faith",null);
	        String job = getPara("job",null);//优势
	        String position = getPara("position",null);
	        Integer ismarried = getParaToInt("ismarried",null);
	        String address = getPara("address",null);
	        Integer income = getParaToInt("income",null);
	        Integer house = getParaToInt("house",2);
	        Integer car = getParaToInt("car",2);
	        Integer smoke = getParaToInt("smoke",3);
	        Integer drink = getParaToInt("drink",3);
	        Integer status = getParaToInt("status",null);
	        String hoppy = getPara("hoppy",null);
	        String requirement = getPara("requirement",null);
	        String sign = getPara("sign",null);
	        String backimg = getPara("backimg",null);
	        String imgs = getPara("imgs",null);
	        
	        String truename = getPara("truename",null);
	        String birthaddress = getPara("birthaddress",null);
	        String stayaddress = getPara("stayaddress",null);
	        String idcard = getPara("idcard",null);
	        String idimgs = getPara("idimgs",null);
	        String tel = getPara("tel",null);
	        if (Strings.isNullOrEmpty(nickname))
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
	        if (status==null)
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
	        if (sex==null||sex.intValue()<1||sex.intValue()>3)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if(status!=null&&status.intValue()==1){
		        ZMarry news= new ZMarry(nickname,hunyingguan, sex, age, high, weight
		    			,degrees,faith,job,position, ismarried,address
		    			, income, house, car, smoke, drink,hoppy,requirement
		    			,sign, user_id,backimg,imgs, city_id, county_id,location_x,
		    			location_y, truename,birthaddress,stayaddress,idcard,idimgs,tel);
		        news.save();
		        renderJson("{\"data\":\"SUCCESS\"}");
	        }
	        else if(status!=null&&status.intValue()==2){
	        	String code = getPara("code",null);
	        	if (Strings.isNullOrEmpty(code))
		        {
		            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		        }else{
		        String acs=userService.checkVerity(tel, code, 80);
	        	if(acs.equals("SUCCESS")){
		        ZMarry news= new ZMarry(nickname,hunyingguan, sex, age, high, weight
		    			,degrees,faith,job,position, ismarried,address
		    			, income, house, car, smoke, drink,hoppy,requirement
		    			,sign, user_id,backimg,imgs, city_id, county_id,location_x,
		    			location_y, truename,birthaddress,stayaddress,idcard,idimgs,tel,2);
		        news.save();
		        renderJson("{\"data\":\"SUCCESS\"}");
	        	}else{
	        		renderJson("{\"data\":\""+acs+"\"}");
	        	}}
	        }else{
	        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        }}}}}}}
	        }
	 
	 @Before({Tx.class, POST.class})
	    public void change_Marry()
	    {
		 	Integer marry_id = getParaToInt("marry_id",null);
	        String nickname = getPara("nickname",null);
	        int user_id = (int)getSession().getAttribute("user_id");
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        String location_x = getPara("location_x",null);
	        String location_y = getPara("location_y",null);
	        String hunyingguan = getPara("hunyingguan",null);
	        Integer sex = getParaToInt("sex",null);
	        Integer age = getParaToInt("age",null);
	        Integer high = getParaToInt("high",null);
	        Integer weight = getParaToInt("weight",null);
	        String degrees = getPara("degrees",null);
	        String faith = getPara("faith",null);
	        String job = getPara("job",null);//优势
	        String position = getPara("position",null);
	        Integer ismarried = getParaToInt("ismarried",null);
	        String address = getPara("address",null);
	        Integer income = getParaToInt("income",null);
	        Integer house = getParaToInt("house",2);
	        Integer car = getParaToInt("car",2);
	        Integer smoke = getParaToInt("smoke",3);
	        Integer drink = getParaToInt("drink",3);
	        Integer status = getParaToInt("status",null);
	        String hoppy = getPara("hoppy",null);
	        String requirements = getPara("requirement",null);
	        String sign = getPara("sign",null);
	        String backimg = getPara("backimg",null);
	        String imgs = getPara("imgs",null);
	        String truename = getPara("truename",null);
	        String birthaddress = getPara("birthaddress",null);
	        String stayaddress = getPara("stayaddress",null);
	        String idcard = getPara("idcard",null);
	        String idimgs = getPara("idimgs",null);
	        String tel = getPara("tel",null);
	        ZMarry a=ZMarry.dao.findById(marry_id);
	        if(Strings.isNullOrEmpty(nickname)){
	        a.setNickname(nickname);
	        }
	        if(Strings.isNullOrEmpty(hunyingguan)){
	        a.setHunyingguan(hunyingguan);
	        }
	        if(sex!=null){
	        a.setSex(sex);
	        }
	        if(age!=null){
	        a.setAge(age);
	        }
	        if(high!=null){
	        a.setHigh(high);
	        }
	        if(weight!=null){
	        a.setWeight(weight);
	        }
	        if(!Strings.isNullOrEmpty(degrees)){
			a.setDegrees(degrees);
	        }
	        if(!Strings.isNullOrEmpty(faith)){
			a.setFaith(faith);
	        }
	        if(!Strings.isNullOrEmpty(job)){
			a.setJob(job);
	        }
	        if(!Strings.isNullOrEmpty(position)){
			a.setPosition(position);
	        }
	        if(ismarried!=null){
			a.setIsmarried(ismarried);
	        }
	        if(!Strings.isNullOrEmpty(address)){
			a.setAddress(address);
	        }
	        if(income!=null){
			a.setIncome(income);
	        }
	        if(house!=null){
			a.setHouse(house);
	        }
	        if(car!=null){
			a.setCar(car);
	        }
	        if(smoke!=null){
			a.setSmoke(smoke);
	        }
	        if(drink!=null){
			a.setDrink(drink);
	        }
	        if(!Strings.isNullOrEmpty(hoppy)){
			a.setHoppy(hoppy);
	        }
	        if(!Strings.isNullOrEmpty(requirements)){
			a.setRequirements(requirements);
	        }
	        if(!Strings.isNullOrEmpty(sign)){
			a.setSign(sign);
	        }
	        if(!Strings.isNullOrEmpty(backimg)){
			a.setBackimg(backimg);
	        }
	        if(!Strings.isNullOrEmpty(imgs)){
			a.setImgs(imgs);
	        }
	        if(city_id!=null){
			a.setCityId(city_id);
	        }
	        if(county_id!=null){
			a.setCountyId(county_id);
	        }
	        if(!Strings.isNullOrEmpty(location_x)){
			a.setLocationX(location_x);
	        }
	        if(!Strings.isNullOrEmpty(location_y)){
			a.setLocationY(location_y);
	        }
	        if(!Strings.isNullOrEmpty(truename)){
			a.setTruename(truename);
	        }
	        if(!Strings.isNullOrEmpty(birthaddress)){
			a.setBirthaddress(birthaddress);
	        }
	        if(!Strings.isNullOrEmpty(stayaddress)){
			a.setStayaddress(stayaddress);
	        }
	        if(!Strings.isNullOrEmpty(idcard)){
			a.setIdcard(idcard);
	        }
	        if(!Strings.isNullOrEmpty(idimgs)){
			a.setIdimgs(idimgs);
	        }
	        if(!Strings.isNullOrEmpty(tel)){
			a.setTel(tel);
	        }
	        a.update();
	        renderJson("{\"data\":\"SUCCESS\"}");
	        }
	 
	 @Before({Tx.class, POST.class})
	    public void Marry()
	    {
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer info_id = getParaToInt("info_id",null);
	        Record a=Db.findById("z_marry", info_id);
	        if(a != null && a.get("id") != null)
            {	
            	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID = (select top 1 PARENT_ID from region where REGION_ID = " + a.get("city_id")+")");
                if(record0 != null)
                {
                    a.setColumns(record0);
                }
                Record record1 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + a.get("city_id"));
                if(record1 != null)
                {
                    a.setColumns(record1);
                }
                Record record2 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + a.get("county_id"));
                if(record2 != null)
                {
                    a.setColumns(record2);
                }
            }
	        renderJson(a);
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void Marry_List()
	    {
		 	String searchname = getPara("searchname",null);
	        Integer sex = getParaToInt("sex",0);
	        String location_x = getPara("location_x",null);
	        String location_y = getPara("location_y",null);
	        int startage=getParaToInt("startage",0);
	        int endage=getParaToInt("endage",0);
	        int starthigh=getParaToInt("starthigh",0);
	        int endhigh=getParaToInt("endhigh",0);
	        Integer startincome = getParaToInt("startincome",null);
	        Integer endincome = getParaToInt("endincome",null);
	        String degrees = getPara("degrees",null);
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
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
	        StringBuilder sbs = new StringBuilder("select *");
	        StringBuilder sb = new StringBuilder(" from z_marry " +
	        		"where 1=1 and status=1");
	        if (sex != 0) {
	            sb.append(" and sex=" + sex);
	        }
	        if (startage != 0) {
	            sb.append(" and age>=" + startage);
	        }
	        if (endage != 0) {
	            sb.append(" and age<=" + endage);
	        }
	        if (starthigh != 0) {
	            sb.append(" and high>=" + starthigh);
	        }
	        if (endhigh != 0) {
	            sb.append(" and high<=" + endhigh);
	        }
	        if (city_id != null) {
	            sb.append(" and city_id=" + city_id);
	        }
	        if (county_id != null) {
	            sb.append(" and county_id=" + county_id);
	        }
	        if (startincome != null) {
	            sb.append(" and income>=" + startincome);
	        }
	        if (endincome != null) {
	            sb.append(" and income<=" + endincome);
	        }
	        if (degrees != null) {
	            sb.append(" and degrees = '" + degrees + "'");
	        }
	        if (searchname != null) {
	            sb.append(" and nickname like '%" + searchname + "%'");
	        }
	        	sb.append(" order by id desc");
	        	sb.append(" ,(location_x-" + location_x + ")*(location_y-"+location_y+") desc");
	       
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	                if(record != null && record.get("id") != null)
	                {	
	                  record.set("distance",  LocationUtil.getDistance(location_x,location_y,record.getStr("location_x"),record.getStr("location_y")));
	                }
	            }
	        }
	        checkResult(info.getList(),this,info.getTotalPage());
	    }
	 

	 @Before({Tx.class, POST.class})
	    public void add_Findwork()
	    {
	        String title = getPara("title",null);
	        String name = getPara("name",null);
	        Integer sex = getParaToInt("sex",null);
	        Integer age = getParaToInt("age",null);
	        int user_id = (int)getSession().getAttribute("user_id");
	        String province_id = getPara("province_id",null);
	        String city_id = getPara("city_id",null);
	        String county_id = getPara("county_id",null);
	        String worktime = getPara("worktime",null);
	        String degrees = getPara("degrees",null);
	        String trade = getPara("trade",null);
	        String job = getPara("job",null);
	        String income = getPara("income",null);
	        String introduce = getPara("introduce",null);//优势
	        String choice = getPara("choice",null);
	        String linkman = getPara("linkman",null);
	        String tel = getPara("tel",null);
	        String img = getPara("img",null);
	        Integer showtel = getParaToInt("showtel",0);
	        Integer showcontact = getParaToInt("showcontact",0);
	        Integer status = getParaToInt("status",null);
	        String[] pd = province_id.split(",");
	        String[] cd = city_id.split(",");
	        String[] ccd = county_id.split(",");
	        if (Strings.isNullOrEmpty(title))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(trade))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (province_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (city_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (county_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(linkman))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(tel))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        	ZFindwork news= new ZFindwork(title,name,sex,age,user_id,worktime,degrees,trade,job,income,introduce,choice,linkman,tel,img,showtel,showcontact,status);
		        news.save();
		        if ((pd != null && pd.length != 0) && (cd != null && cd.length != 0)&& (ccd != null && ccd.length != 0) && pd.length == pd.length&&pd.length==ccd.length)
		        {
		            for (int i = 0; i < pd.length;i++)
		            {
		                new ZFindworkPlace(news.getId(),Integer.parseInt(pd[i]),Integer.parseInt(cd[i]),Integer.parseInt(ccd[i])).save();
		            }

		        }
		        renderJson("{\"data\":\"SUCCESS\"}");
	        }

	 @Before({Tx.class, POST.class})
	    public void change_Findwork()
	    {
	        String title = getPara("title",null);
	        String name = getPara("name",null);
	        Integer findwork_id = getParaToInt("findwork_id",null);
	        Integer sex = getParaToInt("sex",null);
	        Integer age = getParaToInt("age",null);
	        int user_id = (int)getSession().getAttribute("user_id");
	        String province_id = getPara("province_id",null);
	        String city_id = getPara("city_id",null);
	        String county_id = getPara("county_id",null);
	        String worktime = getPara("worktime",null);
	        String degrees = getPara("degrees",null);
	        String trade = getPara("trade",null);
	        String job = getPara("job",null);
	        String income = getPara("income",null);
	        String introduce = getPara("introduce",null);//优势
	        String choice = getPara("choice",null);
	        String linkman = getPara("linkman",null);
	        String tel = getPara("tel",null);
	        String img = getPara("img",null);
	        Integer showtel = getParaToInt("showtel",0);
	        Integer showcontact = getParaToInt("showcontact",0);
	        Integer status = getParaToInt("status",null);
	        String[] pd = province_id.split(",");
	        String[] cd = city_id.split(",");
	        String[] ccd = county_id.split(",");
	        ZFindwork news=ZFindwork.dao.findById(findwork_id);
     if (!Strings.isNullOrEmpty(title))
     {
	        news.setTitle(title);
     }
     if (!Strings.isNullOrEmpty(name))
     {
			news.setName(name);
     }
     if (sex!=null)
     {
			news.setSex(sex);
     }
     if (age!=null)
     {
			news.setAge(age);
     }
     if (!Strings.isNullOrEmpty(worktime))
     {
			news.setWorktime(worktime);
     }
     if (!Strings.isNullOrEmpty(degrees))
     {
			news.setDegrees(degrees);
     }
     if (!Strings.isNullOrEmpty(trade))
     {
			news.setTrade(trade);
     }
     if (!Strings.isNullOrEmpty(job))
     {
			news.setJob(job);
     }
     if (!Strings.isNullOrEmpty(income))
     {
			news.setIncome(income);
     }
     if (!Strings.isNullOrEmpty(introduce))
     {
		
    	 news.setIntroduce(introduce);
     }
     if (!Strings.isNullOrEmpty(choice))
     {
			news.setChoice(choice);
			
     }
     if (!Strings.isNullOrEmpty(linkman))
     {
    	 news.setLinkman(linkman);
     }
     if (!Strings.isNullOrEmpty(tel))
     {
			news.setTel(tel);
     }
     if (!Strings.isNullOrEmpty(img))
     {
			news.setImg(img);
     }
     if (showtel!=null)
     {
			news.setShowtel(showtel);
     }
     if (showcontact!=null)
     {
			news.setShowcontact(showcontact);
     }
     if (status!=null)
     {
			news.setStatus(status);
     }
	        news.update();
		        if ((pd != null && pd.length != 0) && (cd != null && cd.length != 0)&& (ccd != null && ccd.length != 0) && pd.length == pd.length&&pd.length==ccd.length)
		        {
		        	for(ZFindworkPlace a:ZFindworkPlace.dao.find("select * from z_findwork_place where f_id="+news.getId())){
		        		a.delete();
		        	}
		            for (int i = 0; i < pd.length;i++)
		            {
		                new ZFindworkPlace(news.getId(),Integer.parseInt(pd[i]),Integer.parseInt(cd[i]),Integer.parseInt(ccd[i])).save();
		            }

		        }
		        renderJson("{\"data\":\"SUCCESS\"}");
	        }

	 
	 @Before({Tx.class, POST.class})
	    public void add_Findworker()
	    {
	        String title = getPara("title",null);
	        Integer sex = getParaToInt("sex",null);
	        String age = getPara("age",null);
	        int user_id = (int)getSession().getAttribute("user_id");
	        Integer province_id = getParaToInt("province_id");
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        String nums = getPara("nums",null);
	        String income = getPara("income",null);
	        String choice = getPara("choice",null);
	        String restday = getPara("restday",null);
	        String worktime = getPara("worktime",null);
	        String degrees = getPara("degrees",null);
	        String remarks = getPara("remarks",null);
	        String companyname = getPara("companyname",null);
	        String trade = getPara("trade",null);
	        String introduce = getPara("introduce",null);
	        String linkman = getPara("linkman",null);
	        String tel = getPara("tel",null);
	        String imgs = getPara("imgs",null);
	        Integer showtel = getParaToInt("showtel",0);
	        Integer showcontact = getParaToInt("showcontact",0);
	        Integer status = getParaToInt("status",null);
	        if (Strings.isNullOrEmpty(title))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(trade))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(companyname))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (province_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (city_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (county_id==null)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(linkman))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        if (Strings.isNullOrEmpty(tel))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }
	        	ZFindworker news= new ZFindworker(title,nums,sex,age,user_id,province_id,
	        			city_id,county_id,income,choice,restday,
	        		    worktime,degrees,remarks,companyname,trade,introduce,
	        		    linkman,tel,imgs,showtel,showcontact,status);
		        news.save();
		        renderJson("{\"data\":\"SUCCESS\"}");
	        }
	 
	 @Before({Tx.class, POST.class})
	    public void change_Findworker()
	    {
		 Integer findworker_id = getParaToInt("findworker_id",null);
	        String title = getPara("title",null);
	        Integer sex = getParaToInt("sex",null);
	        String age = getPara("age",null);
	        int user_id = (int)getSession().getAttribute("user_id");
	        Integer province_id = getParaToInt("province_id");
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        String nums = getPara("nums",null);
	        String income = getPara("income",null);
	        String choice = getPara("choice",null);
	        String restday = getPara("restday",null);
	        String worktime = getPara("worktime",null);
	        String degrees = getPara("degrees",null);
	        String remarks = getPara("remarks",null);
	        String companyname = getPara("companyname",null);
	        String trade = getPara("trade",null);
	        String introduce = getPara("introduce",null);
	        String linkman = getPara("linkman",null);
	        String tel = getPara("tel",null);
	        String imgs = getPara("imgs",null);
	        Integer showtel = getParaToInt("showtel",0);
	        Integer showcontact = getParaToInt("showcontact",0);
	        Integer status = getParaToInt("status",null);
	        ZFindworker news=ZFindworker.dao.findById(findworker_id);
	        if (!Strings.isNullOrEmpty(title))
	        {
	        	news.setTitle(title);
	        }     
	        if (!Strings.isNullOrEmpty(nums))
	        {
	    		news.setNums(nums);
	        }     
	        if (sex!=null)
	        {
	    		news.setSex(sex);
	        }     
	        if (!Strings.isNullOrEmpty(age))
	        {
	        	news.setAge(age);
	        }
	        if (province_id!=null)
	        {
	        	news.setProvinceId(province_id);
	        }
	    		
	    		if (city_id!=null)
		        {
	    			news.setCityId(city_id);
		        }
	    		if (county_id!=null)
		        {
	    			news.setCountyId(county_id);
		        }
	    		if (!Strings.isNullOrEmpty(income))
		        {
	    			news.setIncome(income);
		        }
	    		if (!Strings.isNullOrEmpty(choice))
		        {
	    			news.setChoice(choice);
		        }
	    		if (!Strings.isNullOrEmpty(worktime))
		        {
	    			news.setWorktime(worktime);
		        }
	    		if (!Strings.isNullOrEmpty(restday))
		        {
	    			news.setRestday(restday);
		        }
	    		if (!Strings.isNullOrEmpty(degrees))
		        {
	    			news.setDegrees(degrees);
		        }
	    		if (!Strings.isNullOrEmpty(trade))
		        {
	    			news.setTrade(trade);
		        }
	    		if (!Strings.isNullOrEmpty(remarks))
		        {
	    			news.setRemarks(remarks);
		        }
	    		if (!Strings.isNullOrEmpty(companyname))
		        {
	    			news.setCompanyname(companyname);
		        }
	    		if (!Strings.isNullOrEmpty(introduce))
		        {
	    			news.setIntroduce(introduce);
		        }
	    		if (!Strings.isNullOrEmpty(linkman))
		        {
	    			news.setLinkman(linkman);
		        }
	    		if (!Strings.isNullOrEmpty(tel))
		        {
	    			news.setTel(tel);
		        }
	    		if (!Strings.isNullOrEmpty(imgs))
		        {
	    			news.setImgs(imgs);
		        }
	    		if (showtel!=null)
		        {
	    			news.setShowtel(showtel);
		        }
	    		if (showcontact!=null)
		        {
	    			news.setShowcontact(showcontact);
		        }
	    		if (status!=null)
		        {
	    			news.setStatus(status);
		        }
	    		news.update();
		        renderJson("{\"data\":\"SUCCESS\"}");
	        }
	 
	 @Before({Tx.class, POST.class})
	    public void Findwork()
	    {
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer info_id = getParaToInt("info_id",null);
	        Record record=Db.findById("z_findwork", info_id);
	        String sb = new String("select * from z_findwork_place where f_id=" +info_id);
	        List<Record> info = Db.find(sb);
	        if (!BeanUtil.isNullList(info)) {
	            for (Record aaa : info) {
	                if(aaa != null && aaa.get("city_id") != null)
	                {	
	                	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + aaa.get("province_id"));
	                    if(record0 != null)
	                    {
	                        aaa.setColumns(record0);
	                    }
	                    Record record1 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + aaa.get("city_id"));
	                    if(record1 != null)
	                    {
	                        aaa.setColumns(record1);
	                    }
	                    Record record2 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + aaa.get("county_id"));
	                    if(record2 != null)
	                    {
	                        aaa.setColumns(record2);
	                    }
	                }
	            }
	        }
	        record.set("diqu", info);
	        renderJson(record);
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void Findworker()
	    {
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer info_id = getParaToInt("info_id",null);
	        Record a=Db.findById("z_findworker", info_id);
	        if(a != null && a.get("city_id") != null)
            {	
            	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + a.get("province_id"));
                if(record0 != null)
                {
                    a.setColumns(record0);
                }
                Record record1 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + a.get("city_id"));
                if(record1 != null)
                {
                    a.setColumns(record1);
                }
                Record record2 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + a.get("county_id"));
                if(record2 != null)
                {
                    a.setColumns(record2);
                }
            }
	        renderJson(a);
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void Findwork_List()
	    {
		 	String searchname = getPara("searchname",null);
	        String trade = getPara("trade",null);
	        String degrees = getPara("degrees",null);
	        String choice = getPara("choice",null);
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        int pageNum = getParaToInt("pageNum",1);//当前页面
	        int pageSize = getParaToInt("PageSize",10);//一页显示数量
	        String[] aa = null;
	        if(choice!=null){
	        	aa=choice.split(",");
	        }
	        StringBuilder sbs = new StringBuilder("select a.*,b.province_id,b.city_id,b.county_id");
	        StringBuilder sb = new StringBuilder(" from z_findwork a left join z_findwork_place b on b.f_id=a.id " +
	        		"where 1=1 and a.status=1");
	        if (city_id != null) {
	            sb.append(" and b.city_id=" + city_id);
	        }
	        if (county_id != null) {
	            sb.append(" and b.county_id=" + county_id);
	        }
	        if (trade != null) {
	            sb.append(" and a.trade = '" + trade + "'");
	        }
	        if (degrees != null) {
	            sb.append(" and a.degrees = '" + degrees + "'");
	        }
	        if (searchname != null) {
	            sb.append(" and a.title like '%" + searchname + "%'");
	        }
	        if(aa!=null&&aa.length>0){
	        	for(String a:aa){
	        		sb.append(" and a.choice like '%" + a + "%'");
	        	}
	        }
	        sb.append("order by a.createtime desc");
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	            	if(record != null && record.get("city_id") != null)
	                {	
	                	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + record.get("province_id"));
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
	            }
	        }
	        checkResult(info.getList(),this,info.getTotalPage());
	    }
	 @Before({Tx.class, POST.class})
	    public void Findworker_List()
	    {
		 String searchname = getPara("searchname",null);
	        String trade = getPara("trade",null);
	        String income = getPara("income",null);
	        String choice = getPara("choice",null);
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        int pageNum = getParaToInt("pageNum",1);//当前页面
	        int pageSize = getParaToInt("PageSize",10);//一页显示数量
	        String[] aa = null;
	        if(choice!=null){
	        	aa=choice.split(",");
	        }
	        StringBuilder sbs = new StringBuilder("select *");
	        StringBuilder sb = new StringBuilder(" from z_findworker " +
	        		"where 1=1 and status=1");
	        if (city_id != null) {
	            sb.append(" and city_id=" + city_id);
	        }
	        if (county_id != null) {
	            sb.append(" and county_id=" + county_id);
	        }
	        if (trade != null) {
	            sb.append(" and trade = '" + trade + "'");
	        }
	        if (income != null) {
	            sb.append(" and income = '" + income + "'");
	        }
	        if (searchname != null) {
	            sb.append(" and title like '%" + searchname + "%'");
	        }
	        if(aa!=null&&aa.length>0){
	        	for(String a:aa){
	        		sb.append(" and choice like '%" + a + "%'");
	        	}
	        }
	        sb.append(" order by createtime desc");
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	                if(record != null && record.get("city_id") != null)
	                {	
	                	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + record.get("province_id"));
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
	            }
	        }
	        checkResult(info.getList(),this,info.getTotalPage());
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void Mywork_List()
	    {
		 	int user_id = (int)getSession().getAttribute("user_id");
	        int pageNum = getParaToInt("pageNum",1);//当前页面
	        int pageSize = getParaToInt("PageSize",10);//一页显示数量
	        StringBuilder sbs = new StringBuilder("select title,createtime,province_id,city_id,county_id,income,news,status");
	        StringBuilder sb = new StringBuilder(" from (select title,createtime,province_id,city_id,county_id,income,case when nums IS NULL then '若干' when nums=0 then '若干' ELSE convert(varchar(20),nums) + '人' END AS news,status from z_findworker " +
	        		"where a.status=1");
	        sb.append(" and user_id = " + user_id);
	        sb.append("union all (select a.title,a.createtime,b.province_id,b.city_id,b.county_id,income,degrees as news,status from z_findwork a left join z_findwork_place b on b.f_id=a.id " +
	        		"where a.status=1");
	        sb.append(" and a.user_id = " + user_id);
	        sb.append(")) c order by createtime desc");
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	                if(record != null && record.get("city_id") != null)
	                {	
	                	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + record.get("province_id"));
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
	            }
	        }
	        checkResult(info.getList(),this,info.getTotalPage());
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void Main_List()
	    {
		 String searchname = getPara("searchname",null);
		 
	        int pageNum = getParaToInt("pageNum",1);//当前页面
	        int pageSize = getParaToInt("PageSize",10);//一页显示数量
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        String location_x = getPara("location_x",null);
	        String location_y = getPara("location_y",null);
	        StringBuilder sbs = new StringBuilder("select title,createtime,province_id,city_id,county_id,income,news,status");
	        StringBuilder sb = new StringBuilder(" from (select title,createtime,province_id,city_id,county_id,income,case when nums IS NULL then '若干' when nums=0 then '若干' ELSE convert(varchar(20),nums) + '人' END AS news,status from z_findworker " +
	        		"where status=1");
	        if (searchname != null) {
	            sb.append(" and title like '%" + searchname + "%'");
	        }
	        if (city_id != null) {
	            sb.append(" and city_id=" + city_id);
	        }
	        if (county_id != null) {
	            sb.append(" and county_id=" + county_id);
	        }
	        sb.append("union all (select a.title,a.createtime,b.province_id,b.city_id,b.county_id,income,degrees as news,status from z_findwork a left join z_findwork_place b on b.f_id=a.id " +
	        		"where 1=1");
	        if (searchname != null) {
	            sb.append(" and title like '%" + searchname + "%'");
	        }
	        if (city_id != null) {
	            sb.append(" and city_id=" + city_id);
	        }
	        if (county_id != null) {
	            sb.append(" and county_id=" + county_id);
	        }
	        
	        sb.append(")) c order by createtime desc");
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	                if(record != null && record.get("city_id") != null)
	                {	
	                	Record record0 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID =" + record.get("province_id"));
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
	            }
	        }
	        checkResult(info.getList(),this,info.getTotalPage());
	    }
}

