

import {type IDashboardStats, type IRecentStudentResponse } from "../../Modules/Shared/Interfaces";
import axiosInstance from "../AxiosInstance";
// import axiosInstance from "../AxiosInstance";

export const getDashboardStats = async ():Promise<IDashboardStats> => {


  const res = await axiosInstance.get("student-affairs/dashboard-stats");
  return res.data;
};
export const getRecentStudent = async (): Promise<IRecentStudentResponse> => {
  try {
    const res = await axiosInstance.get("Reports/recent-students");
    
    if (res.data) {
      return res.data;
    }

    return {
      recentStudentsData: [
        { studentID: 1, fullName: "Ramy", email: "ramy@gmail.com", year: "1", semester: "Semester 1" },
        { studentID: 2, fullName: "Alaa", email: "alaa@gmail.com", year: "1", semester: "Semester 1" },
        { studentID: 3, fullName: "Ragia Farid", email: "ragia@gmail.com", year: "1", semester: "Semester 1" },
      ],
    };
  } catch (error) {
    console.error("Error fetching recent students:", error);
    throw error; 
  }
};

