package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseRoomOrderInfo<M extends BaseRoomOrderInfo<M>> extends Model<M> implements IBean {

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

	public void setLastInTime(java.util.Date lastInTime) {
		set("lastInTime", lastInTime);
	}

	public java.util.Date getLastInTime() {
		return get("lastInTime");
	}

	public void setInTime(java.util.Date InTime) {
		set("InTime", InTime);
	}

	public java.util.Date getInTime() {
		return get("InTime");
	}

	public void setOutTime(java.util.Date OutTime) {
		set("OutTime", OutTime);
	}

	public java.util.Date getOutTime() {
		return get("OutTime");
	}

	public void setRoomNoId(java.lang.Integer RoomNoId) {
		set("RoomNoId", RoomNoId);
	}

	public java.lang.Integer getRoomNoId() {
		return get("RoomNoId");
	}

	public void setRoomNo(java.lang.String RoomNo) {
		set("RoomNo", RoomNo);
	}

	public java.lang.String getRoomNo() {
		return get("RoomNo");
	}

}
