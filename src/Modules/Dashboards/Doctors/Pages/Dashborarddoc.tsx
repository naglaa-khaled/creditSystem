


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box, Typography, Grid, Card, CardContent, Chip,
//   CircularProgress, Button, Stack, Divider, Alert
// } from '@mui/material';
// import GroupIcon from '@mui/icons-material/Group';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { Navigate, useNavigate } from 'react-router-dom';

// const PRIMARY_COLOR = '#394188';
// //  let navigate = useNavigate();

// // --- مكون كارت الإحصائيات (StatCard) ---
// const StatCard = ({ title, value, sub, icon, color }: any) => (
//   <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #EFF0F6', height: '100%' }}>
//     <CardContent sx={{ p: 3 }}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="overline" sx={{ fontWeight: 800, color: '#6F767E' }}>{title}</Typography>
//         <Box sx={{ p: 1, bgcolor: color === 'red' ? '#FFF1F2' : '#F4F7FF', borderRadius: 2, color: color === 'red' ? '#EF4444' : PRIMARY_COLOR }}>
//           {icon}
//         </Box>
//       </Stack>
//       {/* تم تغيير لون النص هنا إلى اللون المفضل */}
//       <Typography variant="h4" sx={{ fontWeight: 900, color: PRIMARY_COLOR }}>{value}</Typography>
//       <Typography variant="caption" sx={{ color: '#9A9FA5', fontWeight: 600 }}>{sub}</Typography>
//     </CardContent>
//   </Card>
// );

// // --- مكون كارت المادة (CourseCardBrief) ---
// const CourseCardBrief = ({ code, title, students, pending }: any) => (
//   <Card sx={{ 
//     borderRadius: 4, 
//     border: '1px solid #EFF0F6', 
//     boxShadow: 'none', 
//     height: '100%',
//     transition: '0.3s', 
//     '&:hover': { boxShadow: '0 10px 25px rgba(57, 65, 136, 0.08)', borderColor: PRIMARY_COLOR } 
//   }}>
//     <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
//       <Box>
//         {/* تم تغيير خلفية الـ Chip لتناسب اللون المفضل */}
//         <Chip label={code || "N/A"} size="small" sx={{ bgcolor: PRIMARY_COLOR, color: '#fff', fontWeight: 700, mb: 1.5, borderRadius: 1.5 }} />
//         <Typography variant="subtitle1" sx={{ 
//             fontWeight: 800, mb: 2, color: PRIMARY_COLOR, 
//             minHeight: '2.8em', display: '-webkit-box', 
//             WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
//         }}>
//           {title}
//         </Typography>
//       </Box>
      
//       <Box>
//         <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Typography variant="caption" sx={{ color: '#6F767E', fontWeight: 700 }}>👤 {students} Students</Typography>
//           <Chip 
//             label={pending > 0 ? `${pending} Pending` : 'No Actions'} 
//             size="small" 
//             sx={{ 
//                 height: 20, fontSize: '0.65rem', fontWeight: 800,
//                 bgcolor: pending > 0 ? '#FFF1F2' : '#F0FDF4',
//                 color: pending > 0 ? '#EF4444' : '#16A34A'
//             }} 
//           />
//         </Stack>
//       </Box>
//     </CardContent>
//   </Card>
// );

// export default function Dashborarddoc() {
//   const [stats, setStats] = useState<any>(null);
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       setError(false);
//       try {
//         const token = localStorage.getItem('accessToken');
//         if (!token) throw new Error("No Token Found");

//         const headers = { Authorization: `Bearer ${token}` };

//         const [statsRes, insightsRes] = await Promise.all([
//           axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/dashboard-stats', { headers }),
//           axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/dashboard-insights', { headers })
//         ]);

//         setStats(statsRes.data);
//         if (insightsRes.data?.coursesSummary) {
//           setCourses(insightsRes.data.coursesSummary);
//         }
//       } catch (err) {
//         console.error("API Error:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#F8F9FB' }}>
//         <CircularProgress sx={{ color: PRIMARY_COLOR, mb: 2 }} />
//         <Typography variant="body2" sx={{ fontWeight: 700, color: '#6F767E' }}>Fetching Live Data...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 4 }}>
//         <Alert severity="error" sx={{ borderRadius: 3 }}>Failed to load dashboard data. Please check your connection or login again.</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#F8F9FB', minHeight: '100vh' }}>
//       {/* Header Section */}
//       <Box sx={{ mb: 5 }}>
     
//         <Typography variant="h4" sx={{ fontWeight: 900, color: PRIMARY_COLOR, mb: 1 }}>Instructor Overview</Typography>
//         <Typography variant="body1" sx={{ color: '#6F767E', fontWeight: 500 }}>Live insights for Academic Year 2026</Typography>
//       </Box>

