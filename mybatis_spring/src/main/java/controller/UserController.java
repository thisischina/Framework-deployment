package controller;

import entity.User;
import service.IUserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class UserController {
	
	@Resource
	private IUserService userService;
	
	//到注册账号页面
	@RequestMapping("/reg")
	public String registerPage(HttpServletRequest request, HttpServletResponse response, Model model){
		
		
		return "user/reg";
	}
	
	//获取居住地省份列表
	@RequestMapping("/getProvince")
	public @ResponseBody
    List getProvince(HttpServletRequest request, HttpServletResponse response, Model model){
		try {
			List list = userService.getProvince();
			return  list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//获取居住地city列表
	@RequestMapping("/getCity")
	public @ResponseBody
    List getCity(HttpServletRequest request, HttpServletResponse response, Model model){
		try {
			String pid = request.getParameter("pid");
			List list = userService.getCity(pid);
			return  list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//账号重复检测
	@RequestMapping("/checkAccount")
	public @ResponseBody
    String checkCount(HttpServletRequest request, HttpServletResponse response, Model model){
		try {
			String account = request.getParameter("account");
			List list = userService.checkAccount(account);
			if(list!=null&&list.size()>0){
				return "exist";
			}else{
				return  "0";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "-1";
		}
	}
	
	//注册
	@RequestMapping("/register")
	public  String register(HttpServletRequest request, HttpServletResponse response, Model model){
		try {
			String account = request.getParameter("account");
			String password = request.getParameter("password");

			User user = new User();
			user.setAccount(account);
			user.setPassword(password);
			userService.insertUser(user);
			return "user/regSuccess";
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//登录
	@RequestMapping("/login")
	public String login(HttpServletRequest request, HttpServletResponse response, Model model){
		
		return "user/login";
	}
	
	//登录
	@RequestMapping("/index")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model){
		try {
			String account = request.getParameter("account");
			String password = request.getParameter("password");
			
			if("".equals(account)||account==null){
				return "user/login";
			}else{
				List list = userService.login(account,password);
				System.out.println("account:"+account+",password："+password);
				
				if(list!=null&&list.size()>0){
					User user = (User) list.get(0);
					System.out.println("login:"+user);
					request.getSession().setAttribute("user", user);
					System.out.println("request.getSession().setAttribute(\"user\", user);");
					return "main/index";
				}else{
					model.addAttribute("flag", "error");
					return "user/login";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "user/login";
		}
	}

}
