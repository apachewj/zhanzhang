package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseUserAlbum<M extends BaseUserAlbum<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setUserId(java.lang.Integer UserId) {
		set("UserId", UserId);
	}

	public java.lang.Integer getUserId() {
		return get("UserId");
	}

	public void setPhoto(java.lang.String Photo) {
		set("Photo", Photo);
	}

	public java.lang.String getPhoto() {
		return get("Photo");
	}

	public void setCreateDate(java.util.Date CreateDate) {
		set("CreateDate", CreateDate);
	}

	public java.util.Date getCreateDate() {
		return get("CreateDate");
	}

}
