package org.tgcloud.zhanzhang.entity;

import org.tgcloud.zhanzhang.entity.base.BaseZMarry;

/**
 * Generated by JFinal.
 */
@SuppressWarnings("serial")
public class ZMarry extends BaseZMarry<ZMarry> {
	public static final ZMarry dao = new ZMarry();
	public ZMarry(){}
	public ZMarry(String nickname,String hunyingguan,Integer sex,Integer age,Integer high,Integer weight
			,String degrees,String faith,String job,String position,Integer ismarried,String address
			,Integer income,Integer house,Integer car,Integer smoke,Integer drink,String hoppy,String requirements
			,String sign,Integer user_id,String backimg,String imgs,Integer city_id,Integer county_id,String location_x,
			String location_y, String truename,String birthaddress,String stayaddress,String idcard,String idimgs,String tel){
		this.setNickname(nickname);this.setHunyingguan(hunyingguan);this.setSex(sex);this.setAge(age);this.setHigh(high);this.setWeight(weight);
		this.setDegrees(degrees);this.setFaith(faith);this.setJob(job);this.setPosition(position);this.setIsmarried(ismarried);this.setAddress(address);
		this.setIncome(income);this.setHouse(house);this.setCar(car);this.setSmoke(smoke);this.setDrink(drink);this.setHoppy(hoppy);
		this.setRequirements(requirements);this.setSign(sign);this.setUserId(user_id);this.setBackimg(backimg);this.setImgs(imgs);
		this.setCityId(city_id);this.setCountyId(county_id);this.setLocationX(location_x);this.setLocationY(location_y);this.setStatus(1);
		this.setTruename(truename);this.setBirthaddress(birthaddress);this.setStayaddress(stayaddress);this.setIdcard(idcard);
		this.setIdimgs(idimgs);this.setTel(tel);
	}
	public ZMarry(String nickname,String hunyingguan,Integer sex,Integer age,Integer high,Integer weight
			,String degrees,String faith,String job,String position,Integer ismarried,String address
			,Integer income,Integer house,Integer car,Integer smoke,Integer drink,String hoppy,String requirements
			,String sign,Integer user_id,String backimg,String imgs,Integer city_id,Integer county_id,String location_x,
			String location_y, String truename,String birthaddress,String stayaddress,String idcard,String idimgs,String tel,Integer pass){
		this.setNickname(nickname);this.setHunyingguan(hunyingguan);this.setSex(sex);this.setAge(age);this.setHigh(high);this.setWeight(weight);
		this.setDegrees(degrees);this.setFaith(faith);this.setJob(job);this.setPosition(position);this.setIsmarried(ismarried);this.setAddress(address);
		this.setIncome(income);this.setHouse(house);this.setCar(car);this.setSmoke(smoke);this.setDrink(drink);this.setHoppy(hoppy);
		this.setRequirements(requirements);this.setSign(sign);this.setUserId(user_id);this.setBackimg(backimg);this.setImgs(imgs);
		this.setCityId(city_id);this.setCountyId(county_id);this.setLocationX(location_x);this.setLocationY(location_y);this.setStatus(1);
		this.setTruename(truename);this.setBirthaddress(birthaddress);this.setStayaddress(stayaddress);this.setIdcard(idcard);
		this.setIdimgs(idimgs);this.setTel(tel);this.setPass(pass);
	}
}
