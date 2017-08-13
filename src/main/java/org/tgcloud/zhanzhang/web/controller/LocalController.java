package org.tgcloud.zhanzhang.web.controller;

import java.util.ArrayList;
import java.util.List;

import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.entity.ZContextPath;
import org.tgcloud.zhanzhang.entity.ZInfoUrl;
import org.tgcloud.zhanzhang.entity.ZLocal;
import org.tgcloud.zhanzhang.entity.ZMaster;
import org.tgcloud.zhanzhang.entity.ZProduct;
import org.tgcloud.zhanzhang.entity.ZProductShow;
import org.tgcloud.zhanzhang.entity.ZTravelScenic;

import com.google.common.base.Strings;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

public class LocalController extends BaseController {
	
    /*发布特产*/
    @Before({Tx.class, POST.class})
    public void addProduct()
    {
        String title = getPara("title",null);//标题
        String etitle = getPara("etitle",null);//副标题
        Integer local_id = getParaToInt("local_id",null);
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        String[] c_images = getParaValues("c_image");
        String[] c_contexts = getParaValues("c_context");
        if (Strings.isNullOrEmpty(title))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if (local_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }else{
        if ((c_images != null && c_images.length != 0) && (c_contexts != null && c_contexts.length != 0) && c_images.length == c_contexts.length)
        {
        ZProduct p = new ZProduct();
        p.setEtitle(etitle);
        p.setTitle(title);
        p.setLocalId(local_id);
        p.setUserId(user_id);
        p.save();
            for (int i = 0; i < c_images.length;i++)
            {
                new ZContextPath(p.getId(),c_images[i],c_contexts[i], GlobalStatic.c_product).save();
            }
        renderJson("{\"data\":\"SUCCESS\"}");
        }else{
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        }
        }
    }
    
