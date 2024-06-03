//package com.backend.fullProject.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.backend.fullProject.dao.AdminDao;
//import com.backend.fullProject.entity.Admin;
//import com.backend.fullProject.entity.User;
//import com.backend.fullProject.jwtconfig.JwtUtil;
//import com.backend.fullProject.model.AuthenticationRequest;
//import com.backend.fullProject.model.AuthenticationResponse;
//import com.backend.fullProject.model.UserResponse;
//import com.backend.fullProject.service.AdminService;
//import com.backend.fullProject.service.UserDetailsService;
//import com.backend.fullProject.service.UserService;
//
//@RestController
//@RequestMapping("/api")
//public class AuthenticationController {
//	
//	@Autowired
//	private UserService userService;
//	
//	@Autowired
//	private AdminService adminService;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @PostMapping("/authenticate")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
//        } catch (BadCredentialsException e) {
//            throw new Exception("Incorrect username or password", e);
//        }
//
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
//        final String jwt = jwtUtil.generateToken(userDetails);
//
//        return ResponseEntity.ok(new AuthenticationResponse(jwt));
//    }
//    
//    @PostMapping("/signupuser")
//    public ResponseEntity<?> createUser(@RequestBody User myUser){
//    	User user=null;
//    	try {
//    		user=userService.addUser(myUser);
//    		return new ResponseEntity(new UserResponse(user, "user created Successfully"),HttpStatus.OK);
//    	}catch(Exception e){
//    		e.printStackTrace();
//    		return new ResponseEntity(new UserResponse(user, "user created Successfully"),HttpStatus.NOT_FOUND);
//
//    	}
//    }
//    
//    @PostMapping("/signupadmin")
//    public ResponseEntity<?> createAdmin(@RequestBody Admin myAdmin){
//    	Admin admin=null;
//    	try {
//    		admin=adminService.createAdmin(myAdmin);
//    		return new ResponseEntity(new UserResponse(admin, "user created Successfully"),HttpStatus.OK);
//    	}catch(Exception e){
//    		e.printStackTrace();
//    		return new ResponseEntity(new UserResponse(admin, "user created Successfully"),HttpStatus.NOT_FOUND);
//
//    	}
//    }
//}
