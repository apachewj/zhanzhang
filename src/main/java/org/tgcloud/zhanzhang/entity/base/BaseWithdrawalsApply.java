package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseWithdrawalsApply<M extends BaseWithdrawalsApply<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setUserId(java.lang.Integer UserId) {
		set("UserId", UserId);
	}

	public java.lang.Integer getUserId() {
		return get("UserId");
	}

	public void setBankCardId(java.lang.Integer BankCardId) {
		set("BankCardId", BankCardId);
	}

	public java.lang.Integer getBankCardId() {
		return get("BankCardId");
	}

	public void setAmont(java.lang.Double Amont) {
		set("Amont", Amont);
	}

	public java.lang.Double getAmont() {
		return get("Amont");
	}

	public void setApplyTime(java.util.Date ApplyTime) {
		set("ApplyTime", ApplyTime);
	}

	public java.util.Date getApplyTime() {
		return get("ApplyTime");
	}

	public void setFlag(java.lang.Integer flag) {
		set("flag", flag);
	}

	public java.lang.Integer getFlag() {
		return get("flag");
	}

	public void setRemake(java.lang.String remake) {
		set("remake", remake);
	}

	public java.lang.String getRemake() {
		return get("remake");
	}

}
