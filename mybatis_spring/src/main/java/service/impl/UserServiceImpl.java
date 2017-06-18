package service.impl;

import mapper.UserMapper;
import entity.User;
import service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements IUserService {

	@Resource
	private UserMapper userMapper;

	@Override
	public List getProvince() {
		return null;
	}

	@Override
	public List getCity(String pid) {
		return null;
	}

	@Override
	public List checkAccount(String account) {
		return null;
	}

	@Override
	public void insertUser(User user) {
		userMapper.insert(user);
	}

	@Override
	public List validateUser(String account, String password) {
		return null;
	}

	@Override
	public List login(String account, String password) {
		return null;
	}
}
