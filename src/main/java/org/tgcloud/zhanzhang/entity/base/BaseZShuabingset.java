package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZShuabingset<M extends BaseZShuabingset<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setAddress(java.lang.String Address) {
		set("Address", Address);
	}

	public java.lang.String getAddress() {
		return get("Address");
	}

	public void setTitle(java.lang.String Title) {
		set("Title", Title);
	}

	public java.lang.String getTitle() {
		return get("Title");
	}

	public void setContent(java.lang.String content) {
		set("content", content);
	}

	public java.lang.String getContent() {
		return get("content");
	}

	public void setTime(java.util.Date Time) {
		set("Time", Time);
	}

	public java.util.Date getTime() {
		return get("Time");
	}

	public void setPrice(java.lang.Double Price) {
		set("Price", Price);
	}

	public java.lang.Double getPrice() {
		return get("Price");
	}

	public void setScreen(java.lang.String Screen) {
		set("Screen", Screen);
	}

	public java.lang.String getScreen() {
		return get("Screen");
	}

	public void setUpdatetime(java.util.Date Updatetime) {
		set("Updatetime", Updatetime);
	}

	public java.util.Date getUpdatetime() {
		return get("Updatetime");
	}

	public void setState(java.lang.Integer state) {
		set("state", state);
	}

	public java.lang.Integer getState() {
		return get("state");
	}

	public void setUserId(java.lang.Integer userId) {
		set("user_id", userId);
	}

	public java.lang.Integer getUserId() {
		return get("user_id");
	}

}
