package org.tgcloud.zhanzhang.entity;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.tgcloud.zhanzhang.core.JSONUtil;

import java.util.Map;

/**
 * Created by Administrator on 2016/1/13 0013.
 */
public abstract class BaseModel {

    public String toJsonString() {
        return JSONUtil.toJson(this);
    }

    public String toJsonString(Map<String,Object> map) {
        JSONObject object = JSON.parseObject(toJsonString());
        for (Map.Entry<String,Object> entry : map.entrySet())
        {
            object.put(entry.getKey(),entry.getValue());
        }
        return JSONUtil.toJson(object);
    }

}
