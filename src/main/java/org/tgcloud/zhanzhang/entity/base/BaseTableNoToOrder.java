package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseTableNoToOrder<M extends BaseTableNoToOrder<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setTableNo(java.lang.String TableNo) {
		set("TableNo", TableNo);
	}

	public java.lang.String getTableNo() {
		return get("TableNo");
	}

	public void setOrderId(java.lang.Integer OrderId) {
		set("OrderId", OrderId);
	}

	public java.lang.Integer getOrderId() {
		return get("OrderId");
	}

	public void setTableNoId(java.lang.Integer TableNoId) {
		set("TableNoId", TableNoId);
	}

	public java.lang.Integer getTableNoId() {
		return get("TableNoId");
	}

}
