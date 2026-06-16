/* eslint-disable @typescript-eslint/no-unused-vars */

import axiosInstance from "../AxiosInstance";
import {
  type ICourse,
  type IApiResponse,
  type IFullCourseProfile,
  type IAddCourse,
} from "../../Modules/Shared/Interfaces";

// Courses.ts (API file)
export const addCourse = async (courseData: IAddCourse): Promise<IApiResponse> => {
  try {
    const response = await axiosInstance.post(`Admin/add-course`, null, {
      params: {
        courseId: courseData.courseId,
        nameAr: courseData.nameAr,
        nameEn: courseData.nameEn,
        hours: courseData.hours,
        level: courseData.level,
        semester: courseData.semester,
        courseType: courseData.courseType
      },
    });
    return { success: response.status === 200 };
  } catch (error) {
    console.error("Add Course Error Details:", error);
    return { success: false };
  }
};

export const deleteCourse = async (
  courseId: string | number,
): Promise<IApiResponse> => {
  try {
    await axiosInstance.delete(`Admin/delete-course/${courseId}`);
    return { success: true };
  } catch (error) {
    console.log("Mock Delete Course ID:", courseId);
    return { success: true };
  }
};
export const getCourseProfile = async (courseId: string | number): Promise<IFullCourseProfile> => {
  try {
    const res = await axiosInstance.get(`admin/course-enrollments/${courseId}`);
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
    const res = await axiosInstance.get(`Admin/view-courses`, {
      params: {
        level: year || undefined,
        semester: semester || undefined,
      },
    });
    return res.data;
  } catch (error) {
    return [
      {
        courseID: "CSC301",
        courseNameEn: "Algorithms",
        creditHours: 4,
        semester: 2,
        level: 3,
        courseType: "Core",
      },
      {
        courseID: "CSC305",
        courseNameEn: "Database System",
        creditHours: 3,
        semester: 3,
        level: 4,
        courseType: "Core",
      },
      
     
      
      
    ];
  }
};
export const updateCourse = async (
  courseId: string | number,
  updatedData: Partial<ICourse>,
): Promise<IApiResponse> => {
  try {
    const res = await axiosInstance.put(
      `Admin/update-course/${courseId}`,
      updatedData,
    );
    return res.data;
  } catch (error) {
    return { success: false };
  }
};
