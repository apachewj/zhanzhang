package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZFindworkPlace<M extends BaseZFindworkPlace<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setFId(java.lang.Integer fId) {
		set("f_id", fId);
	}

	public java.lang.Integer getFId() {
		return get("f_id");
	}

	public void setProvinceId(java.lang.Integer provinceId) {
		set("province_id", provinceId);
	}

	public java.lang.Integer getProvinceId() {
		return get("province_id");
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