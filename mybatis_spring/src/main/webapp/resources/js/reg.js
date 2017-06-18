//$(function() {
	var yes = '<img src="'+CONFIG.cssPath+'images/yes.png" style="margin-top:7px">';
	var loading = '<img src="'+CONFIG.cssPath+'images/load/s_loading.gif" style="vertical-align:text-bottom;margin-top:9px"> Loading...';
	
	var b = $(".reg_itembox :input.in-text").on('focus', function() {
		var a = $(this).parents(".item:first");
		if ($(this).val() == "") {
			a.find(".tips").show();
		}
    }).on('blur', function() {
        var d = $(this);
        var c = d.parents(".item:first");
        if (d.val() == "") {
            c.removeClass("focus");
        }
    });
	var capachecode = $("#capachecode");
	var Validator = {
		isEmail: function(v) {
		   var reg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		   return reg.test(v);
		},
		Nickname: function(v) {
		  var unLen = v.replace(/[^\x00-\xff]/g, "**").length, val;
		  if(unLen < 2 || unLen > 14) {//一个中文字=两个英文
			  return false;
		  }
		  val = /^[0-9A-Za-z\u4e00-\u9fa5_\-]+$/.test(v);       
		  return val;
		},
		isPasswd: function(v) {
		  var unLen = v.length, val;
		  if(unLen < 6 || unLen > 20) {
			  return false;
		  }
		  val = !/[\'\"\\]/.test(v);
		  return val;
		},
		isCapacha:  function(v) {
		  if (v.length < 4) {
			  return false;
		  }
		  return /^([a-zA-Z0-9]+)$/.test(v);
		}
	};
    //emial
    $("#email").on('keyup', function() {
       	var eobj = $("#email").parents(".item:first");
		if (!Validator.isEmail($(this).val())) {
			eobj.find(".tips").addClass("no").html("Email格式错误").show();
        } else {
			eobj.find(".tips").removeClass("no").hide();
		}
    }).on('blur', function() {
		var eobj = $("#email").parents(".item:first");
		var Email = $(this).val();
		if(Core.com.Cookie('the_ckemail') != Email && Validator.isEmail(Email)){
			var emailobj = $("#email");
			$.ajax({
				url: CONFIG.siteUrl+"ajax/check.php?act=checkemail&data="+encodeURIComponent(Email),
				type: "GET",
				cache: false,
				beforeSend: function(){
					eobj.find(".tips").removeClass("no").html(loading).show();
				},
				success: function(s){
				  if (s.error) {
					  eobj.find(".tips").addClass("no").html('<i style="padding-top:9px">'+s.msg+'</i>');
				  } else {
					  eobj.find(".tips").removeClass("no").html(yes);
				  }
				},
				dataType: 'json'
			});
			Core.com.Cookie('the_ckemail', Email);
		}
    });
	//昵称
	$("#nickname").on('keyup', function() {
       	var eobj = $("#nickname").parents(".item:first");
		if (!Validator.Nickname($(this).val())) {
			eobj.find(".tips").addClass("no").html("最长14个英文或7个汉字").show();
        } else {
			eobj.find(".tips").removeClass("no").hide();
		}
    }).on('blur', function() {
		var eobj = $("#nickname").parents(".item:first");
		var Nkname = $(this).val();
		if(Core.com.Cookie('the_nickname') != Nkname && Validator.Nickname(Nkname)){
			var emailobj = $("#email");
			$.ajax({
				url: CONFIG.siteUrl+"ajax/check.php?act=checkname&data="+encodeURIComponent(Nkname),
				type: "GET",
				cache: false,
				beforeSend: function(){
					eobj.find(".tips").removeClass("no").html(loading).show();
				},
				success: function(s){
				  if (s.error) {
					  eobj.find(".tips").addClass("no").html('<i style="padding-top:9px">'+s.msg+'</i>');
				  } else {
					  eobj.find(".tips").removeClass("no").html(yes);
				  }
				},
				dataType: 'json'
			});
			Core.com.Cookie('the_nickname', Nkname);
		}
    });
	//密码
	$("#password").on('keyup', function() {
       	var eobj = $("#password").parents(".item:first"), val = $(this).val();
		checkPwd(val);
		if (!Validator.isPasswd(val)) {
			eobj.find(".tips").addClass("no").html("包含非法字符或长度错误").show();
        } else {
			eobj.find(".tips").removeClass("no").html(yes);
		}
    });
	$("#password2").on('keyup', function() {
       	var eobj = $("#password2").parents(".item:first");
		if ($(this).val() != $("#password").val()) {
			eobj.find(".tips").addClass("no").html("两次输入不一致").show();
        } else {
			eobj.find(".tips").removeClass("no").html(yes);
		}
    });
	
	//验证码
	if (capachecode.length) {
		capachecode.keyup(function() {
			var eobj = capachecode.parents(".item:first");
			if (!Validator.isCapacha($(this).val())) {
				eobj.find(".tips").addClass("no").html("验证码错误").show();
			} else {
				eobj.find(".tips").removeClass("no").hide();
			}
		}).on('blur', function() {
			var eobj = capachecode.parents(".item:first");
			var Capacha = $(this).val();
			if(Core.com.Cookie('the_capacha') != Capacha && Validator.isCapacha(Capacha)){
				var emailobj = $("#capachecode");
				$.ajax({
					url: CONFIG.siteUrl+"ajax/check.php?act=checkcode&data="+encodeURIComponent(Capacha),
					type: "GET",
					cache: false,
					beforeSend: function(){
						eobj.find(".tips").removeClass("no").html(loading).show();
					},
					success: function(s){
					  if (s.error) {
						  eobj.find(".tips").addClass("no").html('<i style="padding-top:9px">'+s.msg+'</i>');
					  } else {
						  eobj.find(".tips").removeClass("no").html(yes);
						  Core.com.Cookie('the_capacha', Capacha);
					  }
					},
					dataType: 'json'
				});
			}
		});
	}

	$('#reg_smb_btn').on('click', function(e) {
		e.preventDefault();
        var b = false, slef = $(this);
        if (!Validator.isEmail($('#email').val())) {
			$("#email").parents(".item:first").find(".tips").addClass("no").html("Email格式错误").show();
            b = true;
        }
	
        if (!Validator.Nickname($('#nickname').val())) {
			$("#nickname").parents(".item:first").find(".tips").addClass("no").html("最长14个英文或7个汉字").show();
            b = true;
        }
        if (!Validator.isPasswd($('#password').val())) {
			$("#password").parents(".item:first").find(".tips").addClass("no").html("包含非法字符或长度错误").show();
            b = true;
        }
		
        if (($('#password').val() !=  $('#password2').val()) || $('#password2').val() == '') {
			$("#password2").parents(".item:first").find(".tips").addClass("no").html("两次输入不一致").show();
            b = true;
        }
		
		if (capachecode.length) {
			if (!Validator.isCapacha(capachecode.val())) {
				capachecode.parents(".item:first").find(".tips").addClass("no").html("验证码错误").show();
				b = true;
			}
		}
		
        if ($("#agree").is(":checked") === false) {
            $("#agree").parents(".item:first").find(".tips").addClass("no").html("请阅读并同意使用协议").show();
            b = true;
        } else {
            $("#agree").parents(".item:first").find(".tips").removeClass("no").hide();
        }
        if (b == true) {
            return false;
        }
		var options = {
			global:false,
			beforeSend: function(){
				slef.val('数据处理中，请稍后...').attr("disabled", "true");
			},
			success:function(data){
				if(data.error){
					slef.removeAttr("disabled").val('注册账号');
					$('.reg_msg').html(data.msg);
					return false;
				}else{
					window.location.href = data.content;
				}
			},
			error: function(XmlHttpRequest, textStatus, errorThrown){  
                alert('服务器错误：'+errorThrown);
				slef.removeAttr("disabled");
            },
			dataType: 'json'
		};
		slef.parents('form').ajaxSubmit(options);
		return false;
    });

//});
function checkPwd(pwd){
	var csint;
	if(pwd.length < 6){
		csint = 1;
	} else{
		csint = checkStrong(pwd);
	}
	switch(csint) {
		case 1:
			$('#strongbg').removeClass("normal").removeClass("strong").addClass("weak").html('<span>弱</span>');
			break;
		case 2:
			$('#strongbg').removeClass("weak").removeClass("strong").addClass("normal").html('<span>一般</span>');
			break;
		case 3:		
			$('#strongbg').removeClass("weak").removeClass("normal").addClass("strong").html('<span>强</span>');
			break;
	}
}

function charMode(iN){ 
	if (iN>=48 && iN <=57) //数字 
	return 1; 
	if (iN>=65 && iN <=90) //大写字母 
	return 2; 
	if (iN>=97 && iN <=122) //小写 
	return 4; 
	else 
	return 8; //特殊字符 
} 
//计算出当前密码当中一共有多少种模式 
function bitTotal(num){ 
	modes=0; 
	for (i=0;i<4;i++){ 
		if (num & 1) modes++; 
		num>>>=1; 
	} 
	return modes; 
} 

//返回密码的强度级别 
function checkStrong(pwd){ 
	modes=0; 
	for (i=0;i<pwd.length;i++){ 
		//测试每一个字符的类别并统计一共有多少种模式. 
		modes|=charMode(pwd.charCodeAt(i)); 
	} 
	return bitTotal(modes);
}