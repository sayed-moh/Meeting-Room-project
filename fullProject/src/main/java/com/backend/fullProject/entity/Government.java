package com.backend.fullProject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

//id name country id

@Entity
@Table(name="government")
public class Government {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String name;
	
//	@ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "countryId")
//	private Country country;
	
	@Column
	private int countryId;
	
//	@OneToMany(fetch = FetchType.LAZY,mappedBy = "government")
//	private List<Office> offcies;
	
	public Government() {}

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

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

//	public Country getCountry() {
//		return country;
//	}
//
//	public void setCountry(Country country) {
//		this.country = country;
//	}

//	public List<Office> getOffcies() {
//		return offcies;
//	}
//
//	public void setOffcies(List<Office> offcies) {
//		this.offcies = offcies;
//	}
	
	

}
