package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseStoreProductPropertySet<M extends BaseStoreProductPropertySet<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setPID(java.lang.Integer PID) {
		set("PID", PID);
	}

	public java.lang.Integer getPID() {
		return get("PID");
	}

	public void setName(java.lang.String Name) {
		set("Name", Name);
	}

	public java.lang.String getName() {
		return get("Name");
	}

	public void setStoreproducttypeId(java.lang.Integer storeproducttypeId) {
		set("StoreProductType_Id", storeproducttypeId);
	}

	public java.lang.Integer getStoreproducttypeId() {
		return get("StoreProductType_Id");
	}

}
