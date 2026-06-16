/* eslint-disable @typescript-eslint/no-explicit-any */

// --- Student Related Interfaces ---
export type studentId = number | string;
export type CourseId = string | number;
export interface IUserProfile {
  fullName: string;
  email: string;
  role: string;
}

export interface IStudent {
  studentID: number | string;
  nameEn?: string;
  fullName?: string;
  email: string;
  universityEmail?: string;
  year: string;
  semester: string;
  gpa?: string | number;
  completedHours?: string | number;
  academicYear?: string;
}
export interface IFullStudentProfile {
  student: IStudent;
  courses: ICourse[];
}
export interface IFullCourseProfile {
  courseID: string;
  courseName: string;
  creditHours: number;
  level: string;
  semester: string;
  courseType: string;
  students: {
    studentID: string | number;
    studentName: string;
    course: ICourse;
    enrolledStudents: {
      studentID: string | number;
      studentName: string;
      StudentYear: string;

      status: string;
    }[];
  };
}

// --- Course Related Interfaces ---
export interface ICourse {
  [key: string]: any;
  courseID: string;
  courseNameEn: string;
  creditHours: number;
  semester?: number;
  level?: number;
  courseType?: string;
}
export interface IAddCourse {
  courseId: string;
  nameEn: string;
  nameAr?: string;
  hours: number;
  level: number;
  semester: number;
  courseType?: string;
  status?: string;
}

// --- API Responses ---
export interface IDashboardStats {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
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

export interface IDetailsLayoutProps<T> {
  title?: string;
  isAdmin: boolean;
  tableTitle: string;
  tableData: T[];
  PageName: string;
  tableColumns: Column<T>[];
  onEdit?: () => void;
  children?: React.ReactNode;
  noDataMessage?: string;
}
export interface IInstructorCourse {
  courseID: string;
  courseName: string;
  studentsCount: number;
}

export interface IInstructor {
  instructorID: number | string;
  fullName: string;
  email: string;
  totalCourses: number;
  coursesList: IInstructorCourse[];
  nameEn: "Ahmed Ali";
  
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

export interface ICardStats {
  totalStudents: number;
  totalCourses: number;
  avgGrade: number;
  completionRate: number;
}

export interface IStudentDistribution {
  departmentOrLevel: string;
  count: number;
}

export interface ITopCourse {
  courseCode: string;
  courseName: string;
  enrolled: number;
  percentage: number;
}

export interface IProfessorWorkload {
  name: string;
  coursesCount: number;
  studentsCount: number;
}

export interface IReports {
  cards: ICardStats;
  studentDistribution: IStudentDistribution[];
  topCourses: ITopCourse[];
  professorWorkload: IProfessorWorkload[];
}
