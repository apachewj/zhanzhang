package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseUserDetails<M extends BaseUserDetails<M>> extends Model<M> implements IBean {

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

	public void setNickname(java.lang.String nickname) {
		set("nickname", nickname);
	}

	public java.lang.String getNickname() {
		return get("nickname");
	}

	public void setViewmarriage(java.lang.String Viewmarriage) {
		set("Viewmarriage", Viewmarriage);
	}

	public java.lang.String getViewmarriage() {
		return get("Viewmarriage");
	}

	public void setSignature(java.lang.String signature) {
		set("signature", signature);
	}

	public java.lang.String getSignature() {
		return get("signature");
	}

	public void setMarriageState(java.lang.Integer MarriageState) {
		set("MarriageState", MarriageState);
	}

	public java.lang.Integer getMarriageState() {
		return get("MarriageState");
	}

	public void setHeight(java.lang.Double height) {
		set("height", height);
	}

	public java.lang.Double getHeight() {
		return get("height");
	}

	public void setWeight(java.lang.Integer weight) {
		set("weight", weight);
	}

	public java.lang.Integer getWeight() {
		return get("weight");
	}

	public void setFaith(java.lang.String Faith) {
		set("Faith", Faith);
	}

	public java.lang.String getFaith() {
		return get("Faith");
	}

	public void setOccupation(java.lang.String Occupation) {
		set("Occupation", Occupation);
	}

	public java.lang.String getOccupation() {
		return get("Occupation");
	}

	public void setPosition(java.lang.String position) {
		set("position", position);
	}

	public java.lang.String getPosition() {
		return get("position");
	}

	public void setIncome(java.lang.Integer income) {
		set("income", income);
	}

	public java.lang.Integer getIncome() {
		return get("income");
	}

	public void setIsPurchase(java.lang.Boolean IsPurchase) {
		set("IsPurchase", IsPurchase);
	}

	public java.lang.Boolean getIsPurchase() {
		return get("IsPurchase");
	}

	public void setIsCarBuying(java.lang.Boolean IsCarBuying) {
		set("IsCarBuying", IsCarBuying);
	}

	public java.lang.Boolean getIsCarBuying() {
		return get("IsCarBuying");
	}

	public void setIssmoking(java.lang.Boolean Issmoking) {
		set("Issmoking", Issmoking);
	}

	public java.lang.Boolean getIssmoking() {
		return get("Issmoking");
	}

	public void setIsdrink(java.lang.Boolean Isdrink) {
		set("Isdrink", Isdrink);
	}

	public java.lang.Boolean getIsdrink() {
		return get("Isdrink");
	}

	public void setHobby(java.lang.String hobby) {
		set("hobby", hobby);
	}

	public java.lang.String getHobby() {
		return get("hobby");
	}

	public void setMatechoice(java.lang.String Matechoice) {
		set("Matechoice", Matechoice);
	}

	public java.lang.String getMatechoice() {
		return get("Matechoice");
	}

	public void setIDcard(java.lang.String IDcard) {
		set("IDcard", IDcard);
	}

	public java.lang.String getIDcard() {
		return get("IDcard");
	}

	public void setPlaceResidence(java.lang.String PlaceResidence) {
		set("PlaceResidence", PlaceResidence);
	}

	public java.lang.String getPlaceResidence() {
		return get("PlaceResidence");
	}

	public void setLongitude(java.lang.Double longitude) {
		set("longitude", longitude);
	}

	public java.lang.Double getLongitude() {
		return get("longitude");
	}

	public void setLatitude(java.lang.Double latitude) {
		set("latitude", latitude);
	}

	public java.lang.Double getLatitude() {
		return get("latitude");
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