package org.tgcloud.zhanzhang.web.validator;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

public class AddTourValidator extends Validator {

	   @Override
	    protected void validate(Controller c) {
	        if (c.getRequest().getMethod().equals("POST"))
	        {
	            validateRequired("ZTourService.title","title","标题不能为空！");
	            //validateRequired("ZPeopleService.money","money","价格不能为空！");
	            //validateRequired("ZPeopleService.unit","unit","单位不能为空！");
	           // validateRequired("ZPeopleService.content","content","详情不能为空！");
	            //validateRequired("ZTourService.type","type","联系人不能为空！");
	            //validateRequired("ZTourService.telephone","telephone","手机不能为空！");
	           /* validateRequired("ZPeopleNeed.location_x", "img_miss", "");
	            validateRequired("ZPeopleNeed.location_y", "img_miss", "");
	            validateRequired("ZPeopleNeed.city_id", "img_miss", "");
	            validateRequired("ZPeopleNeed.county", "img_miss", "");
	            */
	        }

	    }

	    @Override
	    protected void handleError(Controller c) {
	        c.renderJson("{\"data\":\"parameter miss\"}");;
	    }

	}
