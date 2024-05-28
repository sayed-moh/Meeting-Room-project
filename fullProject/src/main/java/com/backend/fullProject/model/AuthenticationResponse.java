package com.backend.fullProject.model;

import lombok.Data;


public class AuthenticationResponse {


	private  String jwt ;
    public AuthenticationResponse(String jwt) {
    	this.jwt=jwt;
}
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
    
}
