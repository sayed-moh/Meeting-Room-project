//package com.backend.fullProject.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.backend.fullProject.dao.UserDao;
//import com.backend.fullProject.entity.User;
//@Service
//public class UserServiceImpl implements UserService {
//	@Autowired
//	private UserDao userDao;
//	
//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder; 
//
//	@Override
//	public User addUser(User myUser) throws Exception {
//		myUser.setPassword(bCryptPasswordEncoder.encode(myUser.getPassword()));
//		myUser.setRole("ROLE_USER");
//		myUser.setId(0);
//		User user=userDao.save(myUser);
//		return user;
//	}
//
//}
