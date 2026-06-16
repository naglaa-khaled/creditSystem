import axiosInstance from "../AxiosInstance";
import {
  type IApiResponse,
  type IInstructor,
} from "../../Modules/Shared/Interfaces";

export const getInstructors = async (): Promise<IInstructor[]> => {
  try {
    const res = await axiosInstance.get(
      `admin/view-instructors-stats`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching all instructors:", error);
    throw error;
  }
};

export const getInstructorProfile = async (
  id: string | number,
): Promise<IInstructor> => {
  try {
    const res = await axiosInstance.get(
      `Admin/instructor-details/${id}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching instructor profile:", error);
    throw error;
  }
};
export const addInstructor = async (
  instructorData: Partial<IInstructor>,
): Promise<IApiResponse> => {
  try {
    await axiosInstance.post(`Admin/add-instructor`, instructorData);
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Mock Add Instructor:", instructorData);
    return { success: true };
  }
};
export const deleteInstructor = async (instructorId: string | number) => {
  try {
    const numericId = Number(instructorId); 
    const res = await axiosInstance.delete(`Admin/delete-instructor/${numericId}`);
    
    // بنرجع الـ status والـ data مع بعض
    return { status: res.status, success: true }; 
  } catch (error) {
    console.log("Mock Delete Instructor ID:", instructorId);
    throw error; // بنعمل throw عشان الـ catch اللي في الشاشة تحس بالأيرور وتوقف الحذف الوهمي
  }
};
export const updateInstructor = async (
  id: string | number,
  updatedData: Partial<IInstructor>,
): Promise<IApiResponse> => {
  try {
    await axiosInstance.put(`Admin/update-instructor/${id}`, updatedData);
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Mock Update Instructor:", updatedData);
    return { success: true };
  }
};
