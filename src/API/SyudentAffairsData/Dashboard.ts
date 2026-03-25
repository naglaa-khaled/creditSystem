

import {type IDashboardStats, type IRecentStudentResponse } from "../../Modules/Shared/Interfaces";
// import axiosInstance from "../AxiosInstance";

export const getDashboardStats = async ():Promise<IDashboardStats> => {

  return {
    students: 50,
    professors: 11,
    courses: 30,
  };
  // const res = await axiosInstance.get("/dashboard-stats");
  // return res.data;
};
export const getResentStudent = async ():Promise<IRecentStudentResponse> => {

  return {
  recentStudentsData : [
    { studentID: 1, nameEn: "Ramy", email: "ramygmail.com", year: "1", semester: "Semester 1" },
    { studentID: 2, nameEn: "Alaa", email: "Alaagmail.com", year: "1", semester: "Semester 1" },
    { studentID: 3, nameEn: "Ragia Farid", email: "Ragia@gmail.com", year: "1", semester: "Semester 1" }, 
  ],
  };
  // const res = await axiosInstance.get("/dashboard-recent-students");
  // return res.data;
};

