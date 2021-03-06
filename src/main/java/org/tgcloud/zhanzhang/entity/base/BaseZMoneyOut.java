package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZMoneyOut<M extends BaseZMoneyOut<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setCardId(java.lang.String cardId) {
		set("card_id", cardId);
	}

	public java.lang.String getCardId() {
		return get("card_id");
	}

	public void setBank(java.lang.String bank) {
		set("bank", bank);
	}

	public java.lang.String getBank() {
		return get("bank");
	}

	public void setOwnername(java.lang.String ownername) {
		set("ownername", ownername);
	}

	public java.lang.String getOwnername() {
		return get("ownername");
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

	public void setBankname(java.lang.String bankname) {
		set("bankname", bankname);
	}

	public java.lang.String getBankname() {
		return get("bankname");
	}

	public void setStatus(java.lang.Integer status) {
		set("status", status);
	}

	public java.lang.Integer getStatus() {
		return get("status");
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

	public void setCardtype(java.lang.String cardtype) {
		set("cardtype", cardtype);
	}

	public java.lang.String getCardtype() {
		return get("cardtype");
	}

	public void setMoney(java.math.BigDecimal money) {
		set("money", money);
	}

	public java.math.BigDecimal getMoney() {
		return get("money");
	}

}
