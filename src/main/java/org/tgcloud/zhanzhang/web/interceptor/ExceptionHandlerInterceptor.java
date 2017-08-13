package org.tgcloud.zhanzhang.web.interceptor;

import javax.servlet.http.HttpServletRequest;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;

/**
 * Created by Administrator on 2016/1/21 0021.
 */
public class ExceptionHandlerInterceptor implements Interceptor {

    @Override
    public void intercept(Invocation inv) {
        try
        {
            inv.invoke();
        }catch (Exception e)
        {
            e.printStackTrace();
            
            if (isAjax(inv.getController().getRequest()))
            {
            	inv.getController().renderJson("{\"data\":\"ERROR\"}");
            }else{
            	inv.getController().render("/common/404.html");
            }
        }
    }
    private boolean isAjax(HttpServletRequest request)
    {
        boolean ajax = "XMLHttpRequest".equals( request.getHeader("X-Requested-With") );
        String ajaxFlag = null == request.getParameter("ajax") ?  "false": "true" ;
        boolean isAjax = ajax || ajaxFlag.equalsIgnoreCase("true");
        return isAjax;
    }
}
