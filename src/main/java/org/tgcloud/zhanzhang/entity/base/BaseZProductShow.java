package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZProductShow<M extends BaseZProductShow<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setProductId(java.lang.Integer productId) {
		set("product_id", productId);
	}

	public java.lang.Integer getProductId() {
		return get("product_id");
	}

	public void setPids(java.lang.String pids) {
		set("pids", pids);
	}

	public java.lang.String getPids() {
		return get("pids");
	}

	public void setPass(java.lang.Integer pass) {
		set("pass", pass);
	}

	public java.lang.Integer getPass() {
		return get("pass");
	}

	public void setCreatetime(java.sql.Date createtime) {
		set("createtime", createtime);
	}

	public java.sql.Date getCreatetime() {
		return get("createtime");
	}

	public void setUserId(java.lang.Integer userId) {
		set("user_id", userId);
	}

	public java.lang.Integer getUserId() {
		return get("user_id");
	}

}
