package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseSelectTableToOrder<M extends BaseSelectTableToOrder<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setOrderId(java.lang.Integer OrderId) {
		set("OrderId", OrderId);
	}

	public java.lang.Integer getOrderId() {
		return get("OrderId");
	}

	public void setSelectTableId(java.lang.Integer selectTableId) {
		set("selectTableId", selectTableId);
	}

	public java.lang.Integer getSelectTableId() {
		return get("selectTableId");
	}

}
