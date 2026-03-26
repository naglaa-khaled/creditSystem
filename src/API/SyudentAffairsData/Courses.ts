/* eslint-disable @typescript-eslint/no-unused-vars */

import axiosInstance from "../AxiosInstance"; 
import {  type ICourse, type IApiResponse,  type IFullCourseProfile} from "../../Modules/Shared/Interfaces";



export const addCourse = async (courseData: Partial<ICourse>): Promise<IApiResponse> => {
  try {
    await axiosInstance.post(`/student-affairs/courses`, courseData);
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const res = await axiosInstance.get(`/student-affairs/course-profile/${courseId}`);
    return res.data; 
  } catch (error) {
    return {
      course: { 
        courseID: "CSC305", 
        courseName: "Database System", 
        creditsHours: 3, 
        level: "300",
        courseType: "Core",
        semester: "Semester 2",
        status: "Active"
      },
      enrolledStudents: [
        { studentID: "1", studentName: "Ramy", status: "Registered", StudentYear: "1st" },
        { studentID: "2", studentName: "Alaa", status: "Registered", StudentYear: "2st" },
        { studentID: "3", studentName: "Ragia Farid", status: "Registered", StudentYear: "3st" },
      ]
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCourses = async (year?: string, semester?: string): Promise<ICourse[]> => {
  try {
    const res = await axiosInstance.get(`/student-affairs/courses`);
    return res.data;
  } catch (error) {
    return [
      { courseID: "CSC301", courseName: "Algorithms", creditsHours: 4, status: "Enrolled" ,semester: "Semester 2", level: "300", courseType: "Core"},
      { courseID: "CSC305", courseName: "Database System", creditsHours: 3, status: "Enrolled",semester: "Semester 2", level: "300", courseType: "Core" }
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