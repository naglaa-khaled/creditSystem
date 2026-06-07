import type { IUserProfile } from "../../Modules/Shared/Interfaces";
import axiosInstance from "../AxiosInstance";



export const getLoginProfile = async (): Promise<IUserProfile> => {
  try {
    const res = await axiosInstance.get<IUserProfile>(`Auth/profile-info`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};