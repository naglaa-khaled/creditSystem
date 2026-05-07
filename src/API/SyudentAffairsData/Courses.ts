/* eslint-disable @typescript-eslint/no-unused-vars */

import axiosInstance from "../AxiosInstance"; 
import {  type ICourse, type IApiResponse,  type IFullCourseProfile} from "../../Modules/Shared/Interfaces";



export const addCourse = async (courseData: Partial<ICourse>): Promise<IApiResponse> => {
  try {
    await axiosInstance.post(`/student-affairs/courses/`, courseData);
    return { success: true };
  } catch (error) {
    console.log("Mock Add Course:", courseData);
    return { success: true }; 
  }
};

export const deleteCourse = async (courseId: string | number): Promise<IApiResponse> => {
  try {
    await axiosInstance.delete(`/student-affairs/courses/${courseId}`);
    return { success: true };
  } catch (error) {
    console.log("Mock Delete Course ID:", courseId);
    return { success: true }; 
  }
};
export const getCourseProfile = async (courseId: string | number): Promise<IFullCourseProfile> => {
  try {
    const res = await axiosInstance.get(`student-affairs/course-enrollments/${courseId}`);
    return res.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getCourses = async (year?: string, semester?: string): Promise<ICourse[]> => {
  try {
    const res = await axiosInstance.get(`student-affairs/view-courses`, {
      params: { 
        level: year || undefined, 
        semester: semester || undefined 
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};
export const updateCourse = async (courseId: string | number, updatedData: Partial<ICourse>): Promise<IApiResponse> => {
  try {
    // const res = await axiosInstance.put(`/student-affairs/courses/${courseId}`, updatedData);
    console.log("Saving to Backend:", courseId, updatedData);
    return { success: true }; 
  } catch (error) {
    return { success: false };
  }
};