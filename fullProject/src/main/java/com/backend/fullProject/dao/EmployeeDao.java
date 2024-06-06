package com.backend.fullProject.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.fullProject.entity.Employee;
@Repository
public interface EmployeeDao extends JpaRepository<Employee, Integer> {
	
	public Employee findByEmail(String email);
	
}
