package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZCompanyWork<M extends BaseZCompanyWork<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setStartday(java.lang.String startday) {
		set("startday", startday);
	}

	public java.lang.String getStartday() {
		return get("startday");
	}

	public void setEndday(java.lang.String endday) {
		set("endday", endday);
	}

	public java.lang.String getEndday() {
		return get("endday");
	}

	public void setStarttime(java.lang.String starttime) {
		set("starttime", starttime);
	}

	public java.lang.String getStarttime() {
		return get("starttime");
	}

	public void setEndtime(java.lang.String endtime) {
		set("endtime", endtime);
	}

	public java.lang.String getEndtime() {
		return get("endtime");
	}

	public void setCreateTime(java.sql.Date createTime) {
		set("create_time", createTime);
	}

	public java.sql.Date getCreateTime() {
		return get("create_time");
	}

	public void setStatus(java.lang.Integer status) {
		set("status", status);
	}

	public java.lang.Integer getStatus() {
		return get("status");
	}

	public void setContactId(java.lang.Integer contactId) {
		set("contact_id", contactId);
	}

	public java.lang.Integer getContactId() {
		return get("contact_id");
	}

}