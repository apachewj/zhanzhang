package org.tgcloud.zhanzhang.core.pay.weipay;

import com.google.common.base.Strings;
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
public class QueryRequest extends BaseLogger {

    private String appid;

    private String mch_id;

    private String transaction_id;

    private String out_trade_no;

    private String nonce_str;

    private String sign;

    public QueryRequest( String transaction_id, String out_trade_no) {
        this.appid = WeiConfig.client_appId;
        this.mch_id = WeiConfig.client_mch_id;
        this.transaction_id = transaction_id;
        this.out_trade_no = out_trade_no;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 20;i++)
        {
            sb.append(StringUtil.getRandomChar());
        }
        this.nonce_str = sb.toString();
        this.sign = sign;
    }

    /**
     * 获取返回给手机端的响应
     *
     * @return
     */
    public String getTelResponse() {

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
        return StringUtil.mapToXmlStrWithOrder(sPara);
    }

    /*获得支付参数值字典*/
    public Map<String,String> getParams() {

        Map<String, String> sParaTemp = new HashMap<String, String>();
        sParaTemp.put("appid",this.appid);
        sParaTemp.put("mch_id",this.mch_id);
        sParaTemp.put("nonce_str",this.nonce_str);
        if (!Strings.isNullOrEmpty(this.out_trade_no))
        {
            sParaTemp.put("out_trade_no",this.out_trade_no);
        }
        if (!Strings.isNullOrEmpty(this.transaction_id))
        {
            sParaTemp.put("transaction_id",this.transaction_id);
        }
        return sParaTemp;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getMch_id() {
        return mch_id;
    }

    public void setMch_id(String mch_id) {
        this.mch_id = mch_id;
    }

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getOut_trade_no() {
        return out_trade_no;
    }

    public void setOut_trade_no(String out_trade_no) {
        this.out_trade_no = out_trade_no;
    }

    public String getNonce_str() {
        return nonce_str;
    }

    public void setNonce_str(String nonce_str) {
        this.nonce_str = nonce_str;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }
}
