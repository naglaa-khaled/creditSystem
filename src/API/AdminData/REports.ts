

import { type IReports } from "../../Modules/Shared/Interfaces";
import axiosInstance from "../AxiosInstance";

export const getDashboardStats = async ():Promise<IReports> => {


  const res = await axiosInstance.get("Reports/dashboard-analytics");
  return res.data;
};


