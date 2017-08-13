package org.tgcloud.zhanzhang.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.jfinal.aop.Before;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;

import org.tgcloud.zhanzhang.core.PhoneUtil;
import org.tgcloud.zhanzhang.core.StringUtil;
import org.tgcloud.zhanzhang.service.MessageSendJob;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.ResultMessage;
import org.tgcloud.zhanzhang.core.quartz.SendMessageJob;
import org.tgcloud.zhanzhang.entity.ZPhonemsm;
import org.tgcloud.zhanzhang.entity.ZUser;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/1/5 0005.
 */
public class UserService {

    @Before(Tx.class)
    public Integer saveUser(String username,String password){
        String SQL = "SELECT id FROM z_user WHERE username =?";
        Integer result = Db.queryFirst(SQL, username);
        if(result==null){
            Record user = new Record().set("username", username).set("password", password).set("status",1);
            Db.save("z_user", user);
            return user.getBigDecimal("id").intValue();
        }
        return null;
    }

    public Integer login(String username,String password){
        String SQL = "SELECT id FROM z_user WHERE status=1 and username =? and password=?";
        Integer result = Db.queryFirst(SQL, username, password);
        return result;
    }
    
    public ZUser getUnuser(Integer user_id){

        return ZUser.dao.findFirst("select * from z_manager where status=2 and id="+user_id);
    }
    
    
    public String doInsertIdentifyCode(ZPhonemsm message) {
        /*10：注册20：添加人员30：设置安全密码 40：更改绑定手机*/
        if (message.getType() != 10 && message.getType() != 20 && message.getType() != 30 && message.getType() != 40&& message.getType() != 50&& message.getType() != 60&& message.getType() != 70&& message.getType() != 80) {
            return "1010";
        }
        if (!PhoneUtil.phoneIsIllegal(message.getTelephone())) {
            return "1002";
        }
//      查询是一分钟以内是否已经发送过短信，如果有就不发送
        ZPhonemsm existM = Db.queryFirst("select * from z_phonemsm where telephone = ? and type = ? and createtime > dateadd(minute,-1,getdate()) ORDER BY createtime DESC",message.getTelephone(), message.getType());
        //if (existM != null) {
        //   return new ResultMessage(1023, "一分钟内已发过，不能频繁发送");
        //}
        if (Db.queryInt("select count(id) from z_phonemsm where telephone = ? and type = ? and createtime >=dateadd(minute,-30,getdate())",message.getTelephone(), message.getType()) >= 100) {
            return "1003";
        } else {
            phoneContent(message);
            message.save();
            String resultMessage = "SUCCESS";
            if (message.getType() == 10) {
            	resultMessage=(Db.queryFirst("select * from z_user where username=?",message.getTelephone()) != null ? "1024": "SUCCESS");
            }
            if (message.getType() == 30) {
            	resultMessage=(Db.queryFirst("select * from z_master where tel=?",message.getTelephone()) != null ? "1024": "SUCCESS");
            }
            /*打开轮询锁*/
            SendMessageJob.setB_onoff_polling(true);
            return resultMessage;
        }
    }

    /**
     * 生成短信内容
     *
     * @param message
     * @return
     */
    private ZPhonemsm phoneContent(ZPhonemsm message) {

        if (message.getType() == null) {
            return null;
        } else {
        	//String identifyCode = identifyCode(GlobalStatic.Code_Num);
            String identifyCode = "123456";
            message.setIdentifyCode(identifyCode);
            message.setContent(message.getIdentifyCode());
            //message.setContent("@1@=" + message.getIdentifycode());
            return message;
        }
    }

    private String identifyCode(int codeNum) {
        StringBuilder sRand = new StringBuilder(codeNum);
        for (int i = 0; i < codeNum; i++) {
            // 取得一个随机数字
            String tmp = StringUtil.getRandomInt() + "";
            sRand.append(tmp);
        }
        return sRand.toString();
    }
    
    public String checkVerity(String mobile, String mobile_verify, int type) {
        if (!PhoneUtil.phoneIsIllegal(mobile) || !PhoneUtil.codeIsIllegal(mobile_verify)) {
            return "1002";
        }
        ZPhonemsm message = ZPhonemsm.dao.findFirst("select * from z_phonemsm where telephone = ? and type = ? and createtime > dateadd(minute,-5,getdate()) ORDER BY createtime DESC",mobile, type);
        SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		System.out.println(dateFormat.format(new Date(System.currentTimeMillis() - GlobalStatic.Message_Expire_Time)));
        if (message == null) {
            return "1025";
        }
        if (!mobile_verify.equals(message.getIdentifyCode())) {
            return "1026";
        }
        /*校验完验证码后将其失效*/
        message.setStatus(2);//update seal_phonemsm set status = 2 where type = #{param1} and telephone = #{param2}
        message.update();
        return "SUCCESS";
    }
}
