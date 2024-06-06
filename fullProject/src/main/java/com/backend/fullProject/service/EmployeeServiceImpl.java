package com.backend.fullProject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.fullProject.dao.EmployeeDao;
import com.backend.fullProject.entity.Employee;


@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private EmployeeDao employeeDao;

	@Override
	public Employee getById(int id) throws Exception {
		return employeeDao.findById(id).orElseThrow(()-> new Exception());
	}

	@Override
	public List<Employee> getAll() throws Exception {
		return employeeDao.findAll();
	}

	@Override
	public Employee addEmployee(Employee myEmployee) throws Exception {
		return employeeDao.save(myEmployee);
	}

	@Override
	public Employee updateEmployee(Employee updatedEmployee) throws Exception {
		return employeeDao.save(updatedEmployee);
	}

	@Override
	public void deleteEmployee(int id) throws Exception {
		employeeDao.deleteById(id);
	}

}
