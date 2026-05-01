/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../AxiosInstance"; 
import { type IStudent, type ICourse, type IApiResponse,type CourseId , type studentId , type IFullStudentProfile,type IFullCourseProfile} from "../../Modules/Shared/Interfaces";

export const getStudents = async (year?: string, semester?: string): Promise<IStudent[]> => {
  return [
    { studentID: 1, nameEn: "Ramy", email: "ramy@gmail.com", year: "1", semester: " 1", gpa: "3.5", completedHours: "20" },
    { studentID: 2, nameEn: "Alaa", email: "Alaa@gmail.com", year: "1", semester: " 1", gpa: "3.5", completedHours: "20" },
    { studentID: 3, nameEn: "Ragia Farid", email: "Ragia@gmail.com", year: "1", semester: " 1", gpa: "3.5", completedHours: "20" },
  ];
};

export const getStudentProfile = async (studentId: studentId): Promise<IFullStudentProfile> => {
  try {
    const res = await axiosInstance.get(`/student-affairs/student-profile/${studentId}`);
    return res.data; 
  } catch (error) {
    return {
      student: { 
        studentID: "12", 
        nameEn: "Fatma Mohammed", 
        email: "fatima@stu.com", 
        year: "3rd Year",
        semester: "Semester 2",
        gpa: "3.9",
        completedHours: 78,
      },
      courses: [
        { courseID: "CSC301", courseNameEn: "Algorithms", creditHours: 4 ,semester: "Semester 2", level: "300", courseType: "Core"},
        { courseID: "CSC305", courseNameEn: "Database System", creditHours: 3,semester: "Semester 2", level: "300", courseType: "Core" }
      ]
    };
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
    const res = await axiosInstance.get(`/student-affairs/export-level-sheet-csv`, {
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