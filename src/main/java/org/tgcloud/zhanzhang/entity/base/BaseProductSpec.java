package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseProductSpec<M extends BaseProductSpec<M>> extends Model<M> implements IBean {

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

	public void setName(java.lang.String Name) {
		set("Name", Name);
	}

	public java.lang.String getName() {
		return get("Name");
	}

	public void setPrice(java.lang.Double Price) {
		set("Price", Price);
	}

	public java.lang.Double getPrice() {
		return get("Price");
	}

	public void setMarketPrice(java.lang.Double MarketPrice) {
		set("MarketPrice", MarketPrice);
	}

	public java.lang.Double getMarketPrice() {
		return get("MarketPrice");
	}

	public void setSpecImg(java.lang.String SpecImg) {
		set("SpecImg", SpecImg);
	}

	public java.lang.String getSpecImg() {
		return get("SpecImg");
	}

	public void setNum(java.lang.Integer num) {
		set("num", num);
	}

	public java.lang.Integer getNum() {
		return get("num");
	}

}
