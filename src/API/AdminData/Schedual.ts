import axiosInstance from "../AxiosInstance";
import {
  type IApiResponse,
  type ISchedule,
} from "../../Modules/Shared/Interfaces";

export const getSchedules = async (
  courseLevel?: string,
  courseSemester?: string,
): Promise<ISchedule[]> => {
  try {
    const res = await axiosInstance.get(`Admin/all-course-offerings`, {
      params: {
        level: courseLevel || undefined,
        semester: courseSemester || undefined,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching schedules from server:", error);
    return [];
  }
};

export const deleteSchedule = async (
  offeringId: string | number,
): Promise<IApiResponse> => {

  const res = await axiosInstance.delete<IApiResponse>(
    `Admin/delete-offering/${offeringId}`,
  );
  return res.data;
};

export const addSchedule = async (
  scheduleData: Partial<ISchedule>,
): Promise<IApiResponse> => {
  const res = await axiosInstance.post<IApiResponse>(
    "Admin/setup-course-offering-and-schedule",
    scheduleData,   // ✅
  );

  return res.data;
};
export const updateSchedule = async (
  offeringId: string | number,
  updatedData: Partial<ISchedule>,
): Promise<IApiResponse> => {
  const res = await axiosInstance.put<IApiResponse>(
    `Admin/update-course-offering-and-schedule/${offeringId}`,
    updatedData,
  );
  return res.data;
};
