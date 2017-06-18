//判断访问终端
var Browser = {
    ver:function(){
        var u = navigator.userAgent; //, app = navigator.appVersion, p = navigator.platform;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            opera: u.indexOf('Presto') > -1, //opera内核
            webkit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			iphone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            ipad: u.indexOf('iPad') > -1, //是否iPad
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			berry: u.indexOf("BlackBerry") > -1,
			chrome: u.indexOf("Chrome") > -1,
			safari: u.indexOf("Safari") > -1 && u.indexOf("Chrome") < 1,
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    lang:(navigator.browserLanguage || navigator.language).toLowerCase() //navigator.language;//非IE navigator.browserLanguage //IE
}

//共用核心
Core.com = {
	loading: function (shade, closed) {
		var obj = $("#Loading");
		if (closed == 1) {
			$("#Lshade").remove();
			obj.hide();
			return;
		}
		if (shade == 1) {
			var _oh = $(document).outerHeight(), _stop = $(document).scrollTop();
			ht = _oh + _stop;
			_html = '<div id="Lshade" style="position:absolute;top:0;left:0;width:100%;height:'+ht+'px;z-index:99999;background-color:#333;overflow-y:hidden"></div>';
			$(_html).css({"opacity": 0.3}).appendTo(document.body);
		}
		if (obj.length > 0) {
			obj.show();
			Core.com.popPos(obj);
		} else {
			var _html = '<div id="Loading" style="position:absolute;left:42%;padding:20px 20px;background-color:#FFF;border:1px solid #999;background:#F9F9F9;color:#000;z-index:999999;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;box-shadow:2px 2px 5px #666;-moz-box-shadow: 2px 2px 5px #666;-webkit-box-shadow:0px 0px 20px #666"><img src="'+CONFIG.cssPath+'images/load/s_loading.gif" align="absbottom" /> 数据处理中，请稍后...</div>';
			$(_html).appendTo(document.body);
			Core.com.popPos($("#Loading"));
		}
	},
	Cookie: function (key, value, options) {
		if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(value))||value===null||value===undefined)){options=$.extend({},options);if(value===null||value===undefined){options.expires=-1}if(typeof options.expires==="number"){var seconds=options.expires,t=options.expires=new Date();t.setTime(t.getTime()+seconds)}value=String(value);return(document.cookie=[encodeURIComponent(key),"=",options.raw?value:encodeURIComponent(value),options.expires?"; expires="+options.expires.toUTCString():"",options.path?"; path="+options.path:"",options.domain?"; domain="+options.domain:"",options.secure?"; secure":""].join(""))}options=value||{};var decode=options.raw?function(s){return s}:decodeURIComponent;var pairs=document.cookie.split("; ");for(var i=0,pair;pair=pairs[i]&&pairs[i].split("=");i++){if(decode(pair[0])===key){return decode(pair[1]||"")}}return null;
	},
	/* *
	* Ajax请求  不适合大数据提交
	* @public
	* @param   {string}    url             请求的URL地址
	* @param   {mix}       params          发送参数 （可以是string、object）
	* @param   {string}    Type            请求方式
	* @param   {string}    datatype        返回类型
	* @param   {Function}  beforeback      开始回调函数
	* @param   {Function}  callback        回调函数
	* @param   {string}    Async           异步或同步 同步将锁定浏览器
	*/
	ajaxPost: function (url, params, Type, datatype, beforeback, callback, Async) {
		Type = Type || "POST"; 
		datatype = datatype || "json";
		(Async == null) && (Async = true);
		//对将要发送的参数进行格式化
		var parseParams = "";
		params = params ? params : "";
		if (params) {
		  if (typeof(params) === "string"){
			  parseParams = params;
		  }else if (typeof(params) === "object"){
			try{
			  Core.js({json:JSS.json}, function() {
				parseParams = "jsonData=" + JSON.stringify(params);
			  });
			}catch (ex){
			  alert("Can't stringify JSON!");
			  return false;
			}
		  }else{
			alert("Invalid parameters!");
			return false;
		  }
		}
		if (ispost == true) { //防止重复提交数据
			return false;
		}
		ispost = true;
		$.ajax({
			url: url + "&is_ajax=1",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",  
			data: parseParams + "&formhash=" + CONFIG.formhash,
			type: Type,
			async: Async,
			cache: false,
			processData: false,//防止自动转换数据格式
			beforeSend: beforeback,
			timeout: 20000,
			error: function(XMLHttpRequest, textStatus, errorThrown){
			   alert("错误信息："+errorThrown);
			   Core.com.loading(1, 1);
			},
			complete: function(){
			   ispost = false;
			   Core.com.loading(1, 1);
			},
			success: callback,
			dataType: datatype
		});
	},
	//直接post、json发送提交
	postDo: function(url, par, callback){
		if(url == '' || par == ''){
			 Dialog.msg('数据节点错误！!~~',2,0);
			return false;
		}
		Core.com.ajaxPost(url, par, 'POST', 'json', '', callback);
	},
     //确认提交
	confirmPostDo: function(url, par, callback){
		if(url == '' || par == ''){
			 Dialog.msg('数据节点错误！!~~',2,0);
			return false;
		}
		var i = $.Dialog({
			area : ['auto','auto'],
			dialog : {
				msg:"确定要执行此操作吗？~",
				btns : 2, 
				type : 4,
				btn : ['确 定','取 消'],
				yes : function(){
				  Dialog.close(i);
				  Core.com.ajaxPost(url, par, 'POST', 'json', function(){Core.com.loading(1,0)}, callback);
				},
				no : function(){
					Dialog.close(i);
				}
			}
		});
	},
	
	//弹窗居中定位
	popPos : function(wrap){
		var top,
			win_height = $(window).height(),
			wrap_height = wrap.outerHeight();
		if(win_height < wrap_height) {
			top = 0;
		}else{
			top = ($(window).height() - wrap.outerHeight())/2;
		}
		wrap.css({
			top : top + $(document).scrollTop() - 34,
			left : ($(window).width() - wrap.innerWidth())/2
		}).show();
	},
	
	textError:function (obj,txt) {
	  $("html,body").animate({scrollTop:obj.offset().top-150}, 300);
	  txt = txt || "";
	  if (txt) {
		var wordObj = obj.next("span.err:first");
		if (wordObj.length < 1) {
			obj.after(' <span class="err">'+txt+'</span');
			wordObj = obj.next("span.err:first");//重新赋值
		} else {
			wordObj.html(txt);
		}
	  }
	  var oTimer = null;
	  var i = 0;
	  oTimer = setInterval(function () {
		  i++;
		  if (i == 7) {
			  if (txt) {
				 wordObj.delay(3000).hide(0);
			  }
			  clearInterval(oTimer);
		  } else {
			  if (i % 2 == 0) {
				  obj.css("background-color", "#FFF");
			  } else {
				  obj.css("background-color", "#ffd4d4");
			  }
			  if (txt) {
				wordObj.show(1).css("color","#FF3300");
			  }
		  }
	  }, 200);
	},
	
	//返回本地时间
	parseDate:function (s) {
	  var today = new Date();
	  /(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec(s);
	  var m1 = (RegExp.$1 && RegExp.$1 > 1899 && RegExp.$1 < 2101) ? parseFloat(RegExp.$1) : today.getFullYear();
	  var m2 = (RegExp.$2 && (RegExp.$2 > 0 && RegExp.$2 < 13)) ? parseFloat(RegExp.$2) : today.getMonth() + 1;
	  var m3 = (RegExp.$3 && (RegExp.$3 > 0 && RegExp.$3 < 32)) ? parseFloat(RegExp.$3) : today.getDate();
	  var m4 = (RegExp.$4 && (RegExp.$4 > -1 && RegExp.$4 < 24)) ? parseFloat(RegExp.$4) : 0;
	  var m5 = (RegExp.$5 && (RegExp.$5 > -1 && RegExp.$5 < 60)) ? parseFloat(RegExp.$5) : 0;
	  /(\d+)\-(\d+)\-(\d+)\s*(\d*):?(\d*)/.exec("0000-00-00 00\:00");
	  return new Date(m1, m2 - 1, m3, m4, m5);
	},
	
	//基于id对象弹出小窗 @o 对象 @con 内容 @title 标题
	smallDialog:function (o,con,title) {
		
	  var id = "smallDialog",
	  obj = $("#"+id),
	  title = title || "提示信息？",
	  thisobj = $(o),
	  thisobj_id = thisobj.attr('id'),
	  callback = thisobj.attr("callback"); //回调函数

	  var _html = '<div id="' + id + '" data-id="'+thisobj_id+'"><div class="inner"><p class="title">' + title + '<span class="close">×</span></p><div class="inner-con">' + con + '</div></div></div>';
	
	  if(obj.html() == null ) { //初始化
		  $("body").append(_html);
		  obj = $("#"+id);
	  } else {
		  var tempid = obj.attr('data-id');
		  if (thisobj_id == tempid) { //如果已存在对象内容未改变
			   obj.show();
			   return;
		  }
	  }
	  var position = thisobj.offset();
	  obj.attr('data-id',thisobj_id).css({"top":position.top+8+"px","left":position.left-(obj.width()/2)+"px"}).show(0);
	  var mouse_in = false;
	  obj.hover(function() {
		  mouse_in = true;
	  }, function() {
		  mouse_in = false;
		  obj.focus();
	  });
	  
	  $("#"+id+" span.close").click(function(e) {
		  e.preventDefault();
		  obj.hide(0);
	  });
	  //失焦隐藏
	  $(document.body).on("mousedown.d", function(e) {
		 if (!mouse_in && $(e.target).parent("#"+id).length == 0) {
			obj.hide(0);
		 }
	  });
	},
	
	//数字冒泡提示
	ShowFontTip: function (id, num) {
		var html = '<div id="ShowFontTip" style="display:none;position:absolute;width:30px;height:30px;text-align:center;font-size:20px;font-weight:bold;color:#F60">'+num+'</div>',
		elem = $(id),
		left = elem.offset().left,
		top = elem.offset().top;
		$('body').append(html);
		This = $("#ShowFontTip"),
		This.css({"opacity":"0.3","top":top-10,"left":left-20}).show();
        This.animate({"opacity":"1","top":top-45},300,function(){setTimeout(function(){This.remove();},1000);});
	},
	
	praise: function (type, id, font) {
		var parm = "type="+type+"&itemid="+id, elem = $("#pr-"+type+id);
		font = font || "p";
		if (font == 'p') {
			fstr = '赞';
		} else {
			fstr = '喜欢';
		}
		Core.com.ajaxPost(CONFIG.siteUrl+"ajax/praise.php?rd=1", parm, "POST", "json", "", function(d) {
			if (d.error == 0) {
				if (d.zan == 0) {
					elem.attr("title","取"+fstr).find("i").addClass("psed").parent("a").find("em").html(d.font).parent("a").find("b").html(d.num);
					Core.com.ShowFontTip(elem.find("b"),'+1');
				} else {
					elem.removeAttr("title").find("i").removeClass("psed").parent("a").find("em").html(d.font).parent("a").find("b").html(d.num);
					Core.com.ShowFontTip(elem.find("b"),'-1');
				}
			} else {
				Dialog.msg(d.msg,3,3);
			}
		});
	},
	
	//检查字数输入
	checkInputLen: function (elm, num, btn) {
	  var len = elm.val().length, btnob = $("#"+btn);
	  var wordNumObj = elm.parents('div,tr').find("span.font-count:first");
	  if (wordNumObj.length < 1) {
		  wordNumObj.html('');
	  }
	  if (len > num) {
		wordNumObj.css("color", "red").html("已超出<strong>" + (len - num) + "</strong>字");
		if (btnob) {
		  btnob.attr("disabled", "true").addClass('disabled');
		}
	  } else if (len <= num) {
		wordNumObj.css("color", "#999").html("还可输入<strong>" + (num - len) + "</strong>字");
		if (btnob) {
		  btnob.removeAttr("disabled").removeClass('disabled');
		}
	  }
	},
	
	faceBox: function (o, elm) {
	  //var len = elm.val().length, btnob = $("#"+btn);
	  Core.com.ajaxPost(CONFIG.url.emottons, '', 'POST', 'json', function(){Core.com.loading(1,0)}, function(d) {
		if (d.error == 0) {
			d.content = '<div class="ajax_page">'+d.content+'</div>';
			var msgidx = $.Dialog({
				type : 1,
				shade: [0.3 , '#000' , false],
				border: [0 , 0.4 , '#666', true],
				title: "表情",
				area : ['450px','350px'],
				page : { html: d.content}
			});
		} else {
			Dialog.msg(d.msg,3,3);
		}
	  });
	},
	
	showreward: function () {
//		if(Core.com.Cookie('x_reward_log')) {
//			return false;
//		}
		$.ajax({
			url: CONFIG.siteUrl+"ajax/user.php?act=getreward&is_ajax=1",
			type:  "GET",
			cache: false,
			success: function(d) {
			  if (d.error == 0) {
				 Dialog.msg(d.msg,4,1,false);
			  }
			},
			dataType: "json"
		});
	},
	
	//触发验证码 obj触发对象 
	triggercode: function (obj,id) {
		$.ajax({
			url: CONFIG.siteUrl+"ajax/check.php?act=triggercode&data="+obj+"&is_ajax=1&id="+id,
			type:  "GET",
			cache: false,
			success: function(d) {
			  if (d.error == 0) {
				  _html = '<div class="ajax_page">'+d.content+'</div>';
				  $.Dialog({
					  type : 1,
					  title: "请输入验证码",
					  border : [5, 0.3, '#666', false],
					  offset: ['150px',''],
					  area : ['270px','200px'],
					  page : { html: _html}
				  });
			  } else {
				  Dialog.msg(d.msg,2,3,false);
			  }
			},
			dataType: "json"
		});
	},
	
    /**
     * 解析模版tpl。当data未传入时返回编译结果函数；当某个template需要多次解析时，建议保存编译结果函数，然后调用此函数来得到结果。
     * @param {String} str 模板
     * @param {Object} data 数据
     * @example var str = "<p><%=name%></p>",
     * obj = {name: 'ajean'};
     * console.log($.parseTpl(str, data));
     */
    parseTpl: function( str, data ) {
		if (str == null) { return; }
        var tmpl = 'var __p=[];' + 'with(obj||{}){__p.push(\'' +
                str.replace( /\\/g, '\\\\' )
                .replace( /'/g, '\\\'' )
                .replace( /<#=([\s\S]+?)#>/g, function( match, code ) {
                    return '\',' + code.replace( /\\'/, '\'' ) + ',\'';
                } )
                .replace( /<#([\s\S]+?)#>/g, function( match, code ) {
                    return '\');' + code.replace( /\\'/, '\'' )
                            .replace( /[\r\n\t]/g, ' ' ) + '__p.push(\'';
                } )
                .replace( /\r/g, '\\r' )
                .replace( /\n/g, '\\n' )
                .replace( /\t/g, '\\t' ) +
                '\');}return __p.join("");',
            func = new Function( 'obj', tmpl );
        return data ? func( data ) : func;
    },
	
	
	//插入内容
	//.insertContent("插入的内容");
	//.insertContent("插入的内容"，-1); //根据数值选中插入文本内容两边的边界，
	insertContent: function (elm, myValue, t) {
	  var tt = elm[0];
	  if (document.selection) { //ie
		elm.focus();
		var sel = document.selection.createRange();
		sel.text = myValue;
		elm.focus();
		sel.moveStart("character", -l);
		var wee = sel.text.length;
		if (arguments.length == 2) {
		  var l = tt.value.length;
		  sel.moveEnd("character", wee + t);
		  t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart("character", wee - t - myValue.length);
		  sel.select();
		}
	  } else if (tt.selectionStart || tt.selectionStart == "0") {
		var startPos = tt.selectionStart;
		var endPos = tt.selectionEnd;
		var scrollTop = tt.scrollTop;
		tt.value = tt.value.substring(0, startPos) + myValue + tt.value.substring(endPos, tt.value.length);
		elm.focus();
		tt.selectionStart = startPos + myValue.length;
		tt.selectionEnd = startPos + myValue.length;
		tt.scrollTop = scrollTop;
		if (arguments.length == 2) {
		  tt.setSelectionRange(startPos - t, tt.selectionEnd + t);
		  elm.focus();
		}
	  } else {
		elm.value += myValue;
		elm.focus();
	  }
	},
	
	report: function (id,type) {
		Core.com.ajaxPost(CONFIG.siteUrl+"ajax/report.php?type="+type+"&id="+id, "", "POST", "json", function(){
			Core.com.loading(1, 0);
		},function (d) {
		  if (d.error > 0) {
			  Dialog.msg(d.msg,3,0);
			  return false;
		  } else {
			  html = '<div class="ajax_page">'+d.content+'</div>';
			  $.Dialog({
				  type : 1,
				  title: "举报",
				  area : ['450px','auto'],
				  offset: ['200px' , '50%', '1'],
				  page : { html: html}
//				  success : function(){
//					 Dialog.shift('right-bottom' , 400);
//				  }
			  });
		  }
		});
	},
	feedBack: function () {
		Core.com.ajaxPost(CONFIG.siteUrl+"ajax/feedback.php?", "", "POST", "json", function(){
			Core.com.loading(1, 0);
		},function (d) {
		  d.content = '<div class="ajax_page">'+d.content+'</div>';
		  $.Dialog({
			  type : 1,
			  title: "意见反馈",
			  area : ['450px','auto'],
			  offset: ['200px' , '50%', '1'],
			  page : { html: d.content}
		  });
		});
	},
	backTop: function () {
	  var Body = $("html, body");
	  JsBlockEle = $('<div id="JsTopBlock"><div id="backTop"></div><div id="feedback" onclick="Core.com.feedBack()"></div></div>').appendTo($("body"));
	  JsBlockFun = function() {
		  var st = $(document).scrollTop(),
		  winh = $(window).height();
		   (st > 0) ? JsBlockEle.fadeIn() : JsBlockEle.fadeOut();
		  //IE6下的定位
		  if (!window.XMLHttpRequest) {
			  JsBlockEle.css("top", st + winh - 166);
		  }
		  $("#JsTopBlock").css("right",($(window).width()-1000)/2-35+"px");
	  };
	  $(window).bind("scroll", JsBlockFun);	
	  $("#backTop").on('click', function(e) {
		  Body.animate({
			  scrollTop: 0
		  },400);
	   });
	}
};

