package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZUserPingbi<M extends BaseZUserPingbi<M>> extends Model<M> implements IBean {

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

	public void setDays(java.lang.Integer days) {
		set("days", days);
	}

	public java.lang.Integer getDays() {
		return get("days");
	}

	public void setEndTime(java.sql.Date endTime) {
		set("end_time", endTime);
	}

	public java.sql.Date getEndTime() {
		return get("end_time");
	}

}
