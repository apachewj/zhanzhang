package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseProductInfoList<M extends BaseProductInfoList<M>> extends Model<M> implements IBean {

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

	public void setRemark(java.lang.String remark) {
		set("remark", remark);
	}

	public java.lang.String getRemark() {
		return get("remark");
	}

	public void setInfoImg(java.lang.String InfoImg) {
		set("InfoImg", InfoImg);
	}

	public java.lang.String getInfoImg() {
		return get("InfoImg");
	}

	public void setSortNo(java.lang.Integer sortNo) {
		set("sortNo", sortNo);
	}

	public java.lang.Integer getSortNo() {
		return get("sortNo");
	}

}
