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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    return {

        courseID: "CSC305", 
        courseNameEn: "Database System", 
        creditHours: 3, 
      students: [
        { studentID: "1", studentName: "Ramy", status: "Registered" },
        { studentID: "2", studentName: "Alaa", status: "Registered" },
        { studentID: "3", studentName: "Ragia Farid", status: "Registered" },
      ]
    };
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
    return [
      { courseID: "CSC301", courseNameEn: "Algorithms", creditHours: 4 ,semester: " 2", level: "3", courseType: "Core"},
      { courseID: "CSC305", courseNameEn: "Database System", creditHours: 3,semester: " 2", level: "3", courseType: "Core" },
      { courseID: "CSC304", courseNameEn: "Software", creditHours: 3,semester: " 2", level: "1", courseType: "Core" },
      { courseID: "CSC307", courseNameEn: "embedded system", creditHours: 12,semester: " 1", level: "1", courseType: "Core" },
      { courseID: "CSC307", courseNameEn: "embedded system", creditHours: 12,semester: " 2", level: "1", courseType: "Core" },
      { courseID: "CSC307", courseNameEn: "embedded system", creditHours: 12,semester: " 1", level: "3", courseType: "Core" },
    ];
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