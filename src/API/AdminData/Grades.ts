/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../AxiosInstance";
import {
  type IApiResponse,
  type IGrades,
} from "../../Modules/Shared/Interfaces";

export const getGrades = async (
  year?: string,
  semester?: string,
): Promise<IGrades[]> => {
  try {
    const res = await axiosInstance.get(`student-affairs/affairs-view-grades`, {
      params: { year, semester },
    });
    return res.data;
  } catch (error) {
    return [
      {
        studentID: "12345",
        studentName: "example student",
        courseID: "ENG 141",
        courseName: "mathematics",
        courseLevel: 1,
        courseSemester: 2,
        letterGrade: "a",
        numericGrade: 95,
        midterm: 90,
        final: 100,
      },
    ];
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
  GradesData: Partial<IGrades>,
): Promise<IApiResponse> => {
  console.log("Adding new Grades:", GradesData);
  // const res = await axiosInstance.post(`/student-affairs/add-schedule`, scheduleData);
  return { success: true };
};
export const exportCourseGrades = async (courseId: string) => {
  try {
    const res = await axiosInstance.get(`/student-affairs/export-course-csv`, {
      params: { courseId }, 
      responseType: 'blob', 
    });
    
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Grades_${courseId}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error exporting course grades:", error);
    throw error;
  }
};
