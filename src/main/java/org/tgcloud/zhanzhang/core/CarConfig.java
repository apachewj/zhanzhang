package org.tgcloud.zhanzhang.core;

import org.tgcloud.zhanzhang.entity._MappingKit;
import org.tgcloud.zhanzhang.web.controller.AdController;
import org.tgcloud.zhanzhang.web.controller.AgricultureController;
import org.tgcloud.zhanzhang.web.controller.CheckController;
import org.tgcloud.zhanzhang.web.controller.CompanyController;
import org.tgcloud.zhanzhang.web.controller.CrowdController;
import org.tgcloud.zhanzhang.web.controller.IndexController;
import org.tgcloud.zhanzhang.web.controller.LocalController;
import org.tgcloud.zhanzhang.web.controller.ManagerController;
import org.tgcloud.zhanzhang.web.controller.MarryController;
import org.tgcloud.zhanzhang.web.controller.MasterController;
import org.tgcloud.zhanzhang.web.controller.NoticeController;
import org.tgcloud.zhanzhang.web.controller.TravelController;
import org.tgcloud.zhanzhang.web.controller.UserController;
import org.tgcloud.zhanzhang.web.interceptor.AuthInterceptor;
import org.tgcloud.zhanzhang.web.interceptor.ExceptionHandlerInterceptor;
import org.tgcloud.zhanzhang.web.interceptor.JSONPInterceptor;

import com.jfinal.config.*;
import com.jfinal.ext.plugin.quartz.QuartzPlugin;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.dialect.SqlServerDialect;
import com.jfinal.plugin.activerecord.tx.TxByMethods;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.render.ViewType;
import com.jfinal.upload.OreillyCos;

/**
 * Created by Administrator on 2016/1/4 0004.
 */
public class CarConfig extends JFinalConfig {

    public void configConstant(Constants constants) {
        PropKit.use("jdbc.properties");
        constants.setEncoding("UTF-8");
        constants.setDevMode(true);
        constants.setViewType(ViewType.FREE_MARKER);
        OreillyCos.setFileRenamePolicy(new CarFileRenamePolicy());
        constants.setMaxPostSize(10*1024*1024);
//        constants.setBaseUploadPath("D:/nginx-1.8.0/html/static/zhanzhang");
//        constants.setBaseDownloadPath("D:/nginx-1.8.0/html/static/zhanzhang");
    }

    public void configRoute(Routes me) {
        me.add("/", IndexController.class);
        me.add("/user", UserController.class);
        me.add("/user/travel", TravelController.class);
        me.add("/user/company", CompanyController.class);
        me.add("/user/agriculture", AgricultureController.class);
        me.add("/user/marry", MarryController.class);
        me.add("/user/zhancheck", CheckController.class);
        me.add("/user/manager", ManagerController.class);
        me.add("/user/local", LocalController.class);
        me.add("/user/master", MasterController.class);
        me.add("/user/ad", AdController.class);
        me.add("/user/crowd", CrowdController.class);
        me.add("/user/notice", NoticeController.class);
    }

    public void configPlugin(Plugins plugins) {

        final String URL =PropKit.get("jdbcUrl");
        final String USERNAME = PropKit.get("user");
        final String PASSWORD =PropKit.get("password");
        final Integer INITIAL_SIZE = PropKit.getInt("initialSize");
        final Integer MID_IDLE = PropKit.getInt("minIdle");
        final Integer MAX_ACTIVE = PropKit.getInt("maxActive");
        final String DRIVE_CLASS = PropKit.get("driverClass");
        DruidPlugin druidPlugin = new DruidPlugin(URL,USERNAME,PASSWORD,DRIVE_CLASS);
        druidPlugin.set(INITIAL_SIZE,MID_IDLE,MAX_ACTIVE);
        druidPlugin.setFilters("stat,wall");
        plugins.add(druidPlugin);

        ActiveRecordPlugin activeRecordPlugin = new ActiveRecordPlugin(druidPlugin);
        activeRecordPlugin.setDialect(new SqlServerDialect());
        activeRecordPlugin.setShowSql(true);
        _MappingKit.mapping(activeRecordPlugin);
        plugins.add(activeRecordPlugin);
        QuartzPlugin quartzPlugin = new QuartzPlugin("job.properties");
        plugins.add(quartzPlugin);
    }

    public void configInterceptor(Interceptors interceptors) {
        //这里用于配置全局的拦截器，对所有请求进行拦截

        // 添加控制层全局拦截器
//        interceptors.addGlobalActionInterceptor(new SessionInViewInterceptor());
        interceptors.addGlobalActionInterceptor(new AuthInterceptor());
        interceptors.addGlobalActionInterceptor(new ExceptionHandlerInterceptor());
        interceptors.addGlobalActionInterceptor(new JSONPInterceptor());
        // 添加业务层全局拦截器
        // interceptors.addGlobalServiceInterceptor(new AuthInterceptor());
        interceptors.add(new TxByMethods("saveUser"));
    }

    public void configHandler(Handlers me) {

    }

}
