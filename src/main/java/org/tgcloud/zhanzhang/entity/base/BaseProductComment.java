package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseProductComment<M extends BaseProductComment<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setProductId(java.lang.Integer ProductId) {
		set("ProductId", ProductId);
	}

	public java.lang.Integer getProductId() {
		return get("ProductId");
	}

	public void setSpecId(java.lang.Integer specId) {
		set("specId", specId);
	}

	public java.lang.Integer getSpecId() {
		return get("specId");
	}

	public void setOrderDetailId(java.lang.Integer orderDetailId) {
		set("orderDetailId", orderDetailId);
	}

	public java.lang.Integer getOrderDetailId() {
		return get("orderDetailId");
	}

	public void setSpecName(java.lang.String specName) {
		set("specName", specName);
	}

	public java.lang.String getSpecName() {
		return get("specName");
	}

	public void setBuyUserId(java.lang.Integer BuyUserId) {
		set("BuyUserId", BuyUserId);
	}

	public java.lang.Integer getBuyUserId() {
		return get("BuyUserId");
	}

	public void setBuyUserName(java.lang.String BuyUserName) {
		set("BuyUserName", BuyUserName);
	}

	public java.lang.String getBuyUserName() {
		return get("BuyUserName");
	}

	public void setIsHp(java.lang.Integer IsHp) {
		set("IsHp", IsHp);
	}

	public java.lang.Integer getIsHp() {
		return get("IsHp");
	}

	public void setCommentValue(java.lang.String CommentValue) {
		set("CommentValue", CommentValue);
	}

	public java.lang.String getCommentValue() {
		return get("CommentValue");
	}

	public void setIsNm(java.lang.Integer isNm) {
		set("isNm", isNm);
	}

	public java.lang.Integer getIsNm() {
		return get("isNm");
	}

	public void setMSXF(java.lang.Integer MSXF) {
		set("MSXF", MSXF);
	}

	public java.lang.Integer getMSXF() {
		return get("MSXF");
	}

	public void setFWTD(java.lang.Integer FWTD) {
		set("FWTD", FWTD);
	}

	public java.lang.Integer getFWTD() {
		return get("FWTD");
	}

	public void setFHSD(java.lang.Integer FHSD) {
		set("FHSD", FHSD);
	}

	public java.lang.Integer getFHSD() {
		return get("FHSD");
	}

	public void setCreateTime(java.util.Date createTime) {
		set("createTime", createTime);
	}

	public java.util.Date getCreateTime() {
		return get("createTime");
	}

}
