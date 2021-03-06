package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZCompany<M extends BaseZCompany<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setUserId(java.lang.Integer userId) {
		set("user_id", userId);
	}

	public java.lang.Integer getUserId() {
		return get("user_id");
	}

	public void setComName(java.lang.String comName) {
		set("com_name", comName);
	}

	public java.lang.String getComName() {
		return get("com_name");
	}

	public void setMessage(java.lang.String message) {
		set("message", message);
	}

	public java.lang.String getMessage() {
		return get("message");
	}

	public void setMainImg(java.lang.String mainImg) {
		set("main_img", mainImg);
	}

	public java.lang.String getMainImg() {
		return get("main_img");
	}

	public void setIdImg(java.lang.String idImg) {
		set("id_img", idImg);
	}

	public java.lang.String getIdImg() {
		return get("id_img");
	}

	public void setPaperImg(java.lang.String paperImg) {
		set("paper_img", paperImg);
	}

	public java.lang.String getPaperImg() {
		return get("paper_img");
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

	public void setCountyId(java.lang.Integer countyId) {
		set("county_id", countyId);
	}

	public java.lang.Integer getCountyId() {
		return get("county_id");
	}

	public void setCityId(java.lang.Integer cityId) {
		set("city_id", cityId);
	}

	public java.lang.Integer getCityId() {
		return get("city_id");
	}

	public void setPass(java.lang.Integer pass) {
		set("pass", pass);
	}

	public java.lang.Integer getPass() {
		return get("pass");
	}

	public void setLocationX(java.lang.String locationX) {
		set("location_x", locationX);
	}

	public java.lang.String getLocationX() {
		return get("location_x");
	}

	public void setLocationY(java.lang.String locationY) {
		set("location_y", locationY);
	}

	public java.lang.String getLocationY() {
		return get("location_y");
	}

}
