import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Chip, Stack, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Avatar, CircularProgress, Alert, IconButton,
  Tabs, Tab, TextField, useTheme, useMediaQuery
} from '@mui/material';

import {
  FolderOpen as FolderOpenIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HighlightOff as HighlightOffIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  Grading as GradingIcon
} from '@mui/icons-material';

// --- Interfaces ---
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Student {
  studentID: string;
  studentName: string;
  registrationDate?: string;
  status?: string;
}

interface CourseInfo {
  academicYear?: string;
  semester?: string;
  courseId?: string;
}

interface GradeDistributionItem {
  grade: string;
  count: number;
}

interface AnalyticsSummary {
  totalStudents: number;
  passed: number;
  failed: number;
  average: string;
}

interface CourseAnalytics {
  courseInfo?: CourseInfo;
  summary?: AnalyticsSummary;
  gradeDistribution?: GradeDistributionItem[];
}

interface PerformanceDataItem {
  label: string;
  percentage: number;
  isCurrent?: boolean;
}

interface PerformanceOverview {
  title?: string;
  subtitle?: string;
  data?: PerformanceDataItem[];
}

interface StudentGrade {
  studentID: string;
  studentName: string;
  attendance?: number;
  quizzes?: number;
  midtermExam?: number;
  finalExam?: number;
  numericGrade?: number;
  percentage?: number;
  letterGrade?: string;
}

interface CourseStateData {
  courseName?: string;
}

