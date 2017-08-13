package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseOrderList<M extends BaseOrderList<M>> extends Model<M> implements IBean {

	public void setOrderId(java.lang.Integer orderId) {
		set("orderId", orderId);
	}

	public java.lang.Integer getOrderId() {
		return get("orderId");
	}

	public void setUserName(java.lang.String UserName) {
		set("UserName", UserName);
	}

	public java.lang.String getUserName() {
		return get("UserName");
	}

	public void setUserAddress(java.lang.String UserAddress) {
		set("UserAddress", UserAddress);
	}

	public java.lang.String getUserAddress() {
		return get("UserAddress");
	}

	public void setUserTel(java.lang.String UserTel) {
		set("UserTel", UserTel);
	}

	public java.lang.String getUserTel() {
		return get("UserTel");
	}

	public void setAmont(java.lang.Double Amont) {
		set("Amont", Amont);
	}

	public java.lang.Double getAmont() {
		return get("Amont");
	}

	public void setStoreId(java.lang.Integer storeId) {
		set("storeId", storeId);
	}

	public java.lang.Integer getStoreId() {
		return get("storeId");
	}

	public void setStoreName(java.lang.String storeName) {
		set("storeName", storeName);
	}

	public java.lang.String getStoreName() {
		return get("storeName");
	}

	public void setRemake(java.lang.String remake) {
		set("remake", remake);
	}

	public java.lang.String getRemake() {
		return get("remake");
	}

	public void setUserId(java.lang.Integer userId) {
		set("userId", userId);
	}

	public java.lang.Integer getUserId() {
		return get("userId");
	}

	public void setFlag(java.lang.Integer flag) {
		set("flag", flag);
	}

	public java.lang.Integer getFlag() {
		return get("flag");
	}

	public void setOrderNO(java.lang.String OrderNO) {
		set("OrderNO", OrderNO);
	}

	public java.lang.String getOrderNO() {
		return get("OrderNO");
	}

	public void setSubTime(java.util.Date subTime) {
		set("subTime", subTime);
	}

	public java.util.Date getSubTime() {
		return get("subTime");
	}

	public void setPayTime(java.util.Date payTime) {
		set("payTime", payTime);
	}

	public java.util.Date getPayTime() {
		return get("payTime");
	}

	public void setOrderType(java.lang.String orderType) {
		set("orderType", orderType);
	}

	public java.lang.String getOrderType() {
		return get("orderType");
	}

	public void setPayType(java.lang.String payType) {
		set("payType", payType);
	}

	public java.lang.String getPayType() {
		return get("payType");
	}

	public void setGetTime(java.util.Date getTime) {
		set("getTime", getTime);
	}

	public java.util.Date getGetTime() {
		return get("getTime");
	}

	public void setOrderWeight(java.lang.Double OrderWeight) {
		set("OrderWeight", OrderWeight);
	}

	public java.lang.Double getOrderWeight() {
		return get("OrderWeight");
	}

	public void setOrderLength(java.lang.Double OrderLength) {
		set("OrderLength", OrderLength);
	}

	public java.lang.Double getOrderLength() {
		return get("OrderLength");
	}

	public void setOrderHeight(java.lang.Double OrderHeight) {
		set("OrderHeight", OrderHeight);
	}

	public java.lang.Double getOrderHeight() {
		return get("OrderHeight");
	}

	public void setOrderWidth(java.lang.Double OrderWidth) {
		set("OrderWidth", OrderWidth);
	}

	public java.lang.Double getOrderWidth() {
		return get("OrderWidth");
	}

	public void setPSMoney(java.lang.Double PSMoney) {
		set("PSMoney", PSMoney);
	}

	public java.lang.Double getPSMoney() {
		return get("PSMoney");
	}

	public void setPassName(java.lang.String PassName) {
		set("PassName", PassName);
	}

	public java.lang.String getPassName() {
		return get("PassName");
	}

	public void setPassNo(java.lang.String PassNo) {
		set("PassNo", PassNo);
	}

	public java.lang.String getPassNo() {
		return get("PassNo");
	}

	public void setIsStoreOrder(java.lang.Integer IsStoreOrder) {
		set("IsStoreOrder", IsStoreOrder);
	}

	public java.lang.Integer getIsStoreOrder() {
		return get("IsStoreOrder");
	}

	public void setFromOrderId(java.lang.Integer FromOrderId) {
		set("FromOrderId", FromOrderId);
	}

	public java.lang.Integer getFromOrderId() {
		return get("FromOrderId");
	}

	public void setSubUserId(java.lang.Integer SubUserId) {
		set("SubUserId", SubUserId);
	}

	public java.lang.Integer getSubUserId() {
		return get("SubUserId");
	}

	public void setFromSTableId(java.lang.Integer FromSTableId) {
		set("FromSTableId", FromSTableId);
	}

	public java.lang.Integer getFromSTableId() {
		return get("FromSTableId");
	}

}