import axiosInstance from "../AxiosInstance"; 
import { AxiosError } from "axios";
import { type IUsers } from "../../Modules/Shared/Interfaces";

export const getUsers = async (): Promise<IUsers[]> => {
  try {
    const res = await axiosInstance.get(`Admin/users`);
    return res.data; 
    
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      console.warn("No users found.");
      return [];
    }

    console.error(error);
    throw error;
  }
};

export const addUser = async (userData: Partial<IUsers> ): Promise<IUsers> => {
  console.log("Adding new user:", userData);
  const res = await axiosInstance.post(`Admin/users`, userData);
  return res.data;
};

export const updateUser = async (
  id: string | number, 
  updatedData: Partial<IUsers> 
): Promise<IUsers> => {
  console.log(`Updating user with ID ${id}:`, updatedData);
  const res = await axiosInstance.put(`Admin/users/${id}`, updatedData);
  return res.data;
};

export const deleteUser = async (id: string | number): Promise<IUsers> => {
  console.log(`Deleting user with ID: ${id}`);
  const res = await axiosInstance.delete(`Admin/users/${id}`);
  return res.data;
};