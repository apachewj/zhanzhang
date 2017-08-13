package org.tgcloud.zhanzhang.core;

import com.google.common.base.Strings;
import com.google.common.collect.Maps;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

/**
 * 对象常用方法工具类
 *
 * @author peiyu
 */
public final class BeanUtil {

    /**
     * 此类不需要实例化
     */
    private BeanUtil() {
    }

    /**
     * 判断对象是否为null
     *
     * @param object 需要判断的对象
     * @return 是否为null
     */
    public static boolean isNull(Object object) {
        return null == object;
    }

    /**
     * 判断对象是否不为null
     *
     * @param object 需要判断的对象
     * @return 是否不为null
     */
    public static boolean nonNull(Object object) {
        return null != object;
    }

    /**
     * 判断对象是否为空，如果为空，直接抛出异常
     *
     * @param object       需要检查的对象
     * @param errorMessage 异常信息
     * @return 非空的对象
     */
    public static Object requireNonNull(Object object, String errorMessage) {
        if (null == object) {
            throw new NullPointerException(errorMessage);
        }
        return object;
    }

    public static Map getValue(Object object)
    {
        Map map = Maps.newHashMap();
        Class c = object.getClass();
        Method[] methods = c.getMethods();
        for (int i = 0; i < methods.length; i++)
        {
            String methodName = methods[i].getName();
            if (methodName.startsWith("get"))
            {
                try {
                    Object value = methods[i].invoke(object);
                    if (value != null)
                    {
                        String key=methodName.substring(3);
                        key=key.substring(0,1).toUpperCase()+key.substring(1);
                        map.put(key, value);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    System.out.println("error:" + methods[i].getName());
                }
            }
        }
        return map;
    }

    /**
     * 判断列表是否为空
     * @param list
     * @return
     */
    public static boolean isNullList(List list) {
        return list == null || list.size() == 0;
    }

    /**
     * 检测多个参数是否为空
     * @param list
     * @return
     */
    public static boolean isNullOrEmpty(List<String> list)
    {
        if (list == null)
        {
            return true;
        }
        for (String s : list)
        {
            if (Strings.isNullOrEmpty(s))
            {
                return true;
            }
        }

        return false;
    }
}
