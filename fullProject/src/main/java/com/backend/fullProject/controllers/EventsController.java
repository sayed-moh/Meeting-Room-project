package com.backend.fullProject.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.fullProject.dto.EventsDto;
import com.backend.fullProject.entity.Employee;
import com.backend.fullProject.entity.Events;
import com.backend.fullProject.model.EventsResponse;
import com.backend.fullProject.service.EmployeeService;
import com.backend.fullProject.service.EventsService;
import com.backend.fullProject.service.MRService;

import antlr.debug.Event;

@RestController
@RequestMapping(value="/api")
public class EventsController {
	
	@Autowired
	private EventsService eventsService;
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private MRService meetingRoomService;
	
	@GetMapping(value="/events")
	public ResponseEntity<?> getAll(){
		List<EventsDto> myEventsDto=new ArrayList<EventsDto>();
		List<Events> myEvents=new ArrayList<Events>();
		try {
			myEvents=eventsService.getAll();
			for(int i=0;i<myEvents.size();i++) {
				myEventsDto.add(new EventsDto(myEvents.get(i)));
			}
			return new ResponseEntity(new EventsResponse("all Events Retrived Successfully", myEventsDto),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(new EventsResponse("Something Went wrong", myEventsDto),HttpStatus.NOT_FOUND);

		}
	}
	
	@GetMapping(value="/events/empId/{empId}")
	public ResponseEntity<?> getAllByEmpId(@PathVariable int empId){
		List<EventsDto> myEventsDto=new ArrayList<EventsDto>();
		List<Events> myEvents=new ArrayList<Events>();
		try {
			myEvents=eventsService.getAllByEmpId(empId);
			for(int i=0;i<myEvents.size();i++) {
				myEventsDto.add(new EventsDto(myEvents.get(i)));
			}
			return new ResponseEntity(new EventsResponse("all Events for employee id :"+empId +"Retrived Successfully", myEventsDto),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(new EventsResponse("Something Went wrong", myEventsDto),HttpStatus.NOT_FOUND);

		}
	}
	
	@PostMapping(value="/events")
	public ResponseEntity<?> addEvent(@RequestBody EventsDto eventsDto){
		int empId=eventsDto.getEmployeeId();
		int meetingRoomId=eventsDto.getMeetingRoomId();
		
		Events myEvent=new Events();
		Events savedEvent=new Events();
		List<EventsDto> myEventsDto=new ArrayList<EventsDto>();
		
		myEvent.setId(0);
		myEvent.setName(eventsDto.getName());
		myEvent.setDate(eventsDto.getDate());
		myEvent.setStartTime(eventsDto.getStartTime());
		myEvent.setDescription(eventsDto.getDescription());
		myEvent.setEndTime(eventsDto.getEndTime());
		myEvent.setStatus(eventsDto.getStatus());
		try {
			savedEvent=eventsService.addEvent(empId, meetingRoomId, myEvent);
			myEventsDto.add(new EventsDto(savedEvent));
			return new ResponseEntity(new EventsResponse("Event is added Successfully", myEventsDto),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(new EventsResponse("Something Went wrong", myEventsDto),HttpStatus.NOT_FOUND);

		}
	}
	
	@PutMapping(value="/events")
	public ResponseEntity<?> updateEvent(@RequestBody EventsDto eventDTO)
	{
		List<EventsDto>EventsList=new ArrayList<EventsDto>();
		Events updatedEvent=new Events();
		try {
			Events myEvent=eventsService.getById(eventDTO.getId());
			myEvent.setDescription(eventDTO.getDescription());
			myEvent.setDate(eventDTO.getDate());
			myEvent.setEndTime(eventDTO.getEndTime());
			myEvent.setStartTime(eventDTO.getStartTime());
			myEvent.setStatus(eventDTO.getStatus());
			myEvent.setName(eventDTO.getName());
			myEvent.setEmployee(employeeService.getById(eventDTO.getEmployeeId()));
			myEvent.setMeetingRoom(meetingRoomService.getById(eventDTO.getMeetingRoomId()));
			updatedEvent=eventsService.editEvent(myEvent);
			EventsList.add(new EventsDto(updatedEvent));
			return new ResponseEntity(new EventsResponse("Event is updated Successfully", EventsList),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(new EventsResponse("Something Went wrong", EventsList),HttpStatus.NOT_FOUND);

		}
	}
	
	
	@DeleteMapping(value="/events/{eventId}")
	public ResponseEntity<?> deleteEvent(@PathVariable int eventId)
	{
		try {
			eventsService.deleteEvent(eventId);
			return new ResponseEntity(new EventsResponse("Event is deleted Successfully"),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(new EventsResponse("Something Went wrong"),HttpStatus.NOT_FOUND);

		}
	}
	
	
	
}
