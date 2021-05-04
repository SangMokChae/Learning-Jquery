<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date, java.text.SimpleDateFormat" %>
<%
	Date nowTime = new Date();
	String format = request.getParameter("format");
	String timezone = request.getParameter("timezone");
	SimpleDateFormat sf = new SimpleDateFormat("hh:mm:ss");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<p><%= sf.format(nowTime) %></p>
	${param.format }
	${param.timezone}
</body>
</html>