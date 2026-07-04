import axiosInstance from "../AxiosInstance"; 
import { AxiosError } from "axios";
import { type IStudent, type IApiResponse , type studentId , type IFullStudentProfile} from "../../Modules/Shared/Interfaces";

export const getStudents = async (year?: string, semester?: string): Promise<IStudent[]> => {
  try {
    const res = await axiosInstance.get(`Admin/view-students-filtered`,{
  params: {
     level: year|| undefined, 
        semester: semester ? parseInt(semester) : undefined
      },
 });
    return res.data;
    
 } catch (error) {
  const axiosError = error as AxiosError;

  if (axiosError.response?.status === 404) {
    console.warn("No students found for the specified filters.");
    return [];
  }

  console.error(error);
  throw error;
}
};
 
export const getStudentProfile = async (studentId: studentId): Promise<IFullStudentProfile> => {
  try {
    const res = await axiosInstance.get(`Admin/student-full-details/${studentId}`);
    return res.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};


export const deleteStudent = async (studentId: studentId): Promise<IApiResponse> => {
  try {
    const res = await axiosInstance.delete(`Admin/delete-student-safely/${studentId}`);
    
    return res.data;
  } catch (error) {
    console.error("Delete student failed:", error);
    throw error;
  }
};
export const addStudent = async (studentData: Partial<IStudent>): Promise<IApiResponse> => {
  console.log("Adding student data:", studentData);
  return { success: true }; 
};
export const exportLevelStudents = async (level: number, semester: number) => {
  try {
    const res = await axiosInstance.get(`admin/export-level-sheet-csv`, {
      params: { 
       level: Number(level),      
        semester: Number(semester)
      }, 
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Students_Level_${level}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      // محاولة استخراج الرسالة من السيرفر
      const serverMessage = error.response.data?.message || error.response.data;
      
      // إذا وجدت رسالة، قم بعرضها (يمكنك استخدام toast هنا)
      console.error("Server Error:", serverMessage);
      
      // إعادة رمي الخطأ ليتمكن المكون (Component) من استلام الرسالة
      throw new Error(typeof serverMessage === 'string' ? serverMessage : "Export failed");
    }
    throw error;
  }
};
export const importLevelStudents = async (
  file: File, 
  level: number, 
  semester: number, 
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post(`Admin/import-full-sheet-csv`, formData, {
      params: { 
        level: `"${level}"`,      // كما هو الحال في الـ Export
        semester: Number(semester),
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
 } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      // 1. استخراج رسالة السيرفر أولاً إذا كانت موجودة
      const serverMessage = error.response.data?.message || error.response.data;
      
      console.error("Server Error:", serverMessage);
      
      throw new Error(typeof serverMessage === 'string' ? serverMessage : "Failed to import file");
    }
    throw new Error("Network error or server unreachable");
  }
};



export const updateStudent = async (studentId: studentId, studentData: Partial<IStudent>): Promise<IApiResponse> => {
  try {
    const res = await axiosInstance.put(`Admin/update-student/${studentId}`, studentData);
    return res.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};
export const updateStudentMaxHours = async (studentId: studentId, hours: number): Promise<IApiResponse> => {
  try {
    const res = await axiosInstance.patch(`Admin/update-student-max-hours/${studentId}`, null, {
      params: {
        hours: hours
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error updating student max hours:", error);
    throw error;
  }
};
export const changeStudentStatus = async (studentId: studentId, newStatus: string): Promise<IApiResponse> => {
  try {
    const res = await axiosInstance.patch(`Admin/change-student-status/${studentId}`, null, {
      params: { newStatus }
    });
    return res.data;
  } catch (error) {
    console.error("Error changing student status:", error);
    throw error;
  }
};
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