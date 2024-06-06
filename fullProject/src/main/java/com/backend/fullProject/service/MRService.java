package com.backend.fullProject.service;

import java.util.List;

import com.backend.fullProject.entity.MeetingRoom;

public interface MRService {
	
	public List<MeetingRoom> getAll()throws Exception;
	public MeetingRoom getById(int id)throws Exception;
	public MeetingRoom addMeetingRoom (List<Integer> empId,String officeName,MeetingRoom newMR)throws Exception;
	public MeetingRoom updateMeetingRoom (MeetingRoom newMR)throws Exception;
	

}
