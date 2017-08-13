package org.tgcloud.zhanzhang.web.interceptor;

import com.jfinal.aop.Enhancer;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.tgcloud.zhanzhang.entity.ZUser;
import org.tgcloud.zhanzhang.service.UserService;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2016/1/5 0005.
 * 登录权限需要
 */
public class AuthInterceptor implements Interceptor {

	//private UserService userService = Enhancer.enhance(UserService.class);
    @Override
    public void intercept(Invocation invocation) {
        Controller controller = invocation.getController();
        /*获取cookie，判断用户是否登录，这个值可以存储再数据库中*/
        /*可以为每个用户在cookie中放入一个全球唯一的不容易被伪造的身份标识（类似于实现session的jsessionid值）。利用这个身份标识，可以有多种办法来解决问题了。例如，可以在数据库中存放用户登录信息，也可以使用一个集中的cache 来存放 :)*/
        controller.getCookie("");
        String actionKey = invocation.getActionKey();
        Boolean loginUser = controller.getSessionAttr("flag");
        if(controller.getSessionAttr("type") != null &&(Integer)controller.getSessionAttr("type")==3){
	        if(Db.findFirst("select * from z_user where status=2 and id="+(Integer)controller.getSessionAttr("user_id"))!=null){
	        	loginUser=false;
	        }
        }
        if(controller.getSessionAttr("type") != null &&(Integer)controller.getSessionAttr("type")==2){
	        if(Db.findFirst("select * from z_master where status=2 and id="+(Integer)controller.getSessionAttr("user_id"))!=null){
	        	loginUser=false;
	        }
        }
        if(controller.getSessionAttr("type") != null &&(Integer)controller.getSessionAttr("type")==4){
            if(Db.findFirst("select * from z_manager where status=2 and id="+(Integer)controller.getSessionAttr("user_id"))!=null){
            	loginUser=false;
            }
            }
        if (actionKey.startsWith("/user"))
        {
            if (loginUser != null && loginUser ==true )
                invocation.invoke();
            else
            {
                if (isAjax(controller.getRequest()))
                {HttpServletRequest request;
                controller.getSession().removeAttribute("flag");
                controller.getSession().removeAttribute("user_id");
                HttpServletResponse response=controller.getResponse();
                Cookie cookie = new Cookie("user_id","");
                Cookie cookies = new Cookie("type","");
                Cookie cookie1 = new Cookie("ad","");
                Cookie cookie2 = new Cookie("money","");
                Cookie cookie3 = new Cookie("report","");
                Cookie cookie4 = new Cookie("message","");
                Cookie cookie5 = new Cookie("master","");
                Cookie cookie6 = new Cookie("user_type","");
                Cookie cookie7 = new Cookie("province","");
                Cookie cookie8 = new Cookie("city","");
                Cookie cookie9 = new Cookie("county","");
                cookie.setMaxAge(0);
                cookie1.setMaxAge(0);
                cookie2.setMaxAge(0);
                cookie3.setMaxAge(0);
                cookie4.setMaxAge(0);
                cookie5.setMaxAge(0);
                cookie6.setMaxAge(0);
                cookie7.setMaxAge(0);
                cookie8.setMaxAge(0);
                cookie9.setMaxAge(0);
                cookies.setMaxAge(0);
                response.addCookie(cookie1);
                response.addCookie(cookie2);
                response.addCookie(cookie3);
                response.addCookie(cookie4);
                response.addCookie(cookie5);
                response.addCookie(cookies);
                response.addCookie(cookie);
                response.addCookie(cookie6);
                response.addCookie(cookie7);
                response.addCookie(cookie8);
                response.addCookie(cookie9);
                    controller.renderJson("{\"data\":\"no login\"}");
                }
            }
        }
        else if ((actionKey.startsWith("/login") || actionKey.startsWith("/submit") )&& (loginUser != null && loginUser == true))
        {
        	if (isAjax(controller.getRequest()))
            {
        		System.out.println("==================getin==============");
        		HttpServletResponse response=controller.getResponse();
        		Cookie cookie = new Cookie("user_id",(controller.getSessionAttr("user_id")).toString());
        		response.addCookie(cookie);
                controller.renderJson("{\"data\":\"aleady login\"}");
            }
        }
        else
            invocation.invoke();

    }

    private boolean isAjax(HttpServletRequest request)
    {
        boolean ajax = "XMLHttpRequest".equals( request.getHeader("X-Requested-With") );
        System.out.println("=================="+request.getHeader("X-Requested-With")+"==============");
        String ajaxFlag = null == request.getParameter("ajax") ?  "false": "true" ;
        boolean isAjax = ajax || ajaxFlag.equalsIgnoreCase("true");
        return isAjax;
    }
}
