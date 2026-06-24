/* eslint-disable @typescript-eslint/no-unused-vars */

import axiosInstance from "../AxiosInstance";
import {
  type ICourse,
  type IApiResponse,
  type IFullCourseProfile,
  type IAddCourse,
} from "../../Modules/Shared/Interfaces";

// Courses.ts (API file)
// Courses.ts (API file)
export const addCourse = async (courseData: IAddCourse): Promise<IApiResponse & { message?: string }> => {
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
    return { success: response.status === 200 || response.status === 201 };
  } catch (error: unknown) {
    console.error("Add Course Error Details:", error);

    let serverMessage = "";
    if (typeof error === "object" && error !== null && "response" in error) {
      const errData = (error as { response?: { data?: unknown } }).response?.data;
      if (typeof errData === "string") {
        serverMessage = errData;
      } else if (
        errData &&
        typeof errData === "object" &&
        "message" in errData &&
        typeof errData.message === "string"
      ) {
        serverMessage = errData.message;
      }
    }

    return { success: false, message: serverMessage };
  }
};

export const deleteCourse = async (
  courseId: string | number,
): Promise<IApiResponse & { message?: string }> => {
  try {
    await axiosInstance.delete(`Admin/delete-course/${courseId}`);
    return { success: true };
  } catch (error: unknown) {
    console.error("Delete Course API Error:", error);

    let serverMessage = "";
    if (typeof error === "object" && error !== null && "response" in error) {
      const errData = (error as { response?: { data?: unknown } }).response?.data;
      if (typeof errData === "string") {
        serverMessage = errData;
      } else if (
        errData &&
        typeof errData === "object" &&
        "message" in errData &&
        typeof errData.message === "string"
      ) {
        serverMessage = errData.message;
      }
    }

    return { success: false, message: serverMessage };
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
  updatedData: Partial<ICourse> 
): Promise<IApiResponse> => {
  try {
    const res = await axiosInstance.put(
      `Admin/update-course/${courseId}`, 
      null, 
      {
        params: {
          id: courseId, 
          nameAr: updatedData.courseNameAr || "", 
          nameEn: updatedData.courseNameEn, 
          hours: Number(updatedData.creditHours), 
          level: Number(updatedData.level),       
          semester: Number(updatedData.semester), 
          courseType: updatedData.courseType || "" 
        },
      }
    );
    return { success: res.status === 200 || res.data?.success };
  } catch (error) {
    console.error("Update Course API Error:", error);
    return { success: false };
  }
};
// إضافة دالة لحذف تسجيل طالب في مادة
export const dropStudentRegistration = async (
  studentId: number,
  courseId: string
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.delete(`Admin/drop-student-registration`, {
      params: { studentId, courseId },
    });
    return { success: response.status === 200 };
  } catch (error: unknown) {
    console.error("Drop Registration Error:", error);

    let serverMessage = "Failed to drop registration";
    const errData = typeof error === "object" && error !== null ? (error as { response?: { data?: unknown } }).response?.data : undefined;
    if (
      errData &&
      typeof errData === "object" &&
      "message" in errData &&
      typeof (errData as { message?: unknown }).message === "string"
    ) {
      serverMessage = (errData as { message: string }).message;
    }

    return {
      success: false,
      message: serverMessage,
    };
  }
};

// إضافة دالة لتحديث حالة تسجيل طالب
export const updateRegistrationStatus = async (
  studentId: number,
  courseId: string,
  newStatus: string
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.patch(`Admin/update-registration-status`, null, {
      params: { studentId, courseId, newStatus },
    });
    return { success: response.status === 200 };
  } catch (error: unknown) {
    console.error("Update Status Error:", error);

    let message = "Failed to update status";
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const errData = (error as { response?: { data?: unknown } }).response?.data;
      if (
        errData &&
        typeof errData === "object" &&
        "message" in errData &&
        typeof (errData as { message?: unknown }).message === "string"
      ) {
        message = (errData as { message: string }).message;
      }
    }

    return {
      success: false,
      message,
    };
  }
};