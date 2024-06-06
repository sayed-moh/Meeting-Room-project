package com.backend.fullProject.model;

import com.backend.fullProject.dto.EmployeeDto;
import com.backend.fullProject.entity.Employee;

public class AuthenticationResponse {

	private String message;
	private String jwt;
	private EmployeeDto myEmployee;

	public AuthenticationResponse(String message, String jwt, EmployeeDto myEmployee) {
		this.jwt = jwt;
		this.message = message;
		this.myEmployee=myEmployee;
	}

	public AuthenticationResponse(String message) {
		this.message = message;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public EmployeeDto getMyEmployee() {
		return myEmployee;
	}

	public void setMyEmployee(EmployeeDto myEmployee) {
		this.myEmployee = myEmployee;
	}



}
