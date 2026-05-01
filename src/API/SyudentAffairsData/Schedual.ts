/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../AxiosInstance"; 
import { type IApiResponse, type ISchedule } from "../../Modules/Shared/Interfaces";





export const getSchedules = async (courseLevel?: string, courseSemester?: string): Promise<ISchedule[]> => {
  try {
    const res = await axiosInstance.get(`student-affairs/view-schedules`, {
        params: { 
        level: courseLevel || undefined, 
        semester: courseSemester || undefined 

      }
    });
    return res.data; 
  } catch (error) {
    return [
    {
        "courseName": "التصميم الرقمي والمنطقي ١",
        "courseID": "ENG 141",
        "day": "Monday",
        "startTime": "08:00:00",
        "endTime": "10:00:00",
        "room": "Room 404",
        "courseLevel": 1,
        "courseSemester": 1
    }
]
  }
};


export const deleteSchedule = async (courseId: string|number): Promise<IApiResponse> => {
  console.log("Deleting schedule for course:", courseId);
  // const res = await axiosInstance.delete(`/student-affairs/delete-schedule/${courseId}`);
  return { success: true }; 
};


export const addSchedule = async (scheduleData: Partial<ISchedule>): Promise<IApiResponse> => {
  console.log("Adding new schedule:", scheduleData);
  // const res = await axiosInstance.post(`/student-affairs/add-schedule`, scheduleData);
  return { success: true }; 
};
