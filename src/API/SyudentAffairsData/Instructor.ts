import axiosInstance from "../AxiosInstance";
import { type IApiResponse, type IInstructor } from "../../Modules/Shared/Interfaces";

export const getInstructors = async (): Promise<IInstructor[]> => {
  try {
    const res = await axiosInstance.get(`/student-affairs/instructors`);
    return res.data; 
  } catch (error) {
    console.error("Error fetching all instructors:", error);
    return [
      {
        instructorID: 1,
        name: "Dr. Ahmed Hassan",
        email: "ahmed@univ.edu",
        totalCourses: 2,
        coursesList: [{ courseID: "1", courseName: "Database", studentsCount: 1 }]
      }
    ];
  }
};

export const getInstructorProfile = async (id: string | number): Promise<IInstructor> => {
  try {
    const res = await axiosInstance.get(`/student-affairs/instructors/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching instructor profile:", error);
    return {
        instructorID: Number(id),
        name: "Dr. Mohamed Kamal",
        email: "m.kamal@univ.edu",
        totalCourses: 1,
        coursesList: [{ courseID: "101", courseName: "Math101", studentsCount: 40 }]
    };
  }
};
export const addInstructor = async (instructorData: Partial<IInstructor>): Promise<IApiResponse> => {
  try {
    await axiosInstance.post(`/student-affairs/instructors`, instructorData);
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Mock Add Instructor:", instructorData);
    return { success: true }; 
  }
};
export const deleteInstructor = async (instructorId: string | number): Promise<IApiResponse> => {
  try {
    await axiosInstance.delete(`/student-affairs/instructors/${instructorId}`);
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Mock Delete Instructor ID:", instructorId);
    return { success: true }; 
  }
};
export const updateInstructor = async (id: string | number, updatedData: Partial<IInstructor>): Promise<IApiResponse> => {
  try {
    await axiosInstance.put(`/student-affairs/instructors/${id}`, updatedData);
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Mock Update Instructor:", updatedData);
    return { success: true }; 
  }
};