package org.tgcloud.zhanzhang.core;

import com.google.common.base.Strings;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import org.tgcloud.zhanzhang.entity.BaseModel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/1/7 0007.
 */
public class ResultMessage {

    private int key;

    private String message;

    private Page page;

    private List list;

    public static ResultMessage errorMessage(String message)
    {
        return new ResultMessage(GlobalStatic.ERROR, Strings.isNullOrEmpty(message)?"ERROR":message);
    }

    public static ResultMessage successMessage(String message)
    {
        return new ResultMessage(GlobalStatic.SUCCESS, Strings.isNullOrEmpty(message)?"SUCCESS":message);
    }

    public static ResultMessage errorMessage()
    {
        return ResultMessage.errorMessage(null);
    }

    public static ResultMessage successMessage()
    {
        return ResultMessage.successMessage(null);
    }

    public ResultMessage(int key,String message)
    {
        this.key = key;
        this.message = message;
        this.list = new ArrayList();
    }

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Page getPage() {
        return page;
    }

    public String toJsonString() {
        return JSONUtil.toJson(this);
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }
}
