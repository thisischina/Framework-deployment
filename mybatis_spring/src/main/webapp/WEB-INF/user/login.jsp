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
<title hre>账号登录</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link href="${basepath }/resources/css/css.css" rel="stylesheet"
	type="text/css">

<style type="text/css">
	#logindes {
	position: absolute;
	right: 50%;
	z-index: 99;
	top: 28%;
	width: 450px;
	height: 190px;
}

.loginbox {
	position: absolute;
	top: 20%;
	left: 53%;
	width: 390px;
	padding: 10px 10px 10px 10px;
	background: #FFF;
	border: 1px solid #DDD;
	text-align: left;
	z-index: 99;
	overflow: hidden;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
	-webkit-animation: bounceIn 600ms linear;
	-moz-animation: bounceIn 600ms linear;
	-o-animation: bounceIn 600ms linear;
	animation: bounceIn 600ms linear
}

.loginbox .input-text {
	width: 200px
}

.loginbox p {
	margin-left: 30px;
	line-height: 45px;
}

.loginbox p label {
	display: inline-block;
	width: 60px;
	font-size: 14px;
	text-align: right
}

.loginbox h3 {
	border-bottom: 1px solid #EEE;
	padding-bottom: 5px;
	margin-bottom: 20px;
	font-size: 14px;
	color: #444
}

</style>
	
	
<script type="text/javascript">
	
</script>
<script type="text/javascript" src="${basepath }/resources/js/core.js"></script>
<script type="text/javascript" src="${basepath }/resources/js/jquery.js"></script>
<script type="text/javascript" src="${basepath }/resources/js/common.js"></script>

</head>

<body>
	<div style="height: 635px">
		<div class="loginbox">
			<h3>账号登录</h3>
			<form action="${basepath }/index" method="post">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span  id="loginError" style='color:red;display: none'>账号或密码错误，请重试</span>
				<p>
					<label>账 号：</label><input name="account" id="login_email"
						placeholder="输入邮箱或手机号" autocomplete="off" required="required"
						class="input-text" maxlength="30" type="text">
				</p>
				<p>
					<label>密 码：</label><input name="password" id="login_password"
						value="" placeholder="输入密码" required="required" class="input-text"
						maxlength="30" type="password">
				</p>
				<!-- <p style="line-height: 22px">
					<label>&nbsp;</label><input name="remember_me" id="remember_me"
						value="1" type="checkbox"> <label for="remember_me"
						style="width: auto">记住我</label>
				</p> -->
				<p>
					<label>&nbsp;</label><input name="logingbtn" id="logingbtn"
						value="登 录" class="clickbtn" type="submit"> &nbsp; <a
						href="#">忘记密码？</a>
					&nbsp;&nbsp; <a
						href="${basepath}/reg">→注册账号</a>
				</p>
				<br>
				<input name="loginsubmit" value="true" type="hidden"> <input
					name="refer" value="#" type="hidden">
				<input name="formhash" value="bcf5ca3a" type="hidden">
			</form>
		</div>
	</div>

</body>
</html>