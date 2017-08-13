package org.tgcloud.zhanzhang.core.pay.alipay.config;

public class AlipayConfig {
	//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

		// 合作身份者ID，签约账号，以2088开头由16位纯数字组成的字符串，查看地址：https://b.alipay.com/order/pidAndKey.htm
			public static String partner = "2088221443760843";
			
			// 收款支付宝账号，以2088开头由16位纯数字组成的字符串，一般情况下收款账号就是签约账号
			public static String seller_id = partner;

			//商户的私钥,需要PKCS8格式，RSA公私钥生成：https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.nBDxfy&treeId=58&articleId=103242&docType=1
			public static String private_key = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALizXtSFkhvGzm+NNx/8spGXer/4sGlGzvKZP73w1DaEYZaDARfJdQcUAaBig809O8Cx7hvQ3kV66z6PP2IZeNCRyIonDeavrlEzU8wAh0cWWf4P2e7cmcvDFbhcaG1zUPU24i1zh8A5kP1Nvg+TtvqzgV3vjVXlpBv8bwE9RddfAgMBAAECgYA5WVB/kn28bC1bC7DrGK5lcHBnvRMhjR/iydy14Fo0F0Sp1EF5nk7dBMRAhXZBOtsbyOOS9Xaegj0a7qWSkzAko2srosrt2ztVY4PzVXXFgCjNJUd3MRa31NewhHiEa/BVy8AFYKHBye3jyJlIZFBsqt3Xfq5y6TTIkyTTI6iWmQJBAOaNqGGC2uNaDgJqQbv3oCiXgZH+dwZ7c4J4T0Hdc0/YpWVmMp008iH/xd7PIG8TGYeMjkpZtg58d2hVNEuJ4vsCQQDNFiI4zF5JSeAyfj5AXtpYk6H+NUloUTvWsX8+SJdgSXpggFsyBVRHgL1fF/v+K9/sLfJy6xC6ttlhMfbOVg/tAkEAxF+SNQQtBos09Y+lz8GaNBjf7wcsQGQ0PcPV1kcWKcNhFV4X7FkliBoAYshPWuyMySzKIcAJ1orjdgVk1pZqswJBAKr2EIEYnGCr3OE6q9otOAcuypOHCDKVxTQrss7Q5J+3oPRhC6SfHKqefz6OV9qB6KCRjNKPcdq0InILnJpU0+ECQQC1y0C6zgIe2oLt0gfR5+BMEz7rmxB5PHylTer+PiE4JSfev1weV/qoJwCpN7uz2SzoWR/0ty8JnYXW6OjGlg8I";

			// 支付宝的公钥,查看地址：https://b.alipay.com/order/pidAndKey.htm
			public static String alipay_public_key  = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";


			// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
			public static String notify_url = "http://localhost:8080/notify_url.jsp";

			// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
			public static String return_url = "http://localhost:8080/return_url.jsp";
			// 签名方式
			public static String sign_type = "RSA";
			
			// 调试用，创建TXT日志文件夹路径，见AlipayCore.java类中的logResult(String sWord)打印方法。
			public static String log_path = "C:\\";
				
			// 字符编码格式 目前支持utf-8
			public static String input_charset = "utf-8";
				
			// 支付类型 ，无需修改
			public static String payment_type = "1";
				
			// 调用的接口名，无需修改
			public static String service = "alipay.wap.create.direct.pay.by.user";
		//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

}
