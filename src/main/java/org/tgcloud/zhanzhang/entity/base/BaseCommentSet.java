package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseCommentSet<M extends BaseCommentSet<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setUserId(java.lang.Integer userId) {
		set("User_Id", userId);
	}

	public java.lang.Integer getUserId() {
		return get("User_Id");
	}

	public void setProductId(java.lang.Integer productId) {
		set("Product_Id", productId);
	}

	public java.lang.Integer getProductId() {
		return get("Product_Id");
	}

	public void setCommenttypeId(java.lang.Integer commenttypeId) {
		set("CommentType_Id", commenttypeId);
	}

	public java.lang.Integer getCommenttypeId() {
		return get("CommentType_Id");
	}

	public void setTime(java.util.Date Time) {
		set("Time", Time);
	}

	public java.util.Date getTime() {
		return get("Time");
	}

	public void setScore(java.lang.Integer Score) {
		set("Score", Score);
	}

	public java.lang.Integer getScore() {
		return get("Score");
	}

	public void setContent(java.lang.String Content) {
		set("Content", Content);
	}

	public java.lang.String getContent() {
		return get("Content");
	}

	public void setState(java.lang.Integer State) {
		set("State", State);
	}

	public java.lang.Integer getState() {
		return get("State");
	}

	public void setPhoto(java.lang.String Photo) {
		set("Photo", Photo);
	}

	public java.lang.String getPhoto() {
		return get("Photo");
	}

	public void setReplyId(java.lang.Integer ReplyId) {
		set("ReplyId", ReplyId);
	}

	public java.lang.Integer getReplyId() {
		return get("ReplyId");
	}

	public void setRespondContent(java.lang.String RespondContent) {
		set("RespondContent", RespondContent);
	}

	public java.lang.String getRespondContent() {
		return get("RespondContent");
	}

	public void setRespondTime(java.lang.String RespondTime) {
		set("RespondTime", RespondTime);
	}

	public java.lang.String getRespondTime() {
		return get("RespondTime");
	}

	public void setStoreId(java.lang.Integer storeId) {
		set("Store_Id", storeId);
	}

	public java.lang.Integer getStoreId() {
		return get("Store_Id");
	}

}