//       <Grid container spacing={5}>
//         {/* Main Section (75%) */}
//         <Grid item xs={12} lg={9}>
          
//           {/* Dynamic Stats */}
//           <Grid container spacing={2} sx={{ mb: 6 }}>
//             <Grid item xs={12} md={4} sx={{ width:"29%"}} >
//               <StatCard title="Total Students" value={stats?.totalStudents || 0} sub="Currently Enrolled" icon={<GroupIcon />} />
//             </Grid>
//             <Grid item xs={12} md={4}  sx={{ width:"29%"}}>
//               <StatCard title="Average GPA" value={stats?.averageGPA || "0.0"} sub="Aggregate Performance" icon={<BarChartIcon />} />
//             </Grid>
//             <Grid item xs={12} md={4}  sx={{ width:"29%"}}>
//               <StatCard 
//                 title="Pending Grades" 
//                 value={stats?.pendingGrades || 0} 
//                 sub="Submissions Required" 
//                 icon={<ErrorOutlineIcon />} 
//                 color={stats?.pendingGrades > 0 ? "red" : ""} 
//               />
//             </Grid>
//           </Grid>

//           {/* Section Title with Action */}
//           <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//             <Typography variant="h6" sx={{ fontWeight: 900, color: PRIMARY_COLOR }}>
//                 Recent Courses <Chip label={courses.length} size="small" sx={{ ml: 1, fontWeight: 800, bgcolor: '#F4F7FF', color: PRIMARY_COLOR }} />
//             </Typography>
//                <Button 
//   endIcon={<ArrowForwardIcon />} 
//   sx={{ color: PRIMARY_COLOR, fontWeight: 800 }}
//   // onClick={() => navigate('/doctors/courses')}   
// >
//   Manage All Courses
// </Button>
            
//           </Stack>

//           {/* Dynamic Course Grid */}
//           <Grid container spacing={3} >
//             {courses.length > 0 ? (
//               courses.slice(0, 5).map((course, index) => (
//                 <Grid item xs={12} md={4} key={index} sx={{display:"flex" }}>
//                    <Box sx={{ width: '100%' }}>
//                         <CourseCardBrief 
//                             code={course.courseID} 
//                             title={course.courseName} 
//                             students={course.totalStudents} 
//                             pending={course.pendingGradesCount} 
//                         />
//                    </Box>
                

//                 </Grid>
     
//               ))
//             ) : (
//               <Grid item xs={12}>
//                 <Typography sx={{ color: '#9A9FA5', textAlign: 'center', py: 5 }}>No courses found for this semester.</Typography>
//               </Grid>
//             )}
//           </Grid>
//         </Grid>

//         {/* Sidebar Section (25%) */}
//         <Grid item xs={12} lg={3}>
//           <Stack spacing={3}>

//             <Card sx={{ bgcolor: PRIMARY_COLOR, color: '#fff', borderRadius: 5, p: 1 }}>
//               <CardContent>
//                 <Stack direction="row" spacing={1} alignItems="center" mb={2}>
//                   <NotificationsActiveIcon sx={{ color: '#FFD166' }} fontSize="small" />
//                   <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Quick Alerts</Typography>
//                 </Stack>
//                 <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                
//                 {stats?.pendingGrades > 0 ? (
//                    <Typography variant="body2" sx={{ color: '#E2E8F0', lineHeight: 1.6 }}>
//                      You have <b>{stats.pendingGrades}</b> grades that need review across your courses.
//                    </Typography>
//                 ) : (
//                    <Typography variant="body2" sx={{ color: '#9A9FA5' }}>All grading tasks are currently up to date.</Typography>
//                 )}
//               </CardContent>
//             </Card>

          
//           </Stack>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, Grid, Card, CardContent, Chip,
  CircularProgress, Button, Stack, Divider, Alert
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';

const PRIMARY_COLOR = '#394188';

// --- مكون كارت الإحصائيات (StatCard) ---
const StatCard = ({ title, value, sub, icon, color }: any) => (
  <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #EFF0F6', height: '100%' }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="overline" sx={{ fontWeight: 800, color: '#6F767E' }}>{title}</Typography>
        <Box sx={{ p: 1, bgcolor: color === 'red' ? '#FFF1F2' : '#F4F7FF', borderRadius: 2, color: color === 'red' ? '#EF4444' : PRIMARY_COLOR }}>
          {icon}
        </Box>
      </Stack>
      <Typography variant="h4" sx={{ fontWeight: 900, color: PRIMARY_COLOR }}>{value}</Typography>
      <Typography variant="caption" sx={{ color: '#9A9FA5', fontWeight: 600 }}>{sub}</Typography>
    </CardContent>
  </Card>
);

