//package com.backend.fullProject.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.backend.fullProject.dao.AdminDao;
//import com.backend.fullProject.entity.Admin;
//@Service
//public class AdminServiceImpl implements AdminService {
//	
//	@Autowired
//	private AdminDao adminDao;
//	
//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//	@Override
//	public Admin createAdmin(Admin myAdmin) throws Exception {
//		myAdmin.setId(0);
//		myAdmin.setPassword(bCryptPasswordEncoder.encode(myAdmin.getPassword()));
//		myAdmin.setRole("ROLE_ADMIN");
//		Admin admin=adminDao.save(myAdmin);
//		return admin;
//	}
//
//}