interface LocationState {
  courseData?: CourseStateData;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DoCourseStudents() {
  const params = useParams<Record<string, string | undefined>>();
  const courseId = params.courseId || '';

  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const courseFromState = locationState?.courseData;

  const [students, setStudents] = useState<Student[]>([]);
  const [analytics, setAnalytics] = useState<CourseAnalytics | null>(null);
  const [performance, setPerformance] = useState<PerformanceOverview | null>(null);
  const [grades, setGrades] = useState<StudentGrade[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLight = theme.palette.mode === 'light';

  const getAvatarColor = (name: string): string => {
    const colors = [
      'linear-gradient(135deg, #FF5252 0%, #F731EC 100%)',
      'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
      'linear-gradient(135deg, #F355DA 0%, #5E53E9 100%)',
      'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
      'linear-gradient(135deg, #FF8008 0%, #FFC837 100%)'
    ];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getGradeGradient = (grade: string | undefined): string => {
    const g = grade ? String(grade).toUpperCase().trim() : '';
    if (g === 'A' || g === 'A+') return 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)'; 
    if (g.startsWith('B')) return 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)'; 
    if (g.startsWith('C')) return 'linear-gradient(135deg, #F12711 0%, #F5AF19 100%)'; 
    if (g.startsWith('D')) return 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)'; 
    return 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)'; 
  };

  const getScoreBadgeStyles = (score: number, max: number) => {
    const ratio = max > 0 ? score / max : 0;
    if (ratio >= 0.85) {
      return { bgcolor: theme.palette.success.light, color: theme.palette.success.dark, border: `1px solid ${theme.palette.success.main}` };
    }
    if (ratio >= 0.65) {
      return { bgcolor: theme.palette.info.light, color: theme.palette.info.dark, border: `1px solid ${theme.palette.info.main}` };
    }
    if (ratio >= 0.5) {
      return { bgcolor: theme.palette.warning.light, color: theme.palette.warning.dark, border: `1px solid ${theme.palette.warning.main}` };
    }
    return { bgcolor: theme.palette.error.light, color: theme.palette.error.dark, border: `1px solid ${theme.palette.error.main}` };
  };

  const calculateLetterGrade = (total: number): string => {
    if (total >= 90) return 'A';
    if (total >= 80) return 'B';
    if (total >= 70) return 'C';
    if (total >= 50) return 'D';
    return 'F';
  };

  useEffect(() => {
    const fetchAllCourseData = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };

        const [studentsRes, analyticsRes, performanceRes, gradesRes] = await Promise.all([
          axios.get<Student[]>(`https://credithourssystemw.premiumasp.net/api/Instructors/course-students-by-id/${courseId}`, { headers }).catch(() => ({ data: [] as Student[] })),
          axios.get<CourseAnalytics | null>(`https://credithourssystemw.premiumasp.net/api/Instructors/course-analytics/${courseId}?academicYear=2026&semester=1`, { headers }).catch(() => ({ data: null })),
          axios.get<PerformanceOverview | null>(`https://credithourssystemw.premiumasp.net/api/Instructors/performance-overview/${courseId}`, { headers }).catch(() => ({ data: null })),
          axios.get<StudentGrade[]>(`https://credithourssystemw.premiumasp.net/api/Instructors/get-course-grades-by-code/${courseId}`, { headers }).catch(() => ({ data: [] as StudentGrade[] }))
        ]);

        setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
        setAnalytics(analyticsRes.data);
        setPerformance(performanceRes.data);
        setGrades(Array.isArray(gradesRes.data) ? gradesRes.data : []);

      } catch (err) {
        console.error(err);
        setError("حدث خطأ غير متوقع أثناء تحميل البيانات.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourseData();
  }, [courseId]);

  useEffect(() => {
    if (!grades || grades.length === 0) return;

    const totalStudents = grades.length;
    let passed = 0;
    let failed = 0;
    let totalSum = 0;

    const gradeCounts: Record<string, number> = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };

    grades.forEach((g) => {
      const numericGrade = g.numericGrade || 0;
      totalSum += numericGrade;

      const letter = g.letterGrade || 'F';
      if (letter !== 'F') {
        passed++;
      } else {
        failed++;
      }

      if (gradeCounts[letter] !== undefined) {
        gradeCounts[letter]++;
      }
    });

    const average = totalStudents > 0 ? (totalSum / totalStudents).toFixed(1) : '0';

    const updatedGradeDistribution: GradeDistributionItem[] = Object.keys(gradeCounts).map(key => ({
      grade: key,
      count: gradeCounts[key]
    }));

    setAnalytics((prev) => {
      if (!prev) {
        return {
          summary: { totalStudents, passed, failed, average },
          gradeDistribution: updatedGradeDistribution
        };
      }
      return {
        ...prev,
        summary: { totalStudents, passed, failed, average },
        gradeDistribution: updatedGradeDistribution
      };
    });

    setPerformance((prev) => {
      if (!prev || !prev.data) return prev;
      return {
        ...prev,
        data: prev.data.map((item) => {
          if (item.isCurrent) {
            return { ...item, percentage: parseFloat(average) };
          }
          return item;
        })
      };
    });

  }, [grades]);

  const handleGradeChange = (
    studentID: string, 
    field: 'attendance' | 'quizzes' | 'midtermExam' | 'finalExam', 
    value: string
  ) => {
    const numValue = Math.max(0, parseFloat(value) || 0);

    setGrades((prevGrades) =>
      prevGrades.map((g) => {
        if (g.studentID === studentID) {
          const updatedStudent: StudentGrade = { ...g, [field]: numValue };

          const attendance = field === 'attendance' ? numValue : (g.attendance ?? 0);
          const quizzes = field === 'quizzes' ? numValue : (g.quizzes ?? 0);
          const midterm = field === 'midtermExam' ? numValue : (g.midtermExam ?? 0);
          const final = field === 'finalExam' ? numValue : (g.finalExam ?? 0);

          const newTotal = attendance + quizzes + midterm + final;
          
          updatedStudent.numericGrade = newTotal;
          updatedStudent.percentage = newTotal; 
          updatedStudent.letterGrade = calculateLetterGrade(newTotal);

          return updatedStudent;
        }
        return g;
      })
    );
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const summary: AnalyticsSummary = analytics?.summary || {
    totalStudents: students?.length || 0,
    passed: 0,
    failed: 0,
    average: '0'
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
        <CircularProgress size={50} sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, bgcolor: theme.palette.background.default, minHeight: '100vh', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* --- الهيدر الرئيسي --- */}
      <Paper sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, 
        color: theme.palette.primary.contrastText, 
        p: { xs: 2.5, sm: 3, md: 5 }, 
        borderRadius: { xs: 3, md: 5 }, 
        mb: 4,
        boxShadow: isLight ? '0 20px 40px rgba(57, 65, 136, 0.15)' : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 2 }}>
          <Chip 
            label="COURSE DASHBOARD" 
            size="small" 
            sx={{ bgcolor: theme.palette.error.main, color: 'white', fontWeight: 900, fontSize: '0.7rem', px: 1 }} 
          />
          <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 800, letterSpacing: 0.8 }}>
             Academic Year {analytics?.courseInfo?.academicYear || "2026"} — Semester {analytics?.courseInfo?.semester || "1"}
          </Typography>
        </Stack>

        <Typography variant="h3" sx={{ fontWeight: 950, mb: 2, fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.8rem' }, lineHeight: 1.3 }}>
          {courseFromState?.courseName || analytics?.courseInfo?.courseId || "Course Analytics Overview"}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ bgcolor: 'rgba(255,255,255,0.08)', p: '8px 16px', borderRadius: 2, width: 'fit-content' }}>
          <FolderOpenIcon sx={{ fontSize: 18, color: '#00D2FF' }} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
             Catalog ID: <span style={{ fontWeight: 900, color: '#00D2FF' }}>{courseId}</span>
          </Typography>
        </Stack>
      </Paper>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable" 
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 4,
          borderBottom: `2px solid ${theme.palette.divider}`,
          '& .MuiTabs-indicator': { height: 3, bgcolor: theme.palette.primary.main },
          '& .MuiTab-root': { fontWeight: 900, color: theme.palette.text.secondary, minWidth: 'auto', px: { xs: 2, md: 3 }, '&.Mui-selected': { color: theme.palette.primary.main } }
        }}
      >
        <Tab icon={<BarChartIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Analytics" />
        <Tab icon={<PeopleIcon sx={{ fontSize: 20 }} />} iconPosition="start" label={`Students (${students?.length || 0})`} />
        <Tab icon={<GradingIcon sx={{ fontSize: 20 }} />} iconPosition="start" label="Grades Matrix" />
      </Tabs>

      {/* ==================== TAB 1: ANALYTICS ==================== */}
      <CustomTabPanel value={activeTab} index={0}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 4, height: '100%', bgcolor: theme.palette.background.paper }}>
              <CardContent sx={{ p: '24px !important' }}>
                <Typography variant="overline" sx={{ fontWeight: 800, color: theme.palette.text.secondary }}>Total Registered</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h4" sx={{ fontWeight: 950, color: theme.palette.text.primary }}>{summary.totalStudents}</Typography>
                  <Box sx={{ bgcolor: theme.palette.action.hover, p: 1.5, borderRadius: 3, fontSize: '1.4rem' }}>👥</Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 4, height: '100%', bgcolor: theme.palette.background.paper }}>
              <CardContent sx={{ p: '24px !important' }}>
                <Typography variant="overline" sx={{ fontWeight: 800, color: theme.palette.success.main }}>Passed Status</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h4" sx={{ fontWeight: 950, color: theme.palette.success.main }}>{summary.passed}</Typography>
                  <Box sx={{ bgcolor: theme.palette.success.light, p: 1.2, borderRadius: 3, display: 'flex' }}>
                    <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main, fontSize: 26 }} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 4, height: '100%', bgcolor: theme.palette.background.paper }}>
              <CardContent sx={{ p: '24px !important' }}>
                <Typography variant="overline" sx={{ fontWeight: 800, color: theme.palette.error.main }}>Failed Status</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h4" sx={{ fontWeight: 950, color: theme.palette.error.main }}>{summary.failed}</Typography>
                  <Box sx={{ bgcolor: theme.palette.error.light, p: 1.2, borderRadius: 3, display: 'flex' }}>
                    <HighlightOffIcon sx={{ color: theme.palette.error.main, fontSize: 26 }} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

           <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 4, height: '100%', bgcolor: theme.palette.background.paper }}>
              <CardContent sx={{ p: '24px !important' }}>
                <Typography variant="overline" sx={{ fontWeight: 800, color: theme.palette.warning.main }}>Class Average</Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h4" sx={{ fontWeight: 950, color: theme.palette.warning.main }}>{summary.average}%</Typography>
                  <Box sx={{ bgcolor: theme.palette.warning.light, p: 1.5, borderRadius: 3, fontSize: '1.4rem' }}>📈</Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ borderRadius: 4, p: { xs: 2.5, sm: 4 }, height: '100%', bgcolor: theme.palette.background.paper }}>
              <Typography variant="h6" sx={{ fontWeight: 950, mb: 3, color: theme.palette.text.primary }}>Grade Distribution</Typography>
              <Stack spacing={3.5}>
                {analytics?.gradeDistribution ? (
                  analytics.gradeDistribution.map((g) => {
                    const total = summary.totalStudents || 1;
                    const percentageRatio = (g.count / total) * 100;
                    return (
                      <Box key={g.grade}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                          <Typography variant="body1" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>Grade {g.grade}</Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>{g.count} Std ({percentageRatio.toFixed(0)}%)</Typography>
                        </Stack>
                        <Box sx={{ width: '100%', bgcolor: theme.palette.action.hover, height: 12, borderRadius: 6, overflow: 'hidden' }}>
                          <Box sx={{ background: getGradeGradient(g.grade), height: '100%', width: `${percentageRatio}%`, borderRadius: 6 }} />
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography variant="body2" sx={{ color: theme.palette.text.disabled, fontWeight: 700 }}>لا توجد بيانات توزيع درجات متوفرة حالياً.</Typography>
                )}
              </Stack>
            </Card>
          </Grid>
<Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ borderRadius: 4, p: { xs: 2.5, sm: 4 }, height: '100%', bgcolor: theme.palette.background.paper }}>
              <Typography variant="h6" sx={{ fontWeight: 950, color: theme.palette.text.primary }}>{performance?.title || "Performance Overview"}</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 5, fontWeight: 600 }}>{performance?.subtitle || "مقارنة أداء الطلاب المتقدم للترم الحالي"}</Typography>
              
              <Stack direction="row" alignItems="flex-end" justifyContent="space-around" sx={{ height: 220, pt: 2, px: 1, overflowX: 'auto' }}>
                {performance?.data ? (
                  performance.data.map((item, idx) => (
                    <Stack key={idx} alignItems="center" spacing={1.5} sx={{ minWidth: 55, mx: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: item.isCurrent ? theme.palette.error.main : theme.palette.text.primary, fontSize: '0.75rem' }}>
                        {Number(item.percentage).toFixed(1)}%
                      </Typography>
                      <Box sx={{ 
                        width: 24, 
                        height: `${Math.min(160, (item.percentage || 0) * 1.5)}px`, 
                        background: item.isCurrent 
                          ? `linear-gradient(180deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)` 
                          : `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`, 
                        borderRadius: '6px 6px 0 0',
                        transition: 'all 0.3s ease'
                      }} />
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', fontWeight: 800, textAlign: 'center', minHeight: 36, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.label}
                      </Typography>
                    </Stack>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: theme.palette.text.disabled, fontWeight: 700, mb: 10 }}>لا توجد بيانات مقارنة أداء متوفرة.</Typography>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

      {/* ==================== TAB 2: STUDENTS ROSTER ==================== */}
      <CustomTabPanel value={activeTab} index={1}>
        {isMobile ? (
          <Stack spacing={2}>
            {students.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', color: theme.palette.text.disabled, fontWeight: 700 }}>No students registered.</Paper>
            ) : (
              students.map((s) => (
                <Card key={s.studentID} sx={{ borderRadius: 3, p: 2, bgcolor: theme.palette.background.paper }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ background: getAvatarColor(s.studentName), width: 40, height: 40, fontWeight: 900 }}>
                        {s.studentName ? s.studentName[0].toUpperCase() : "?"}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 850, color: theme.palette.text.primary, fontSize: '0.95rem' }}>{s.studentName || "N/A"}</Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 800 }}>ID: {s.studentID}</Typography>
                      </Box>
                    </Stack>
                    <IconButton size="small"><MoreVertIcon /></IconButton>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1.5, borderTop: `1px dashed ${theme.palette.divider}` }}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>
                      Reg: {s.registrationDate ? new Date(s.registrationDate).toLocaleDateString() : new Date().toLocaleDateString()}
                    </Typography>
                    <Chip label={s.status || "Active"} size="small" sx={{ background: theme.palette.success.light, color: theme.palette.success.dark, fontWeight: 900, height: 22 }} />
                  </Stack>
                </Card>
              ))
            )}
          </Stack>
        ) : (
          <Card sx={{ borderRadius: 5, overflow: 'hidden', width: '100%', bgcolor: theme.palette.background.paper }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 900, py: 2.8 }}>STUDENT ID</TableCell>
                    <TableCell sx={{ fontWeight: 900, py: 2.8 }}>STUDENT NAME</TableCell>
                    <TableCell sx={{ fontWeight: 900, py: 2.8 }}>REGISTRATION DATE</TableCell>
                    <TableCell sx={{ fontWeight: 900, py: 2.8 }}>STATUS</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900, py: 2.8 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.length === 0 ? (
                    <TableRow><TableCell colSpan={5} align="center" sx={{ py: 6, fontWeight: 700, color: theme.palette.text.disabled }}>No students registered.</TableCell></TableRow>
                  ) : (
                    students.map((s) => (
                      <TableRow key={s.studentID} hover>
                        <TableCell sx={{ fontWeight: 900, color: theme.palette.primary.main }}>{s.studentID}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={2.5} alignItems="center">
                            <Avatar sx={{ background: getAvatarColor(s.studentName), width: 42, height: 42, fontWeight: 900 }}>
                              {s.studentName ? s.studentName[0].toUpperCase() : "?"}
                            </Avatar>
                            <Typography sx={{ fontWeight: 850, color: theme.palette.text.primary }}>{s.studentName || "N/A"}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>
                          {s.registrationDate ? new Date(s.registrationDate).toLocaleDateString() : new Date().toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip label={s.status || "Active"} size="small" sx={{ background: theme.palette.success.light, color: theme.palette.success.dark, fontWeight: 900 }} />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small"><MoreVertIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </CustomTabPanel>

      {/* ==================== TAB 3: GRADES MATRIX ==================== */}
      <CustomTabPanel value={activeTab} index={2}>
        {isMobile ? (
          <Stack spacing={2.5}>
            {grades.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', color: theme.palette.text.disabled, fontWeight: 700 }}>No grades recorded yet.</Paper>
            ) : (
              grades.map((g) => (
                <Card key={g.studentID} sx={{ borderRadius: 4, p: 2.5, bgcolor: theme.palette.background.paper, borderLeft: `5px solid ${theme.palette.primary.main}` }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: theme.palette.text.primary, fontSize: '1rem' }}>{g.studentName}</Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>ID: {g.studentID}</Typography>
                    </Box>
                    <Chip 
                      label={g.letterGrade || 'N/A'} 
                      size="small" 
                      sx={{ background: getGradeGradient(g.letterGrade), color: 'white', fontWeight: 950, minWidth: 40 }} 
                    />
                  </Stack>

                  <Grid container spacing={2} sx={{ mb: 2, pt: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
                   <Grid size={{ xs: 6, sm: 3 }}>
                      <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary, fontWeight: 800, mb: 0.5 }}>Attendance (10)</Typography>
                      <TextField
                        type="number"
                        fullWidth
                        value={g.attendance ?? 0}
                        onChange={(e) => handleGradeChange(g.studentID, 'attendance', e.target.value)}
                        inputProps={{ min: 0, max: 10, style: { textAlign: 'center', fontWeight: 900 } }}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{ py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.attendance ?? 0, 10) }}
                      />
                    </Grid>
                   <Grid size={{ xs: 6, sm: 3 }}>
                      <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary, fontWeight: 800, mb: 0.5 }}>Quizzes (20)</Typography>
                      <TextField
                        type="number"
                        fullWidth
                        value={g.quizzes ?? 0}
                        onChange={(e) => handleGradeChange(g.studentID, 'quizzes', e.target.value)}
                        inputProps={{ min: 0, max: 20, style: { textAlign: 'center', fontWeight: 900 } }}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{ py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.quizzes ?? 0, 20) }}
                      />
                    </Grid>
                   <Grid size={{ xs: 6, sm: 3 }}>
                      <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary, fontWeight: 800, mb: 0.5 }}>Midterm (30)</Typography>
                      <TextField
                        type="number"
                        fullWidth
                        value={g.midtermExam ?? 0}
                        onChange={(e) => handleGradeChange(g.studentID, 'midtermExam', e.target.value)}
                        inputProps={{ min: 0, max: 30, style: { textAlign: 'center', fontWeight: 900 } }}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{ py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.midtermExam ?? 0, 30) }}
                      />
                    </Grid>
                   <Grid size={{ xs: 6, sm: 3 }}>
                      <Typography variant="caption" display="block" sx={{ color: theme.palette.text.secondary, fontWeight: 800, mb: 0.5 }}>Final (40)</Typography>
                      <TextField
                        type="number"
                        fullWidth
                        value={g.finalExam ?? 0}
                        onChange={(e) => handleGradeChange(g.studentID, 'finalExam', e.target.value)}
                        inputProps={{ min: 0, max: 40, style: { textAlign: 'center', fontWeight: 900 } }}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{ py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.finalExam ?? 0, 40) }}
                      />
                    </Grid>
                  </Grid>

                  <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ pt: 1, borderTop: `1px dashed ${theme.palette.divider}` }}>
                    <Typography variant="body2" sx={{ fontWeight: 950, color: theme.palette.primary.main }}>
                      Total Score: {g.numericGrade ?? 0} <span style={{ color: theme.palette.text.disabled, fontWeight: 700 }}>/ {g.percentage ?? 0}%</span>
                    </Typography>
                  </Stack>
                </Card>
              ))
            )}
          </Stack>
        ) : (
          <Card sx={{ borderRadius: 5, overflow: 'hidden', width: '100%', bgcolor: theme.palette.background.paper }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 900, py: 2.8 }}>STUDENT INFO</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900, py: 2.8 }}>ATTENDANCE (10)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900, py: 2.8 }}>QUIZZES (20)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900, py: 2.8 }}>MIDTERM (30)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900, py: 2.8 }}>FINAL EXAM (40)</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900, py: 2.8 }}>TOTAL SCORE</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 900, py: 2.8 }}>RANK/LETTER</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grades.length === 0 ? (
                    <TableRow><TableCell colSpan={7} align="center" sx={{ py: 6, fontWeight: 700, color: theme.palette.text.disabled }}>No grades recorded yet.</TableCell></TableRow>
                  ) : (
                    grades.map((g) => (
                      <TableRow key={g.studentID} hover>
                        <TableCell sx={{ py: 2.2 }}>
                          <Typography sx={{ fontWeight: 850, color: theme.palette.text.primary, fontSize: '0.9rem' }}>{g.studentName}</Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 700, bgcolor: theme.palette.action.hover, p: '2px 6px', borderRadius: 1 }}>ID: {g.studentID}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            value={g.attendance ?? 0}
                            onChange={(e) => handleGradeChange(g.studentID, 'attendance', e.target.value)}
                            inputProps={{ min: 0, max: 10, style: { textAlign: 'center', fontWeight: 900 } }}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ width: 60, py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.attendance ?? 0, 10) }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            value={g.quizzes ?? 0}
                            onChange={(e) => handleGradeChange(g.studentID, 'quizzes', e.target.value)}
                            inputProps={{ min: 0, max: 20, style: { textAlign: 'center', fontWeight: 900 } }}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ width: 60, py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.quizzes ?? 0, 20) }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            value={g.midtermExam ?? 0}
                            onChange={(e) => handleGradeChange(g.studentID, 'midtermExam', e.target.value)}
                            inputProps={{ min: 0, max: 30, style: { textAlign: 'center', fontWeight: 900 } }}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ width: 60, py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.midtermExam ?? 0, 30) }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            value={g.finalExam ?? 0}
                            onChange={(e) => handleGradeChange(g.studentID, 'finalExam', e.target.value)}
                            inputProps={{ min: 0, max: 40, style: { textAlign: 'center', fontWeight: 900 } }}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ width: 60, py: 0.5, borderRadius: '8px', ...getScoreBadgeStyles(g.finalExam ?? 0, 40) }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: 950, color: theme.palette.primary.main }}>
                            {g.numericGrade ?? 0} <span style={{ color: theme.palette.text.disabled, fontSize: '0.8rem', fontWeight: 700 }}>/ 100</span>
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={g.letterGrade || 'N/A'} 
                            size="small" 
                            sx={{ background: getGradeGradient(g.letterGrade), color: 'white', fontWeight: 950, minWidth: 40 }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </CustomTabPanel>
    </Box>
  );
}