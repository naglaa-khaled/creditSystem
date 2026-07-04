/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Column<T> {
  id: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}
  export interface IPublishFormData {
  level: string;
  semester: string;
  academicYear: string;
}
export interface IImportFormData {
  courseId: string;
  level: string;
  academicYear: string;
  semester: string;
  file: File; // التأكد أن الملف من نوع File
}

export interface IPublishFormData {
  level: string;
  semester: string;
  academicYear: string;
}

export interface ISearchFormData {
  searchValue: string;
  academicYear: string;
  semester: string;
  level: string;
}

export interface IExportFormData {
  courseID: string;
  academicYear: string;
  semester: string;
}
// --- Student Related Interfaces ---
export type studentId = number | string;
export type CourseId = string | number;
export interface IUserProfile {
  fullName: string;
  email: string;
  role: string;
}
// في ملف الواجهات
export interface IStudentData {
  studentID: number;
  studentName: string;
  email: string;
  status: string;
  registrationDate: string;
}

export interface IStudentInOffering {
  courseName: string;
  instructorName: string;
  semester: number;
  year: number;
  students: IStudentData[]; // هنا استخدمنا النوع الذي عرفناه للتو
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
  status?: string;
  maxAllowedHours:number
}
export interface IFullStudentProfile {
  student: IStudent;
  courses: ICourse[];
}
export interface IEnrolledStudent {
  studentID: string | number;
  studentName: string;
  status: string;
  email:string;
  registrationDate:string;
  
}
export type CourseCategoryType = "UR" | "ENG" | "ISE" | "VIS" | "NLP" | "CNS" | "ROB";
export interface IFullCourseProfile {
  courseID: string;
  courseName: string;
  courseNameEn: string;
  creditHours: number;
  level: string;
  semester: string;
  courseType: string;
  courseCategory:CourseCategoryType;
  students: {
    studentID: string | number;
    studentName: string;
    status: string;
  }[];
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
export interface ICoursePrerequisite {
  prereqID: string;
  courseID: string;
  courseName: string;
  prerequisiteCourseID: string;
  prerequisiteCourseName:string
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
  CourseCategory?: CourseCategoryType;
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
  tableTitle?: string;
  tableData?: T[];
  PageName: string;
  tableColumns: Column<T>[];
  onEdit?: () => void;
  children?: React.ReactNode;
  noDataMessage?: string;
  onDeleteStudent?: (id: string | number) => void;
  onUpdateStatus?: (item: T) => void;
  showTableActions?: boolean;
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
  nameEn?: "Ahmed Ali";
}
// Schedual
export interface ISchedule {
  courseName: string;
  courseID: string | number;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  courseLevel: number;
  courseSemester: number;
  instructorName: string;
  capacity: number;
  id: string | number;
  level: number;
  semester: number;
  sessionType: string;
  instructorID:number
}
export interface ICourseReviewed {
  courseCode: string;
  courseName: string;
  category: string;
  hours: number;
  numericGrade: number | null;
  percentage: number | null;
  letterGrade: string | null;
  gradePoints: number | null;
}

export interface IPreviewStudent {
  studentID: number;
  studentName: string;
  academicYear: number;
  semester: number;
  level: string;
  semesterHours: number;
  gpa: number;
  cgpa: number;
  gpau: number;
  cgpau: number;
  totalGradePoints: number;
  totalPercentage: number;
  overallLetter: string;
  coursesReviewed: ICourseReviewed[];
}

export interface IPreviewResponse {
  success: boolean;
  message: string;
  data: IPreviewStudent[];
}
export interface IGradeRow {
  studentID: number;
  studentName: string;

  courseID: string;
  courseName: string;

  courseLevel: number;
  courseSemester: number;

  category: string;
  hours: number;

  numericGrade: number | string;
  percentage: number | string;
  letterGrade: string;
  gradePoints: number | string;
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
export interface IUsers {
  userID: number | string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  password?: string;
}
