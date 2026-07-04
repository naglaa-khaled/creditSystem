import axiosInstance from "../AxiosInstance";
import {
  type IApiResponse,
  type IGradeRow,
  type IPreviewResponse,
  type IPreviewStudent,  
} from "../../Modules/Shared/Interfaces";
export const importGrades = async (
  file: File,
  courseId: string,
  level: string,
  academicYear: string | number,
  semester: string | number
): Promise<IApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post("Admin/import-grades-csv", formData, {
      params: {
        courseId,
        level,
        academicYear: Number(academicYear),
        semester: Number(semester),
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: typeof error.response?.data === "string" 
          ? error.response.data 
          : "Failed to import grades",
      };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};

export const getGrades = async (
  academicYear?: string,
  semester?: string,
  level?: string,
): Promise<IPreviewStudent[]> => {
  const res = await axiosInstance.get<IPreviewResponse>(
    "Admin/preview-semester-results",
    {
      params: {
        academicYear,
        semester,
        level,
      },
    }
  );

  return res.data.data;
};
import axios from "axios";
export const getStudentGrades = async (
  studentId: string | number,
  academicYear?: string | number,
  semester?: string | number
) => {
  const res = await axiosInstance.get(`admin/student-grades/${studentId}`, {
    params: {
      academicYear,
      semester,
    },
  });
  return res.data;
};

// 2. البحث عن درجات كورس معين بالـ courseId
export const getCourseGrades = async (
  courseId: string,
  academicYear?: string | number,
  semester?: string | number
) => {
  const res = await axiosInstance.get(`admin/course-grades/${courseId}`, {
    params: {
      academicYear,
      semester,
    },
  });
  return res.data;
};

export const publishSemesterResults = async (
  academicYear: string | number,
  semester: string | number,
  level: string
): Promise<IApiResponse> => {
  try {
    const res = await axiosInstance.post(
      "Admin/publish-semester-results",
      null,
      {
        params: {
          academicYear,
          semester,
          level,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Failed to publish results",
      };
    }

    return {
      success: false,
      message: "Failed to publish results",
    };
  }
};
export const deleteGrades = async (
  courseId: string | number,
): Promise<IApiResponse> => {
  console.log("Deleting Grades :", courseId);
  // const res = await axiosInstance.delete(`/student-affairs/delete-schedule/${courseId}`);
  return { success: true };
};

export const addGrades = async (
  GradesData: Partial<IGradeRow>,
): Promise<IApiResponse> => {
  console.log("Adding new Grades:", GradesData);
  // const res = await axiosInstance.post(`/student-affairs/add-schedule`, scheduleData);
  return { success: true };
};
export const exportCourseGrades = async (
  CourseID: string,
  semester: string | number,
  academicYear: string | number,
) => {
  try {
    const res = await axiosInstance.get(
      "student-affairs/export-course-grades-csv", // تم تحديث المسار بناءً على الـ Swagger
      {
        params: {
          CourseID: CourseID, // تأكدي من تطابق الاسم مع ما يتوقعه الـ API
          academicYear: Number(academicYear),
          semester: Number(semester),
        },
        responseType: "blob",
        validateStatus: (status) => status < 500,
      },
    );

    if (res.status >= 400) {
      const errorMessage =
        res.data instanceof Blob
          ? await res.data.text()
          : typeof res.data === "string"
            ? res.data
            : "Export failed";
      throw new Error(errorMessage || "Export failed");
    }

    // إنشاء ملف التحميل
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Grades_${CourseID.trim()}_Sem${semester}_${academicYear}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred during export");
  }
};
