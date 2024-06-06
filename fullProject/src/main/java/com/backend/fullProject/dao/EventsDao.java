package com.backend.fullProject.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.fullProject.entity.Events;
@Repository
public interface EventsDao extends JpaRepository<Events, Integer> {
	List<Events> findByEmployeeId(int empId);
}
