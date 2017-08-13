package org.tgcloud.zhanzhang.web.controller;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZAgriculture;
import org.tgcloud.zhanzhang.entity.ZCards;
import org.tgcloud.zhanzhang.entity.ZContextPath;
import org.tgcloud.zhanzhang.entity.ZCrowd;
import org.tgcloud.zhanzhang.entity.ZCrowdDonate;
import org.tgcloud.zhanzhang.entity.ZCrowdHongshizi;
import org.tgcloud.zhanzhang.entity.ZCrowdReply;
import org.tgcloud.zhanzhang.entity.ZCrowdShenfen;
import org.tgcloud.zhanzhang.entity.ZCrowdYiyuan;
import org.tgcloud.zhanzhang.entity.ZCrowdZhanghao;
import org.tgcloud.zhanzhang.entity.ZUser;
import org.tgcloud.zhanzhang.service.OrderService;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.aop.Enhancer;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class CrowdController extends BaseController {
	
	private OrderService orderService = Enhancer.enhance(OrderService.class);
	@Before({Tx.class, POST.class})
    public void addCrowd() throws ParseException
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
        String moneys = getPara("money",null);
        String endtime = getPara("endtime",null);
        String name = getPara("name",null);
        String tel = getPara("tel",null);
        String type = getPara("type",null);
        Integer showtel = getParaToInt("showtel",0);
        Integer showcontact = getParaToInt("showcontact",0);
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
        if (Strings.isNullOrEmpty(moneys))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(endtime))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(name))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(type))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(tel))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        BigDecimal money=new BigDecimal(moneys);	 
	    ZCrowd a= new ZCrowd();
	    a.setCityId(city_id);
	    a.setCountyId(county_id);
	    a.setEndtime(new java.sql.Date(sdf.parse(endtime).getTime()));
	    a.setLocationX(location_x);
	    a.setLocationY(location_y);
	    a.setMainImg(main_img);
	    a.setMoney(money);
	    a.setName(name);
	    a.setProvinceId(province_id);
	    a.setShowcontact(showcontact);
	    a.setShowtel(showtel);
	    a.setStatus(status);
	    a.setTel(tel);
	    a.setType(type);
	    a.setTitle(title);
	    a.setUserId(user_id);
	    a.setShowincontent(showincontent);
	    a.save();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_crowd).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}}}}}}}}}
        }
	
	@Before({Tx.class, POST.class})
    public void change_Crowd() throws ParseException
    {
		Integer crowd_id = getParaToInt("crowd_id",null);
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String main_img = getPara("main_img",null);//分类
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer province_id = getParaToInt("province_id",null);
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        String location_x = getPara("location_x",null);
        String location_y = getPara("location_y",null);
        String title = getPara("title",null);
        String moneys = getPara("money",null);
        String endtime = getPara("endtime",null);
        String name = getPara("name",null);
        String tel = getPara("tel",null);
        String type = getPara("type",null);
        Integer showtel = getParaToInt("showtel",null);
        Integer showcontact = getParaToInt("showcontact",null);
	    Integer status= getParaToInt("status",null);
	    Integer showincontent= getParaToInt("showincontent",null);
	    String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        BigDecimal money=new BigDecimal(moneys);	 
	    ZCrowd a=ZCrowd.dao.findById(crowd_id);
	    if (city_id!=null)
	    {
	    a.setCityId(city_id);
        }
	        if (county_id!=null)
	        {
	    a.setCountyId(county_id);
	        }
	        if (!Strings.isNullOrEmpty(endtime))
	        {
	    a.setEndtime(new java.sql.Date(sdf.parse(endtime).getTime()));
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
	        if (money!=null)
	        {
	    a.setMoney(money);
	        }
	        if (!Strings.isNullOrEmpty(name))
	        {
	    a.setName(name);
	        }
	        if (province_id!=null)
	        {
	    a.setProvinceId(province_id);
	        }
	        if (showcontact!=null)
	        {
	    a.setShowcontact(showcontact);
	        }
	        if (showtel!=null)
	        {
	    a.setShowtel(showtel);
	        }
	        if (status!=null)
	        {
	    a.setStatus(status);
	        }
	        if (!Strings.isNullOrEmpty(tel))
	        {
	    a.setTel(tel);
	        }
	        if (type!=null)
	        {
	    a.setType(type);
	        }
	        if (!Strings.isNullOrEmpty(title))
	        {
	    a.setTitle(title);
	        }
	        if (showincontent!=null)
	        {
	    a.setShowincontent(showincontent);
	        }
	    a.update();
	    if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
	    	for(ZContextPath b:ZContextPath.dao.find("select * from z_context_path where info_id="+a.getId()+" and info_type="+GlobalStatic.c_crowd)){
	        	b.setStatus(2);
	        	b.update();
	        }
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(a.getId(),c_images[i],c_contexts[i], GlobalStatic.c_crowd).save();
            }
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
	
	@Before({Tx.class, POST.class})
    public void addCrowdHongshizi()
    {
		Integer crowd_id = getParaToInt("crowd_id",null);
        String imgs = getPara("imgs",null);//分类
        String link_name = getPara("link_name",null);
        String link_tel = getPara("link_tel",null);
        if (Strings.isNullOrEmpty(imgs))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        ZCrowdHongshizi a=ZCrowdHongshizi.dao.findFirst("select * from z_crowd_hongshizi where crowd_id="+crowd_id);
        if(a==null){
        a=new ZCrowdHongshizi();
        a.setCrowdId(crowd_id);
        a.setImgs(imgs);
        a.setLinkName(link_name);
        a.setLinkTel(link_tel);
        a.save();
        }else{
        	a.setLinkName(link_name);
            a.setLinkTel(link_tel);
        	a.setImgs(imgs);
        	a.setPass(0);
        	a.update();
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
	@Before({Tx.class, POST.class})
    public void addCrowdYiyuan()
    {
		Integer crowd_id = getParaToInt("crowd_id",null);
        String imgs = getPara("imgs",null);//分类
        if (crowd_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(imgs))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        ZCrowdYiyuan a=ZCrowdYiyuan.dao.findFirst("select * from z_crowd_yiyuan where crowd_id="+crowd_id);
        if(a==null){
        a=new ZCrowdYiyuan();
        a.setCrowdId(crowd_id);
        a.setImgs(imgs);
        a.save();
        }else{
        	a.setImgs(imgs);
        	a.setPass(0);
        	a.update();
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}
        }
	@Before({Tx.class, POST.class})
    public void addShenfen()
    {
		String truename = getPara("truename",null);
		String idnumber = getPara("idnumber",null);
		Integer crowd_id = getParaToInt("crowd_id",null);
        String imgs = getPara("imgs",null);
        if (crowd_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(imgs))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        ZCrowdShenfen a=ZCrowdShenfen.dao.findFirst("select * from z_crowd_shenfen where crowd_id="+crowd_id);
        if(a==null){
        a=new ZCrowdShenfen();
        a.setCrowdId(crowd_id);
        a.setImgs(imgs);
        a.setTruename(truename);
        a.setIdnumber(idnumber);
        a.save();
        }else{
        	a.setImgs(imgs);
            a.setTruename(truename);
            a.setIdnumber(idnumber);
        	a.setPass(0);
        	a.update();
        }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}
        }
	
    public void addZhanghao()
    {
		String owner = getPara("owner",null);
		String cardnum = getPara("cardnum",null);
		Integer crowd_id = getParaToInt("crowd_id",null);
        String bank = getPara("bank",null);
        String bindtel = getPara("bindtel",null);
        if (Strings.isNullOrEmpty(owner))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(cardnum))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(bank))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (Strings.isNullOrEmpty(bindtel))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (crowd_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        ZCrowdZhanghao a=ZCrowdZhanghao.dao.findFirst("select * from z_crowd_zhanghao where crowd_id="+crowd_id);
        
        if(a==null){
        	a=new ZCrowdZhanghao();
            a.setCrowdId(crowd_id);
            a.setBank(bank);
            a.setBindtel(bindtel);
            a.setCardnum(cardnum);
            a.setOwner(owner);
            a.save();
            }else{
                a.setCrowdId(crowd_id);
                a.setBank(bank);
                a.setBindtel(bindtel);
                a.setCardnum(cardnum);
                a.setOwner(owner);
            	a.setPass(0);
            	a.update();
            }
	    renderJson("{\"data\":\"SUCCESS\"}");
        }}}}}
        }
    @Before({Tx.class, POST.class})
    public void addDonate() throws ParseException
    {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String content = getPara("content",null);//分类
        Integer crowd_id = getParaToInt("crowd_id",null);
        Integer app_type = getParaToInt("app_type",null);
        String moneys = getPara("money",null);
        String name = getPara("name",null);
        String tel = getPara("tel",null);
        String address = getPara("address",null);
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        ZUser u=ZUser.dao.findById(user_id);
        if (Strings.isNullOrEmpty(moneys))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        	if (app_type==null)
            {
                renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
            }else{
        if (crowd_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        BigDecimal money=new BigDecimal(moneys);
        ZCrowd bb=ZCrowd.dao.findById(crowd_id);
	    ZCrowdDonate a= new ZCrowdDonate();
	    a.setMoney(money);
	    a.setName(name);
	    a.setAddress(address);
	    a.setContent(content);
	    a.setCrowdId(crowd_id);
	    a.setMoney(money);
	    a.setTel(tel);
	    a.setUsername(u.getNickname());
	    a.setUserId(user_id);
	    a.save();
	    renderJson(orderService.doRecharge(a.getId(),bb.getUserId(), user_id, 4, money, bb.getTitle()+"捐款",this.getResponse(),null));
        }}}
        }
    
    @Before({Tx.class, POST.class})
    public void CrowdReply() throws ParseException
    {
        String content = getPara("content",null);
        Integer donate_id = getParaToInt("donate_id",null);
        int user_id = (int)getSession().getAttribute("user_id");
        ZUser u=ZUser.dao.findById(user_id);
        if (Strings.isNullOrEmpty(content))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (donate_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        ZCrowdReply a= new ZCrowdReply();
	    a.setContent(content);
	    a.setDonateId(donate_id);
	    a.setName(u.getNickname());
	    a.save();
	    renderJson("{\"data\":\"SUCCESS\"}");
        }
    
    @Before({Tx.class, POST.class})
    public void DonateList()
    {
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sbs = new StringBuilder("select a.*,b.img");
        StringBuilder sb = new StringBuilder(" from z_crowd_donate a left join z_user b a.user_id=b.id where a.status<>2 and a.user_id="+user_id);
        
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        checkResult(info.getList(),this,info.getTotalPage());
        }
    @Before({Tx.class, POST.class})
    public void CrowdList()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
    	String searchname = getPara("searchname",null);
    	String type = getPara("type",null);
    	int order = getParaToInt("order",0);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        StringBuilder sbs = new StringBuilder("select a.*,b.mans,DATEDIFF(day,getdate(),a.endtime) as leftday");
        StringBuilder sb = new StringBuilder(" from z_crowd a left join (select count(user_id) as mans,crowd_id from z_crowd_donate group by crowd_id) b on a.id=b.crowd_id where a.status=1");
        if (searchname != null) {
            sb.append(" and a.title like '%" + searchname + "%'");
        }
        if (type != null&&!type.equals("全部分类")) {
            sb.append(" and a.type='" + type + "'");
        }
        if (city_id != null) {
            sb.append(" and a.city_id=" + city_id);
        }
        if (county_id != null) {
            sb.append(" and a.county_id=" + county_id);
        }
        if(order==0){
        	sb.append(" order by mans desc");
        }else{
        	sb.append(" order by mans asc");
        }
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
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
                    //Record record3 = Db.findFirst("select count(user_id) as mans from z_crowd_donate where crowd_id = " + record.get("id") + " and status=1 order by id desc");
                    //if(record3 != null)
                    //{
                    //    record.setColumns(record3);
                    //}
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
    
    @Before({Tx.class, POST.class})
    public void Crowd()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
    	
        Integer info_id = getParaToInt("info_id",null);
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        
        StringBuilder sb = new StringBuilder("select *,DATEDIFF(day,getdate(),endtime) as leftday from z_crowd where id="+info_id);
        sb.append(" order by create_time desc");
        Record record=Db.findFirst(sb.toString());
                if(record != null && record.get("id") != null)
                {
                	List<Record> record1 = Db.find("select content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_crowd + " order by id desc");
                    if(record1 != null)
                    {
                    	record.set("content", record1);
                    }
                    Record record2 = Db.findFirst("select sum(money) as have from z_crowd_donate where crowd_id = " + record.get("id") + " and status=1");
                    if(record2 != null)
                    {
                        record.setColumns(record2);
                    }
//                    List<Record> record3 = Db.find("select * from z_crowd_donate where crowd_id = " + record.get("id") + " and status=1 order by id desc");
//                    if(record3 != null)
//                    {
//                    	for (Record records : record3) {
//                            if(records != null && records.get("id") != null)
//                            {
//                            	List<Record> records1 = Db.find("select * from z_crowd_reply where donate_id = " + records.get("id") + " order by id desc");
//                                if(records1 != null)
//                                {
//                                	records.set("reply", records1);
//                                }
//                            }
//                        }
//                    	record.set("donate", record3);
//                    }
                    Record record4 = Db.findFirst("select pass as hongshizi from z_crowd_hongshizi where crowd_id = " + record.get("id") + " and status=1 order by id desc");
                    if(record4 != null)
                    {
                        record.setColumns(record4);
                    }
                    Record record5 = Db.findFirst("select pass as shenfen from z_crowd_shenfen where crowd_id = " + record.get("id") + " and status=1 order by id desc");
                    if(record5 != null)
                    {
                        record.setColumns(record5);
                    }
                    Record record6 = Db.findFirst("select pass as yiyuan from z_crowd_yiyuan where crowd_id = " + record.get("id") + " and status=1 order by id desc");
                    if(record6 != null)
                    {
                        record.setColumns(record6);
                    }
                    Record record7 = Db.findFirst("select pass as zhanghao from z_crowd_zhanghao where crowd_id = " + record.get("id") + " and status=1 order by id desc");
                    if(record7 != null)
                    {
                        record.setColumns(record7);
                    }

                    	Record record8 = Db.findFirst("select top 1 REGION_NAME as province_name from region where REGION_ID = (select top 1 PARENT_ID from region where REGION_ID = " + record.get("city_id")+")");
                        if(record8 != null)
                        {
                            record.setColumns(record8);
                        }
                        Record record9 = Db.findFirst("select top 1 REGION_NAME as city_name from region where REGION_ID = " + record.get("city_id"));
                        if(record9 != null)
                        {
                            record.setColumns(record9);
                        }
                        Record record10 = Db.findFirst("select top 1 REGION_NAME as county_name from region where REGION_ID = " + record.get("county_id"));
                        if(record10 != null)
                        {
                            record.setColumns(record10);
                        }
                    
                }
                renderJson(record);
        }
        }
    @Before({Tx.class, POST.class})
    public void CrowdDonate()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
    	
        Integer info_id = getParaToInt("info_id",null);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sbs = new StringBuilder("select a.*,b.img");
        StringBuilder sb = new StringBuilder(" from z_crowd_donate a left join z_user b on a.user_id=b.id  where a.crowd_id = " + info_id + " and a.status=1 order by a.id desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
                	List<Record> records1 = Db.find("select * from z_crowd_reply where donate_id = " + record.get("id") + " order by id desc");
                    if(records1 != null)
                    {
                    	record.set("reply", records1);
                    }
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
        }
    @Before({Tx.class, POST.class})
    public void CrowdIsPass()
    {
    	Integer info_id = getParaToInt("info_id",null);
    	Integer type = getParaToInt("type",null);
    	if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
    	if (type==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        if(type==1){
        	renderJson(Db.findFirst("select pass from z_crowd_hongshizi where status=1 and crowd_id="+info_id));
        }
        if(type==2){
        	renderJson(Db.findFirst("select pass from z_crowd_shenfen where status=1 and crowd_id="+info_id));
        }
        if(type==3){
        	renderJson(Db.findFirst("select pass from z_crowd_yiyuan where status=1 and crowd_id="+info_id));
        }
        if(type==4){
        	renderJson(Db.findFirst("select pass from z_crowd_zhanghao where status=1 and crowd_id="+info_id));
        }
        }}
        }
}
