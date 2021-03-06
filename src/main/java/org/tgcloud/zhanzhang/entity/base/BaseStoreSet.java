package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseStoreSet<M extends BaseStoreSet<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setName(java.lang.String Name) {
		set("Name", Name);
	}

	public java.lang.String getName() {
		return get("Name");
	}

	public void setDescription(java.lang.String Description) {
		set("Description", Description);
	}

	public java.lang.String getDescription() {
		return get("Description");
	}

	public void setState(java.lang.Boolean State) {
		set("State", State);
	}

	public java.lang.Boolean getState() {
		return get("State");
	}

	public void setIsClose(java.lang.Boolean IsClose) {
		set("IsClose", IsClose);
	}

	public java.lang.Boolean getIsClose() {
		return get("IsClose");
	}

	public void setPhoto(java.lang.String Photo) {
		set("Photo", Photo);
	}

	public java.lang.String getPhoto() {
		return get("Photo");
	}

	public void setLocation(java.lang.String Location) {
		set("Location", Location);
	}

	public java.lang.String getLocation() {
		return get("Location");
	}

	public void setLongitude(java.lang.Double Longitude) {
		set("Longitude", Longitude);
	}

	public java.lang.Double getLongitude() {
		return get("Longitude");
	}

	public void setLatitude(java.lang.Double Latitude) {
		set("Latitude", Latitude);
	}

	public java.lang.Double getLatitude() {
		return get("Latitude");
	}

	public void setProfile(java.lang.String Profile) {
		set("Profile", Profile);
	}

	public java.lang.String getProfile() {
		return get("Profile");
	}

	public void setStoretypeId(java.lang.Integer storetypeId) {
		set("StoreType_Id", storetypeId);
	}

	public java.lang.Integer getStoretypeId() {
		return get("StoreType_Id");
	}

	public void setScore(java.lang.Integer Score) {
		set("Score", Score);
	}

	public java.lang.Integer getScore() {
		return get("Score");
	}

	public void setInTime(java.util.Date InTime) {
		set("InTime", InTime);
	}

	public java.util.Date getInTime() {
		return get("InTime");
	}

	public void setTel(java.lang.String Tel) {
		set("Tel", Tel);
	}

	public java.lang.String getTel() {
		return get("Tel");
	}

	public void setCuisineid(java.lang.Integer Cuisineid) {
		set("Cuisineid", Cuisineid);
	}

	public java.lang.Integer getCuisineid() {
		return get("Cuisineid");
	}

	public void setBusinessCategory(java.lang.String BusinessCategory) {
		set("BusinessCategory", BusinessCategory);
	}

	public java.lang.String getBusinessCategory() {
		return get("BusinessCategory");
	}

	public void setWifiName(java.lang.String WifiName) {
		set("WifiName", WifiName);
	}

	public java.lang.String getWifiName() {
		return get("WifiName");
	}

	public void setWifiPwd(java.lang.String WifiPwd) {
		set("WifiPwd", WifiPwd);
	}

	public java.lang.String getWifiPwd() {
		return get("WifiPwd");
	}

	public void setWxQRcode(java.lang.String WxQRcode) {
		set("WxQRcode", WxQRcode);
	}

	public java.lang.String getWxQRcode() {
		return get("WxQRcode");
	}

	public void setAliQRcode(java.lang.String AliQRcode) {
		set("AliQRcode", AliQRcode);
	}

	public java.lang.String getAliQRcode() {
		return get("AliQRcode");
	}

	public void setIsTakeAway(java.lang.Integer isTakeAway) {
		set("isTakeAway", isTakeAway);
	}

	public java.lang.Integer getIsTakeAway() {
		return get("isTakeAway");
	}

	public void setTAOverTime(java.util.Date TAOverTime) {
		set("TAOverTime", TAOverTime);
	}

	public java.util.Date getTAOverTime() {
		return get("TAOverTime");
	}

	public void setPsMoney(java.lang.Double PsMoney) {
		set("PsMoney", PsMoney);
	}

	public java.lang.Double getPsMoney() {
		return get("PsMoney");
	}

	public void setUpMoney(java.lang.Double UpMoney) {
		set("UpMoney", UpMoney);
	}

	public java.lang.Double getUpMoney() {
		return get("UpMoney");
	}

}
