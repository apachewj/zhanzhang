package org.tgcloud.zhanzhang.entity;

import org.tgcloud.zhanzhang.entity.base.BaseZCompanyWork;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class ZCompanyWork extends BaseZCompanyWork<ZCompanyWork> {
	public ZCompanyWork(Integer contactId, String startday, String endday,
			String starttime, String endtime) {
		this.setContactId(contactId);
		this.setStartday(startday);
		this.setEndday(endday);
		this.setStarttime(starttime);
		this.setEndtime(endtime);
	}

	public ZCompanyWork(){}
	
	public static final ZCompanyWork dao = new ZCompanyWork();
}