package com.backend.fullProject.service;

import java.util.List;

import com.backend.fullProject.entity.Employee;

public interface EmployeeService {
	
	public Employee getById(int id) throws Exception;
	public List<Employee> getAll() throws Exception;
	public Employee addEmployee(Employee myEmployee) throws Exception;
	public Employee updateEmployee(Employee updatedEmployee)throws Exception;
	public void deleteEmployee(int id) throws Exception;
	
}
