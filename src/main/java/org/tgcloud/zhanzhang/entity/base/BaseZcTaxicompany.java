package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZcTaxicompany<M extends BaseZcTaxicompany<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setPhoto(java.lang.String Photo) {
		set("Photo", Photo);
	}

	public java.lang.String getPhoto() {
		return get("Photo");
	}

	public void setCompanyName(java.lang.String CompanyName) {
		set("CompanyName", CompanyName);
	}

	public java.lang.String getCompanyName() {
		return get("CompanyName");
	}

	public void setUserId(java.lang.Integer userId) {
		set("User_id", userId);
	}

	public java.lang.Integer getUserId() {
		return get("User_id");
	}

	public void setCompanyState(java.lang.Integer CompanyState) {
		set("CompanyState", CompanyState);
	}

	public java.lang.Integer getCompanyState() {
		return get("CompanyState");
	}

	public void setCode(java.lang.String Code) {
		set("Code", Code);
	}

	public java.lang.String getCode() {
		return get("Code");
	}

	public void setTelephone(java.lang.String Telephone) {
		set("Telephone", Telephone);
	}

	public java.lang.String getTelephone() {
		return get("Telephone");
	}

	public void setTime(java.util.Date Time) {
		set("Time", Time);
	}

	public java.util.Date getTime() {
		return get("Time");
	}

}
