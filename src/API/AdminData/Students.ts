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
  console.log("Deleting student:", studentId);
  return { success: true }; 
};

export const addStudent = async (studentData: Partial<IStudent>): Promise<IApiResponse> => {
  console.log("Adding student data:", studentData);
  return { success: true }; 
};

export const exportLevelStudents = async (level: string) => {
  try {
    const res = await axiosInstance.get(`admin/export-level-sheet-csv`, {
      params: { level }, 
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Students_Level_${level}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error exporting level students:", error);
    throw error;
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
