package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZTCommentTable<M extends BaseZTCommentTable<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer Id) {
		set("Id", Id);
	}

	public java.lang.Integer getId() {
		return get("Id");
	}

	public void setTalkId(java.lang.Integer TalkId) {
		set("TalkId", TalkId);
	}

	public java.lang.Integer getTalkId() {
		return get("TalkId");
	}

	public void setFriendId(java.lang.Integer FriendId) {
		set("FriendId", FriendId);
	}

	public java.lang.Integer getFriendId() {
		return get("FriendId");
	}

	public void setCommentInfo(java.lang.String CommentInfo) {
		set("CommentInfo", CommentInfo);
	}

	public java.lang.String getCommentInfo() {
		return get("CommentInfo");
	}

	public void setReplyId(java.lang.Integer ReplyId) {
		set("ReplyId", ReplyId);
	}

	public java.lang.Integer getReplyId() {
		return get("ReplyId");
	}

	public void setCreateDate(java.util.Date CreateDate) {
		set("CreateDate", CreateDate);
	}

	public java.util.Date getCreateDate() {
		return get("CreateDate");
	}

	public void setFloor(java.lang.Integer Floor) {
		set("Floor", Floor);
	}

	public java.lang.Integer getFloor() {
		return get("Floor");
	}

}
