package org.tgcloud.zhanzhang.web.controller;

import com.google.common.collect.Maps;
import com.jfinal.core.Controller;

import java.util.List;
import java.util.Map;

import org.tgcloud.zhanzhang.core.JSONUtil;

/**
 * Created by Administrator on 2016/1/21 0021.
 */
public class BaseController extends Controller{

    public static void checkResult(Object infoList, Controller c,Integer totalPage)
    {
        if (infoList == null) {
            c.renderJson("{\"data\":\"ERROR\"}");
        } else if (infoList instanceof List){
            if (((List) infoList).size() != 0)
            {
                Map<String,Object> map = Maps.newHashMap();
                map.put("data",infoList);
                map.put("totalPage",totalPage);
                System.out.println(JSONUtil.toJson(map));
                c.renderJson(map);
            }
            else
            {
                c.renderJson("{\"data\":\"ERROR\"}");
            }
        }
        else
        {
            Map<String,Object> map = Maps.newHashMap();
            map.put("data",infoList);
            System.out.println(JSONUtil.toJson(map));
            c.renderJson(map);
        }
    }
    public static void checkResult(Object infoList, Controller c)
    {
        if (infoList == null) {
            c.renderJson("{\"data\":\"ERROR\"}");
        } else if (infoList instanceof List){
            if (((List) infoList).size() != 0)
            {
                Map<String,Object> map = Maps.newHashMap();
                map.put("data",infoList);
                System.out.println(JSONUtil.toJson(map));
                c.renderJson(map);
            }
            else
            {
                c.renderJson("{\"data\":\"ERROR\"}");
            }
        }
        else
        {
            Map<String,Object> map = Maps.newHashMap();
            map.put("data",infoList);
            System.out.println(JSONUtil.toJson(map));
            c.renderJson(map);
        }
    }
}
