/* eslint-disable @typescript-eslint/no-explicit-any */

// --- Student Related Interfaces ---
export type studentId = number | string;
export type CourseId = string | number;

export interface IStudent {
  studentID: number | string;
  nameEn: string;
  email: string;
  year: string;
  semester: string;
  gpa?: string | number;
  completedHours?: string | number;
}
export interface IFullStudentProfile {
  student: IStudent;
  courses: ICourse[];
}
export interface IFullCourseProfile {
courseID:string;
courseNameEn:string;
creditHours:number;
  students: {
    studentID: string | number;
    studentName: string;
    status: string;
  }[];
}

// --- Course Related Interfaces ---
export interface ICourse {
  courseID: string;
  courseNameEn: string;
  creditHours: number;
  semester?: string;
  level?: string;
  courseType?: string;
}

// --- API Responses ---
export interface IDashboardStats {
  totalStudents: number,
    totalInstructors: number,
    totalCourses: number,
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
export interface IInstructorCourse {
  courseID: string;
  courseName: string;
  studentsCount: number;
}

export interface IInstructor {
  instructorID: number;
  nameEn: string;
  email: string;
  totalCourses: number;
  coursesList: IInstructorCourse[]; 
}
// Schedual
export interface ISchedule {
  courseName: string;
  courseID: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  courseLevel: number;
  courseSemester: number;
}
export interface IGrades {
  studentID: string | number;
  studentName: string;
  courseID: string;
  courseName: string;
  courseLevel: number;
  courseSemester: number;
  letterGrade: string;
  numericGrade: number;
  midterm: number;
  final: number;
}