Core.user = {
  fans: function(uid){
	Core.com.ajaxPost(CONFIG.siteUrl+'ajax/follow.php?act=fans', "uid="+uid, 'POST', 'json', '', function(d) {
	  if (d.error == 0) {
		  $('#qfans_'+uid).remove();
		  Dialog.msg('恭喜，求粉成功！~', 2, 1, false);
	  } else {
		  Dialog.msg(d.msg,3,3);
	  }
	});
  },
	
  follow: function(uid, obj){
	var self = $('#'+obj);
	Core.com.ajaxPost(CONFIG.siteUrl+"ajax/follow.php?act=", "uid="+uid, "POST", "json", function(){
		self.html('发送中...');
	}, function(d) {
	  if (d.error == 0) {
		  self.html('取消关注');//.addClass('unfollow');
		  Dialog.msg('关注成功！~', 2, 1, false);
		  self.data('action','Core.user.unfollow');
		  self.data('node',uid+','+self.attr('id'));
	  } else {
		  Dialog.msg(d.msg,3,3,false);
		  self.html('+关 注');
	  }
	});
  },
  unfollow: function(uid, obj){
	var self = $('#'+obj);
	Core.com.ajaxPost(CONFIG.siteUrl+"ajax/follow.php?act=unfollow", "uid="+uid, "POST", "json", function(){
		self.html('发送中...');
	}, function(d) {
	  if (d.error == 0) {
		  self.html('+关 注');
		  Dialog.msg('取消关注成功！~', 2, 1, false);
		  self.data('action','Core.user.follow');
		  self.data('node',uid+','+self.attr('id'));
	  } else {
		  Dialog.msg(d.msg,3,3,false);
		  self.html('取消关注');
	  }
	});
  },
  send: function(uid,msgid){
	Core.com.ajaxPost(CONFIG.siteUrl+"member/msg.php?act=send", "touid="+uid+"&msgid="+msgid, "POST", "json", function(){Core.com.loading(1,0)}, function(d) {
	  if (d.error == 0) {
		  d.content = '<div class="ajax_page">'+d.content+'</div>';
		  var msgidx = $.Dialog({
			  type : 1,
			  title: "发私信",
			  area : ['420px','auto'],
			  page : { html: d.content}
		  });
	  } else {
		  Dialog.msg(d.msg,3,3);
	  }
	});
  },
  addBlack: function(uid){
	Core.com.ajaxPost(CONFIG.siteUrl+"member/msg.php?act=send", "tuid="+uid, "POST", "json", function(){Core.com.loading(1,0)}, function(d) {
	  if (d.error == 0) {
		  d.content = '<div class="ajax_page">'+d.content+'</div>';
		  $.Dialog({
			  type : 1,
			  title: "发私信",
			  area : ['420px','auto'],
			  page : { html: d.content}
		  });
	  } else {
		  Dialog.msg(d.msg,3,3);
	  }
	});
  }
};


