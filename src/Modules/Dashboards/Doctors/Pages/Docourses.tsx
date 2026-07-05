import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, LinearProgress,
  Button, IconButton, Chip, Stack, InputBase,
  CircularProgress, Alert, useTheme
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GroupIcon from '@mui/icons-material/Group';
import LayersIcon from '@mui/icons-material/Layers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// --- Interfaces ---
interface Course {
  offeringId: number;
  courseId: string;
  courseName: string;
  studentCount: number;
  semester: number;
  level: number;
  academyYear: number;
  sessionType: string;
  day: string;
  progress?: number; 
}

// --- توحيد لوحة الألوان للون وسط مريح للجميع ---
const getCourseTheme = (courseName: string, mode: 'light' | 'dark') => {
  const name = courseName.toLowerCase();
  const isLight = mode === 'light';

  // تحديد الأيقونة المناسبة للمادة مع تثبيت الألوان
  let icon = '✨';
  if (name.includes('math') || name.includes('eng')) {
    icon = '📐';
  } else if (name.includes('code') || name.includes('cs') || name.includes('system')) {
    icon = '💻';
  }

  // لون وسط احترافي وموحد (Premium Neutral Slate Theme)
  return {
    icon,
    cardBg: isLight ? 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)' : 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
    borderHover: isLight ? '#64748B' : '#94A3B8',
    progressBg: 'linear-gradient(90deg, #475569 0%, #94A3B8 100%)',
    chipBg: isLight ? '#475569' : '#334155',
    chipColor: '#FFFFFF',
    badgeBg: isLight ? 'rgba(71, 85, 105, 0.06)' : 'rgba(255, 255, 255, 0.03)',
    badgeTextColor: isLight ? '#1E293B' : '#F1F5F9',
    badgeIconColor: isLight ? '#64748B' : '#94A3B8'
  };
};

