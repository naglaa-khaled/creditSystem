
import axiosInstance from "../AxiosInstance"; 
import {  type ICourse,  type IFullCourseProfile} from "../../Modules/Shared/Interfaces";






export const getCourseProfile = async (courseId: string | number): Promise<IFullCourseProfile> => {
  try {
    const res = await axiosInstance.get(`student-affairs/course-enrollments/${courseId}`);
    return res.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getCourses = async (year?: string, semester?: string): Promise<ICourse[]> => {
  try {
    const res = await axiosInstance.get(`student-affairs/view-courses`, {
      params: { 
        level: year || undefined, 
        semester: semester || undefined 
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};
