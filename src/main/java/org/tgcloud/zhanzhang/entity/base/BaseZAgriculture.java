package org.tgcloud.zhanzhang.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseZAgriculture<M extends BaseZAgriculture<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setClassify(java.lang.String classify) {
		set("classify", classify);
	}

	public java.lang.String getClassify() {
		return get("classify");
	}

	public void setCityId(java.lang.Integer cityId) {
		set("city_id", cityId);
	}

	public java.lang.Integer getCityId() {
		return get("city_id");
	}

	public void setCountyId(java.lang.Integer countyId) {
		set("county_id", countyId);
	}

	public java.lang.Integer getCountyId() {
		return get("county_id");
	}

	public void setLocationX(java.lang.String locationX) {
		set("location_x", locationX);
	}

	public java.lang.String getLocationX() {
		return get("location_x");
	}

	public void setLocationY(java.lang.String locationY) {
		set("location_y", locationY);
	}

	public java.lang.String getLocationY() {
		return get("location_y");
	}

	public void setType(java.lang.String type) {
		set("type", type);
	}

	public java.lang.String getType() {
		return get("type");
	}

	public void setPrice(java.lang.String price) {
		set("price", price);
	}

	public java.lang.String getPrice() {
		return get("price");
	}

	public void setPricetype(java.lang.Integer pricetype) {
		set("pricetype", pricetype);
	}

	public java.lang.Integer getPricetype() {
		return get("pricetype");
	}

	public void setPriceunit(java.lang.String priceunit) {
		set("priceunit", priceunit);
	}

	public java.lang.String getPriceunit() {
		return get("priceunit");
	}

	public void setStartnum(java.lang.Integer startnum) {
		set("startnum", startnum);
	}

	public java.lang.Integer getStartnum() {
		return get("startnum");
	}

	public void setHavenum(java.lang.Integer havenum) {
		set("havenum", havenum);
	}

	public java.lang.Integer getHavenum() {
		return get("havenum");
	}

	public void setTitle(java.lang.String title) {
		set("title", title);
	}

	public java.lang.String getTitle() {
		return get("title");
	}

	public void setContent(java.lang.String content) {
		set("content", content);
	}

	public java.lang.String getContent() {
		return get("content");
	}

	public void setMerits(java.lang.String merits) {
		set("merits", merits);
	}

	public java.lang.String getMerits() {
		return get("merits");
	}

	public void setLinkman(java.lang.String linkman) {
		set("linkman", linkman);
	}

	public java.lang.String getLinkman() {
		return get("linkman");
	}

	public void setTel(java.lang.String tel) {
		set("tel", tel);
	}

	public java.lang.String getTel() {
		return get("tel");
	}

	public void setImgs(java.lang.String imgs) {
		set("imgs", imgs);
	}

	public java.lang.String getImgs() {
		return get("imgs");
	}

	public void setCreateTime(java.util.Date createTime) {
		set("create_time", createTime);
	}

	public java.util.Date getCreateTime() {
		return get("create_time");
	}

	public void setStatus(java.lang.Integer status) {
		set("status", status);
	}

	public java.lang.Integer getStatus() {
		return get("status");
	}

	public void setUserId(java.lang.Integer userId) {
		set("user_id", userId);
	}

	public java.lang.Integer getUserId() {
		return get("user_id");
	}

	public void setMaintype(java.lang.Integer maintype) {
		set("maintype", maintype);
	}

	public java.lang.Integer getMaintype() {
		return get("maintype");
	}

	public void setTradetimetype(java.lang.Integer tradetimetype) {
		set("tradetimetype", tradetimetype);
	}

	public java.lang.Integer getTradetimetype() {
		return get("tradetimetype");
	}

	public void setTradetime(java.lang.String tradetime) {
		set("tradetime", tradetime);
	}

	public java.lang.String getTradetime() {
		return get("tradetime");
	}

	public void setTradetimeunit(java.lang.String tradetimeunit) {
		set("tradetimeunit", tradetimeunit);
	}

	public java.lang.String getTradetimeunit() {
		return get("tradetimeunit");
	}

	public void setAreatype(java.lang.Integer areatype) {
		set("areatype", areatype);
	}

	public java.lang.Integer getAreatype() {
		return get("areatype");
	}

	public void setArea(java.lang.String area) {
		set("area", area);
	}

	public java.lang.String getArea() {
		return get("area");
	}

	public void setAreaunit(java.lang.String areaunit) {
		set("areaunit", areaunit);
	}

	public java.lang.String getAreaunit() {
		return get("areaunit");
	}

	public void setSheshi(java.lang.String sheshi) {
		set("sheshi", sheshi);
	}

	public java.lang.String getSheshi() {
		return get("sheshi");
	}

	public void setDipingzheng(java.lang.String dipingzheng) {
		set("dipingzheng", dipingzheng);
	}

	public java.lang.String getDipingzheng() {
		return get("dipingzheng");
	}

	public void setPeitaojiju(java.lang.String peitaojiju) {
		set("peitaojiju", peitaojiju);
	}

	public java.lang.String getPeitaojiju() {
		return get("peitaojiju");
	}

	public void setGaosu(java.lang.String gaosu) {
		set("gaosu", gaosu);
	}

	public java.lang.String getGaosu() {
		return get("gaosu");
	}

	public void setGangkou(java.lang.String gangkou) {
		set("gangkou", gangkou);
	}

	public java.lang.String getGangkou() {
		return get("gangkou");
	}

	public void setGuodao(java.lang.String guodao) {
		set("guodao", guodao);
	}

	public java.lang.String getGuodao() {
		return get("guodao");
	}

	public void setTielu(java.lang.String tielu) {
		set("tielu", tielu);
	}

	public java.lang.String getTielu() {
		return get("tielu");
	}

	public void setGaotie(java.lang.String gaotie) {
		set("gaotie", gaotie);
	}

	public java.lang.String getGaotie() {
		return get("gaotie");
	}

	public void setJichang(java.lang.String jichang) {
		set("jichang", jichang);
	}

	public java.lang.String getJichang() {
		return get("jichang");
	}

	public void setIsneed(java.lang.Integer isneed) {
		set("isneed", isneed);
	}

	public java.lang.Integer getIsneed() {
		return get("isneed");
	}

	public void setStartnumtype(java.lang.Integer startnumtype) {
		set("startnumtype", startnumtype);
	}

	public java.lang.Integer getStartnumtype() {
		return get("startnumtype");
	}

}
