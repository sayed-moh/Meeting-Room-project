package com.backend.fullProject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.fullProject.entity.Office;
@Repository
public interface OfficeDao extends JpaRepository<Office, Integer> {
	public Office findByName(String officeName);
}
