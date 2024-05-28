package com.backend.fullProject.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.fullProject.dao.AdminDao;
import com.backend.fullProject.dao.UserDao;
import com.backend.fullProject.entity.Admin;
import com.backend.fullProject.entity.User;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AdminDao adminDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	     User user = userDao.findByEmail(username).orElse(null);
	        if (user != null) {
	            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
	                    Collections.singletonList(new SimpleGrantedAuthority(user.getRole())));
	        }

	        Admin admin = adminDao.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	        return new org.springframework.security.core.userdetails.User(admin.getEmail(), admin.getPassword(),
	                Collections.singletonList(new SimpleGrantedAuthority(admin.getRole())));
	    }
	}


