/* eslint-disable @typescript-eslint/no-explicit-any */

// --- Student Related Interfaces ---
export type studentId = number | string;


export interface IStudent {
  studentID: number | string;
  nameEn: string;
  email: string;
  year: string;
  semester: string;
  gpa?: string | number;
  completedHours?: string | number;
}

// --- Course Related Interfaces ---
export interface ICourse {
  courseID: string;
  courseName: string;
  credits: number;
  status: string;
}

// --- API Responses ---
export interface IDashboardStats {
  students: number;
  professors: number;
  courses: number;
}

export interface IRecentStudentResponse {
  recentStudentsData: IStudent[];
}

// --- Generic API Response (For Add/Delete/Edit) ---
export interface IApiResponse {
  success: boolean;
  message?: string;
}

export interface IInfoFieldProps {
  label: string;
  value: string | number | undefined | null; 
  isGpa?: boolean;
}

export interface Column<T> {
  id: keyof T;   
  label: string; 
}

export interface IDetailsLayoutProps<T extends Record<string, any>> {
  title?: string;
  isAdmin: boolean;
  tableTitle: string;
  tableData: T[];         
  PageName: string;
  tableColumns: Column<T>[]; 
  onEdit?: () => void;
  children?: React.ReactNode;
}