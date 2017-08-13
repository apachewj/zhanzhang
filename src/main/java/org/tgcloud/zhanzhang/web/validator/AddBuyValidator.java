package org.tgcloud.zhanzhang.web.validator;

import com.jfinal.core.Controller;
import com.jfinal.validate.Validator;

/**
 * Created by Administrator on 2016/1/20 0020.
 * 发布求购
 */
public class AddBuyValidator extends Validator {
    @Override
    protected void validate(Controller c) {
        if (c.getRequest().getMethod().equals("POST"))
        {
            validateRequired("find_sale.city","city","city");
            validateRequired("find_sale.address_d","address_d","address_d");
            validateRequired("find_sale.title","title","title");
            validateRequired("find_sale.username","username","username");
            validateRequired("find_sale.content_info","content_info","content_info");
            validateRequired("find_sale.telephone","telephone","telephone");
            validateRequired("find_sale.location_x", "img_miss", "");
            validateRequired("find_sale.location_y", "img_miss", "");
        }

    }

    @Override
    protected void handleError(Controller c) {
        c.renderJson("{\"data\":\"parameter miss\"}");;
    }
}
