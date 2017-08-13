package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZPeopleService<M extends BaseZPeopleService<M>> extends Model<M> implements IBean {

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

	public void setTitle(java.lang.String title) {
		set("title", title);
	}

	public java.lang.String getTitle() {
		return get("title");
	}

	public void setMoney(java.math.BigDecimal money) {
		set("money", money);
	}

	public java.math.BigDecimal getMoney() {
		return get("money");
	}

	public void setUnit(java.lang.String unit) {
		set("unit", unit);
	}

	public java.lang.String getUnit() {
		return get("unit");
	}

	public void setType(java.lang.Integer type) {
		set("type", type);
	}

	public java.lang.Integer getType() {
		return get("type");
	}

	public void setContent(java.lang.String content) {
		set("content", content);
	}

	public java.lang.String getContent() {
		return get("content");
	}

	public void setLinkman(java.lang.String linkman) {
		set("linkman", linkman);
	}

	public java.lang.String getLinkman() {
		return get("linkman");
	}

	public void setTelephone(java.lang.String telephone) {
		set("telephone", telephone);
	}

	public java.lang.String getTelephone() {
		return get("telephone");
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

	public void setCityId(java.lang.Integer cityId) {
		set("city_id", cityId);
	}

	public java.lang.Integer getCityId() {
		return get("city_id");
	}

	public void setCountyId(java.lang.Integer countyId) {
		set("county_id", countyId);
	}

	public java.lang.Integer getCountyId() {
		return get("county_id");
	}

}
