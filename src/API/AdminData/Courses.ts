import axiosInstance from "../AxiosInstance";
import {
  type ICourse,
  type IApiResponse,
  type IFullCourseProfile,
  type IAddCourse,
  type ICoursePrerequisite,
  type IStudentData,
  type ISchedule,
} from "../../Modules/Shared/Interfaces";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

const getErrorMessage = (error: unknown, defaultMessage = ""): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | string | undefined;

    if (typeof data === "string") {
      return data;
    }

    return data?.message ?? defaultMessage;
  }

  return defaultMessage;
};

// Courses.ts (API file)
// Courses.ts (API file)
export const addCourse = async (
  courseData: IAddCourse,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.post(`Admin/add-course`, null, {
      params: {
        courseId: courseData.courseId,
        nameAr: courseData.nameAr,
        nameEn: courseData.nameEn,
        hours: courseData.hours,
        level: courseData.level,
        semester: courseData.semester,
        courseType: courseData.courseType,
        CourseCategory: courseData.CourseCategory,
      },
    });
    return { success: response.status === 200 || response.status === 201 };
  } catch (error: unknown) {
    console.error("Add Course Error Details:", error);

    let serverMessage = "";
    if (typeof error === "object" && error !== null && "response" in error) {
      const errData = (error as { response?: { data?: unknown } }).response
        ?.data;
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
      const errData = (error as { response?: { data?: unknown } }).response
        ?.data;
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
export const getCourseProfile = async (
  courseId: string | number,
): Promise<IFullCourseProfile> => {
  try {
    const res = await axiosInstance.get(`admin/course-enrollments/${courseId}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPrerequisitesByCourseId = async (
  courseId: string,
): Promise<ICoursePrerequisite[]> => {
  try {
    const res = await axiosInstance.get(`Admin/view-prerequisites/${courseId}`);

    return res.data.data || [];
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      console.warn(`No prerequisites found for course: ${courseId}`);
      return [];
    }
    console.error("Failed to fetch prerequisites:", error);
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
    console.error("Get Courses Error:", error);
    return [];
  }
};
export const updateCourse = async (
  courseId: string | number,
  updatedData: Partial<ICourse>,
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
          courseType: updatedData.courseType || "",
          CourseCategory:
            updatedData.CourseCategory ?? updatedData.courseCategory ?? "",
        },
      },
    );
    return { success: res.status === 200 || res.data?.success };
  } catch (error) {
    console.error("Update Course API Error:", error);
    return { success: false };
  }
};
// في ملف API الخاص بك
export const getOfferingsByCourse = async (
  courseID: string,
): Promise<ISchedule[]> => {
  try {
    const res = await axiosInstance.get(
      `Admin/course-offerings-by-course/${courseID}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching course offerings:", error);
    return [];
  }
};
export const setupCourseOfferingAndSchedule = async (
  scheduleData: Partial<ISchedule>,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.post(
      `Admin/setup-course-offering-and-schedule`,
      scheduleData,
    );
    return { success: response.status === 200 || response.status === 201 };
  } catch (error: unknown) {
    console.error("Error setting up course schedule:", error);

    let serverMessage = "Failed to setup course offering";
    if (typeof error === "object" && error !== null && "response" in error) {
      const errData = (error as { response?: { data?: unknown } }).response
        ?.data;
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

export const getStudentsInOffering = async (
  offeringId: number,
): Promise<IStudentData[]> => {
  try {
    const res = await axiosInstance.get(
      `Admin/get-students-in-offering/${offeringId}`,
    );
    const studentsList = res.data.students || [];
    return studentsList;
  } catch (error) {
    console.error("Error fetching students in offering:", error);
    return [];
  }
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

export const adminManualRegistration = async (
  studentId: number,
  offeringId: number,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.post(
      `Admin/admin-manual-registration`,
      null,
      {
        params: { studentId, offeringId },
      },
    );
    return { success: response.status === 200 || response.status === 201 };
  } catch (error: unknown) {
    let serverMessage = "Failed to register";
    if (typeof error === "object" && error !== null && "response" in error) {
      const errData = (error as { response?: { data?: unknown } }).response
        ?.data;
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

export const updateRegistrationStatus = async (
  studentId: number | string,
  offeringId: number,
  newStatus: string,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.patch(
      `Admin/update-registration-status`,
      null,
      {
        params: { studentId, offeringId, newStatus },
      },
    );
    return { success: response.status === 200 };
  } catch (error: unknown) {
    let serverMessage = "Failed to update status";
    if (typeof error === "object" && error !== null && "response" in error) {
      const errData = (error as { response?: { data?: unknown } }).response
        ?.data;
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

export const dropStudentRegistration = async (
  studentId: number,
  offeringId: number,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.delete(
      `Admin/drop-student-registration`,
      {
        params: { studentId, offeringId },
      },
    );
    return { success: response.status === 200 };
  } catch (error: unknown) {
    let serverMessage = "Failed to drop";
    if (typeof error === "object" && error !== null && "response" in error) {
      const errData = (error as { response?: { data?: unknown } }).response
        ?.data;
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
export const deleteOffering = async (
  offeringId: number,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const response = await axiosInstance.delete(
      `Admin/delete-offering/${offeringId}`,
    );
    return { success: response.status === 200 };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to delete offering"), // استخدام الدالة الموحدة
    };
  }
};
export const addPrerequist = async (
  courseId: string,
  prerequisiteCourseID: string,
): Promise<IApiResponse> => {
  try {
    const response = await axiosInstance.post(
      "Admin/set-course-prerequisite",
      null,
      {
        params: {
          courseId,
          PrerequisiteCourseID: prerequisiteCourseID,
        },
      },
    );

    return {
      success: response.status === 200 || response.status === 201,
      message: response.data?.message,
    };
  } catch (error: unknown) {
    console.error("Add Prerequisite Error:", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
// في ملف API/AdminData/Courses.ts

export const removePrerequisite = async (
  courseId: string,
  prerequisiteCourseID: string // إضافة المعامل الثاني
): Promise<IApiResponse> => {
  try {
    // تعديل المسار ليتطابق مع الـ Swagger: /api/Admin/remove-prerequisite/{courseId}/{PrerequisiteCourseID}
    const response = await axiosInstance.delete<ErrorResponse>(
      `Admin/remove-prerequisite/${courseId}/${prerequisiteCourseID}`,
    );

    return {
      success: response.status === 200,
      message: response.data?.message,
    };
  } catch (error: unknown) {
    console.error("Remove Prerequisite Error:", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};