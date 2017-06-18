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
<title>注册</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link href="${basepath }/resources/css/css.css" rel="stylesheet"
	type="text/css">
<style type="text/css">
	.tips{color:red}
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

<script type="text/javascript">
var CONFIG = {
		siteUrl : 'http://www.likehuwai.com/',
		jsPath : 'http://static.likehuwai.com/js/',
		cssPath : 'http://static.likehuwai.com/',
		imgPath : 'http://img.likehuwai.com/',
		version : '201409222',
		formhash : 'bcf5ca3a', //token $.ajaxSetup data
		email : '',
		nick : '',
		user_id : '0',
		region_data : '',
		url : {
			login : 'http://www.likehuwai.com/', //登录地址
			qlogin : 'http://www.likehuwai.com/', //快速登录
			code : 'http://www.likehuwai.com/',
			like : 'http://www.likehuwai.com/', //喜欢转发(参数 : fid)
			region : 'http://www.likehuwai.com/ajax/region.php?rd=1', //地区数据
			emottons : 'http://www.likehuwai.com/ajax/emotion.php?rd=1' //表情数据
		}
	};
	function applybtn() {
		alert('申请领队，必须5只以上小驴，再接再厉吧！');
	}
	
	//账号输入验证
	function checkAccount(){
		var account =jQuery("#account").val();
		
		if(jQuery.trim(account)==""){
			jQuery('#account_tip').show();
			jQuery('#account_tip').text("登录账号不能为空");
		}else{
			jQuery('#account_tip').text("");
		}
		
		if(!isEmail(account)&&!isTel(account)){
			jQuery('#account_tip').show();
			jQuery('#account_tip').text("手机或邮箱格式不正确");
		}else{
			jQuery('#account_tip').text("");
		}
		
		$.ajax({
			url : "${basepath }/checkAccount",
			type : "post",
			datatype : "json",
			data:{account:account},
			success : function(data) {
				if(data!=0){
					jQuery('#account_tip').show();
					jQuery('#account_tip').text("账号已存在");
				}else{
					jQuery('#account_tip').text("");
				}
			}
		});
		
	}
	
	
	//校验密码
	function checkPWD(){
		var pwd1 = jQuery("#password").val();
		var pwd2 = jQuery("#password2").val();
		
		if(jQuery.trim(pwd1)==""){
			jQuery('#password1_tip').show();
			jQuery('#password1_tip').text("密码不能为空");
		}else{
			jQuery('#password1_tip').text("");
		}
		
		if(pwd1!=pwd2){
			jQuery('#password2_tip').show();
			jQuery('#password2_tip').text("两次输入密码不一致");
		}else{
			jQuery('#password2_tip').text("");
		}
	}
	
	
	function isEmail(strEmail) {
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if (reg.test(strEmail)){
			return true;
		}else{
			return false;
		}
	}
	
	function isTel(strTel){
		var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
		 if (reg.test(strTel)) {
		      return true;
		 }else{
		      return false;
		 };
	}
	
	var k=0;
	function checkForm(){
		
		var account =jQuery("#account").val();
		if(jQuery.trim(account)==""){
			jQuery('#account_tip').show();
			jQuery('#account_tip').text("登录账号不能为空");
			return;
		}
		
//		if(!isEmail(account)&&!isTel(account)){
//			jQuery('#account_tip').show();
//			jQuery('#account_tip').text("手机或邮箱格式不正确");
//			return;
//		}
		var pwd1 = jQuery("#password").val();
		var pwd2 = jQuery("#password2").val();
		
		if(jQuery.trim(pwd1)==""){
			jQuery('#password1_tip').show();
			jQuery('#password1_tip').text("密码不能为空");
			return;
		}
		
		if(pwd1!=pwd2){
			jQuery('#password2_tip').show();
			jQuery('#password2_tip').text("两次输入密码不一致");
			return;
		}
		
		jQuery('#form').submit();
	}
	
	
</script>

</head>
<body>
	<div class="martop"></div>
	<!--[if lt IE 001]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->

	<div style="min-height: 595px; margin: 0px auto; width: 850px">

		<div class="regbox t_l">
			<div class="reg_itembox">
				<h3>注册账号</h3>
				<form action="${basepath }/register" method="post" autocomplete="off" id='form'>
					<p class="item">
						<input id="account" name="account" placeholder="登录邮箱或手机号"
							autocomplete="off" class="in-text" maxlength="30" tabindex="1" onkeyup="checkAccount()"
							type="text"> <span class="tips" id="account_tip"></span>
					</p>
					<p class="item">
						<input id="nickname" name="nickname" class="in-text"
							placeholder="昵 称" maxlength="14" tabindex="2" type="text">
						<span class="tips">起个名字吧<br>只支持中英文、数字、“_”或减号
						</span>
					</p>
					<p class="item">
						<input name="password" id="password" value="" placeholder="密 码"
							class="in-text" tabindex="3" maxlength="20" type="password">
						<span class="tips" id="password1_tip">登录密码<br>长度6-20位数
						</span>
					</p>

					<p class="item">
						<input id="password2" name="password2" value="" placeholder="确认密码"
							class="in-text" tabindex="4" type="password" onkeyup="checkPWD()"> <span
							class="tips"  id="password2_tip">确认<br>密码
						</span>
					</p>

					<p class="item">
						<input name="agree" id="agree111" checked="checked" type="checkbox" onclick="selectAgree()">
						<label>我已经认真阅读并同意本网《<a
							href="javascript:openReadDIV();" id="idagree">使用协议</a>》。
						</label><span class="tips" id="agree_tip">请阅读并同意使用协议</span>
					</p>
					<p style="margin-top: 10px"></p>
					<p style="height: 20px" class="reg_msg"></p>

					<input id="city_id" name="city_id" value=''  type="text" style="display: none">
					<input id="location"    name="location" value='' type="text" style="display: none">

					<input name="reg_smb_btn" id="reg_smb_btn" value="注册账号"
						tabindex="8" class="clickbtn btn18" type="button" onclick="checkForm()">
					<p></p>
					<input name="regsubmit" value="true" type="hidden"> <input
						name="formhash" value="bcf5ca3a" type="hidden"> <input
						name="code" value="" type="hidden">
				</form>
			</div>
		</div>
		<div class="loginbox t_r">
			<p>
				已经拥有帐号? <a
					onclick="javascript:history.back(-1);">直接登录</a>
			</p>
			<br>
		</div>

	</div>
	<!-- 注册使用协议弹窗  start -->
	<div id="readDIV"
		style="display: none; POSITION: absolute; left: 50%; top: 42%; width: 500px; margin-left: -300px; margin-top: -200px; border: 1px solid #DDD; background-color: #fff; text-align: center; border-radius: 5px; box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2)">
		<div id="readDIV_head"
			style="width: 500px; height: 25px; background: #EEF3F6; padding-top: 10px; font-weight: bold;">
			<div style="float: left;">&nbsp;&nbsp; 注册使用协议：</div>
			<div style='float: right;'>
				<a href="javascript:closeReadDIV();">[关闭]</a> &nbsp;
			</div>
		</div>



	</div>
	<!-- 注册使用协议弹窗  end -->

	<script>
		//显示使用协议弹窗
		function openReadDIV() {
			document.getElementById("readDIV").style.display = "";
		}

		//关闭使用协议弹窗
		function closeReadDIV() {
			document.getElementById("readDIV").style.display = "none";
		}
	</script>

</body>
</html>