package org.tgcloud.zhanzhang.core;

import com.google.common.collect.Maps;

import org.apache.http.Header;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.tgcloud.zhanzhang.core.StringUtil;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by cloudLiu on 2015/8/18.
 * 发送短信验证码
 */
public class PhoneUtil extends BaseLogger {

    HttpClientUtil clientUtil=new HttpClientUtil();

    private static final Charset UTF_8 = Charset.forName("UTF-8");

    private static int CONNECT_TIMEOUT = 2 * 1000;

    private static int SO_TIMEOUT = 2 * 1000;

    public static String emailReq = "[\\w]+@[\\w]+.[\\w]+";//邮箱格式

    public static String usernameReq = "[^0-9]([0-9]|[a-zA-Z]|[\u4E00-\u9FA5]|[_]){0,15}";//用户名格式 首字符不能为数字，由字母、汉字、数字、下划线组成

    /**
     * 发送短信
     *
     * @param mobile  手机号
     * @param content 短信内容 必须是：尊敬的客户，您的${contentname}为${code},请您${content}
     * @return
     * @throws UnsupportedEncodingException 
     */
    public boolean send(String mobile, String contentname,String codes,String content) throws UnsupportedEncodingException {
        if (!phoneIsIllegal(mobile)) {
            logger.debug("手机号码格式不对");
            return false;
        }
        Map<String, String> params = Maps.newHashMap();
        Map<String, String> contents = Maps.newHashMap();
        params.put("profileCode", "FD1Mo6L0-7aAi-MpBL-ZOSR");
        params.put("templateCode", "smsTpl:156a7c7d-9824-48c8-8b96-9ee75669fee4");
        params.put("phoneNumber", mobile);
        contents.put("contentname", contentname);
        contents.put("code", codes);
        contents.put("content", content);
        params.put("contentVar", URLEncoder.encode(JSONUtil.toJson(contents),"utf-8"));
        String resultXML = clientUtil.doGet("http://apis.baidu.com/baidu_communication/baidusms/baidusms",params,"2d6320136aac238ed86f0b088a8df5aa");
        //String resultXML = clientUtil.doGet(GlobalStatic.message_send_url, params,GlobalStatic.apikey);
        Map<String, Object> responsejs = JSONUtil.toMap(resultXML);
            logger.info("-----------------请求成功-----------------");
            String code = responsejs.get("code").toString();
            String msg = responsejs.get("message").toString();
            logger.info(msg);
            if ("1000".equals(code)) {
                return true;
            }
            return false;
    }

    /**
     * 验证手机号格式是否正确
     *
     *	移动号段：
		134 135 136 137 138 139 147 150 151 152 157 158 159 178 182 183 184 187 188
		联通号段：
		130 131 132 145 155 156 171 175 176 185 186
		电信号段：
		133 149 153 173 177 180 181 189
     * @param phone
     * @return
     */
	public static boolean phoneIsIllegal(String phone){
		Pattern p = Pattern.compile("^((13\\d{9}$)|(15\\d{9}$)|(17\\d{9}$)|(18\\d{9}$)|(14[5,7,9]\\d{8})$)");
		Matcher m = p.matcher(phone);
		return m.matches(); 
	}

    /**
     * 验证用户名格式是否正确
     *
     * @param username
     * @return
     */
    public static boolean usernameIsIllegal(String username) {

        if (username.matches(usernameReq)) {
            return true;
        }
        return false;
    }

    /**
     * 密码长度是6-12，格式是由数字字母组成
     *
     * @param pass
     * @return
     */
    public static boolean passIsIllegal(String pass) {
        String passEx = "([0-9]|[a-zA-Z]|[_]){1,12}";
        if (pass.matches(passEx)) {
            return true;
        }
        return false;
    }

    /**
     * 验证码是六位数字
     *
     * @param mobile_verify
     * @return
     */
    public static boolean codeIsIllegal(String mobile_verify) {

        String codeEx = "([0-9]){6}";
        if (mobile_verify.matches(codeEx)) {
            return true;
        }
        return false;
    }
    
    public static String generateOrderId()
    {
        /*订单号生成，保证唯一就行*/
        StringBuilder sRand = new StringBuilder(20);
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String str = sdf.format(date);
        sRand.append(str);
        for (int i = 0; i < 6; i++) {
            // 取得一个随机数字
            String tmp = StringUtil.getRandomInt() + "";
            sRand.append(tmp);
        }
        return sRand.toString();
    }
}