// --- مكون كارت المادة (CourseCardBrief) ---
const CourseCardBrief = ({ code, title, students, pending }: any) => (
  <Card sx={{ 
    borderRadius: 4, 
    border: '1px solid #EFF0F6', 
    boxShadow: 'none', 
    height: '100%',
    transition: '0.3s', 
    '&:hover': { boxShadow: '0 10px 25px rgba(57, 65, 136, 0.08)', borderColor: PRIMARY_COLOR } 
  }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <Box>
        <Chip label={code || "N/A"} size="small" sx={{ bgcolor: PRIMARY_COLOR, color: '#fff', fontWeight: 700, mb: 1.5, borderRadius: 1.5 }} />
        <Typography variant="subtitle1" sx={{ 
            fontWeight: 800, mb: 2, color: PRIMARY_COLOR, 
            minHeight: '2.8em', display: '-webkit-box', 
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
        }}>
          {title}
        </Typography>
      </Box>
      
      <Box>
        <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" sx={{ color: '#6F767E', fontWeight: 700 }}>👤 {students} Students</Typography>
          <Chip 
            label={pending > 0 ? `${pending} Pending` : 'No Actions'} 
            size="small" 
            sx={{ 
                height: 20, fontSize: '0.65rem', fontWeight: 800,
                bgcolor: pending > 0 ? '#FFF1F2' : '#F0FDF4',
                color: pending > 0 ? '#EF4444' : '#16A34A'
            }} 
          />
        </Stack>
      </Box>
    </CardContent>
  </Card>
);

export default function Dashborarddoc() {
  const navigate = useNavigate(); 
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(false);
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error("No Token Found");

        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, insightsRes] = await Promise.all([
          axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/dashboard-stats', { headers }),
          axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/dashboard-insights', { headers })
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
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#F8F9FB' }}>
        <CircularProgress sx={{ color: PRIMARY_COLOR, mb: 2 }} />
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#6F767E' }}>Fetching Live Data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>Failed to load dashboard data. Please check your connection or login again.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#F8F9FB', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: PRIMARY_COLOR, mb: 1 }}>Instructor Overview</Typography>
        <Typography variant="body1" sx={{ color: '#6F767E', fontWeight: 500 }}>Live insights for Academic Year 2026</Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} lg={9}>
          
          {/* Dynamic Stats */}
          <Grid container spacing={2} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4} sx={{ width:"29%"}} >
              <StatCard title="Total Students" value={stats?.totalStudents || 0} sub="Currently Enrolled" icon={<GroupIcon />} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ width:"29%"}}>
              <StatCard title="Average GPA" value={stats?.averageGPA || "0.0"} sub="Aggregate Performance" icon={<BarChartIcon />} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ width:"29%"}}>
              <StatCard 
                title="Pending Grades" 
                value={stats?.pendingGrades || 0} 
                sub="Submissions Required" 
                icon={<ErrorOutlineIcon />} 
                color={stats?.pendingGrades > 0 ? "red" : ""} 
              />
            </Grid>
          </Grid>

          {/* Section Title with Action */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: PRIMARY_COLOR }}>
                Recent Courses <Chip label={courses.length} size="small" sx={{ ml: 1, fontWeight: 800, bgcolor: '#F4F7FF', color: PRIMARY_COLOR }} />
            </Typography>
            
            <Button 
              endIcon={<ArrowForwardIcon />} 
              sx={{ color: PRIMARY_COLOR, fontWeight: 800 }}
              onClick={() => navigate('/doctors/courses')} 
            >
              Manage All Courses
            </Button>
          </Stack>

          {/* Dynamic Course Grid */}
          <Grid container spacing={3}>
            {courses.length > 0 ? (
              courses.slice(0, 6).map((course, index) => (
                <Grid item xs={12} md={4} key={index} sx={{ display: "flex" }}>
                  <Box sx={{ width: '100%' }}>
                    <CourseCardBrief 
                        code={course.courseID} 
                        title={course.courseName} 
                        students={course.totalStudents} 
                        pending={course.pendingGradesCount} 
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ color: '#9A9FA5', textAlign: 'center', py: 5 }}>No courses found for this semester.</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} lg={3}>
          <Stack spacing={3}>
            <Card sx={{ bgcolor: PRIMARY_COLOR, color: '#fff', borderRadius: 5, p: 1 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <NotificationsActiveIcon sx={{ color: '#FFD166' }} fontSize="small" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Quick Alerts</Typography>
                </Stack>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                
                {stats?.pendingGrades > 0 ? (
                   <Typography variant="body2" sx={{ color: '#E2E8F0', lineHeight: 1.6 }}>
                     You have <b>{stats.pendingGrades}</b> grades that need review across your courses.
                   </Typography>
                ) : (
                   <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>All grading tasks are currently up to date.</Typography>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}