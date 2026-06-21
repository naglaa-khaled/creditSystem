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
type AxiosErrorLike = {
  response?: {
    data?: unknown;
  };
};

const getServerErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const err = error as AxiosErrorLike;
    const data = err.response?.data;
    if (typeof data === "string") return data;
    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
    ) {
      return (data as { message?: string }).message ?? "";
    }
  }
  return "";
};

export const addInstructor = async (
  instructorData: Partial<IInstructor>,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const res = await axiosInstance.post(`Admin/add-instructor`, instructorData);
    return { success: res.status === 200 || res.status === 201 };
  } catch (error: unknown) {
    console.error("Add Instructor API Error:", error);

    const serverMessage = getServerErrorMessage(error);

    return { success: false, message: serverMessage };
  }
};

export const updateInstructor = async (
  id: string | number,
  updatedData: Partial<IInstructor>,
): Promise<IApiResponse & { message?: string }> => {
  try {
    const res = await axiosInstance.put(`Admin/update-instructor/${id}`, updatedData);
    return { success: res.status === 200 || res.status === 204 };
  } catch (error: unknown) {
    console.error("Update Instructor API Error:", error);

    const serverMessage = getServerErrorMessage(error);

    return { success: false, message: serverMessage };
  }
};
export const deleteInstructor = async (instructorId: string | number) => {
  try {
    const numericId = Number(instructorId); 
    const res = await axiosInstance.delete(`Admin/delete-instructor/${numericId}`);
    
    return { status: res.status, success: true }; 
  } catch (error) {
    console.log("Mock Delete Instructor ID:", instructorId);
    throw error; 
  }
};

