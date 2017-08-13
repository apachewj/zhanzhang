package org.tgcloud.zhanzhang.serviceTest;

import java.applet.AppletContext;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.junit.BeforeClass;
import org.junit.Test;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.JSONUtil;
import org.tgcloud.zhanzhang.entity.ZUser;
import org.tgcloud.zhanzhang.service.CompanyService;

import com.jfinal.aop.Enhancer;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class mainTest {

	/*@Test
    public void test()
    {
		List<Map> list1 = Db.query("select REGION_ID as id,REGION_NAME as name from region where PARENT_ID =1");
		List<Map> list5 =new ArrayList();
		for(Map a:list1){
			List<Map> list2 = Db.query("select REGION_ID as id,REGION_NAME as name from region where PARENT_ID =1"+a.get("id").toString());
			List<Map> list4 =new ArrayList();
			for(Map b:list2){
				List<Map> list3 = Db.query("select REGION_ID as id,REGION_NAME as name from region where PARENT_ID ="+b.get("id").toString());
				b.put("district", list3);
				list4.add(b);
			}
			a.put("city", list4);
			list5.add(a);
		}
		
        System.out.println(JSONUtil.toJson(list5));
    }*/
}
