package com.backend.fullProject.dto;

import com.backend.fullProject.entity.Office;

public class OfficeDto {
	
	private int id;
	private String name;
	private String address;
	private String govName;
	
	public OfficeDto() {}

	public OfficeDto( Office myOffice) {
		this.id=myOffice.getId();
		this.name = myOffice.getName();
		this.address = myOffice.getAddress();
		this.govName = myOffice.getGovernment().getName();
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGovName() {
		return govName;
	}

	public void setGovName(String govName) {
		this.govName = govName;
	}
	
	

}
