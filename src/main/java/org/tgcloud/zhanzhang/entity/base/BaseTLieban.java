package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseTLieban<M extends BaseTLieban<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setSetout(java.lang.String Setout) {
		set("Setout", Setout);
	}

	public java.lang.String getSetout() {
		return get("Setout");
	}

	public void setTransfer(java.lang.String Transfer) {
		set("Transfer", Transfer);
	}

	public java.lang.String getTransfer() {
		return get("Transfer");
	}

	public void setArrive(java.lang.String Arrive) {
		set("Arrive", Arrive);
	}

	public java.lang.String getArrive() {
		return get("Arrive");
	}

	public void setTicketPrice(java.lang.String TicketPrice) {
		set("TicketPrice", TicketPrice);
	}

	public java.lang.String getTicketPrice() {
		return get("TicketPrice");
	}

	public void setDepartareTime(java.lang.String DepartareTime) {
		set("DepartareTime", DepartareTime);
	}

	public java.lang.String getDepartareTime() {
		return get("DepartareTime");
	}

	public void setDepartureDate(java.lang.String DepartureDate) {
		set("DepartureDate", DepartureDate);
	}

	public java.lang.String getDepartureDate() {
		return get("DepartureDate");
	}

	public void setArriveTime(java.lang.String ArriveTime) {
		set("ArriveTime", ArriveTime);
	}

	public java.lang.String getArriveTime() {
		return get("ArriveTime");
	}

	public void setArriveDate(java.lang.String ArriveDate) {
		set("ArriveDate", ArriveDate);
	}

	public java.lang.String getArriveDate() {
		return get("ArriveDate");
	}

	public void setShift(java.lang.String Shift) {
		set("Shift", Shift);
	}

	public java.lang.String getShift() {
		return get("Shift");
	}

	public void setModels(java.lang.String Models) {
		set("Models", Models);
	}

	public java.lang.String getModels() {
		return get("Models");
	}

	public void setCarphone(java.lang.String Carphone) {
		set("Carphone", Carphone);
	}

	public java.lang.String getCarphone() {
		return get("Carphone");
	}

	public void setBookings(java.lang.String Bookings) {
		set("Bookings", Bookings);
	}

	public java.lang.String getBookings() {
		return get("Bookings");
	}

	public void setTransportId(java.lang.Integer transportId) {
		set("Transport_id", transportId);
	}

	public java.lang.Integer getTransportId() {
		return get("Transport_id");
	}

}