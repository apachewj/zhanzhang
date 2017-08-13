package org.tgcloud.zhanzhang.core;

import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.channels.FileChannel;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by cloudLiu on 2015/8/6.
 */
public class FileUtil {

    private static Logger logger = LoggerFactory.getLogger(FileUtil.class);

    /**
     * 删除文件
     * @param filePath 文件绝对路径
     */
    public static void delFile(String filePath) {
        File myDelFile = new File(filePath);
        if (myDelFile.exists()) {
            myDelFile.delete();
        }
    }

    /**
     * 获取文件大小
     * @param file
     * @return
     * @throws IOException
     */
    public static long getFileSize(File file) throws IOException {
        long s = 0;
        if (file.exists()) {
            return file.length();
        }
        return s;
    }

    /**
     * 转换文件大小
     * @param files
     * @return
     */
    public static String formateFileSize(long files) {
        DecimalFormat df = new DecimalFormat("#.00");
        String fileSizeString = "";
        if (files < 1024) {
            fileSizeString = df.format((double) files) + "B";
        } else if (files < 1048576) {
            fileSizeString = df.format((double) files / 1024) + "K";
        } else if (files < 1073741824) {
            fileSizeString = df.format((double) files / 1048576) + "M";
        } else {
            fileSizeString = df.format((double) files / 1073741824) + "G";
        }
        return fileSizeString;
    }

    /**
     * 复制文件
     * @param src
     * @param dest
     * @throws IOException
     */
    public static void copy(File src, File dest) throws IOException {
        if (!dest.exists())
            dest.createNewFile();
        transfer(new FileInputStream(src), new FileOutputStream(dest));
    }

