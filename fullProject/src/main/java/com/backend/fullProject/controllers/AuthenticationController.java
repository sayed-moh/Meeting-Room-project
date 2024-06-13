package com.backend.fullProject.controllers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.backend.fullProject.dto.EmployeeDto;
import com.backend.fullProject.entity.Employee;
import com.backend.fullProject.jwtconfig.JwtUtil;
import com.backend.fullProject.model.AuthenticationRequest;
import com.backend.fullProject.model.AuthenticationResponse;
import com.backend.fullProject.service.BlackListedService;
import com.backend.fullProject.service.EmployeeService;
import com.backend.fullProject.service.UserDetailsService;

@RestController
@CrossOrigin
public class AuthenticationController {

	@Autowired
	private BlackListedService blackListedService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
					authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(new AuthenticationResponse("Incorrect username or password"),
					HttpStatus.NOT_FOUND);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
		System.out.println(userDetails.getAuthorities());
		final String jwt = jwtUtil.generateToken(userDetails);

		Employee myEmployee = employeeService.findByEmail(userDetails.getUsername());
		myEmployee.setPassword("****");
		EmployeeDto myEmployeeDto=new EmployeeDto(myEmployee);
		return new ResponseEntity(new AuthenticationResponse("success", jwt, myEmployeeDto), HttpStatus.OK);


	}

	@PostMapping("/signout")
	public ResponseEntity<?> signOut(@RequestHeader("Authorization") String token) {
		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7);
			Date expirationDate = jwtUtil.extractExpiration(token);
			blackListedService.blacklistToken(token,
					LocalDateTime.ofInstant(expirationDate.toInstant(), ZoneId.systemDefault()));
		}
		return new ResponseEntity(new AuthenticationResponse("Sign Out Successfully"), HttpStatus.OK);
	}

}