//返回方法
Call = window.Call || {
	
	// 截取字符串
  subStr: function(str, len) {
	  if(!str) {
		  return '';
	  }
	  len = len > 0 ? len * 2 : 280;
	  var count = 0;// 计数：中文2字节，英文1字节
	  var temp = '', dot = '...';
	  for(var i = 0; i < str.length; i ++) {
		  if(str.charCodeAt(i) > 255) {
			  count += 2;
		  } else {
			  count ++;
		  }
		  // 如果增加计数后长度大于限定长度，就直接返回临时字符串
		  if(count > len) {
			  temp += dot;
			  return temp;
		  }
		  // 将当前内容加到临时字符串
		  temp += str.charAt(i);
	  }
	  return str;
  }
  
}

/**
 * 数组去重
 * @param array arr 去重数组
 * @return array 已去重的数组
 */
var unique = function(arr){
	var obj = {};
	for(var i = 0, j = arr.length; i < j; i++) {
		obj[arr[i]] = true;
	}
	var data = [];
	for(var i in obj) {
		data.push[i];
	}

	return data;
};

function CheckAll(warp,name){
  var cks = $("#"+warp+" input:checkbox");
  for (var i = 0; i < cks.length; i++) {
	  var e = cks[i];
	  if(e.name.match(name)) {
		 cks.get(i).checked = !cks.get(i).checked;
	  }
  } 
}

