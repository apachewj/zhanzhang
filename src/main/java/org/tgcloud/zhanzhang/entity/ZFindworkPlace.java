package org.tgcloud.zhanzhang.entity;

import org.tgcloud.zhanzhang.entity.base.BaseZFindworkPlace;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class ZFindworkPlace extends BaseZFindworkPlace<ZFindworkPlace> {
	public ZFindworkPlace(Integer id, int parseInt, int parseInt2, int parseInt3) {
		// TODO Auto-generated constructor stub
		this.setFId(id);
		this.setProvinceId(parseInt);
		this.setCityId(parseInt2);
		this.setCountyId(parseInt3);
	}
	public ZFindworkPlace() {
	}
	public static final ZFindworkPlace dao = new ZFindworkPlace();
}