package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseStoreBlackist<M extends BaseStoreBlackist<M>> extends Model<M> implements IBean {

	public void setBlacklistId(java.lang.Integer blacklistId) {
		set("Blacklist_id", blacklistId);
	}

	public java.lang.Integer getBlacklistId() {
		return get("Blacklist_id");
	}

	public void setStoreName(java.lang.String StoreName) {
		set("StoreName", StoreName);
	}

	public java.lang.String getStoreName() {
		return get("StoreName");
	}

	public void setPosition(java.lang.String position) {
		set("position", position);
	}

	public java.lang.String getPosition() {
		return get("position");
	}

}
