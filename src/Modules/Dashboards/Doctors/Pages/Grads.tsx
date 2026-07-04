import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

const gradingDashboardStyles = `
  .clean-grade-input::-webkit-outer-spin-button,
  .clean-grade-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .clean-grade-input {
    -moz-appearance: textfield;
  }
  
  @keyframes shakeEffect {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
  .shake-row {
    animation: shakeEffect 0.2s ease-in-out 2;
  }

  @media (max-width: 1024px) {
    .dashboard-wrapper { padding: 20px !important; }
    .top-bar-section { flex-direction: column; align-items: flex-start !important; gap: 15px; }
    .course-dropdown-box { width: 100%; }
    .course-dropdown-box select { min-width: 100% !important; }
    .analytics-summary-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important; }
  }

  @media (max-width: 900px) {
    .desktop-table-header { display: none !important; }
    .student-card-row {
      grid-template-columns: 1fr !important;
      gap: 15px !important;
      padding: 20px !important;
    }
    .student-info-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .grades-fields-container {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)) !important;
      gap: 10px !important;
    }
    .individual-grade-box {
      position: relative;
    }
    .individual-grade-box::before {
      content: attr(data-title);
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 4px;
      text-align: center;
    }
    .total-badge-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f1f5f9;
      padding: 10px;
      border-radius: 8px;
    }
    .total-badge-container::before {
      content: "Total Score:";
      font-weight: 700;
      font-size: 13px;
    }
    .row-actions-container {
      margin-top: 10px;
      width: 100%;
    }
  }

  .custom-toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: inherit;
  }
  .custom-toast {
    background: #1e293b;
    color: #fff;
    padding: 14px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    min-width: 300px;
    max-width: 450px;
    border-left: 4px solid #4f46e5;
    animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .custom-toast.error { border-left-color: #ef4444; }
  .custom-toast.success { border-left-color: #10b981; }
  .custom-toast.warning { border-left-color: #f59e0b; }
  @keyframes toastSlideIn {
    from { transform: translateY(100%) scale(0.9); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
  }
  .custom-toast-fadeout {
    animation: toastSlideOut 0.3s ease forwards !important;
  }
  @keyframes toastSlideOut {
    to { transform: translateY(20px) scale(0.9.5); opacity: 0; }
  }
  .custom-confirm-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.2s ease;
  }
  .custom-confirm-box {
    background: #fff;
    color: #1e293b;
    padding: 24px;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    text-align: center;
  }
  .custom-confirm-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
  }
  .custom-confirm-btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    border: none;
  }
  .custom-confirm-yes { background: #ef4444; color: #fff; }
  .custom-confirm-no { background: #f1f5f9; color: #64748b; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

interface CourseDto {
  courseId?: string;
  id?: string;
  courseName?: string;
  name?: string;
}

interface StudentGradeRow {
  id: string;
  idFromApi: number;
  studentId: string;
  name: string;
  attendance: number | "";
  assignments: number | "";
  quizzes: number | "";
  midtermExam: number | "";
  practical: number | "";
  oral: number | "";
  finalExam: number | "";
}

interface GradeLimits {
  attendance: number;
  assignments: number;
  quizzes: number;
  midtermExam: number;
  practical: number;
  oral: number;
  finalExam: number;
}

type GradeField = keyof GradeLimits;

interface LocalGradeBackup {
  [studentId: string]: {
    attendance: number;
    assignments: number;
    quizzes: number;
    midtermExam: number;
    practical: number;
    oral: number;
    finalExam: number;
  };
}

interface ServerGradePayload {
  gradeID: number;
  gradeId: number;
  id: number;
  attendance: number;
  assignments: number;
  quizzes: number;
  midtermExam: number;
  practical: number;
  oral: number;
  finalExam: number;
}

interface ApiStudentRow {
  studentID?: string;
  studentId?: string;
  id?: string;
  gradeID?: number;
  gradeId?: number;
  detailedGradeId?: number;
  studentName?: string;
  name?: string;
  fullName?: string;
  attendance?: number;
  assignments?: number;
  quizzes?: number;
  midtermExam?: number;
  practical?: number;
  oral?: number;
  finalExam?: number;
}


const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'error') => {
  let container = document.querySelector('.custom-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'custom-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  
  let icon = '<i class="fas fa-exclamation-circle" style="color: #ef4444"></i>';
  if (type === 'success') icon = '<i class="fas fa-check-circle" style="color: #10b981"></i>';
  if (type === 'warning') icon = '<i class="fas fa-exclamation-triangle" style="color: #f59e0b"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('custom-toast-fadeout');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3500);
};

export default function GradingDashboard() {
  const { courseId } = useParams<{ courseId?: string }>(); 
  const [courses, setCourses] = useState<CourseDto[]>([]); 
  const [selectedCourse, setSelectedCourse] = useState<string>(""); 
  const [students, setStudents] = useState<StudentGradeRow[]>([]);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(false);
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  
  const [syncStatus, setSyncStatus] = useState<Record<string, string>>({}); 
  const [editingRowId, setEditingRowId] = useState<string | null>(null); 
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"all" | "top" | "failed">("all"); 
  const [originalRowData, setOriginalRowData] = useState<StudentGradeRow | null>(null);

  const gradeLimits: GradeLimits = {
    attendance: 5,
    assignments: 5,
    quizzes: 10,
    midtermExam: 20,
    practical: 10,
    oral: 10,
    finalExam: 40
  };

  const fieldLabels: Record<GradeField, string> = {
    attendance: "ATT (5)",
    assignments: "ASGN (5)",
    quizzes: "QUIZ (10)",
    midtermExam: "MID (20)",
    practical: "PRAC (10)",
    oral: "ORAL (10)",
    finalExam: "FINAL (40)"
  };


  useEffect(() => {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);

    const inlineStyleSheet = document.createElement('style');
    inlineStyleSheet.type = 'text/css';
    inlineStyleSheet.appendChild(document.createTextNode(gradingDashboardStyles));
    document.head.appendChild(inlineStyleSheet);

    return () => {
      if (document.head.contains(fontAwesomeLink)) document.head.removeChild(fontAwesomeLink);
      if (document.head.contains(inlineStyleSheet)) document.head.removeChild(inlineStyleSheet);
    };
  }, []);


  useEffect(() => {
    const fetchTeacherCourses = async (): Promise<void> => {
      try {
        setLoadingCourses(true);
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token ?? ''}` };

        const response = await axios.get<CourseDto[]>(`https://credithourssystemw.premiumasp.net/api/Instructors/my-courses`, { headers });
        const coursesData = response.data || [];
        
        const uniqueCourses: CourseDto[] = [];
        const seenIds = new Set<string>();

        coursesData.forEach((c: CourseDto) => {
          const id = c.courseId || c.id || "";
          if (id && !seenIds.has(id)) {
            seenIds.add(id);
            uniqueCourses.push(c);
          }
        });
        
        if (uniqueCourses.length > 0) {
          setCourses(uniqueCourses);
          if (courseId && seenIds.has(courseId)) {
            setSelectedCourse(courseId);
          } else {
            setSelectedCourse(uniqueCourses[0].courseId || uniqueCourses[0].id || "");
          }
        }
      } catch (err) {
        console.error("Error fetching instructor courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchTeacherCourses();
  }, [courseId]);

  const fetchStudentsForSelectedCourse = useCallback(async (): Promise<void> => {
    if (!selectedCourse) return;
    
    try {
      setLoadingStudents(true);
      const token = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${token ?? ''}` };
      
      const response = await axios.get(`https://credithourssystemw.premiumasp.net/api/Instructors/get-course-grades-by-code/${selectedCourse}`, { headers });
      const rawData = response.data;
      
      let studentsList: ApiStudentRow[] = [];
      if (Array.isArray(rawData)) {
        studentsList = rawData;
      } else if (rawData && typeof rawData === 'object') {
        studentsList = rawData.data || rawData.students || [];
      }

      const localRaw = localStorage.getItem(`local_grades_${selectedCourse}`);
      const localBackup: LocalGradeBackup = localRaw ? JSON.parse(localRaw) : {};

      const mappedStudents: StudentGradeRow[] = studentsList.map((s: ApiStudentRow, idx: number) => {
        const studentIdKey = s.studentID || s.studentId || s.id || "";
        const actualGradeId = Number(s.gradeID || s.gradeId || s.id || s.detailedGradeId || 0);
        const rowId = `student-${actualGradeId}-${idx}`;

        const hasLocalSaved = localBackup[studentIdKey];

        return {
          id: rowId,
          idFromApi: actualGradeId, 
          studentId: studentIdKey, 
          name: s.studentName || s.name || s.fullName || "Enrolled Student", 
          attendance: hasLocalSaved ? hasLocalSaved.attendance : (s.attendance !== undefined && s.attendance !== null ? Number(s.attendance) : 0),
          assignments: hasLocalSaved ? hasLocalSaved.assignments : (s.assignments !== undefined && s.assignments !== null ? Number(s.assignments) : 0),
          quizzes: hasLocalSaved ? hasLocalSaved.quizzes : (s.quizzes !== undefined && s.quizzes !== null ? Number(s.quizzes) : 0),
          midtermExam: hasLocalSaved ? hasLocalSaved.midtermExam : (s.midtermExam !== undefined && s.midtermExam !== null ? Number(s.midtermExam) : 0),
          practical: hasLocalSaved ? hasLocalSaved.practical : (s.practical !== undefined && s.practical !== null ? Number(s.practical) : 0),
          oral: hasLocalSaved ? hasLocalSaved.oral : (s.oral !== undefined && s.oral !== null ? Number(s.oral) : 0),
          finalExam: hasLocalSaved ? hasLocalSaved.finalExam : (s.finalExam !== undefined && s.finalExam !== null ? Number(s.finalExam) : 0)
        };
      });

      setStudents(mappedStudents);
    } catch (err) {
      console.error("Error fetching students data:", err);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  }, [selectedCourse]);

  useEffect(() => {
    setSyncStatus({}); 
    setEditingRowId(null); 
    setSearchQuery("");
    setActiveFilter("all");
    
    fetchStudentsForSelectedCourse();
  }, [selectedCourse, fetchStudentsForSelectedCourse]);

 
  const calculateTotal = (s: StudentGradeRow): number => {
    const sum = (Number(s.attendance) || 0) + 
                (Number(s.assignments) || 0) + 
                (Number(s.quizzes) || 0) + 
                (Number(s.midtermExam) || 0) + 
                (Number(s.practical) || 0) + 
                (Number(s.oral) || 0) + 
                (Number(s.finalExam) || 0); 
    return sum > 100 ? 100 : sum; 
  };

  
  const totalStudentsCount = students.length;
  const averageGrades = totalStudentsCount > 0 
    ? (students.reduce((acc, curr) => acc + calculateTotal(curr), 0) / totalStudentsCount).toFixed(1) 
    : "0";

  const fullMarkCount = students.filter((s) => calculateTotal(s) === 100).length;
  const failedCount = students.filter((s) => calculateTotal(s) < 50).length;
  const passingStudentsCount = students.filter((s) => calculateTotal(s) >= 50).length;
  const passingRate = totalStudentsCount > 0 ? Math.round((passingStudentsCount / totalStudentsCount) * 100) : 0;

  const handleGradeChange = (rowId: string, field: GradeField, value: string): void => {
    setStudents((prev) => prev.map((s) => {
      if (s.id === rowId) {
        if (value === "") return { ...s, [field]: "" }; 

        let parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) parsedValue = 0;

        const maxLimit = gradeLimits[field];
        if (parsedValue < 0) parsedValue = 0;
        if (parsedValue > maxLimit) parsedValue = maxLimit;

        return { ...s, [field]: parsedValue };
      }
      return s;
    }));
  };

  const handleCancelEdit = (studentRow: StudentGradeRow): void => {
    if (originalRowData) {
      const hasChanges = JSON.stringify(studentRow) !== JSON.stringify(originalRowData);
      if (hasChanges) {
        const overlay = document.createElement('div');
        overlay.className = 'custom-confirm-overlay';
        overlay.innerHTML = `
          <div class="custom-confirm-box">
            <h3 style="margin-top:0;font-size:18px;">Discard Changes?</h3>
            <p style="color:#64748b;font-size:14px;">You have unsaved changes for this student. Are you sure you want to discard them?</p>
            <div class="custom-confirm-buttons">
              <button class="custom-confirm-btn custom-confirm-yes" id="confirm-yes">Discard</button>
              <button class="custom-confirm-btn custom-confirm-no" id="confirm-no">Keep Editing</button>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('confirm-yes')?.addEventListener('click', () => {
          setStudents((prev) => prev.map((s) => s.id === studentRow.id && originalRowData ? originalRowData : s));
          setEditingRowId(null);
          overlay.remove();
          showToast("Changes discarded successfully", "warning");
        });

        document.getElementById('confirm-no')?.addEventListener('click', () => {
          overlay.remove();
        });
        return;
      }
    }
    setEditingRowId(null);
  };

  const handleSaveGrades = async (studentRow: StudentGradeRow): Promise<void> => {
    const baseSum = (Number(studentRow.attendance) || 0) + 
                    (Number(studentRow.assignments) || 0) + 
                    (Number(studentRow.quizzes) || 0) + 
                    (Number(studentRow.midtermExam) || 0) + 
                    (Number(studentRow.practical) || 0) + 
                    (Number(studentRow.oral) || 0) + 
                    (Number(studentRow.finalExam) || 0);

    if (baseSum === 0) {
      setSyncStatus((prev) => ({ ...prev, [studentRow.id]: 'empty_error' }));
      showToast("Cannot save empty grades! Total score is 0.", "warning");
      setTimeout(() => { setSyncStatus((prev) => ({ ...prev, [studentRow.id]: 'idle' })); }, 2500);
      return;
    }

    const token = localStorage.getItem('accessToken');
    const headers = { 
      Authorization: `Bearer ${token ?? ''}`,
      'Content-Type': 'application/json',
      'accept': '*/*'
    };

    const payload: ServerGradePayload[] = [
      {
        gradeID: studentRow.idFromApi,
        gradeId: studentRow.idFromApi,
        id: studentRow.idFromApi,
        attendance: Number(studentRow.attendance) || 0,
        assignments: Number(studentRow.assignments) || 0,
        quizzes: Number(studentRow.quizzes) || 0,
        midtermExam: Number(studentRow.midtermExam) || 0,
        practical: Number(studentRow.practical) || 0,
        oral: Number(studentRow.oral) || 0,
        finalExam: Number(studentRow.finalExam) || 0
      }
    ];

    try {
      setSyncStatus((prev) => ({ ...prev, [studentRow.id]: 'saving' }));
      
      await axios.put(`https://credithourssystemw.premiumasp.net/api/Instructors/update-grades`, payload, { headers });
      
      const currentLocalRaw = localStorage.getItem(`local_grades_${selectedCourse}`);
      const currentLocalData: LocalGradeBackup = currentLocalRaw ? JSON.parse(currentLocalRaw) : {};
      
      currentLocalData[studentRow.studentId] = {
        attendance: Number(studentRow.attendance) || 0,
        assignments: Number(studentRow.assignments) || 0,
        quizzes: Number(studentRow.quizzes) || 0,
        midtermExam: Number(studentRow.midtermExam) || 0,
        practical: Number(studentRow.practical) || 0,
        oral: Number(studentRow.oral) || 0,
        finalExam: Number(studentRow.finalExam) || 0
      };
      localStorage.setItem(`local_grades_${selectedCourse}`, JSON.stringify(currentLocalData));

      setSyncStatus((prev) => ({ ...prev, [studentRow.id]: 'success' }));
      setStudents((prev) => prev.map((s) => s.id === studentRow.id ? { ...studentRow } : s));
      showToast(`Grades for ${studentRow.name} updated successfully!`, "success");

      setTimeout(() => {
        setEditingRowId(null); 
        setSyncStatus((prev) => ({ ...prev, [studentRow.id]: 'idle' }));
      }, 1000);

    } catch (err: unknown) {
      let serverMessage = "Check constraints.";
      if (axios.isAxiosError(err) && err.response) {
        serverMessage = err.response.data?.message || err.response.data || "Check constraints.";
      }
      
      setSyncStatus((prev) => ({ ...prev, [studentRow.id]: 'empty_error' }));
      
  
      const cleanMessage = typeof serverMessage === 'object' ? JSON.stringify(serverMessage) : serverMessage;
      showToast(`Failed to save grades: ${cleanMessage}`, "error");
      
      setStudents((prev) => prev.map((s) => s.id === studentRow.id && originalRowData ? originalRowData : s));
      
      setTimeout(() => { setSyncStatus((prev) => ({ ...prev, [studentRow.id]: 'idle' })); }, 2500);
    }
  };

 
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || String(s.studentId).includes(searchQuery);
    const total = calculateTotal(s);
    if (activeFilter === "top") return matchesSearch && total >= 85;
    if (activeFilter === "failed") return matchesSearch && total < 50;
    return matchesSearch;
  });

  if (loadingCourses) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <i className="fas fa-spinner fa-spin fa-2x" style={{ marginBottom: '15px', color: '#4f46e5' }}></i>
        <div style={{ fontWeight: '600', color: '#1e293b' }}>Loading Courses Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper" style={{ minHeight: '100vh', padding: '30px', fontFamily: 'inherit', direction: 'ltr' }}>
      
      <div className="top-bar-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px', color: '#4f46e5' }}>
            <i className="fas fa-graduation-cap" style={{ marginRight: '6px' }}></i> INSTRUCTOR MANAGEMENT
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: 'inherit' }}>Course Grading Panel</h1>
        </div>
        
        <div className="course-dropdown-box" style={{ position: 'relative' }}>
          <i className="fas fa-book" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', zIndex: 10 }}></i>
          <select 
            value={selectedCourse} 
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
            style={{ padding: '12px 20px 12px 42px', borderRadius: '12px', border: '1px solid #cbd5e1', fontWeight: '600', backgroundColor: 'transparent', color: 'inherit', cursor: 'pointer', outline: 'none', minWidth: '260px', fontSize: '14px', appearance: 'none' }}
          >
            {courses.map((c) => (
              <option key={c.courseId || c.id} value={c.courseId || c.id} style={{color: '#000'}}>{c.courseName || c.name}</option>
            ))}
          </select>
          <i className="fas fa-chevron-down" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none', fontSize: '12px' }}></i>
        </div>
      </div>

    
      <div className="analytics-summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontSize: '18px' }}>
            <i className="fas fa-users"></i>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '13px', fontWeight: '600' }}>Students Registered</div>
            <div style={{ fontSize: '22px', fontWeight: '800' }}>{loadingStudents ? '...' : totalStudentsCount}</div>
          </div>
        </div>

        <div style={{ borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontSize: '18px' }}>
            <i className="fas fa-chart-bar"></i>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '13px', fontWeight: '600' }}>Class Average</div>
            <div style={{ fontSize: '22px', fontWeight: '800' }}>{loadingStudents ? '...' : averageGrades} <span style={{fontSize: '13px', opacity: 0.6}}>/ 100</span></div>
          </div>
        </div>

        <div style={{ borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '18px' }}>
            <i className="fas fa-star"></i>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '13px', fontWeight: '600' }}>Passing Success Rate</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#10b981' }}>{loadingStudents ? '...' : `${passingRate}%`}</div>
          </div>
        </div>

        <div style={{ borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <div style={{ color: '#10b981', fontSize: '11px', fontWeight: '700' }}>Full Marks (100)</div>
              <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '2px' }}>{loadingStudents ? '...' : fullMarkCount}</div>
            </div>
            <div style={{ width: '1px', backgroundColor: '#e2e8f0', height: '35px' }}></div>
            <div>
              <div style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700' }}>Failed (&lt;50)</div>
              <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '2px' }}>{loadingStudents ? '...' : failedCount}</div>
            </div>
          </div>
        </div>
      </div>

  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <i className="fas fa-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}></i>
          <input 
            type="text"
            placeholder="Find student by name or code..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 15px 10px 40px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontWeight: '600', backgroundColor: 'transparent', color: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', backgroundColor: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '10px' }}>
          <button type="button" onClick={() => setActiveFilter("all")} style={{ border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: activeFilter === 'all' ? '#fff' : 'transparent', color: activeFilter === 'all' ? '#4f46e5' : '#64748b' }}>
            All ({students.length})
          </button>
          <button type="button" onClick={() => setActiveFilter("top")} style={{ border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: activeFilter === 'top' ? '#fff' : 'transparent', color: activeFilter === 'top' ? '#10b981' : '#64748b' }}>
            🌟 Top
          </button>
          <button type="button" onClick={() => setActiveFilter("failed")} style={{ border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: activeFilter === 'failed' ? '#fff' : 'transparent', color: activeFilter === 'failed' ? '#ef4444' : '#64748b' }}>
            ⚠️ Failed
          </button>
        </div>
      </div>

      <div style={{ borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
        
       
        <div className="desktop-table-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: '10px', marginBottom: '15px', padding: '0 15px', fontWeight: '700', opacity: 0.7, fontSize: '12px', textAlign: 'center' }}>
          <div style={{ gridColumn: 'span 1', textAlign: 'left' }}>STUDENT ID</div>
          <div style={{ gridColumn: 'span 2', textAlign: 'left' }}>FULL NAME</div>
          <div style={{ gridColumn: 'span 1' }}>ATT (5)</div>
          <div style={{ gridColumn: 'span 1' }}>ASGN (5)</div>
          <div style={{ gridColumn: 'span 1' }}>QUIZ (10)</div>
          <div style={{ gridColumn: 'span 1' }}>MID (20)</div>
          <div style={{ gridColumn: 'span 1' }}>PRAC (10)</div>
          <div style={{ gridColumn: 'span 1' }}>ORAL (10)</div>
          <div style={{ gridColumn: 'span 1' }}>FINAL (40)</div>
          <div style={{ gridColumn: 'span 1', color: '#4f46e5' }}>TOTAL</div>
          <div style={{ gridColumn: 'span 3' }}>ACTIONS</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {loadingStudents && students.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', fontWeight: '600', opacity: 0.7 }}>
              <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Syncing student list from database...
            </div>
          ) : (
            filteredStudents.map((s) => {
              const total = calculateTotal(s);
              const currentStatus = syncStatus[s.id] || 'idle';
              const isEditing = editingRowId === s.id; 

              const totalStyle = total >= 85 ? { bg: "#d1fae5", text: "#065f46" } : total < 50 ? { bg: "#fee2e2", text: "#991b1b" } : { bg: "rgba(0,0,0,0.05)", text: "inherit" };
              
              const actionBtn = currentStatus === 'saving' 
                ? { bg: '#4f46e5', text: 'Saving...', icon: 'fas fa-circle-notch fa-spin' } 
                : currentStatus === 'success' 
                ? { bg: '#10b981', text: 'Saved ✓', icon: 'fas fa-check-double' } 
                : currentStatus === 'empty_error' 
                ? { bg: '#ef4444', text: 'Error!', icon: 'fas fa-exclamation-circle' } 
                : { bg: '#4f46e5', text: 'Save', icon: 'fas fa-save' };

              const fields: GradeField[] = ['attendance', 'assignments', 'quizzes', 'midtermExam', 'practical', 'oral', 'finalExam'];

              return (
                <div 
                  key={s.id} 
                  className={`student-card-row ${currentStatus === 'empty_error' ? 'shake-row' : ''}`} 
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: '10px', padding: '12px 15px', borderRadius: '12px', alignItems: 'center', border: isEditing ? `2px solid #4f46e5` : '1px solid #e2e8f0', backgroundColor: isEditing ? 'rgba(79,70,229,0.02)' : 'transparent', transition: 'all 0.2s ease' }}
                >
                  
                  <div className="student-info-block" style={{ gridColumn: 'span 3', display: 'contents' }}>
                    <div style={{ gridColumn: 'span 1', fontWeight: '600', fontSize: '13px', opacity: 0.8 }}>{s.studentId}</div>
                    <div style={{ gridColumn: 'span 2', fontWeight: '600', fontSize: '14px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                  </div>

                  <div className="grades-fields-container" style={{ gridColumn: 'span 7', display: 'contents' }}>
                    {fields.map((field) => (
                      <div key={field} className="individual-grade-box" data-title={fieldLabels[field]} style={{ gridColumn: 'span 1' }}>
                        <input 
                          type="number" 
                          value={s[field]} 
                          disabled={!isEditing} 
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleGradeChange(s.id, field, e.target.value)}
                          className="clean-grade-input"
                          style={{ width: '100%', border: isEditing ? '1px solid #cbd5e1' : '1px solid transparent', padding: '8px 0', borderRadius: '8px', textAlign: 'center', fontWeight: '700', fontSize: '14px', backgroundColor: isEditing ? '#fff' : 'rgba(0,0,0,0.02)', color: isEditing ? '#000' : 'inherit', outline: 'none' }} 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="total-badge-container" style={{ gridColumn: 'span 1' }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', backgroundColor: totalStyle.bg, color: totalStyle.text, padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px' }}>
                      {total}
                    </div>
                  </div>

             
                  <div className="row-actions-container" style={{ gridColumn: 'span 3', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {!isEditing ? (
                      <button type="button" onClick={() => { setEditingRowId(s.id); setOriginalRowData({ ...s }); }} style={{ flex: 1, padding: '10px 0', borderRadius: '8px', border: 'none', backgroundColor: 'rgba(79,70,229,0.1)', color: '#4f46e5', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}><i className="fas fa-edit"></i> Edit</button>
                    ) : (
                      <>
                        <button type="button" onClick={() => handleSaveGrades(s)} disabled={currentStatus === 'saving' || currentStatus === 'success'} style={{ flex: 1.5, padding: '10px 0', borderRadius: '8px', border: 'none', backgroundColor: actionBtn.bg, color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}><i className={actionBtn.icon}></i> {actionBtn.text}</button>
                        <button type="button" onClick={() => handleCancelEdit(s)} style={{ flex: 1, padding: '10px 0', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: 'transparent', color: 'inherit', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}