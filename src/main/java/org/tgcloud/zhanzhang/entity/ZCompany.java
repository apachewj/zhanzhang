package org.tgcloud.zhanzhang.entity;


import org.tgcloud.zhanzhang.entity.base.BaseZCompany;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class ZCompany extends BaseZCompany<ZCompany> {

	public ZCompany(String com_name, int user_id, String message,
			String main_img, String id_img, String paper_img, int status,int city_id,int county_id,String location_x,String location_y) {
		// TODO Auto-generated constructor stub
		this.setComName(com_name);
		this.setUserId(user_id);
		this.setMessage(message);
		this.setMainImg(main_img);
		this.setIdImg(id_img);
		this.setPaperImg(paper_img);
		this.setStatus(status);
		this.setCountyId(county_id);
		this.setCityId(city_id);
		this.setLocationX(location_x);
		this.setLocationY(location_y);
	}

	public ZCompany(){}
	
	public static final ZCompany dao = new ZCompany();
}
