package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZcVehicle<M extends BaseZcVehicle<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setPhoto(java.lang.String Photo) {
		set("Photo", Photo);
	}

	public java.lang.String getPhoto() {
		return get("Photo");
	}

	public void setLicensePlate(java.lang.String LicensePlate) {
		set("LicensePlate", LicensePlate);
	}

	public java.lang.String getLicensePlate() {
		return get("LicensePlate");
	}

	public void setTaxicompanyId(java.lang.Integer taxicompanyId) {
		set("TaxiCompany_Id", taxicompanyId);
	}

	public java.lang.Integer getTaxicompanyId() {
		return get("TaxiCompany_Id");
	}

	public void setRegion(java.lang.String Region) {
		set("Region", Region);
	}

	public java.lang.String getRegion() {
		return get("Region");
	}

	public void setState(java.lang.Integer state) {
		set("state", state);
	}

	public java.lang.Integer getState() {
		return get("state");
	}

}