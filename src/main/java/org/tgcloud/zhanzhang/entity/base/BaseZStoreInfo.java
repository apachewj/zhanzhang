package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZStoreInfo<M extends BaseZStoreInfo<M>> extends Model<M> implements IBean {

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

	public void setInfoId(java.lang.Integer infoId) {
		set("info_id", infoId);
	}

	public java.lang.Integer getInfoId() {
		return get("info_id");
	}

	public void setInfoType(java.lang.Integer infoType) {
		set("info_type", infoType);
	}

	public java.lang.Integer getInfoType() {
		return get("info_type");
	}

	public void setCreateTime(java.sql.Date createTime) {
		set("create_time", createTime);
	}

	public java.sql.Date getCreateTime() {
		return get("create_time");
	}

}
