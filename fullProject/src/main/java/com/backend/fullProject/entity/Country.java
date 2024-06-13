package com.backend.fullProject.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

//id name

@Entity
@Table(name="country")
public class Country {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String name;
	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "country")
//	private List<Government> governments;
	
	public Country() {}

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
	
	

//	public List<Government> getGovernments() {
//		return governments;
//	}
//
//	public void setGovernments(List<Government> governments) {
//		this.governments = governments;
//	}

	@Override
	public String toString() {
		return "Country [id=" + id + ", name=" + name + "]";
	}
	
	

}
