package com.backend.fullProject.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.fullProject.dto.MRDto;
import com.backend.fullProject.entity.MeetingRoom;
import com.backend.fullProject.model.MRResponse;
import com.backend.fullProject.service.MRService;

@RestController
@RequestMapping(value="/api")
public class MeetingRoomController {
	
	@Autowired
	private MRService mrService;
	
	@GetMapping(value="/meeting-room")
	public ResponseEntity<?> getAll(){
		List<MRDto> mrDtos=new ArrayList<MRDto>();
		List<MeetingRoom> meetingRooms=new ArrayList<MeetingRoom>();
		try {
			meetingRooms=mrService.getAll();
			for(int i=0;i<meetingRooms.size();i++) {
				mrDtos.add(new MRDto(meetingRooms.get(i)));
				
			}
			return new ResponseEntity (new MRResponse("all meeting rooms retrived successfully", mrDtos),HttpStatus.OK);
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity (new MRResponse("something Went wrong", mrDtos),HttpStatus.NOT_FOUND);

		}
	}
	
	@PostMapping(value="/meeting-room")
	public ResponseEntity<?> addMeetingRoom(@RequestBody MRDto newMR){
		//int empId=newMR.getEmployeeId();
		List<Integer> empIds=new ArrayList<Integer>();
		String officeName=newMR.getOfficeName();
		empIds=newMR.getEmployeeId();
		List<MRDto> meetingRoomsDto=new ArrayList<MRDto>();
		MeetingRoom savedMeetingRoom=new MeetingRoom();

		MeetingRoom meetingRoom=new MeetingRoom();
		
		meetingRoom.setId(0);
		meetingRoom.setFloor(newMR.getFloor());
		meetingRoom.setStatus(newMR.getStatus());
		try {
			savedMeetingRoom=mrService.addMeetingRoom(empIds, officeName, meetingRoom);
			System.out.println("******* "+savedMeetingRoom.toString());
			meetingRoomsDto.add(new MRDto(savedMeetingRoom));
			return new ResponseEntity (new MRResponse("meeting rooms added successfully", meetingRoomsDto),HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity (new MRResponse("something Went wrong", meetingRoomsDto),HttpStatus.NOT_FOUND);

		}
		
		
	}
	
	@PutMapping(value="/meeting-room/setStatus")
	public ResponseEntity<?> updateMeetingRoom(@RequestBody MRDto meetingRoomDto){
	
		 MeetingRoom savedMeetingRoom=new MeetingRoom();
		 List<MRDto> meetingRooms=new ArrayList<MRDto>();		 
		 try {
			 MeetingRoom meetingRoom=mrService.getById(meetingRoomDto.getId());
			 meetingRoom.setStatus(meetingRoomDto.getStatus());

			savedMeetingRoom=mrService.updateMeetingRoom(meetingRoom);
			meetingRooms.add(new MRDto(meetingRoom));
			return new ResponseEntity (new MRResponse("meeting room updated successfully", meetingRooms),HttpStatus.OK);
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				return new ResponseEntity (new MRResponse("something Went wrong", meetingRooms),HttpStatus.NOT_FOUND);

			}
		
	}


}
