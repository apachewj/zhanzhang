package org.tgcloud.zhanzhang.entity;

import org.tgcloud.zhanzhang.entity.base.BaseZFindwork;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class ZFindwork extends BaseZFindwork<ZFindwork> {
	public static final ZFindwork dao = new ZFindwork();
	public ZFindwork(){}
	public ZFindwork(String title,String name,Integer sex,Integer age,int user_id,
			String worktime,
			String degrees,String trade,String job,String income,String introduce,
			String choice,String linkman,String tel,String img,Integer showtel,
			Integer showcontact,Integer status){
		this.setTitle(title);
		this.setName(name);
		this.setSex(sex);
		this.setAge(age);
		this.setUserId(user_id);
		this.setWorktime(worktime);
		this.setDegrees(degrees);
		this.setTrade(trade);
		this.setJob(job);
		this.setIncome(income);
		this.setIntroduce(introduce);
		this.setChoice(choice);
		this.setLinkman(linkman);
		this.setTel(tel);
		this.setImg(img);
		this.setShowtel(showtel);
		this.setShowcontact(showcontact);
		this.setStatus(status);
	}
}