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

// --- Interfaces ---
interface Course {
  offeringId: number;
  courseId: string;
  courseName: string;
  studentCount: number;
  semester: number;
  level: number;
  progress?: number; 
}

const getCourseTheme = (courseName: string, mode: 'light' | 'dark') => {
  const name = courseName.toLowerCase();
  const isLight = mode === 'light';

  if (name.includes('math') || name.includes('eng')) {
    return {
      icon: '📐',
      cardBg: isLight ? 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)' : 'linear-gradient(135deg, #0f172a 0%, #075985 100%)',
      borderHover: '#0EA5E9',
      progressBg: 'linear-gradient(90deg, #0284C7 0%, #38BDF8 100%)',
      chipBg: isLight ? '#E0F2FE' : '#0369A1',
      chipColor: isLight ? '#0369A1' : '#E0F2FE'
    };
  }
  if (name.includes('code') || name.includes('cs') || name.includes('system')) {
    return {
      icon: '💻',
      cardBg: isLight ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)',
      borderHover: '#3B82F6',
      progressBg: 'linear-gradient(90deg, #1D4ED8 0%, #60A5FA 100%)',
      chipBg: isLight ? '#DBEAFE' : '#1e3a8a',
      chipColor: isLight ? '#1E40AF' : '#DBEAFE'
    };
  }
  return {
    icon: '✨',
    cardBg: isLight ? 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)' : 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    borderHover: '#64748B',
    progressBg: 'linear-gradient(90deg, #475569 0%, #94A3B8 100%)',
    chipBg: isLight ? '#E2E8F0' : '#475569',
    chipColor: isLight ? '#334155' : '#F1F5F9'
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

const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const courseTheme = getCourseTheme(course.courseName, theme.palette.mode);
  const courseProgress = calculateDynamicProgress(course.courseId, course.progress);

  const handleManageGrades = () => {
    navigate(`/doctors/docourse/${course.courseId}`, { state: { courseData: course } });
  };

  return (
    <Card sx={{ 
      borderRadius: 6, 
      background: courseTheme.cardBg,
      border: theme.palette.mode === 'light' ? '1px solid rgba(255, 255, 255, 0.7)' : '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: theme.palette.mode === 'light' ? '0 4px 30px rgba(0, 0, 0, 0.03)' : '0 4px 30px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', 
      '&:hover': { 
        transform: 'translateY(-8px) scale(1.01)', 
        boxShadow: `0 20px 40px ${theme.palette.mode === 'light' ? 'rgba(57, 65, 136, 0.12)' : 'rgba(0, 0, 0, 0.4)'}`,
        borderColor: courseTheme.borderHover,
        '& .manage-btn': {
          transform: 'scale(1.03)',
          boxShadow: `0 8px 20px ${theme.palette.mode === 'light' ? 'rgba(57, 65, 136, 0.3)' : 'rgba(0, 0, 0, 0.5)'}`,
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
              px: 1.5,
              py: 0.5,
              borderRadius: 3,
              fontSize: '0.75rem'
            }} 
          />
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1} 
            sx={{ 
              bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(30, 41, 59, 0.6)', 
              px: 2, 
              py: 0.5, 
              borderRadius: 4, 
              border: `1px solid ${theme.palette.divider}` 
            }}
          >
            <GroupIcon sx={{ color: theme.palette.success.main, fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
              {course.studentCount} Students
            </Typography>
          </Stack>
        </Box>
        
        <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 4, flexGrow: 1 }}>
          <Box sx={{ 
            width: 56, 
            height: 56, 
            borderRadius: 4, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: theme.palette.background.paper,
            fontSize: '1.8rem',
            boxShadow: '0 8px 16px rgba(0,0,0,0.04)',
            flexShrink: 0
          }}>
            {courseTheme.icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.3, color: theme.palette.text.primary, letterSpacing: '-0.5px' }}>
            {course.courseName}
          </Typography>
        </Stack>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: theme.palette.text.secondary, letterSpacing: 0.8 }}>SEMESTER PROGRESS</Typography>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 900, color: theme.palette.primary.main }}>{courseProgress}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={courseProgress} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
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
              bgcolor: theme.palette.primary.main, 
              color: theme.palette.primary.contrastText,
              borderRadius: 3.5, 
              fontWeight: 800,
              textTransform: 'none',
              py: 1.2,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              '&:hover': { bgcolor: theme.palette.primary.dark }
            }}
          >
            Course Details
          </Button>
          <IconButton 
            sx={{ 
              bgcolor: theme.palette.background.paper, 
              borderRadius: 3.5, 
              width: 48, 
              height: 48, 
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
      
      {/* الدوائر الديكورية الخلفية اتعدلت ألوانها عشان ماتبقاش فاقعة في الـ Dark mode */}
      <Box sx={{ position: 'absolute', width: { xs: 200, md: 300 }, height: { xs: 200, md: 300 }, borderRadius: '50%', background: theme.palette.mode === 'light' ? 'radial-gradient(circle, #EFF6FF 0%, rgba(255,255,255,0) 70%)' : 'radial-gradient(circle, rgba(57, 65, 136, 0.15) 0%, rgba(0,0,0,0) 70%)', top: -50, left: -50, zIndex: 0 }} />
      <Box sx={{ position: 'absolute', width: { xs: 250, md: 400 }, height: { xs: 250, md: 400 }, borderRadius: '50%', background: theme.palette.mode === 'light' ? 'radial-gradient(circle, #F0F9FF 0%, rgba(255,255,255,0) 70%)' : 'radial-gradient(circle, rgba(49, 130, 206, 0.15) 0%, rgba(0,0,0,0) 70%)', bottom: -100, right: -100, zIndex: 0 }} />

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
                ? '0 12px 25px -5px rgba(57, 65, 136, 0.18), 0 4px 12px rgba(57, 65, 136, 0.04)' 
                : '0 12px 25px -5px rgba(0, 0, 0, 0.5)'
              : '0 4px 18px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              borderColor: isFocused ? theme.palette.primary.main : theme.palette.text.disabled,
              boxShadow: isFocused ? '0 12px 25px -5px rgba(57, 65, 136, 0.18)' : '0 6px 20px rgba(0, 0, 0, 0.04)'
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
          <Grid
  container
  spacing={{ xs: 3, md: 4 }}
  justifyContent="space-between"
>
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
        <CastForEducationIcon
          sx={{ fontSize: 64, color: '#94A3B8', mb: 2 }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: '#64748B' }}
        >
          No active courses found.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#94A3B8', mt: 0.5 }}
        >
          Try adjusting your search criteria.
        </Typography>
      </Box>
    </Grid>
  ) : (
    filteredCourses.map((c) => (
      <Grid
        key={c.offeringId}
        sx={{
          width: {
            xs: '100%',
            sm: '48%',
            md: '45%',
          },
        }}
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