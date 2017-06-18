package service;

import entity.User;

import java.util.List;

public interface IUserService {

	List getProvince();

	List getCity(String pid);

	List checkAccount(String account);

	void insertUser(User user);

	List validateUser(String account, String password);

	List login(String account, String password);

}
