package util;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.junit.Test;

/**
 * 日志记录AOP
 */
@Aspect
public class LogAop {


	/**
	 * 添加业务逻辑方法切入点
	 */
	@Pointcut("(execution(* com.hd.*.service.*.save*(..))) || "
			+ "(execution(* com.hd.*.service.*.update*(..))) || "
			+ "(execution(* com.hd.*.service.*.delete*(..)))")
	public void business() {
	}

	/**
	 * 添加操作日志(后置通知)
	 */
	@AfterReturning(value = "business()", returning = "rtv")
	public void serviceCall(JoinPoint joinPoint, Object rtv) throws Throwable {
		
		
	}

	/**
	 * 处理 日志 内容 通过joinPoint取得被代理对象，参数列表等信息
	 */
	private String adminOptionContent(Object target, Object[] args, String mName) throws Exception {

		StringBuffer rs = new StringBuffer();
		rs.append( mName + "-->" + target.getClass().getSimpleName());
		
		/*// 遍历参数对象
		for (Object info : args) {

			if (info instanceof java.lang.Number || info instanceof java.lang.String)
				continue;
			rs.append(info.getClass().getSimpleName());

		}*/

		return rs.toString();
	}

	@Test
	public void main() throws Exception {

	}

}
