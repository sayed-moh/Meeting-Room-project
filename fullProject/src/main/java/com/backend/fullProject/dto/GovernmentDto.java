package com.backend.fullProject.dto;

import com.backend.fullProject.entity.Government;

public class GovernmentDto {
	
	private int id; 
	private String name;
	private String countryName;
	
	public GovernmentDto() {}
	
	public GovernmentDto(Government myGovernment) {
		this.id=myGovernment.getId();
		this.name=myGovernment.getName();
		this.countryName=myGovernment.getCountry().getName();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	
	
	
}