function ctrlEnter(event, btnId, onlyEnter) {
	if(onlyEnter) {
		onlyEnter = 0;
	}
	if((event.ctrlKey || onlyEnter) && event.keyCode == 13) {
		$('#'+btnId).click();
		return false;
	}
	return true;
}
  
$(function() {
	
  //顶部菜单
  $(".cpdroplist").hover(
	function(){ $(this).addClass("hover pop_fadein"); },
	function(){ $(this).removeClass("hover pop_fadein"); }
  );

  //顶部搜索
  $(".Search input[name=keyword]").bind("keyup", function(){
	  if ($(this).val().length > 0) {
		  $(".Search span .labelholder").css("display","none");
	  } else {
		  $(".Search span .labelholder").css("display","block");
	  }
  }).bind("focus", function() {
	   $(".Search span").addClass("focus");
  }).bind("blur", function() {
	   $(".Search span").removeClass("focus");
  });
  
  //全局data-action事件
  $("body").on('click', '[data-action]', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var self = $(this), xs;
		var action = self.data('action'), nodeData = self.data('node'), dataStr = '';
		nodeData += ""; //转换成字符串，不然为纯数字 indexOf出错
		if (nodeData && action) {
			//过滤xxs
			xs = /^[0-9A-Za-z\,\_\-]+$/.test(nodeData);
			if (xs == false) {
				alert('CODE-XXS！~');
				return false;
			}
			xs = /^[A-Za-z\.\_\-]+$/.test(action);
			if (xs == false) {
				alert('AC-XXS！~');
				return false;
			}
			if (nodeData.indexOf(",") >= 0) { //是否存在逗号分隔
				nodeDataArr = nodeData.split(',');
				for (var i = 0; i < nodeDataArr.length; i++) {
					dataStr += "'" + nodeDataArr[i] + "',";
				}
				//去掉上面产生的最后一个逗号
				dataStr = dataStr.substr(0, dataStr.length - 1);
			} else { // 直接返回单个值
				dataStr = nodeData;
			}
			$.globalEval(action+'('+dataStr+')');
		}
  });
  
  //pop-card定位
  function cardPos(elem, wrap){
	  var left,									//名片水平位置
		  top,
		  cls = 'arrow_bottom',					//三角class，正
		  _cls = 'arrow',						//三角class，反
		  elem_offset_left = elem.offset().left,
		  elem_offset_top = elem.offset().top,
		  wrap_width = wrap.outerWidth(),				//名片宽度
		  wrap_height = wrap.outerHeight() + 15,		//名片高度 15为三角高度
		  win_width = $(window).width(),
		  arror_left = elem.innerWidth() / 2 - 9;		//小三角水平位置
		  
	  //判断右侧宽度是否足够
	  if(win_width - elem_offset_left < wrap_width) {
		  left = win_width - wrap_width - wrap_width / 2;
		  arror_left = elem_offset_left - left + elem.innerWidth() / 2 - 9;
	  }else{
		  left = elem_offset_left;
	  }
	  //判断窗口下方高度是否足够
	  var elem_window_top = elem_offset_top - $(document).scrollTop(), //触发元素到窗口顶部距离
		  elem_window_bottom = $(window).height() - elem_window_top - elem.innerHeight();	//触发元素到窗口底部距离
	  //默认显示在上方
	  top = elem_offset_top - wrap_height + 5;
	  if(wrap_height < elem_window_bottom && wrap_height >= elem_window_top) {
		  //显示在下方
		  top = elem.offset().top + elem.innerHeight() + 5;
		  cls = 'arrow';
		  _cls = 'arrow_bottom'
	  }
	  //小名片位置
	  wrap.css({left : left, top: top});
	  //小三角位置
	  wrap.find('.js_card_arrow').css({left : arror_left}).removeClass(_cls).addClass(cls);
  }
  
  //气泡名片开始
  var user_card_show = $('.user_card'),
	  card_wrap = '<div class="pop_card" id="_CDID"><div class="arrow js_card_arrow"><em></em><span></span><strong></strong></div><div class="pop_loading"><div class="loadtxt">正在加载，请稍后...</div></div></div>';
  var lock_hide = false, //隐藏锁定, true表示不隐藏
	  timeout;
  //经过用户名或头像触发
  var card_i = 0;
  $(document).on('mouseenter', '.user_card', function(e){
	  e.preventDefault();
	  card_i += 1;
	  var This = $(this), cardId = This.data('cardid'), datacard = This.data('card'), tempid = This.data('tempid'), tarobj = This.data('target'), noteData = Array();
	  if (datacard) {
		  noteData = datacard.split('=');
	  }
	  if (noteData.length < 2) {
		  return false;
	  }
	  if(!tempid) {
		  tempid =  noteData[0] + "_" + (cardId ? cardId : card_i);
		  This.data('tempid', tempid); //设置临时缓存方便后读取
	  }
	  var card_item = $('#user_card_'+ tempid);
	  lock_hide = true;
	  clearTimeout(timeout);
	  timeout = setTimeout(function(){
		  $('div.pop_card').hide();//先隐藏所有小名片
		  if(card_item.length) {
			  //已存在则显示
			  card_item.show();
			  cardPos(This, card_item);
		  }else{
			  //不存在则请求
			  $('body').append(card_wrap.replace('_CDID', 'user_card_'+ tempid));
			  var card = $('#user_card_'+ tempid);
			  cardPos(This, card);
			  
			  if (tarobj) {//存在隐藏对象，直接获取对象html显示
				  var tcon = $(tarobj).html();
				  card.find('.pop_loading').replaceWith(tcon);
				  cardPos(This, card);
			  } else {
				  var pdata = "cardId="+(cardId ? cardId : 0)+"&"+noteData[0]+"="+noteData[1];
				  $.ajax({
					  url: CONFIG.siteUrl+"ajax/user.php?act="+noteData[0]+"&is_ajax=1", 
					  data: pdata + "&formhash=" + CONFIG.formhash,
					  type: "POST",
					  cache: false,
					  processData: false,//防止自动转换数据格式
					  timeout: 5000,
					  error: function(XMLHttpRequest, textStatus, errorThrown){
						 alert("错误信息："+errorThrown);
						 Core.com.loading(1, 1);
					  },
					  success: function(d) {
						if (d.error == 1) {
							card.find('.pop_loading').replaceWith(d.msg);
							return false;
						}
						card.find('.pop_loading').replaceWith(d.content);
						cardPos(This, card);
					  },
					  dataType: "json"
				 });
			  }
		  }
	  }, 300);
  }).on('mouseleave', '.user_card', function(e){
	  clearTimeout(timeout); //清理ajax
	  lock_hide = false;	//触发隐藏
	  var This = $(this), card = $('#user_card_'+ This.data('tempid'));
	  timeout = setTimeout(function(){
		  if(!lock_hide){
			  card.hide();
		  }
	  }, 300);
  });
  $(document).on('mouseenter', 'div.pop_card', function(){
	  //进入小名片
	  lock_hide = true;
  }).on('mouseleave', 'div.pop_card', function(){
	  //离开小名片
	  var This = $(this);
	  lock_hide = false;
	  setTimeout(function(){
		  if(!lock_hide){
			  This.hide();
		  }
	  }, 300);
  });
  //气泡名片结束
  
  $("body").on('click', 'a.goTtoUrl', function(e){
	  var This = $(this), gourl = This.data("gotourl");
	  if(gourl == '') {
		  return false;
	  }
	  window.open(gourl);
  });

  if (is_ie && is_ie < 8) {
	  _iewarn = '<div id="ie-warning"><p>温馨提示:你正在使用的浏览器版本太低，将不能正常浏览本站及使用本站的所有功能</p><p>请使用 <a href="http://www.google.com/chrome/" target="_blank">Google Chrome</a>、<a href="http://www.firefox.com/" target="_blank">Firefox</a> 或升级至 <a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie" target="_blank">Internet Explorer 7以上</a>(IE7以上，请取消兼容模式)<a href="javascript:void(0);" title="我知道了" onclick=\"$(\'#ie-warning\').hide()\" class="close">x</a></p></div>';
	  $('#header').next('.martop').after(_iewarn);
 }
  
  Core.com.backTop();
  
});

var emotions = $('a.insert_emotions');
if(emotions.length) {
	Core.js(CONFIG.jsPath+'insertEmotions.js?v='+ CONFIG.version, function(){
		emotions.on('click', function(e){
			e.preventDefault();
			insertEmotions($(this), $($(this).data('emotiontarget')));
		});
	});
}
var List = {};