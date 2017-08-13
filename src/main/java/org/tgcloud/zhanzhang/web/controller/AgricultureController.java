package org.tgcloud.zhanzhang.web.controller;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZAgriculture;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class AgricultureController extends BaseController {
	
	 @Before({Tx.class, POST.class})
	    public void add_Agriculture()
	    {
	        String classify = getPara("classify",null);//分类
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        String location_x = getPara("location_x",null);
	        String location_y = getPara("location_y",null);
	        String type = getPara("type",null);
	        Integer pricetype = getParaToInt("pricetype",0);
	        String price = getPara("price",null);
	        String priceunit = getPara("priceunit",null);
	        Integer startnumtype = getParaToInt("startnumtype",0);
	        Integer startnum = getParaToInt("startnum",0);
	        Integer havenum = getParaToInt("havenum",0);
	        String title = getPara("title",null);
	        String content = getPara("content",null);
	        String merits = getPara("merits",null);//优势
	        String linkman = getPara("linkman",null);
	        String tel = getPara("tel",null);
	        String imgs = getPara("imgs",null);
	        Integer maintype = getParaToInt("maintype",0);
	        Integer tradetimetype = getParaToInt("tradetimetype",0);
	        String tradetime = getPara("tradetime",null);
	        String tradetimeunit = getPara("tradetimeunit",null);
	        Integer areatype = getParaToInt("areatype",0);
	        String area = getPara("area",null);
	        String areaunit = getPara("areaunit",null);
	        String sheshi= getPara("sheshi",null);
	        String dipingzheng= getPara("dipingzheng",null);
	        String peitaojiju= getPara("peitaojiju",null);
	        String gaosu= getPara("gaosu",null);
	        String gangkou= getPara("gangkou",null);
	        String guodao= getPara("guodao",null);
		    String tielu= getPara("tielu",null);
		    String gaotie= getPara("gaotie",null);
		    String jichang= getPara("jichang",null);
		    Integer isneed= getParaToInt("isneed",0);
		    Integer status= getParaToInt("status",0);
	        if (Strings.isNullOrEmpty(classify))
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
	        if (Strings.isNullOrEmpty(type))
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (isneed==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (status==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else{
	        if (maintype==0)
	        {
	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	        }else if(maintype==1){
	        	 if (Strings.isNullOrEmpty(tradetime))
	 	        {
	 	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
	 	        }
	        	 if (Strings.isNullOrEmpty(tradetimeunit))
		 	        {
		 	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		 	        }
	        	 if (tradetimetype==0)
		 	        {
		 	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		 	        }
	        	 if (Strings.isNullOrEmpty(area))
		 	        {
		 	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		 	        }
	        	 if (Strings.isNullOrEmpty(areaunit))
		 	        {
		 	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		 	        }
	        	 if (areatype==0)
		 	        {
		 	            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
		 	        }
		        	 ZAgriculture news= new ZAgriculture(classify,user_id,city_id,county_id,location_x,location_y,
		 	        	    type,pricetype,price,priceunit,startnumtype,startnum,havenum,title,content,merits,
		 	        	    linkman,tel,imgs,maintype,tradetimetype,tradetime,tradetimeunit
		 	   		    ,areatype,area,areaunit,sheshi,dipingzheng,peitaojiju,gaosu,gangkou,guodao
		 			    ,tielu,gaotie,jichang,isneed,status);
		        	 news.save();
		        	 renderJson("{\"data\":\"SUCCESS\"}");
	        }else{
		        ZAgriculture news= new ZAgriculture(classify,user_id,city_id,county_id,location_x,location_y,
		        	    type,pricetype,price,priceunit,startnumtype,startnum,havenum,title,content,merits,
		        	    linkman,tel,imgs,maintype,isneed,status);
		        news.save();
		        renderJson("{\"data\":\"SUCCESS\"}");
	        }
	        }}}}}}}}
	        }
	 
	 @Before({Tx.class, POST.class})
	    public void change_Agriculture()
	    {
		 	Integer info_id = getParaToInt("info_id",null);
	        String classify = getPara("classify",null);//分类
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        String location_x = getPara("location_x",null);
	        String location_y = getPara("location_y",null);
	        String type = getPara("type",null);
	        Integer pricetype = getParaToInt("pricetype",null);
	        String price = getPara("price",null);
	        String priceunit = getPara("priceunit",null);
	        Integer startnumtype = getParaToInt("startnumtype",null);
	        Integer startnum = getParaToInt("startnum",null);
	        Integer havenum = getParaToInt("havenum",null);
	        String title = getPara("title",null);
	        String content = getPara("content",null);
	        String merits = getPara("merits",null);//优势
	        String linkman = getPara("linkman",null);
	        String tel = getPara("tel",null);
	        String imgs = getPara("imgs",null);
	        Integer maintype = getParaToInt("maintype",null);
	        Integer tradetimetype = getParaToInt("tradetimetype",null);
	        String tradetime = getPara("tradetime",null);
	        String tradetimeunit = getPara("tradetimeunit",null);
	        Integer areatype = getParaToInt("areatype",null);
	        String area = getPara("area",null);
	        String areaunit = getPara("areaunit",null);
	        String sheshi= getPara("sheshi",null);
	        String dipingzheng= getPara("dipingzheng",null);
	        String peitaojiju= getPara("peitaojiju",null);
	        String gaosu= getPara("gaosu",null);
	        String gangkou= getPara("gangkou",null);
	        String guodao= getPara("guodao",null);
		    String tielu= getPara("tielu",null);
		    String gaotie= getPara("gaotie",null);
		    String jichang= getPara("jichang",null);
		    Integer isneed= getParaToInt("isneed",null);
		    Integer status= getParaToInt("status",null);
		    ZAgriculture news=ZAgriculture.dao.findById(info_id);
	        if (!Strings.isNullOrEmpty(classify))
	        {
	        news.setClassify(classify);
	        }
	        if (city_id!=null)
	        {
			news.setCityId(city_id);
				if (county_id!=null)
		        {
					news.setCountyId(county_id);
				
		        }
	        }
	        if (!Strings.isNullOrEmpty(location_x))
	        {
			news.setLocationX(location_x);
	        }
	        if (!Strings.isNullOrEmpty(location_y))
	        {
			news.setLocationY(location_y);
	        }
	        if (type!=null)
	        {
			news.setType(type);
	        }
	        if (pricetype!=null)
	        {
			news.setPricetype(pricetype);
	        }
	        if (!Strings.isNullOrEmpty(price))
	        {
			news.setPrice(price);
	        }
	        if (!Strings.isNullOrEmpty(priceunit))
	        {
			news.setPriceunit(priceunit);
	        }
	        if (startnumtype!=null)
	        {
			news.setStartnumtype(startnumtype);
	        }
	        if (startnum!=null)
	        {
			news.setStartnum(startnum);
	        }
	        if (havenum!=null)
	        {
			news.setHavenum(havenum);
	        }
	        if (!Strings.isNullOrEmpty(title))
	        {
			news.setTitle(title);
	        }
	        if (!Strings.isNullOrEmpty(content))
	        {
			news.setContent(content);
	        }
	        if (!Strings.isNullOrEmpty(merits))
	        {
			news.setMerits(merits);
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
	        if (status!=null)
	        {
			news.setStatus(status);
	        }
	        if (maintype!=null)
	        {
			news.setMaintype(maintype);
	        }
	        if (isneed!=null)
	        {
			news.setIsneed(isneed);
	        }
	        if (!Strings.isNullOrEmpty(sheshi))
	        {
			news.setSheshi(sheshi);
	        }
	        if (!Strings.isNullOrEmpty(dipingzheng))
	        {
			news.setDipingzheng(dipingzheng);
	        }
	        if (!Strings.isNullOrEmpty(peitaojiju))
	        {
			news.setPeitaojiju(peitaojiju);
	        }
	        if (!Strings.isNullOrEmpty(gaosu))
	        {
			news.setGaosu(gaosu);
	        }
	        if (!Strings.isNullOrEmpty(gangkou))
	        {
			news.setGangkou(gangkou);
	        }
	        if (!Strings.isNullOrEmpty(guodao))
	        {
			news.setGuodao(guodao);
	        }
	        if (!Strings.isNullOrEmpty(tielu))
	        {
			news.setTielu(tielu);
	        }
	        if (!Strings.isNullOrEmpty(gaotie))
	        {
			news.setGaotie(gaotie);
	        }
	        if (!Strings.isNullOrEmpty(jichang))
	        {
			news.setJichang(jichang);
	        }

	        if(maintype!=null&maintype==1){
	        	 if (!Strings.isNullOrEmpty(tradetime))
	 	        {
	 	            news.setTradetime(tradetime);
	 	        }
	        	 if (!Strings.isNullOrEmpty(tradetimeunit))
		 	        {
	        		 news.setTradetimeunit(tradetimeunit);
		 	        }
	        	 if (tradetimetype!=null)
		 	        {
	        		 news.setTradetimetype(tradetimetype);
		 	        }
	        	 if (!Strings.isNullOrEmpty(area))
		 	        {
		 	            news.setArea(area);
		 	        }
	        	 if (!Strings.isNullOrEmpty(areaunit))
		 	        {
		 	            news.setAreaunit(areaunit);
		 	        }
	        	 if (areatype!=null)
		 	        {
		 	            news.setAreatype(areatype);
		 	        }
		        	 
	        }
	        news.update();
       	 	renderJson("{\"data\":\"SUCCESS\"}");
	        }
	 
	 @Before({Tx.class, POST.class})
	    public void Agriculture_List()
	    {
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        String searchname = getPara("searchname",null);
	        Integer maintype = getParaToInt("maintype",null);
	        
	        Integer isneed = getParaToInt("isneed");
	        String location_x = getPara("location_x");
	        String location_y = getPara("location_y");
	        
	        String type = getPara("type");
	        Integer city_id = getParaToInt("city_id",null);
	        Integer county_id = getParaToInt("county_id",null);
	        Integer locationorder=getParaToInt("locationorder",null);
	        Integer timeorder=getParaToInt("timeorder",null);
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
	        StringBuilder sb = new StringBuilder(" from z_agriculture " +
	        		"where 1=1 and status=1");
	        if (city_id != null) {
	            sb.append(" and city_id=" + city_id);
	        }
	        if (county_id != null) {
	            sb.append(" and county_id=" + county_id);
	        }
	        if (isneed != null) {
	            sb.append(" and isneed =" + isneed);
	        }
	        if (maintype != null&&maintype!=0) {
	            sb.append(" and maintype =" + maintype);
	        }
	        if (searchname != null) {
	            sb.append(" and title like '%" + searchname + "%'");
	        }
	        if (type != null) {
	            sb.append(" and classify like '%" + type + "%'");
	        }
	        sb.append(" order by ((convert(decimal,location_x)-" + location_x + ")*(convert(decimal,location_y)-" + location_x + ")) asc");
	        if(timeorder!=null&&timeorder ==1) {
	            sb.append(" ,create_time asc");
	        }else if(timeorder!=null&&timeorder ==2){
	        	sb.append(" ,create_time desc");
	        }
//	        if(locationorder!=null&&locationorder ==1) {
//	            sb.append(" order by ((convert(decimal,location_x)-" + location_x + ")*(convert(decimal,location_y)-" + location_x + ")) desc");
//	        }else if(locationorder!=null&&locationorder ==2){
	        	
//	        }
	       
	        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
	        if (!BeanUtil.isNullList(info.getList())) {
	            for (Record record : info.getList()) {
	                if(record != null && record.get("id") != null)
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
	            }
	        }
	        checkResult(info.getList(),this,info.getTotalPage());
	    }
	 
	 @Before({Tx.class, POST.class})
	    public void Agriculture()
	    {
	        int user_id = (int)getSession().getAttribute("user_id");//发布人
	        Integer info_id = getParaToInt("info_id",null);
	        Record record=Db.findById("z_agriculture", info_id);
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
}
