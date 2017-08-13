package org.tgcloud.zhanzhang.core.pay.weipay;

import org.tgcloud.zhanzhang.core.BaseLogger;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.StringUtil;
import org.tgcloud.zhanzhang.core.pay.alipay.util.AlipayCore;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/22 0022.
 */
public class ZHIRequest extends BaseLogger{

    private String appid;

    private String partnerid;

    private String prepayid;

    private String noncestr;

    private String timestamp;

    private String sign;

    public ZHIRequest(String prepayid) {
        this.prepayid = prepayid;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 20;i++)
        {
            sb.append(StringUtil.getRandomChar());
        }
        this.noncestr = sb.toString();
        this.timestamp = String.valueOf(System.currentTimeMillis() / 1000);
        this.appid = WeiConfig.client_appId;
        this.partnerid = WeiConfig.client_mch_id;
    }

    /**
     * 获取返回给手机端的响应
     *
     * @return
     */
    public Map<String,String> getTelResponse() {

        //除去数组中的空值和签名参数
        Map<String, String> sPara = AlipayCore.paraFilter(getParams());
        //生成签名结果
        String mySign = StringUtil.MD5Encode(AlipayCore.createLinkString(sPara) + "&key=" + WeiConfig.client_key).toUpperCase();
        //签名结果与签名方式加入请求提交参数组中
        try {
            sPara.put("sign", URLEncoder.encode(mySign, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            logger.warn("encode出错");
            e.printStackTrace();
        }
        return sPara;
    }

    /*获得支付参数值字典*/
    public Map<String,String> getParams() {

        Map<String, String> sParaTemp = new HashMap<String, String>();
        sParaTemp.put("appid",this.appid);
        sParaTemp.put("partnerid",this.partnerid);
        sParaTemp.put("prepayid",this.prepayid);
        sParaTemp.put("package","Sign=WXPay");
        sParaTemp.put("noncestr",this.noncestr);
        sParaTemp.put("timestamp",this.timestamp);
        return sParaTemp;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getPartnerid() {
        return partnerid;
    }

    public void setPartnerid(String partnerid) {
        this.partnerid = partnerid;
    }

    public String getPrepayid() {
        return prepayid;
    }

    public void setPrepayid(String prepayid) {
        this.prepayid = prepayid;
    }

    public String getNoncestr() {
        return noncestr;
    }

    public void setNoncestr(String noncestr) {
        this.noncestr = noncestr;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }
}
