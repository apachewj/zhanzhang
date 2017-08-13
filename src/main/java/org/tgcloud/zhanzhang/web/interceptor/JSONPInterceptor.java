package org.tgcloud.zhanzhang.web.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.jfinal.render.JsonRender;
import com.jfinal.render.Render;
import org.tgcloud.zhanzhang.core.GlobalStatic;

/**
 * Created by Administrator on 2016/1/26 0026.
 */
public class JSONPInterceptor implements Interceptor {

    @Override
    public void intercept(Invocation invocation) {
        String callBack = null;
        Controller controller = invocation.getController();
        if (controller.getPara("callback", GlobalStatic.string_no_data) != null)
        {
            callBack = controller.getPara("callback");
        }
        invocation.invoke();
        if (callBack != null)
        {
            Render render = controller.getRender();
            if (render instanceof JsonRender)
            {
                controller.renderText(String.format(("%s('"+ ((JsonRender) render).getJsonText() +"')"), callBack));
            }
        }
    }
}
