/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../AxiosInstance"; 
import { type IStudent, type ICourse, type IApiResponse, type studentId } from "../../Modules/Shared/Interfaces";

export const getStudents = async (year?: string, semester?: string): Promise<IStudent[]> => {
  return [
    { studentID: 1, nameEn: "Ramy", email: "ramy@gmail.com", year: "1", semester: "Semester 1", gpa: "3.5", completedHours: "20" },
    { studentID: 2, nameEn: "Alaa", email: "Alaa@gmail.com", year: "1", semester: "Semester 1", gpa: "3.5", completedHours: "20" },
    { studentID: 3, nameEn: "Ragia Farid", email: "Ragia@gmail.com", year: "1", semester: "Semester 1", gpa: "3.5", completedHours: "20" },
  ];
};

export const getStudentById = async (studentId: studentId): Promise<IStudent> => {
  try {
    const res = await axiosInstance.get(`/student-affairs/get-student/${studentId}`);
    return res.data;
  } catch (error) {
    return { 
      studentID: "12", 
      nameEn: "Fatma Mohammed", 
      email: "fatima@stu.com", 
      year: "3rd Year",
      semester: "Semester 2",
      gpa: "3.9",
      completedHours: 78,
    };
  }
};

export const getStudentCourses = async (studentId: studentId): Promise<ICourse[]> => {
  try {
    const res = await axiosInstance.get(`/student-affairs/course-enrollments/${studentId}`);
    return res.data;
  } catch (error) {
    return [
      { courseID: "CSC301", courseName: "Algorithms", credits: 4, status: "Enrolled" },
      { courseID: "CSC305", courseName: "Database System", credits: 3, status: "Enrolled" }
    ];
  }
};

export const deleteStudent = async (studentId: studentId): Promise<IApiResponse> => {
  console.log("Deleting student:", studentId);
  return { success: true }; 
};

export const addStudent = async (studentData: Partial<IStudent>): Promise<IApiResponse> => {
  console.log("Adding student data:", studentData);
  return { success: true }; 
};