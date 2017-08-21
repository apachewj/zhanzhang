package org.tgcloud.zhanzhang.core;

/**
 * Created by Administrator on 2016/1/7 0007.
 */
public class GlobalStatic {

    public static int ERROR = 0;

    public static int SUCCESS = 1;

    /*1-车找人，2-人找车，3-车找货，4-货找车*/
    public static final int car_find_people = 1;
    public static final int people_zhanzhang = 2;
    public static final int car_find_good = 3;
    public static final int good_zhanzhang = 4;

    public static final int int_no_data = 0;

    public static final int people_need = 1;
    public static final int people_service = 2;
    public static final int tour_service = 3;
    
    public static int enabled = 1;
    public static int unEnabled = 2;
    public static String base_url = "/zhanzhang";
    public static int render_html = 1;
    public static String string_no_data = null;
    public static Integer first_pageNum = 1;
    public static Integer page_size = 10;
    public static final int find_sale = 1;
    public static final int find_rent = 2;
    public static final int house_sale = 3;
    public static final int rent_info = 4;
    public static String uploadpath = "";
    /*支付方式*/
    public static final int balance_pay = 1;
    public static final int zhi_pay = 2;
    public static final int wei_pay = 3;
    public static final int yu_pay = 4;
	    /*短信未发送*/
    public static short Message_No_Send = 2;

    /*一分钟以前，1000代表一秒*/
    public static long One_Minute_Ago = 60 * 1000;

    public static int Message_Send_Max = 1000;

    /*一批发送条数个数*/
    public static int Max_Send_Message = 1000;

    /*五分钟时间*/
    public static long Message_Expire_Time = 5 * 60 * 1000;

    /*图文类型*/
    public static int c_scenic = 1;//景区详情
    public static int c_guide = 2;//陪游导游头像
    public static int c_guide_place = 3;//陪游可去景点图片
    public static int c_guide_car = 4;//陪游提供车辆
    public static int c_com_news = 5;//本地企业新闻
    public static int c_com_support = 6;//本地企业支持
    public static int c_product = 7;//本地特产
    public static int c_ad_apply = 8;//广告正文
    public static int c_crowd = 9;//爱心众筹
    public static int c_notice_tongzhi=101;//通知
    public static int c_notice_baoming=102;//通知
    public static int c_notice_fankui=103;//通知
    public static int c_notice_qiuzheng=104;//通知
    public static int c_notice_zhengqiu=105;//通知
    public static int c_master_notice=11;//通知
    /*收藏点赞数据类型*/
    public static int store_praise_scenic = 1;//景区
    public static int store_praise_guide = 1;//景区陪游
    
    public static String imgpath1="/images/guanggao1.png";
    public static String imgpath2="/images/guanggao2.png";
    public static String imgpath3="/images/guanggao3.png";
    public static String imgpath4="/images/guanggao4.png";
    
    public static String imgcontent1="内蒙古欢迎您！";
    public static String imgcontent2="烤全羊最好吃";
    public static String imgcontent3="呼和浩特大草原5天4晚19999";
    public static String imgcontent4="未来星儿童牛奶";
    
    public static String hotcontent="内蒙古,牛奶,貌美";
    
    public static int order_generator = 2;
    public static int order_finish = 1;
    public static int order_cancel = 3;
}
