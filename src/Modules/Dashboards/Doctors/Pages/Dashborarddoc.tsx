import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Grid, Card, CardContent, Chip,
  CircularProgress, Button, Stack, Divider, Alert, Fade, useTheme
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart'; 
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookOnlineIcon from '@mui/icons-material/Book';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate } from 'react-router-dom';

// --- Interfaces ---
interface StatCardProps {
  title: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  colorType?: 'error' | 'info' | 'primary';
}

interface CourseBriefProps {
  code: string;
  title: string;
  students: number;
  pending: number;
  strugglingPercentage: number;
}

interface GradeDistributionItem {
  grade: string;
  count: number;
}

interface CourseSummaryItem {
  courseID: string;
  courseName: string;
  totalStudents: number;
  pendingGradesCount: number;
  strugglingStudentsPercentage: number;
}

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  averageGPA: string | number;
  pendingGrades: number;
  lastUpdated?: string;
  gradesDistribution?: GradeDistributionItem[];
}

interface DashboardInsightsResponse {
  coursesSummary?: CourseSummaryItem[];
}

const StatCard = ({ title, value, sub, icon, colorType = 'primary' }: StatCardProps) => {
  const theme = useTheme();

  const getColors = () => {
    if (colorType === 'error') {
      return {
        main: theme.palette.error.main,
        bg: theme.palette.error.main,
        grad: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.error.main}08 100%)`
      };
    }
    if (colorType === 'info') {
      return {
        main: theme.palette.info.main,
        bg: theme.palette.info.main,
        grad: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.info.main}08 100%)`
      };
    }
    return {
      main: theme.palette.primary.main,
      bg: theme.palette.primary.main,
      grad: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`
    };
  };

  const activeColors = getColors();

  return (
    <Card sx={{ 
      borderRadius: 5, 
      boxShadow: theme.shadows[1], 
      border: `1px solid ${theme.palette.divider}`, 
      height: '100%',
      position: 'relative', 
      overflow: 'hidden', 
      background: activeColors.grad, 
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': { 
        transform: 'translateY(-6px)',
        boxShadow: `0 20px 35px rgba(0, 0, 0, 0.05), 0 4px 12px ${activeColors.main}15`,
        borderColor: activeColors.main,
        '& .stat-icon-box': {
          transform: 'scale(1.08) rotate(3deg)',
          boxShadow: theme.shadows[2]
        }
      }
    }}>
      <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', bgcolor: activeColors.main, borderRadius: '0 4px 4px 0' }} />
      <CardContent sx={{ paddingInline: 4.5, '&:last-child': { pb: 4 } }}>
        <Stack spacing={2.5}> 
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="overline" sx={{ fontWeight: 800, color: theme.palette.text.secondary, letterSpacing: '0.8px', fontSize: '0.75rem', lineHeight: 1.2, paddingRight: 2 }}>
              {title}
            </Typography>
            <Box className="stat-icon-box" sx={{ width: 42, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: activeColors.main, opacity: 0.85, borderRadius: 3, color: theme.palette.common.white, transition: 'all 0.3s ease', '& svg': { fontSize: '1.3rem' } }}>
              {icon}
            </Box>
          </Stack>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: theme.palette.text.primary, mb: 0.5, letterSpacing: '-1px', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
              {value}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.disabled, fontWeight: 700, fontSize: '0.8rem', display: 'block' }}>
              {sub}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

const CourseCardBrief = ({ code, title, students, pending, strugglingPercentage }: CourseBriefProps) => {
  const theme = useTheme();

  const getStrugglingColor = (pct: number) => {
    if (pct === 0) return theme.palette.success.main;
    if (pct <= 35) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Card sx={{ 
      borderRadius: 5, 
      border: `1px solid ${theme.palette.divider}`, 
      boxShadow: 'none', 
      height: '100%', 
      minHeight: '210px', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
      '&:hover': { boxShadow: `0 20px 35px ${theme.palette.primary.main}08`, borderColor: theme.palette.primary.main } 
    }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
            <Chip label={code || "N/A"} size="small" color="primary" sx={{ fontWeight: 700, borderRadius: 1.5, px: 0.5 }} />
            {strugglingPercentage > 0 && (
              <Chip 
                icon={<WarningAmberIcon style={{ fontSize: '0.9rem', color: getStrugglingColor(strugglingPercentage) }} />}
                label={`${Math.round(strugglingPercentage)}% Struggling`} 
                size="small"
                sx={{ 
                  bgcolor: theme.palette.background.default, 
                  color: getStrugglingColor(strugglingPercentage), 
                  fontWeight: 800, 
                  fontSize: '0.7rem', 
                  borderRadius: 1.5,
                  border: `1px solid ${theme.palette.divider}`
                }} 
              />
            )}
          </Stack>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: theme.palette.text.primary, height: '2.8em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.4 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ mb: 2, borderStyle: 'dashed', borderColor: theme.palette.divider }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 700 }}>👤 {students} Students</Typography>
            <Chip 
              label={pending > 0 ? `${pending} Pending` : 'No Actions'} 
              size="small" 
              sx={{ 
                height: 22, 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                bgcolor: theme.palette.background.default, 
                color: pending > 0 ? theme.palette.error.main : theme.palette.success.main, 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`
              }} 
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Dashborarddoc() {
  const theme = useTheme();
  const navigate = useNavigate(); 
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [courses, setCourses] = useState<CourseSummaryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(false);
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error("No Token Found");

        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, insightsRes] = await Promise.all([
          axios.get<DashboardStats>('https://credithourssystemw.premiumasp.net/api/Instructors/dashboard-stats', { headers }),
          axios.get<DashboardInsightsResponse>('https://credithourssystemw.premiumasp.net/api/Instructors/dashboard-insights', { headers })
        ]);

        setStats(statsRes.data);
        if (insightsRes.data?.coursesSummary) {
          setCourses(insightsRes.data.coursesSummary);
        }
      } catch (err) {
        console.error("API Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: theme.palette.background.default }}>
        <CircularProgress color="primary" sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, letterSpacing: '0.5px' }}>SYNCING LIVE ACADEMIC DATA...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, maxWidth: '600px', margin: '0 auto', mt: 5 }}>
        <Alert severity="error" sx={{ borderRadius: 4, fontWeight: 600 }}>Failed to sync with the dashboard services. Please re-authenticate your session.</Alert>
      </Box>
    );
  }

  const pieColors = [
    theme.palette.grey[400],
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.secondary.main
  ];

  const pieChartData = stats?.gradesDistribution?.map((item, index) => ({
    id: index,
    value: item.count,
    label: `Grade ${item.grade}`,
  })) || [];

  const displayedCourses = courses.slice(0, 3);

  return (
    <Box sx={{ p: { xs: 2.5, sm: 3, md: 5 }, bgcolor: theme.palette.background.default, minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Header Section */}
      <Box sx={{ 
        mb: 5, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        gap: 2 
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: theme.palette.text.primary, fontSize: { xs: '1.6rem', md: '1.9rem' }, letterSpacing: '-0.5px', mb: 0.5 }}>
            Instructor Overview
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: '13.5px', letterSpacing: '0.1px' }}>
            Performance insights for academic term
          </Typography>
        </Box>

        {stats?.lastUpdated && (
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: theme.palette.text.secondary, bgcolor: theme.palette.background.paper, px: 2, py: 1, borderRadius: '12px', border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[1] }}>
            <Box sx={{ width: 6, height: 6, bgcolor: theme.palette.success.main, borderRadius: '50%' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem', color: theme.palette.text.secondary }}>
              SYNCED: <span style={{ color: theme.palette.text.primary, fontWeight: 800 }}>{stats.lastUpdated}</span>
            </Typography>
          </Stack>
        )}
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
     <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Total Courses" value={stats?.totalCourses || 0} sub="Modules Assigned" icon={<BookOnlineIcon />} colorType="info" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Total Students" value={stats?.totalStudents || 0} sub="Currently Enrolled" icon={<GroupIcon />} colorType="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Average GPA" value={stats?.averageGPA || "0.0"} sub="Class Performance" icon={<BarChartIcon />} colorType="primary" />
        </Grid>
         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Pending Grades" value={stats?.pendingGrades || 0} sub="Requires Review" icon={<ErrorOutlineIcon />} colorType={stats && stats.pendingGrades > 0 ? "error" : "primary"} />
        </Grid>
      </Grid>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' }, 
        gap: 4, 
        alignItems: 'flex-start', 
        width: '100%' 
      }}>
        
        {/* Left Side: Courses */}
        <Box sx={{ width: { xs: '100%', lg: '70%' }, flexShrink: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: theme.palette.text.primary }}>
              Assigned Modules 
              <Chip 
                label={courses.length} 
                size="small" 
                sx={{ ml: 1, fontWeight: 800, bgcolor: theme.palette.background.paper, color: theme.palette.primary.main, borderRadius: 1.5, border: `1px solid ${theme.palette.divider}` }} 
              />
            </Typography>
            <Button 
              endIcon={<ArrowForwardIcon />} 
              sx={{ color: theme.palette.primary.main, fontWeight: 800, textTransform: 'none', '&:hover': { bgcolor: theme.palette.background.paper } }} 
              onClick={() => navigate('/doctors/courses')}
            >
              Manage All Courses
            </Button>
          </Stack>

          {displayedCourses.length > 0 ? (
            <Grid container spacing={3}>
              {displayedCourses.map((course, index) => (
                 <Grid
  size={{ xs: 12, sm: 6 }}
  key={index}
  sx={{ display: 'flex' }}
>
                  <CourseCardBrief 
                    code={course.courseID} 
                    title={course.courseName} 
                    students={course.totalStudents} 
                    pending={course.pendingGradesCount}
                    strugglingPercentage={course.strugglingStudentsPercentage} 
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ p: 5, textAlign: 'center', border: `1px dashed ${theme.palette.divider}`, boxShadow: 'none', borderRadius: 5, bgcolor: theme.palette.background.paper }}>
              <Typography sx={{ color: theme.palette.text.disabled, fontWeight: 600 }}>No active courses synchronized for this semester.</Typography>
            </Card>
          )}
        </Box>

        {/* Right Side: Chart & Alerts */}
        <Box sx={{ 
          width: { xs: '100%', lg: '30%' }, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3, 
          flexShrink: 0,
          pt: { xs: 0, lg: 7.5 } 
        }}>
          
          {stats?.gradesDistribution && (
            <Fade in={true}>
              <Card sx={{ borderRadius: 5, border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[1], width: '100%', overflow: 'hidden', bgcolor: theme.palette.background.paper }}>
                <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: theme.palette.text.primary, mb: 1.5, width: '100%', textAlign: 'left', letterSpacing: '0.3px' }}>
                    Grades Distribution
                  </Typography>
                  
                  <Box sx={{ width: '100%', height: 210, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: pieChartData,
                          innerRadius: 35,
                          outerRadius: 60,
                          paddingAngle: 2,
                          cornerRadius: 4,
                        },
                      ]}
                      width={240}
                      height={190}
                      colors={pieColors}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          )}

          <Card sx={{ backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`, color: theme.palette.primary.contrastText, borderRadius: 5, p: 0.5, boxShadow: theme.shadows[2], width: '100%' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Box sx={{ width: 6, height: 6, bgcolor: theme.palette.warning.main, borderRadius: '50%' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: theme.palette.primary.contrastText, fontSize: '0.8rem' }}>Action Required</Typography>
              </Stack>
              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1.5 }} />
              
              {stats && stats.pendingGrades > 0 ? (
                 <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, fontWeight: 500, fontSize: '0.78rem' }}>
                   You have <b style={{ color: '#ffb300' }}>{stats.pendingGrades}</b> pending grades awaiting evaluation and control submission.
                 </Typography>
              ) : (
                 <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>All grading tasks are currently up to date.</Typography>
              )}
            </CardContent>
          </Card>

        </Box>

      </Box>
    </Box>
  );
}