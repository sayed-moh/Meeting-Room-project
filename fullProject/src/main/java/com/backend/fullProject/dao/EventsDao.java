package com.backend.fullProject.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.fullProject.entity.Events;
@Repository
public interface EventsDao extends JpaRepository<Events, Integer> {
	List<Events> findByEmployeeId(int empId);
	
	 @Query("SELECT e FROM Events e JOIN MeetingRoom mr ON e.meetingRoomId = mr.id JOIN mr.employees emp WHERE emp.id = :employeeId AND e.status = 'pending'")
	    List<Events> findPendingEventsByEmployeeId(@Param("employeeId") int employeeId);
	    List<Events> findByDateAndMeetingRoomId(LocalDate date,int meetingRoomId);

}
