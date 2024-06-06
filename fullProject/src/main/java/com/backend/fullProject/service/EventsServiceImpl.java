package com.backend.fullProject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.fullProject.dao.EventsDao;
import com.backend.fullProject.entity.Employee;
import com.backend.fullProject.entity.Events;
import com.backend.fullProject.entity.MeetingRoom;
@Service
public class EventsServiceImpl implements EventsService {
	
	@Autowired
	private EventsDao eventsDao;
	@Autowired
	private MRService mrService;
	@Autowired
	private EmployeeService empService;
	
	
	@Override
	public List<Events> getAll() throws Exception {
		// TODO Auto-generated method stub
		return eventsDao.findAll();
	}

	@Override
	public Events getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return eventsDao.findById(id).orElseThrow(()->new Exception());
	}

	@Override
	public Events addEvent(int empId, int meetingRoomId, Events event) throws Exception {
		
		Employee myEmployee=empService.getById(empId);
		MeetingRoom myMeetingRoom=mrService.getById(meetingRoomId);
		
		myEmployee.getEvents().add(event);
		myMeetingRoom.getEvents().add(event);
		
		event.setEmployee(myEmployee);
		event.setMeetingRoom(myMeetingRoom);
		
		return eventsDao.save(event);
	}

	@Override
	public Events editEvent(Events updatedEvent) throws Exception {
		// TODO Auto-generated method stub
		return eventsDao.save(updatedEvent);
	}

	@Override
	public void deleteEvent(int id) throws Exception {
		eventsDao.deleteById(id);
	}

	@Override
	public List<Events> getAllByEmpId(int empId) throws Exception {
		// TODO Auto-generated method stub
		return eventsDao.findByEmployeeId(empId);
	}

}
