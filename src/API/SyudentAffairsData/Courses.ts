/* eslint-disable @typescript-eslint/no-unused-vars */

import axiosInstance from "../AxiosInstance";
import {
  type ICourse,
  type ICoursePrerequisite,
  type IFullCourseProfile,
  type ISchedule,
  type IStudentData,
} from "../../Modules/Shared/Interfaces";

export const getCourseProfile = async (
  courseId: string | number,
): Promise<IFullCourseProfile> => {
  try {
    const res = await axiosInstance.get(
      `student-affairs/course-enrollments/${courseId}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCourses = async (
  year?: string,
  semester?: string,
): Promise<ICourse[]> => {
  try {
    const res = await axiosInstance.get(`student-affairs/view-courses`, {
      params: {
        level: year || undefined,
        semester: semester || undefined,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getPrerequisitesByCourseId = async (
  courseId: string,
): Promise<ICoursePrerequisite[]> => {
  const res = await axiosInstance.get(
    `student-affairs/view-prerequisites/${courseId}`
  );
  return res.data.data;
};
export const getStudentsByOfferingId = async (
  offeringId: number,
): Promise<IStudentData[]> => {
  // داتا وهمية للطلاب
  if (offeringId === 101)
    return [
      {
        studentID: 3,
        studentName: "Mona Saeed",
        email: "mona@gmail.com",
        status: "Registered",
        registrationDate: "9:5:0",
      },
      {
        studentID: 16,
        studentName: "Maryam Emad",
        email: "maryam@gmail.com",
        status: "Registered",
        registrationDate: "9",
      },
    ];
  return [];
};
export const getStudentsInOffering = async (
  offeringId: number,
): Promise<IStudentData[]> => {
  try {
    const res = await axiosInstance.get(
      `student-affairs/get-students-in-offering/${offeringId}`,
    );
    const studentsList = res.data.students || [];
    return studentsList;
  } catch (error) {
    console.error("Error fetching students in offering:", error);
    return [];
  }
};
// export const getOfferingsByCourse = async (courseID: string): Promise<ISchedule[]> => {
//   // داتا وهمية للتجربة فقط
//   return [
//     { id: 101, instructorName: "Ahmed Ali",capacity:2 },
//     { id: 102, instructorName: "Mohamed Hassan",capacity:0  },
//     { id: 103, instructorName: "Sara Mahmoud" ,capacity:0},
//   ] as ISchedule[];
// };
// في ملف API الخاص بك
export const getOfferingsByCourse = async (
  courseID: string,
): Promise<ISchedule[]> => {
  try {
    const res = await axiosInstance.get(
      `student-affairs/course-offerings-by-course/${courseID}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching course offerings:", error);
    return [];
  }
};
