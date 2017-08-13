package org.tgcloud.zhanzhang.core;

import com.google.common.collect.Lists;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import java.io.ByteArrayOutputStream;
import java.security.MessageDigest;
import java.util.*;

/**
 * Created by Administrator on 2016/3/28 0028.
 */
public class StringUtil {

    private StringUtil(){}

    public static final String EMPTY_STRING = "";

    private final static String[] hexDigits = { "0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" };

    private static Random random = new Random();

    //随机字符数组
    private static char[] charSequence = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();

    /*随机数字*/
    private static int[] intSequence = new int[]{1,2,3,4,5,6,7,8,9};

    private static String byteToHexString(byte b) {
        int n = b;
        if (n < 0)
            n = 256 + n;
        int d1 = n / 16;
        int d2 = n % 16;
        return hexDigits[d1] + hexDigits[d2];
    }

    /**
     * 转换字节数组为16进制字串
     * @param b 字节数组
     * @return 16进制字串
     */
    public static String byteArrayToHexString(byte[] b) {
        StringBuffer resultSb = new StringBuffer();
        for (int i = 0; i < b.length; i++) {
            resultSb.append(byteToHexString(b[i]));
        }
        return resultSb.toString();
    }

    public static String MD5Encode(String origin) {
        String resultString = null;
        try {
            resultString = new String(origin);
            MessageDigest md = MessageDigest.getInstance("MD5");
            resultString = byteArrayToHexString(md.digest(resultString
                    .getBytes()));
        } catch (Exception ex) {
        }
        return resultString;
    }

    /**
     * 获取随机字符
     * @return
     */
    public static String getRandomChar() {
        int index = random.nextInt(charSequence.length);
        return String.valueOf(charSequence[index]);
    }

    /**
     * 获取随机数字
     * @return
     */
    public static int getRandomInt()
    {
        int index = random.nextInt(intSequence.length);
        return intSequence[index];
    }


    /**
     * 判断一个字符串是否为空，null也会返回true
     *
     * @param str 需要判断的字符串
     * @return 是否为空，null也会返回true
     */
    public static boolean isBlank(String str) {
        return null == str || "".equals(str.trim());
    }

    /**
     * 判断一个字符串是否不为空
     *
     * @param str 需要判断的字符串
     * @return 是否为空
     */
    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }

    /**
     * 判断一组字符串是否有空值
     *
     * @param strs 需要判断的一组字符串
     * @return 判断结果，只要其中一个字符串为null或者为空，就返回true
     */
    public static boolean hasBlank(String... strs) {
        if (null == strs || 0 == strs.length) {
            return true;
        } else {
            //这种代码如果用java8就会很优雅了
            for (String str : strs) {
                if (isBlank(str)) {
                    return true;
                }
            }
        }
        return false;
    }

    public static String mapToXmlFile(Map map) {
        Document document = DocumentHelper.createDocument();
        Element nodeElement = document.addElement("node");
        for (Object obj : map.keySet()) {
            Element keyElement = nodeElement.addElement("key");
            keyElement.addAttribute("label", String.valueOf(obj));
            keyElement.setText(String.valueOf(map.get(obj)));
        }
        return doc2String(document);
    }

    public static String mapToXmlStr(Map map)
    {

        StringBuilder sb = new StringBuilder("<xml>");
        for (Object obj : map.keySet()) {
            sb.append("<" + String.valueOf(obj) + ">").append(map.get(obj)).append("</" + String.valueOf(obj) + ">");
        }
        sb.append("</xml>");
        return sb.toString();
    }

    public static String mapToXmlStrWithOrder(Map map)
    {
        List<String> keys = Lists.newArrayList(map.keySet());
        Collections.sort(keys);
        StringBuilder sb = new StringBuilder("<xml>");
        for (String key : keys) {
            if (!key.equals("sign"))
            {
                sb.append("<" + String.valueOf(key) + ">").append(map.get(key)).append("</" + String.valueOf(key) + ">");
            }
        }
        sb.append("<" + String.valueOf("sign") + ">").append(map.get("sign")).append("</" + String.valueOf("sign") + ">");
        sb.append("</xml>");
        return sb.toString();
    }

    /**
     *
     * @param document
     * @return
     */
    public static String doc2String(Document document) {
        String s = "";
        try {
            // 使用输出流来进行转化
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            // 使用UTF-8编码
            OutputFormat format = new OutputFormat("   ", true, "UTF-8");
            XMLWriter writer = new XMLWriter(out, format);
            writer.write(document);
            s = out.toString("UTF-8");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return s;
    }

    /**
     * json to xml {"node":{"key":{"@label":"key1","#text":"value1"}}} conver
     * <o><node class="object"><key class="object"
     * label="key1">value1</key></node></o>
     *
     * @param json
     * @return
     */
/*    public static String jsontoXml(String json) {
        try {
            XMLSerializer serializer = new XMLSerializer();
            JSON jsonObject = JSONSerializer.toJSON(json);
            return serializer.write(jsonObject);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }*/

    /**
     * xml to map xml <node><key label="key1">value1</key><key
     * label="key2">value2</key>......</node>
     *
     * @param xml
     * @return
     */
    public static Map xmltoMap(String xml) {
        try {
            Map map = new HashMap();
            Document document = DocumentHelper.parseText(xml);
            Element nodeElement = document.getRootElement();
            List node = nodeElement.elements();
            for (Iterator it = node.iterator(); it.hasNext();) {
                Element elm = (Element) it.next();
                map.put(elm.attributeValue("label"), elm.getText());
                elm = null;
            }
            node = null;
            nodeElement = null;
            document = null;
            return map;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * xml to list xml <nodes><node><key label="key1">value1</key><key
     * label="key2">value2</key>......</node><node><key
     * label="key1">value1</key><key
     * label="key2">value2</key>......</node></nodes>
     *
     * @param xml
     * @return
     */
    public static List xmltoList(String xml) {
        try {
            List<Map> list = new ArrayList<Map>();
            Document document = DocumentHelper.parseText(xml);
            Element nodesElement = document.getRootElement();
            List nodes = nodesElement.elements();
            for (Iterator its = nodes.iterator(); its.hasNext();) {
                Element nodeElement = (Element) its.next();
                Map map = xmltoMap(nodeElement.asXML());
                list.add(map);
                map = null;
            }
            nodes = null;
            nodesElement = null;
            document = null;
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * xml to json <node><key label="key1">value1</key></node> 转化为
     * {"key":{"@label":"key1","#text":"value1"}}
     *
     * @param xml
     * @return
     */
/*    public static String xmltoJson(String xml) {
        XMLSerializer xmlSerializer = new XMLSerializer();
        return xmlSerializer.read(xml).toString();
    }*/

    public static boolean hasText(String str) {
        if (!hasLength(str)) {
            return false;
        }
        int strLen = str.length();
        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return true;
            }
        }
        return false;
    }

    public static boolean hasLength(String str) {
        return (str != null && str.length() > 0);
    }
}
