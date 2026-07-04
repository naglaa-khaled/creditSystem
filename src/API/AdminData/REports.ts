
import { type IReports } from "../../Modules/Shared/Interfaces";
import axiosInstance from "../AxiosInstance";
import { type IApiResponse } from "../../Modules/Shared/Interfaces";

export const getDashboardStats = async ():Promise<IReports> => {


  const res = await axiosInstance.get("Reports/dashboard-analytics");
  return res.data;
};

// دالة لجلب جميع إعدادات النظام الحالية
export const getSystemSettings = async () => {
  try {
    const res = await axiosInstance.get("Admin/system-settings");
    return res.data; // ستعيد { id, isRegistrationOpen, currentSemester, currentAcademicYear }
  } catch (error) {
    console.error("Error fetching system settings:", error);
    throw error;
  }
};

export const toggleRegistration = async (isOpen: boolean): Promise<IApiResponse> => {
  try {
    const response = await axiosInstance.patch(`Admin/toggle-registration`, null, {
      params: { isOpen },
    });
    
    return { 
      success: response.status === 200, 
      message: response.data?.message || "Registration status updated successfully" 
    };
  } catch (error) {
    console.error("Error toggling registration:", error);
    return { 
      success: false, 
      message: "Failed to toggle registration" 
    };
  }
};
export const getRegistrationStatus = async () => {
  const res = await axiosInstance.get("admin/system-settings"); 
  return res.data.isRegistrationOpen; 
};
// أضيفي هذه الدالة في نفس ملف الـ API الذي يحتوي على toggleRegistration
export const updateSystemSettings = async (settings: { 
  academicYear: string, 
  semester: string, 
  isRegistrationOpen: boolean 
}): Promise<IApiResponse> => {
  try {
    // بناءً على الـ Swagger، نستخدم PUT لإرسال البيانات
    const response = await axiosInstance.put(`Admin/update-system-settings`, null, {
      params: { 
        academicYear: settings.academicYear,
        semester: settings.semester,
        isRegistrationOpen: settings.isRegistrationOpen 
      },
    });

    return { 
      success: response.status === 200, 
      message: response.data?.message || "System settings updated successfully" 
    };
  } catch (error) {
    console.error("Error updating system settings:", error);
    return { 
      success: false, 
      message: "Failed to update system settings" 
    };
  }
};