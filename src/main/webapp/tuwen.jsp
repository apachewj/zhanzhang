<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String name = request.getParameter("id");

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <title>图文详情</title>
</head>
<body>
<div id="header">
 <h1>这里是标题</h1>
		 <div class="time">这里是时间</div>
</div>

<div class="news"><p>这里是摘要或附标题<p></div>

<div class="kong">这里是图文这里是图文这里是图文这里是图文这里是图文这里是图文这里是图文这里是图文这里是图文</div>


</body>
</html>