    /**
     * 复制文件
     * @param src
     * @param dest
     * @throws IOException
     */
    public static void transfer(FileInputStream src, FileOutputStream dest) throws IOException {
        FileChannel source = null;
        FileChannel target = null;
        try {
            source = src.getChannel();
            target = dest.getChannel();
            long position = 0, size = source.size();
            while ((position += source.transferTo(position, size - position, target)) < size)
                ;
        } finally {
            if (src != null) {
                try {
                    source.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (dest != null) {
                try {
                    target.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 复制输入流到指定的输出流
     * @param _in
     * @param _out
     */
    public static void copy(InputStream _in, OutputStream _out) {
        InputStream in = null;
        OutputStream out = null;
        try {
            in = new BufferedInputStream(_in);
            out = new BufferedOutputStream(_out);
            byte[] b = new byte[1024];
            int len = 0;
            while ((len = in.read(b, 0, b.length)) != -1) {
                out.write(b, 0, len);
            }
            out.flush();
        } catch (Exception e) {
        } finally {
            close(in, out);
        }
    }

    /**
     * add by panmg copy一个文件夹下面的文件到另一个文件夹
     * @param source 必须是文件夹
     * @param target 必须是文件夹
     * @throws IOException
     */
    public static void copyFolder(String source, String target) throws IOException {
        new File(target).mkdirs(); // 目标文件夹
        File fsource = new File(source);
        String[] fNames = fsource.list();
        for (String name : fNames) {
            File temp = new File(source + "/" + name);
            if (temp.isFile()) {
                FileInputStream in = null;
                FileOutputStream out = null;
                try {
                    in = new FileInputStream(temp);
                    out = new FileOutputStream(target + "/" + name);
                    byte[] b = new byte[10240];
                    int len;
                    while ((len = in.read(b)) != -1) {
                        out.write(b, 0, len);
                    }
                } finally {
                    if (out != null)
                        out.close();
                    if (in != null)
                        in.close();
                }
            } else {
                copyFolder(source + "/" + name, target + "/" + name);
            }

        }
    }


    /**
     * add by panmg 删除某个文件夹中的文件
     * @param ObjectPath
     */
    public static void deleteDirectory(String ObjectPath) {
        File file = new File(ObjectPath);
        if(!file.exists()) return;
        File[] files = file.listFiles();
        for (File f : files) {
            if (f.isFile()) {
                f.delete();
            } else {
				/* 先删除文件夹的内文件, 在删文件夹 */
                deleteDirectory(ObjectPath + "/" + f.getName());
                f.delete();
            }
        }
    }

    /**
     * 关闭资源
     * @param in
     * @param out
     */
    public static void close(InputStream in, OutputStream out) {
        if (in != null) {
            try {
                in.close();
            } catch (IOException e) {
                in = null;
            }
        }
        if (out != null) {
            try {
                out.close();
            } catch (IOException e) {
                in = null;
            }
        }
    }

    /**
     * add by panmg
     * @param in
     * @param out
     * @param width
     * @param height
     * @param proportion
     * @throws IOException
     */
    public static void compressPic(InputStream in, OutputStream out, int width, int height, boolean proportion) throws IOException {
        // 获得源文件
        java.awt.Image img = ImageIO.read(in);
        if(img.getWidth(null)==width && img.getHeight(null)==height)  return;
        int newWidth, newHeight;
        // 判断是否是等比缩放
        if (proportion == true) {
            // 为等比缩放计算输出的图片宽度及高度
            double rate1 = ((double) img.getWidth(null)) / (double) width + 0.1;
            double rate2 = ((double) img.getHeight(null)) / (double) height + 0.1;
            // 根据缩放比率大的进行缩放控制
            double rate = rate1 > rate2 ? rate1 : rate2;
            newWidth = (int) ((img.getWidth(null)) / rate);
            newHeight = (int) ((img.getHeight(null)) / rate);
        } else {
            newWidth = width; // 输出的图片宽度
            newHeight = height; // 输出的图片高度
        }

        BufferedImage tag = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
		/*
		 * Image.SCALE_SMOOTH 的缩略算法 生成缩略图片的平滑度的 优先级比速度高 生成的图片质量比较好 但速度慢
		 */
        tag.getGraphics().drawImage(img.getScaledInstance(newWidth, newHeight, java.awt.Image.SCALE_SMOOTH), 0, 0, null);
        // JPEGImageEncoder可适用于其他图片类型的转换

        out.close();
    }

    /**
     * 将上传的文件进行重命名
     * @param name
     * @return
     */
    public static String rename(String name) {

        Long now = Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
        Long random = (long) (Math.random() * now);
        String fileName = now + "" + random;

        if (name.indexOf(".") != -1) {
            fileName += name.substring(name.lastIndexOf("."));
        }

        return fileName;
    }

    /*检查路径是否存在*/
    public static Map<String,String> checkFilePath(Integer type,String outputPath)
    {
        //上传文件的路径
        String path = null;
        //相对路径
        String modelpath = null;
        if(!Strings.isNullOrEmpty(outputPath)){
            path = GlobalStatic.uploadpath + outputPath;
//    		检查下路径前后是否自带/
            modelpath = "images"+(outputPath.startsWith("/")? "" : "/") + outputPath + (outputPath.endsWith("/")? "" : "/");
        }
        else if(type != null){
            if(type == 0){
                path = GlobalStatic.uploadpath + "user_head";
                modelpath = "/img/user_head/";
            }else if(type == 1){
                path = GlobalStatic.uploadpath + "good_pic";
                modelpath = "/img/good_pic/";
            }else if(type == 2){
                path = GlobalStatic.uploadpath + "banner_pic";
                modelpath = "/img/banner_pic/";
            }else if(type == 3){
                path = GlobalStatic.uploadpath + "show_pic";
                modelpath = "/img/show_pic/";
            }else if(type == 4){
                path = GlobalStatic.uploadpath + "error_file";
                modelpath = "/img/error_file/";
            }
        }
        if(path == null)
        {
            logger.error("没有可上传的路径");
            return null;
        }
        File fileP = new File(path);
        if(! fileP.exists())
        {
            fileP.mkdirs();
        }
        Map<String,String> paths = new HashMap<>();
        paths.put("path",path);
        paths.put("modelpath",modelpath);
        return paths;
    }

    public static String uploadBase64(String strBase64,int userType)
    {
        String string = strBase64;
        Map<String ,String > paths = checkFilePath(userType,null);
        Long now = Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
        Long random = (long) (Math.random() * now);
        String fileName = paths.get("path") + "/" + now + "" + random + ".png"; //生成的新文件
        try {
            // 解码，然后将字节转换为文件
            byte[] bytes = new BASE64Decoder().decodeBuffer(string);   //将字符串转换为byte数组
            ByteArrayInputStream in = new ByteArrayInputStream(bytes);
            byte[] buffer = new byte[1024];
            FileOutputStream out = new FileOutputStream(fileName);
            /*总字节数*/
            int bytesum = 0;
            int byteread = 0;
            while ((byteread = in.read(buffer)) != -1) {
                bytesum += byteread;
                out.write(buffer, 0, byteread); //文件写操作
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return paths.get("modelpath") + now + "" + random + ".png";
    }

}
