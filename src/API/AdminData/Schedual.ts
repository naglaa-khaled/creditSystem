import axiosInstance from "../AxiosInstance"; 
import { type IApiResponse, type ISchedule } from "../../Modules/Shared/Interfaces";






export const getSchedules = async (courseLevel?: string, courseSemester?: string): Promise<ISchedule[]> => {
  try {
    const res = await axiosInstance.get(`Admin/all-course-offerings`, {
      params: { 
        level: courseLevel || undefined, 
        semester: courseSemester || undefined 
      }
    });
    return res.data; 
  } catch (error) {
    console.error("Error fetching schedules from server:", error);
    return [];
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
