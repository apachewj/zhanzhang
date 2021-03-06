package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseInvitationTable<M extends BaseInvitationTable<M>> extends Model<M> implements IBean {

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

	public void setType(java.lang.Integer Type) {
		set("Type", Type);
	}

	public java.lang.Integer getType() {
		return get("Type");
	}

	public void setTitle(java.lang.String Title) {
		set("Title", Title);
	}

	public java.lang.String getTitle() {
		return get("Title");
	}

	public void setContents(java.lang.String Contents) {
		set("Contents", Contents);
	}

	public java.lang.String getContents() {
		return get("Contents");
	}

	public void setPartyStartDate(java.util.Date PartyStartDate) {
		set("PartyStartDate", PartyStartDate);
	}

	public java.util.Date getPartyStartDate() {
		return get("PartyStartDate");
	}

	public void setPartyEndDate(java.util.Date PartyEndDate) {
		set("PartyEndDate", PartyEndDate);
	}

	public java.util.Date getPartyEndDate() {
		return get("PartyEndDate");
	}

	public void setPartyAddress(java.lang.String PartyAddress) {
		set("PartyAddress", PartyAddress);
	}

	public java.lang.String getPartyAddress() {
		return get("PartyAddress");
	}

	public void setPicture(java.lang.String Picture) {
		set("Picture", Picture);
	}

	public java.lang.String getPicture() {
		return get("Picture");
	}

	public void setBackgroundType(java.lang.Integer BackgroundType) {
		set("BackgroundType", BackgroundType);
	}

	public java.lang.Integer getBackgroundType() {
		return get("BackgroundType");
	}

	public void setState(java.lang.Integer State) {
		set("State", State);
	}

	public java.lang.Integer getState() {
		return get("State");
	}

	public void setCreateDate(java.util.Date CreateDate) {
		set("CreateDate", CreateDate);
	}

	public java.util.Date getCreateDate() {
		return get("CreateDate");
	}

}