    @Before({POST.class})
    public void Product()
    {
    	Integer info_id = getParaToInt("info_id",null);
        Record a=Db.findById("z_product", info_id);
        if(a!=null){
        	a.set("main_info",Db.find("select content,img_path from z_context_path where info_id = "+ info_id + " and info_type = " + GlobalStatic.c_product));//导游
            renderJson(a);
        }else{
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
    }
    
	@Before({Tx.class, POST.class})
    public void ProductList()
    {
		String searchname = getPara("searchname",null);
		Integer local_id = getParaToInt("local_id",null);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        if(local_id==null){
        	renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        StringBuilder sbs = new StringBuilder(" SELECT *");
        StringBuilder sb = new StringBuilder("");
        	sb.append(" FROM z_product"+
        			" WHERE 1=1 AND status = 1 and local_id="+local_id);
        	if(searchname!=null){
        		sb.append(" and title like '%" + searchname + "%'");
        	}
	        sb.append(" order by createtime desc");     
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(), sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
                    Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_product + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
	
    @Before({POST.class})
    public void Local()
    {
    	Integer county_id = getParaToInt("county_id",null);
    	if(county_id==null){
    		renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
    	}else{
        Record a=Db.findFirst("select * from z_local where county_id="+county_id);
        if(a!=null){
        renderJson(a);
        }else{
        	renderJson("{\"data\":\"ERROR\"}");
        }
    	}
    }
    
    @Before({Tx.class, POST.class})
    public void ProductDelete()
    {
        Integer info_id = getParaToInt("info_id",null);
        ZProduct a=ZProduct.dao.findById(info_id);
        a.setStatus(2);
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void LocalDelete()
    {
        Integer county_id = getParaToInt("county_id",null);
        ZLocal a=ZLocal.dao.findFirst("select * from z_local where county_id="+county_id);
        a.setStatus(2);
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    /*发布本地资料*/
    @Before({Tx.class, POST.class})
    public void addLocal()
    {
        String name = getPara("name",null);//标题
        Integer city_id = getParaToInt("city_id",null);
        Integer county_id = getParaToInt("county_id",null);
        Integer province_id = getParaToInt("province_id",null);
        String introduce = getPara("introduce",null);//介绍
        String imgs = getPara("imgs",null);//图片
        if (Strings.isNullOrEmpty(name))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (city_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
//        if (county_id==null)
//        {
//            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
//        }
        if (province_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(introduce))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(imgs))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        ZLocal a=ZLocal.dao.findFirst("select * from z_local where county_id="+county_id);
        if(a==null){
        	ZLocal p = new ZLocal();
	        p.setName(name);
	        p.setIntroduce(introduce);
	        p.setImgs(imgs);
	        p.setProvinceId(province_id);
	        p.setCityId(city_id);
	        if (county_id!=null){
	        p.setCountyId(county_id);
	        }
	        p.save();
        }else{
        	a.setName(name);
            a.setIntroduce(introduce);
            a.setImgs(imgs);
            a.setProvinceId(province_id);
	        a.setCityId(city_id);
	        if (county_id!=null){
		        a.setCountyId(county_id);
		        }
            a.update();
        }
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void addProductShow()
    {
        String ids = getPara("ids",null);//展示展品ID
        int user_id = (int)getSession().getAttribute("user_id");//发布人
        Integer product_id = getParaToInt("product_id",null);
        if (product_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if (Strings.isNullOrEmpty(ids))
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        if(ids!=null){
        	ZProductShow p = new ZProductShow();
		    p.setProductId(product_id);
		    p.setPids(ids);
		    p.setUserId(user_id);
		    p.save();
	        }
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
	@Before({Tx.class, POST.class})
    public void ProductShowList()
    {
		Integer product_id = getParaToInt("product_id",null);
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        String ids=Db.queryFirst("select top 1 pids from z_product_show where pass=1 and product_id="+product_id+" order by createtime desc");
        if(ids!=null){
        StringBuilder sbs = new StringBuilder(" SELECT *");
        StringBuilder sb = new StringBuilder("");
        	sb.append(" FROM z_product"+
        			" WHERE 1=1 AND status = 1 and id in ("+ids.substring(0, ids.lastIndexOf(","))+")");
	        sb.append(" order by createtime desc");     
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
                    Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_product + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
        }else{
        	renderJson("{\"data\":\"ERROR\"}");
        }
        
    }
	
	@Before({Tx.class, POST.class})
    public void ProductShowCheckList()
    {
		int user_id = (int)getSession().getAttribute("user_id");//发布人
		ZMaster aa=ZMaster.dao.findById(user_id);
		List<Integer> cc=new ArrayList();
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sbs = new StringBuilder(" SELECT a.*,b.title");
        StringBuilder sb = new StringBuilder("");
        	sb.append(" FROM z_product_show a");
        	sb.append(" left join z_product b on a.product_id=b.id ");
        	if(aa.getType()!=1){
        		if(aa.getCityId()==0){
        			cc=Db.query("select id from z_local where province_id="+aa.getProvinceId());
        		}else if(aa.getCountyId()==0){
        			cc=Db.query("select id from z_local where province_id="+aa.getProvinceId()+" and city_id="+aa.getCityId());
        		}else{
        			cc=Db.query("select id from z_local where province_id="+aa.getProvinceId()+" and city_id="+aa.getCityId()+" and county_id="+aa.getCountyId());
        		}
        		StringBuilder acd = new StringBuilder("0");
        		if(cc!=null&&cc.size()>0){
        		for(Integer ccccc:cc){
        			acd.append(","+ccccc);
        		}
        		sb.append(" where b.local_id in ("+acd.toString()+")");
        		}
    		}
	        sb.append(" order by a.createtime desc");
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
                    Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("product_id") + " and info_type = " + GlobalStatic.c_product + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
	
    @Before({Tx.class, POST.class})
    public void ProductShowDelete()
    {
        Integer info_id = getParaToInt("info_id",null);
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        ZProductShow.dao.deleteById(info_id);
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void ProductShowPass()
    {
        Integer info_id = getParaToInt("info_id",null);
        if (info_id==null)
        {
            renderJson("{\"data\":\"parameter miss\",\"key\":\"1001\"}");
        }
        Integer pass = getParaToInt("pass",0);
        ZProductShow a=ZProductShow.dao.findById(info_id);
        a.setPass(pass);
        a.update();
        renderJson("{\"data\":\"SUCCESS\"}");
    }
    
    @Before({Tx.class, POST.class})
    public void ownProductShowList()
    {
    	int user_id = (int)getSession().getAttribute("user_id");//发布人
        int pageNum = getParaToInt("pageNum",1);//当前页面
        int pageSize = getParaToInt("PageSize",10);//一页显示数量
        StringBuilder sbs = new StringBuilder("select a.id as info_id,a.pass,b.*");
        StringBuilder sb = new StringBuilder(" from z_product_show a left join z_product b on b.id=a.product_id where a.user_id="+user_id+" order by createtime desc"); 
        Page<Record> info = Db.paginate(pageNum, pageSize,sbs.toString(),sb.toString());
        if (!BeanUtil.isNullList(info.getList())) {
            for (Record record : info.getList()) {
                if(record != null && record.get("id") != null)
                {
                    Record record1 = Db.findFirst("select top 1 content,img_path from z_context_path where info_id = " + record.get("id") + " and info_type = " + GlobalStatic.c_product + " order by id desc");
                    if(record1 != null)
                    {
                        record.setColumns(record1);
                    }
                }
            }
        }
        checkResult(info.getList(),this,info.getTotalPage());
    }
}
