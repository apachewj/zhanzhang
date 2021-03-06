package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseReservationSet<M extends BaseReservationSet<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setStoreId(java.lang.Integer storeId) {
		set("Store_Id", storeId);
	}

	public java.lang.Integer getStoreId() {
		return get("Store_Id");
	}

	public void setNumberRrange(java.lang.String NumberRrange) {
		set("NumberRrange", NumberRrange);
	}

	public java.lang.String getNumberRrange() {
		return get("NumberRrange");
	}

	public void setMoney(java.lang.Double Money) {
		set("Money", Money);
	}

	public java.lang.Double getMoney() {
		return get("Money");
	}

	public void setTransposonTotal(java.lang.Integer TransposonTotal) {
		set("TransposonTotal", TransposonTotal);
	}

	public java.lang.Integer getTransposonTotal() {
		return get("TransposonTotal");
	}

	public void setSurplusCount(java.lang.Integer SurplusCount) {
		set("SurplusCount", SurplusCount);
	}

	public java.lang.Integer getSurplusCount() {
		return get("SurplusCount");
	}

	public void setDateString(java.lang.String DateString) {
		set("DateString", DateString);
	}

	public java.lang.String getDateString() {
		return get("DateString");
	}

	public void setReservatioTime(java.lang.String ReservatioTime) {
		set("ReservatioTime", ReservatioTime);
	}

	public java.lang.String getReservatioTime() {
		return get("ReservatioTime");
	}

	public void setState(java.lang.Integer State) {
		set("State", State);
	}

	public java.lang.Integer getState() {
		return get("State");
	}

	public void setTabletypeId(java.lang.Integer tabletypeId) {
		set("TableType_Id", tabletypeId);
	}

	public java.lang.Integer getTabletypeId() {
		return get("TableType_Id");
	}

	public void setIsDelete(java.lang.Integer IsDelete) {
		set("IsDelete", IsDelete);
	}

	public java.lang.Integer getIsDelete() {
		return get("IsDelete");
	}

	public void setRemarks(java.lang.String Remarks) {
		set("Remarks", Remarks);
	}

	public java.lang.String getRemarks() {
		return get("Remarks");
	}

	public void setEatTime(java.lang.Integer eatTime) {
		set("eatTime", eatTime);
	}

	public java.lang.Integer getEatTime() {
		return get("eatTime");
	}

}
