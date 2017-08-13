package org.tgcloud.zhanzhang.web.validator;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

public class AddServiceValidator extends Validator {

	   @Override
	    protected void validate(Controller c) {
	        if (c.getRequest().getMethod().equals("POST"))
	        {
	            validateRequired("ZPeopleService.title","title","标题不能为空！");
	            //validateRequired("ZPeopleService.money","money","价格不能为空！");
	            //validateRequired("ZPeopleService.unit","unit","单位不能为空！");
	           // validateRequired("ZPeopleService.content","content","详情不能为空！");
	            validateRequired("ZPeopleService.linkman","linkman","联系人不能为空！");
	            validateRequired("ZPeopleService.telephone","telephone","手机不能为空！");
	            validateRequired("ZPeopleService.location_x", "location_x", "坐标不能为空");
	            validateRequired("ZPeopleService.location_y", "location_y", "坐标不能为空");
	            validateRequired("ZPeopleService.city_id", "city_id", "城市不能为空");
	            validateRequired("ZPeopleService.county_id", "county_id", "区不能为空");
	            
	        }

	    }

	    @Override
	    protected void handleError(Controller c) {
	        c.renderJson("{\"data\":\"parameter miss\"}");;
	    }

	}
