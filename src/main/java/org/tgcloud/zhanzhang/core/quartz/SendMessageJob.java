package org.tgcloud.zhanzhang.core.quartz;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.tgcloud.zhanzhang.core.BeanUtil;
import org.tgcloud.zhanzhang.core.GlobalStatic;
import org.tgcloud.zhanzhang.core.PhoneUtil;
import org.tgcloud.zhanzhang.entity.ZPhonemsm;

import com.jfinal.plugin.activerecord.Db;

import common.Logger;

public class SendMessageJob implements Job {
	
    private PhoneUtil phoneUtil=new PhoneUtil();
    
	private static final Logger logger = Logger.getLogger(SendMessageJob.class);
	
	 /**
     * 轮询器开关
     * */
    private static boolean b_onoff_polling = false;

    /**
     * 轮询锁
     * */
    private static boolean lock_polling = true;


    /**
     * 短信发送轮询器
     */
	@Override
	public void execute(JobExecutionContext context)
			throws JobExecutionException {
        if(!b_onoff_polling||!lock_polling){
            //轮询器关或者是被锁，则返回
            return;
        }
        lock_polling=false;//执行中，锁住;待本次执行完才释放锁
        logger.info("发送短信");
        try{
            //查询出待发送的短信列表 , 过期的也会被发送
            List<ZPhonemsm> messages = ZPhonemsm.dao.find("select top "+GlobalStatic.Max_Send_Message+" * from z_phonemsm where sendStatus="+GlobalStatic.Message_No_Send+" order by createTime");
            if (BeanUtil.isNullList(messages))
            {
                b_onoff_polling = false;
                return;
            }
            int thread_size = messages.size() / 1000;
            if (messages.size() % 1000 != 0)
            {
                thread_size++;
            }
            ExecutorService service = Executors.newFixedThreadPool(thread_size);
            for(int i = 0; i < thread_size; i++)
            {
                int start = 1000 * i;
                int end = 1000 * (i + 1);
                if (end > messages.size())
                {
                    end = messages.size();
                }
                if (!service.isShutdown())
                {
                    service.execute(new SendMessage(messages.subList(start,end),phoneUtil));
                }
            }
            service.shutdown();
//          短信记录状态更新为已经发送
            Db.update("update z_phonemsm set sendStatus = 1 where id in ( select top "+GlobalStatic.Max_Send_Message+" id from z_phonemsm where sendStatus = 2 order by createTime)");
//          第一批发送之后如果没有需要发送的短信了，将轮询器关闭
            if(true){
                b_onoff_polling = false;
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally{
            lock_polling = true;//执行完成，释放锁
        }
    }

    class SendMessage implements Runnable
    {
        private List<ZPhonemsm> messages;

        private PhoneUtil phoneUtil;

        public SendMessage(List<ZPhonemsm> messages,PhoneUtil phoneUtil) {
            this.messages = messages;
            this.phoneUtil = phoneUtil;
        }

        @Override
        public void run() {
            for (ZPhonemsm message : messages)
            {
            	//尊敬的客户，您的${contentname}为${code},请您${content}
                try {
					phoneUtil.send(message.getTelephone(),"验证码",message.getContent(),"在5分钟内输入，过期无效！");
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
        }
    }

    public static void setB_onoff_polling(boolean b_onoff_polling) {
    	SendMessageJob.b_onoff_polling = b_onoff_polling;
    }

    public static void setLock_polling(boolean lock_polling) {
    	SendMessageJob.lock_polling = lock_polling;
    }

}
