package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZCompanyContact<M extends BaseZCompanyContact<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setEmail(java.lang.String email) {
		set("email", email);
	}

	public java.lang.String getEmail() {
		return get("email");
	}

	public void setAddress(java.lang.String address) {
		set("address", address);
	}

	public java.lang.String getAddress() {
		return get("address");
	}

	public void setUserId(java.lang.Integer userId) {
		set("user_id", userId);
	}

	public java.lang.Integer getUserId() {
		return get("user_id");
	}

	public void setComId(java.lang.Integer comId) {
		set("com_id", comId);
	}

	public java.lang.Integer getComId() {
		return get("com_id");
	}

	public void setStatus(java.lang.Integer status) {
		set("status", status);
	}

	public java.lang.Integer getStatus() {
		return get("status");
	}

	public void setCreateTime(java.sql.Date createTime) {
		set("create_time", createTime);
	}

	public java.sql.Date getCreateTime() {
		return get("create_time");
	}

	public void setIswork(java.lang.Integer iswork) {
		set("iswork", iswork);
	}

	public java.lang.Integer getIswork() {
		return get("iswork");
	}

	public void setHoliworkstart(java.lang.String holiworkstart) {
		set("holiworkstart", holiworkstart);
	}

	public java.lang.String getHoliworkstart() {
		return get("holiworkstart");
	}

	public void setHoliworkend(java.lang.String holiworkend) {
		set("holiworkend", holiworkend);
	}

	public java.lang.String getHoliworkend() {
		return get("holiworkend");
	}

}
