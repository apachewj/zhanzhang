package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseProductSalesValue<M extends BaseProductSalesValue<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setProductId(java.lang.Integer ProductId) {
		set("ProductId", ProductId);
	}

	public java.lang.Integer getProductId() {
		return get("ProductId");
	}

	public void setSpecId(java.lang.Integer specId) {
		set("specId", specId);
	}

	public java.lang.Integer getSpecId() {
		return get("specId");
	}

	public void setSpecName(java.lang.String specName) {
		set("specName", specName);
	}

	public java.lang.String getSpecName() {
		return get("specName");
	}

	public void setBuyUserId(java.lang.Integer BuyUserId) {
		set("BuyUserId", BuyUserId);
	}

	public java.lang.Integer getBuyUserId() {
		return get("BuyUserId");
	}

	public void setBuyMoney(java.lang.Double BuyMoney) {
		set("BuyMoney", BuyMoney);
	}

	public java.lang.Double getBuyMoney() {
		return get("BuyMoney");
	}

	public void setBuyNum(java.lang.Integer BuyNum) {
		set("BuyNum", BuyNum);
	}

	public java.lang.Integer getBuyNum() {
		return get("BuyNum");
	}

}
