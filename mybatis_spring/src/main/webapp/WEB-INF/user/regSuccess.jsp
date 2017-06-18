<!-- AUI Framework -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	pageContext.setAttribute("basepath", request.getContextPath());
%>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>注册成功</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link href="${basepath }/resources/css/css.css" rel="stylesheet"
	type="text/css">
<style type="text/css">
	.location_ul li{
		float:left;
		padding:1px 1px;
		line-height:22px;
		margin-right: 10px;
		color: #000
	}

	.location_ul li a{
		color: #333;
		white-space: nowrap;
	}
	.aItemP,.aItemC{
	padding:2px 8px;
	text-decoration: none;
	border-radius:3px;
		
	}
	.aItemP:hover,.aItemC:hover{
		background-color:#ddd;
		text-decoration:none;
	}
</style>


<script type="text/javascript" src="${basepath }/resources/js/core.js"></script>
<script type="text/javascript" src="${basepath }/resources/js/jquery.js"></script>
<script type="text/javascript" src="${basepath }/resources/js/common.js"></script>

</head>
<body>
	<div class="martop"></div>
	<!--[if lt IE 001]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->

	<div style="min-height: 595px; margin: 0px auto; width: 850px">

		<div class="regbox t_l">
			<div class="reg_itembox">
				<h3>祝贺(づ￣ 3￣)づ</h3>
			</div>
			<div style="width: 100%;text-align: center;padding-top: 50px">
					<span style="font-size: 26px;color:green">注册成功！</span>	
					<a style="text-decoration: none;cursor: pointer;" href="${ basepath}/login">去登录>></a>
				
			</div>
		</div>
		<div class="loginbox t_r">
			<p>
				已经拥有帐号? <a
					href="${ basepath}/login">直接登录</a>
			</p>
			<br>
		</div>

	</div>

</body>
</html>