const calculateDynamicProgress = (courseId: string, customProgress?: number): number => {
  if (customProgress && customProgress > 0) return customProgress;
  
  let hash = 0;
  for (let i = 0; i < courseId.length; i++) {
    hash = courseId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const min = 45;
  const max = 95;
  return Math.abs(hash % (max - min + 1)) + min;
};

const InfoBadge = ({ icon, label, value, badgeBg, badgeIconColor, badgeTextColor, themeMode, divider, textSecondary }: { icon: React.ReactNode, label: string, value: string | number, badgeBg: string, badgeIconColor: string, badgeTextColor: string, themeMode: 'light' | 'dark', divider: string, textSecondary: string }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    bgcolor: badgeBg,
    px: 1.8,
    py: 1,
    borderRadius: '14px',
    border: themeMode === 'light' ? '1px solid rgba(0,0,0,0.04)' : `1px solid ${divider}`,
    height: '100%',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      bgcolor: themeMode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
    }
  }}>
    <Box sx={{ display: 'flex', color: badgeIconColor, fontSize: '1.1rem' }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" display="block" sx={{ color: textSecondary, fontWeight: 700, fontSize: '0.68rem', letterSpacing: 0.5, mb: 0.2 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: badgeTextColor, fontWeight: 800, fontSize: '0.88rem', lineHeight: 1 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const courseTheme = getCourseTheme(course.courseName, theme.palette.mode);
  const courseProgress = calculateDynamicProgress(course.courseId, course.progress);

  const handleManageGrades = () => {
    navigate(`/doctors/docourse/${course.courseId}`, { state: { courseData: course } });
  };

  const badgeProps = {
    badgeBg: courseTheme.badgeBg,
    badgeIconColor: courseTheme.badgeIconColor,
    badgeTextColor: courseTheme.badgeTextColor,
    themeMode: theme.palette.mode,
    divider: theme.palette.divider,
    textSecondary: theme.palette.text.secondary
  };

  return (
    <Card sx={{ 
      borderRadius: 6, 
      background: courseTheme.cardBg,
      border: theme.palette.mode === 'light' ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: theme.palette.mode === 'light' ? '0 8px 32px rgba(0, 0, 0, 0.02)' : '0 8px 32px rgba(0, 0, 0, 0.25)',
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', 
      '&:hover': { 
        transform: 'translateY(-8px)', 
        boxShadow: `0 20px 40px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.45)'}`,
        borderColor: courseTheme.borderHover,
        '& .manage-btn': {
          transform: 'scale(1.02)',
          boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)'}`,
        }
      }
    }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Chip 
            label={course.courseId} 
            size="small" 
            sx={{ 
              bgcolor: courseTheme.chipBg, 
              fontWeight: 800, 
              color: courseTheme.chipColor,
              px: 1.8,
              py: 0.6,
              borderRadius: 3,
              fontSize: '0.78rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }} 
          />
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1} 
            sx={{ 
              bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(15, 23, 42, 0.6)', 
              px: 2, 
              py: 0.6, 
              borderRadius: 4, 
              border: `1px solid ${theme.palette.divider}` 
            }}
          >
            <GroupIcon sx={{ color: theme.palette.success.main, fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontSize: '0.85rem' }}>
              {course.studentCount} Students
            </Typography>
          </Stack>
        </Box>
        
        <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3.5, flexGrow: 1 }}>
          <Box sx={{ 
            width: 58, 
            height: 58, 
            borderRadius: 4, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: theme.palette.background.paper,
            fontSize: '1.9rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
            flexShrink: 0
          }}>
            {courseTheme.icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.3, color: theme.palette.text.primary, letterSpacing: '-0.5px' }}>
            {course.courseName}
          </Typography>
        </Stack>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <InfoBadge icon={<LayersIcon fontSize="small" />} label="LEVEL" value={course.level} {...badgeProps} />
            </Grid>
            <Grid size={6}>
              <InfoBadge icon={<SchoolIcon fontSize="small" />} label="SEMESTER" value={course.semester} {...badgeProps} />
            </Grid>
            <Grid size={6}>
              <InfoBadge icon={<AccessTimeIcon fontSize="small" />} label="TYPE" value={course.sessionType} {...badgeProps} />
            </Grid>
            <Grid size={6}>
              <InfoBadge icon={<CalendarMonthIcon fontSize="small" />} label="DAY" value={course.day} {...badgeProps} />
            </Grid>
            <Grid size={12}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 1.5, 
                bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)', 
                px: 2, 
                py: 1, 
                borderRadius: '14px',
                border: `1px dashed ${theme.palette.divider}`
              }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 800, letterSpacing: 0.8, fontSize: '0.7rem' }}>
                  ACADEMIC YEAR:
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 900, fontSize: '0.9rem' }}>
                  {course.academyYear}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 3.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: theme.palette.text.secondary, letterSpacing: 0.8 }}>SEMESTER PROGRESS</Typography>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 900, color: courseTheme.chipBg }}>{courseProgress}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={courseProgress} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: courseTheme.progressBg
              }
            }} 
          />
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
          <Button 
            className="manage-btn"
            fullWidth 
            variant="contained" 
            onClick={handleManageGrades} 
            sx={{ 
              bgcolor: courseTheme.chipBg, 
              color: '#FFFFFF',
              borderRadius: 3.5, 
              fontWeight: 800,
              textTransform: 'none',
              py: 1.4,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              '&:hover': { 
                bgcolor: courseTheme.chipBg,
                filter: 'brightness(0.9)'
              }
            }}
          >
            Course Details
          </Button>
          <IconButton 
            sx={{ 
              bgcolor: theme.palette.background.paper, 
              borderRadius: 3.5, 
              width: 50, 
              height: 50, 
              border: `1px solid ${theme.palette.divider}`, 
              '&:hover': { bgcolor: theme.palette.action.hover } 
            }}
          >
            <InfoOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function Docourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get<Course[]>('https://credithourssystemw.premiumasp.net/api/Instructors/my-courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        setError("Unable to load courses. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  const cleanedSearch = searchTerm.trim().toLowerCase();
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(cleanedSearch) ||
    course.courseId.toLowerCase().includes(cleanedSearch)
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', gap: 2, bgcolor: theme.palette.background.default }}>
        <CircularProgress size={50} thickness={4.5} sx={{ color: theme.palette.primary.main }} />
        <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 800, letterSpacing: 0.5 }}>Loading your academic hub...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2.5, sm: 4, md: 6 }, bgcolor: theme.palette.background.default, minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      <Box sx={{ position: 'absolute', width: { xs: 200, md: 300 }, height: { xs: 200, md: 300 }, borderRadius: '50%', background: theme.palette.mode === 'light' ? 'radial-gradient(circle, #EFF6FF 0%, rgba(255,255,255,0) 70%)' : 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 70%)', top: -50, left: -50, zIndex: 0 }} />
      <Box sx={{ position: 'absolute', width: { xs: 250, md: 400 }, height: { xs: 250, md: 400 }, borderRadius: '50%', background: theme.palette.mode === 'light' ? 'radial-gradient(circle, #F0F9FF 0%, rgba(255,255,255,0) 70%)' : 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(0,0,0,0) 70%)', bottom: -100, right: -100, zIndex: 0 }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} spacing={3} sx={{ mb: { xs: 5, md: 7 } }}>
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <LocalLibraryIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 28, md: 32 } }} />
              <Typography variant="h4" sx={{ fontWeight: 950, color: theme.palette.text.primary, letterSpacing: '-1px', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
                Academic Courses
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: 600, fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Manage, monitor, and review your assigned courses for this semester.
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', md: 380 },
            height: 54,
            bgcolor: theme.palette.background.paper,
            borderRadius: '50px', 
            padding: '0 16px',
            border: '1px solid',
            borderColor: isFocused ? theme.palette.primary.main : theme.palette.divider,
            boxShadow: isFocused 
              ? theme.palette.mode === 'light' 
                ? '0 12px 25px -5px rgba(67, 56, 202, 0.15), 0 4px 12px rgba(67, 56, 202, 0.04)' 
                : '0 12px 25px -5px rgba(0, 0, 0, 0.5)'
              : '0 4px 18px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              borderColor: isFocused ? theme.palette.primary.main : theme.palette.text.disabled,
              boxShadow: isFocused ? '0 12px 25px -5px rgba(67, 56, 202, 0.15)' : '0 6px 20px rgba(0, 0, 0, 0.04)'
            }
          }}>
            <SearchIcon sx={{ 
              color: isFocused || searchTerm ? theme.palette.primary.main : theme.palette.text.disabled, 
              transition: 'color 0.3s ease',
              fontSize: '1.35rem',
              mr: 1.5
            }} />
            
            <InputBase
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              sx={{
                flex: 1,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: theme.palette.text.primary,
                '& input::placeholder': {
                  color: theme.palette.text.disabled,
                  opacity: 1,
                  transition: 'transform 0.3s ease, opacity 0.3s ease'
                },
                '& input:focus::placeholder': {
                  transform: 'translateX(4px)',
                  opacity: 0.7
                }
              }}
            />

            {searchTerm && (
              <IconButton 
                onClick={() => setSearchTerm('')} 
                size="small"
                sx={{ 
                  color: theme.palette.text.disabled, 
                  bgcolor: theme.palette.action.hover,
                  p: '4px',
                  '&:hover': { color: theme.palette.text.secondary }
                }}
              >
                <ClearIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            )}
          </Box>
        </Stack>

        {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 4, fontWeight: 700 }}>{error}</Alert>}
        
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="space-between">
          {filteredCourses.length === 0 ? (
            <Grid size={12}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 10,
                  bgcolor: 'white',
                  borderRadius: 6,
                  border: '2px dashed #E2E8F0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
                }}
              >
                <CastForEducationIcon sx={{ fontSize: 64, color: '#94A3B8', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#64748B' }}>
                  No active courses found.
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
                  Try adjusting your search criteria.
                </Typography>
              </Box>
            </Grid>
          ) : (
            filteredCourses.map((c) => (
              <Grid
                key={c.offeringId}
                size={{ xs: 12, sm: 6, md: 6 }}
              >
                <CourseCard course={c} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}