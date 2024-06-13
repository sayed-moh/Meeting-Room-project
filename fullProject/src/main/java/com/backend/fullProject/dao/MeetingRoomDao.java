package com.backend.fullProject.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.fullProject.entity.MeetingRoom;
@Repository
public interface MeetingRoomDao extends JpaRepository<MeetingRoom, Integer> {
	public List<MeetingRoom> findByOfficeId(int id);
	
}
