package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZCrowdShenfen<M extends BaseZCrowdShenfen<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setTruename(java.lang.String truename) {
		set("truename", truename);
	}

	public java.lang.String getTruename() {
		return get("truename");
	}

	public void setIdnumber(java.lang.String idnumber) {
		set("idnumber", idnumber);
	}

	public java.lang.String getIdnumber() {
		return get("idnumber");
	}

	public void setPass(java.lang.Integer pass) {
		set("pass", pass);
	}

	public java.lang.Integer getPass() {
		return get("pass");
	}

	public void setCreateTime(java.sql.Date createTime) {
		set("create_time", createTime);
	}

	public java.sql.Date getCreateTime() {
		return get("create_time");
	}

	public void setStatus(java.lang.Integer status) {
		set("status", status);
	}

	public java.lang.Integer getStatus() {
		return get("status");
	}

	public void setImgs(java.lang.String imgs) {
		set("imgs", imgs);
	}

	public java.lang.String getImgs() {
		return get("imgs");
	}

	public void setCrowdId(java.lang.Integer crowdId) {
		set("crowd_id", crowdId);
	}

	public java.lang.Integer getCrowdId() {
		return get("crowd_id");
	}

}
