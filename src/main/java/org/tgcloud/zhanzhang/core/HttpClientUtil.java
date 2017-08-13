package org.tgcloud.zhanzhang.core;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.FileEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

/**
 * Created by cloudLiu on 2015/9/9.
 */
public class HttpClientUtil{

    private static Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

    public static final int CONNECT_TIMEOUT = 10 * 1000;

    private static final Charset UTF_8 = Charset.forName("UTF-8");

    private PoolingHttpClientConnectionManager manager;

    public CloseableHttpClient client;

    public HttpClientUtil()
    {
        manager = new PoolingHttpClientConnectionManager();
        /*最大连接数*/
        manager.setMaxTotal(200);   
        /*将每个路由基础的连接数增加到20*/
        manager.setDefaultMaxPerRoute(20);
        client = HttpClients.custom().setConnectionManager(manager).build();

    }

    /**
     * 发送get请求
     * @param params
     */
    public String doGet(String url,Map params,String head)
    {
        final String[] result_ = new String[]{null};
        doRequest(RequestMethod.GET, url, params, null, new ResponseBack() {
            @Override
            public void onResponse(int resultCode, String result) {
                result_[0] = result;
            }
        },head);
        return result_[0];
    }

    /**
     * 发送post请求
     * @param url
     * @param params
     * @return
     */
    public String doPost(String url,Map params,String head)
    {
        final String[] result_ = new String[]{null};
        doRequest(RequestMethod.POST, url, params, null, new ResponseBack() {
            @Override
            public void onResponse(int resultCode, String result) {
                result_[0] = result;
            }
        },head);
        return result_[0];
    }

    public void doRequest(final RequestMethod method,final String url,final Map<String,Object> params,final List<File> fileList,ResponseBack callBack,String head)
    {
        if (Strings.isNullOrEmpty(url)) {
            logger.warn("没有请求路径");
            return;
        }
        boolean hasCallBack = false;
        if (callBack != null)
        {
            hasCallBack  = true;
        }
        HttpUriRequest request = null;
        switch (method)
        {
            case GET:
                String getUrl = url;
                /*拼装请求参数*/
                if (params != null)
                {
                    StringBuilder sb = new StringBuilder("");
                    for (String key : params.keySet())
                    {
                        sb.append(key + "=" + params.get(key) + "&");
                    }
                    getUrl += "?" + sb.toString();
                }

                request = new HttpGet(getUrl);
                if(head!=null&&!head.equals("")){
                request.setHeader("apikey", head);
                }
                System.out.println("-----------------"+getUrl+"-----------------");
                logger.info("-----------------"+getUrl+"-----------------");
                break ;
            case POST:
                request = new HttpPost(url);
                if(head!=null&&!head.equals("")){
                    request.setHeader("apikey", head);
                    }
                if (params != null)
                {
                    List<NameValuePair> pairs = Lists.newArrayList();
                    for (String key : params.keySet())
                    {
                        pairs.add(new BasicNameValuePair(key, (String)params.get(key)));
                    }
                    UrlEncodedFormEntity entity= null;
                    try {
                        entity = new UrlEncodedFormEntity(pairs,"utf-8");
                        ((HttpPost)request).setEntity(entity);
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                }
                break;
            case PUT:
            case DELETE:
            default:
                logger.warn("-----------------请求类型:{} 暂不支持-----------------", method.toString());
                break;
        }

        CloseableHttpResponse response = null;
        try {
            response = client.execute(request);
            if (hasCallBack)
            {
                callBack.onResponse(response.getStatusLine().getStatusCode(),EntityUtils.toString(response.getEntity(),UTF_8));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            //abort the request
            if (null != request && !request.isAborted()) {
                request.abort();
            }
            //close the connection
//            HttpClientUtils.closeQuietly(client);
            HttpClientUtils.closeQuietly(response);
        }


    }

    public interface ResponseCallback {
        /**
         * 响应后回调方法
         */
        void onResponse();
    }

    /**
     * 标识HTTP请求类型枚举
     *
     * @author peiyu
     * @since 1.0
     */
    static enum RequestMethod {
        /**
         * HTTP GET请求
         * 一般对应的是查询业务接口
         */
        GET,
        /**
         * HTTP POST请求
         * 一般对应的是新增业务接口
         * 只是一般都通用这个请求方式来处理一切接口了T_T
         */
        POST,
        /**
         * HTTP PUT请求，用的太少，暂不支持
         * 一般对应的是更新业务接口
         */
        PUT,
        /**
         * HTTP DELETE请求，用的太少，暂不支持
         * 一般对应的是删除业务接口
         */
        DELETE
    }

    public interface ResponseBack
    {
        void onResponse(int resultCode, String result);
    }
}
