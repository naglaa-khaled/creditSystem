
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // 1. استيراد الهوك الخاص بالتنقل
// import {
//   Box, Typography, Grid, Card, CardContent, LinearProgress,
//   Button, IconButton, Chip, Paper, Stack, TextField, InputAdornment,
//   CircularProgress, Alert
// } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import SearchIcon from '@mui/icons-material/Search';

// interface Course {
//   offeringId: number;
//   courseId: string;
//   courseName: string;
//   studentCount: number;
//   semester: number;
//   level: number;
//   progress?: number; 
// }

// const PRIMARY_COLOR = '#394188';

// const CourseCard = ({ course }: { course: Course }) => {
//   const navigate = useNavigate(); 

//   const handleManageGrades = () => {
    
//     navigate(`/doctors/docourse/${course.courseId}`);
//   };

//   return (
//     <Card sx={{ borderRadius: 4, boxShadow: 'none', border: '1px solid #F1F5F9', height: '100%' }}>
//       <CardContent sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//           <Chip label={course.courseId} size="small" sx={{ bgcolor: '#F1F5F9', fontWeight: 700 }} />
//           <Box textAlign="right">
//             <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, display: 'block' }}>STUDENTS</Typography>
//             <Typography variant="h6" sx={{ fontWeight: 900 }}>{course.studentCount}</Typography>
//           </Box>
//         </Box>
        
//         <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, height: '4rem', overflow: 'hidden', color: PRIMARY_COLOR }}>
//           {course.courseName}
//         </Typography>

//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>COMPLETION</Typography>
//             <Typography sx={{ fontSize: '0.7rem', fontWeight: 800 }}>{course.progress || 0}%</Typography>
//           </Box>
//           <LinearProgress 
//             variant="determinate" 
//             value={course.progress || 0} 
//             sx={{ height: 8, borderRadius: 5, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: PRIMARY_COLOR, borderRadius: 5 } }} 
//           />
//         </Box>

//         <Stack direction="row" spacing={1}>
//           <Button 
//             fullWidth 
//             variant="contained" 
//             onClick={handleManageGrades} // 4. استدعاء دالة التنقل عند النقر
//             sx={{ bgcolor: PRIMARY_COLOR, borderRadius: 1.5, fontWeight: 800, textTransform: 'none', '&:hover': { bgcolor: '#2c326d' } }}
//           >
//             MANAGE GRADES
//           </Button>
//           <IconButton sx={{ bgcolor: '#F1F5F9', borderRadius: 1.5 }}><InfoOutlinedIcon fontSize="small" /></IconButton>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// export default function Docourses() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/my-courses', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setCourses(response.data);
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Unable to connect to the academic server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const filteredCourses = courses.filter(course => 
//     course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     course.courseId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return (
//     <Box sx={{ p: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
//       <CircularProgress sx={{ color: PRIMARY_COLOR }} />
//     </Box>
//   );

//   return (
//     <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
//       <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'flex-end' }, gap: 3 }}>
//         <Box>
//           <Typography variant="h3" sx={{ fontWeight: 900, color: PRIMARY_COLOR, mb: 1, letterSpacing: -1 }}>My Courses</Typography>
//           <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 600 }}>Academic Year 2026 • Instructor Dashboard</Typography>
//         </Box>

//         <TextField
//           placeholder="Search by course name..."
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ 
//             width: { xs: '100%', md: 350 },
//             '& .MuiOutlinedInput-root': {
//               borderRadius: 3,
//               bgcolor: 'white',
//               '& fieldset': { borderColor: '#394188' },
//               '&:hover fieldset': { borderColor: PRIMARY_COLOR },
//             }
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: '#94A3B8' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>{error}</Alert>}

//       <Grid container spacing={2} sx={{ mb: 6 }}>
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((course) => (
//             <Grid item xs={12} md={4} key={course.offeringId}  spacing={2} sx={{width:'48%'}}>
//               <CourseCard course={course} />
//             </Grid>
//           ))
//         ) : (
//           <Grid item xs={12}>
//             <Box sx={{ textAlign: 'center', py: 10 }}>
//               <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>No courses match your search criteria.</Typography>
//             </Box>
//           </Grid>
//         )}
//       </Grid>

   
//     </Box>
//   );
// }
// 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Typography, Grid, Card, CardContent, LinearProgress,
//   Button, IconButton, Chip, Stack, TextField, InputAdornment,
//   CircularProgress, Alert
// } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import SearchIcon from '@mui/icons-material/Search';

// // --- Interfaces ---
// interface Course {
//   offeringId: number;
//   courseId: string;    // ده اللي قيمته بتبقى "ENG 111"
//   courseName: string;
//   studentCount: number;
//   semester: number;
//   level: number;
//   progress?: number; 
// }

// const PRIMARY_COLOR = '#394188';

// // --- Sub-Component: CourseCard ---
// const CourseCard = ({ course }: { course: Course }) => {
//   const navigate = useNavigate(); 

//   const handleManageGrades = () => {
//     // التعديل الأساسي هنا: بيبعت الـ courseId اللي هو String للكود التاني
//     console.log("Navigating to:", course.courseId); 
//     navigate(`/doctors/docourse/${course.courseId}`);
//   };

//   return (
//     <Card sx={{ 
//       borderRadius: 4, 
//       boxShadow: 'none', 
//       border: '1px solid #F1F5F9', 
//       height: '100%',
//       transition: 'transform 0.2s',
//       '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
//     }}>
//       <CardContent sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//           <Chip 
//             label={course.courseId} 
//             size="small" 
//             sx={{ bgcolor: '#F1F5F9', fontWeight: 700, color: PRIMARY_COLOR }} 
//           />
//           <Box textAlign="right">
//             <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, display: 'block' }}>STUDENTS</Typography>
//             <Typography variant="h6" sx={{ fontWeight: 900 }}>{course.studentCount}</Typography>
//           </Box>
//         </Box>
        
//         <Typography variant="h5" sx={{ 
//           fontWeight: 900, 
//           mb: 3, 
//           height: '4rem', 
//           overflow: 'hidden', 
//           color: PRIMARY_COLOR,
//           display: '-webkit-box',
//           WebkitLineClamp: 2,
//           WebkitBoxOrient: 'vertical'
//         }}>
//           {course.courseName}
//         </Typography>

//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>COMPLETION</Typography>
//             <Typography sx={{ fontSize: '0.7rem', fontWeight: 800 }}>{course.progress || 0}%</Typography>
//           </Box>
//           <LinearProgress 
//             variant="determinate" 
//             value={course.progress || 0} 
//             sx={{ 
//               height: 8, 
//               borderRadius: 5, 
//               bgcolor: '#F1F5F9', 
//               '& .MuiLinearProgress-bar': { bgcolor: PRIMARY_COLOR, borderRadius: 5 } 
//             }} 
//           />
//         </Box>

//         <Stack direction="row" spacing={1}>
//           <Button 
//             fullWidth 
//             variant="contained" 
//             onClick={handleManageGrades} 
//             sx={{ 
//               bgcolor: PRIMARY_COLOR, 
//               borderRadius: 1.5, 
//               fontWeight: 800, 
//               textTransform: 'none', 
//               '&:hover': { bgcolor: '#2c326d' } 
//             }}
//           >
//             MANAGE GRADES
//           </Button>
//           <IconButton sx={{ bgcolor: '#F1F5F9', borderRadius: 1.5 }}>
//             <InfoOutlinedIcon fontSize="small" />
//           </IconButton>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// // --- Main Component: Docourses ---
// export default function Docourses() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem('accessToken');
      
//       const response = await axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/my-courses', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setCourses(response.data);
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Unable to connect to the academic server. Please check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const filteredCourses = courses.filter(course => 
//     course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     course.courseId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
//       <CircularProgress sx={{ color: PRIMARY_COLOR }} />
//     </Box>
//   );

//   return (
//     <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
//       {/* Header Section */}
//       <Box sx={{ 
//         mb: 5, 
//         display: 'flex', 
//         flexDirection: { xs: 'column', md: 'row' }, 
//         justifyContent: 'space-between', 
//         alignItems: { md: 'flex-end' }, 
//         gap: 3 
//       }}>
//         <Box>
//           <Typography variant="h3" sx={{ fontWeight: 900, color: PRIMARY_COLOR, mb: 1, letterSpacing: -1 }}>
//             My Courses
//           </Typography>
//           <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 600 }}>
//             Academic Year 2026 • Instructor Dashboard
//           </Typography>
//         </Box>

//         <TextField
//           placeholder="Search by course name or ID..."
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ 
//             width: { xs: '100%', md: 350 },
//             '& .MuiOutlinedInput-root': {
//               borderRadius: 3,
//               bgcolor: 'white',
//               '& fieldset': { borderColor: '#E2E8F0' },
//               '&:hover fieldset': { borderColor: PRIMARY_COLOR },
//               '&.Mui-focused fieldset': { borderColor: PRIMARY_COLOR },
//             }
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: '#94A3B8' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>{error}</Alert>}

//       {/* Grid */}
//       <Grid container spacing={3}>
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} key={course.offeringId}>
//               <CourseCard course={course} />
//             </Grid>
//           ))
//         ) : (
//           <Grid item xs={12}>
//             <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'white', borderRadius: 4, border: '2px dashed #E2E8F0' }}>
//               <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>
//                 No courses found.
//               </Typography>
//             </Box>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Typography, Grid, Card, CardContent, LinearProgress,
//   Button, IconButton, Chip, Stack, TextField, InputAdornment,
//   CircularProgress, Alert
// } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import SearchIcon from '@mui/icons-material/Search';

// interface Course {
//   offeringId: number;
//   courseId: string; // "ENG 111" مثلاً
//   courseName: string;
//   studentCount: number;
//   progress?: number; 
// }

// export default function Docourses() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         const response = await axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/my-courses', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCourses(response.data);
//       } catch (err) {
//         setError("فشل في تحميل الكورسات");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

//   return (
//     <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, color: '#394188' }}>My Courses</Typography>
//       <Grid container spacing={3}>
//         {courses.map((course) => (
//           <Grid item xs={12} sm={6} md={4} key={course.offeringId}>
//             <Card sx={{ borderRadius: 4, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
//               <CardContent>
//                 <Chip label={course.courseId} size="small" sx={{ mb: 2, fontWeight: 700 }} />
//                 <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, height: '3em' }}>{course.courseName}</Typography>
//                 <Button 
//                   fullWidth 
//                   variant="contained" 
//                   sx={{ bgcolor: '#394188', borderRadius: 2 }}
//                   onClick={() => navigate(`/doctors/docourse/${course.courseId}`)}
//                 >
//                   MANAGE GRADES
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Typography, Grid, Card, CardContent, LinearProgress,
//   Button, IconButton, Chip, Stack, TextField, InputAdornment,
//   CircularProgress, Alert
// } from '@mui/material';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import SearchIcon from '@mui/icons-material/Search';

// interface Course {
//   offeringId: number;
//   courseId: string;
//   courseName: string;
//   studentCount: number;
//   semester: number;
//   level: number;
//   progress?: number; 
// }

// const PRIMARY_COLOR = '#394188';

// const CourseCard = ({ course }: { course: Course }) => {
//   const navigate = useNavigate();

//   const handleManageGrades = () => {
//     // أهم خطوة: بنبعت الأوبجكت كامل عشان يظهر في الهيدر الملون
//     navigate(`/doctors/docourse/${course.courseId}`, { state: { courseData: course } });
//   };

//   return (
//     <Card sx={{ 
//       borderRadius: 4, boxShadow: 'none', border: '1px solid #F1F5F9', height: '100%',
//       transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
//     }}>
//       <CardContent sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//           <Chip label={course.courseId} size="small" sx={{ bgcolor: '#F1F5F9', fontWeight: 700, color: PRIMARY_COLOR }} />
//           <Box textAlign="right">
//             <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, display: 'block' }}>STUDENTS</Typography>
//             <Typography variant="h6" sx={{ fontWeight: 900 }}>{course.studentCount}</Typography>
//           </Box>
//         </Box>
        
//         <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, height: '4rem', color: PRIMARY_COLOR, overflow: 'hidden' }}>
//           {course.courseName}
//         </Typography>

//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//             <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>COMPLETION</Typography>
//             <Typography sx={{ fontSize: '0.7rem', fontWeight: 800 }}>{course.progress || 0}%</Typography>
//           </Box>
//           <LinearProgress variant="determinate" value={course.progress || 0} sx={{ height: 8, borderRadius: 5 }} />
//         </Box>

//         <Stack direction="row" spacing={1}>
//           <Button fullWidth variant="contained" onClick={handleManageGrades} sx={{ bgcolor: PRIMARY_COLOR, borderRadius: 1.5, fontWeight: 800 }}>
//             MANAGE GRADES
//           </Button>
//           <IconButton sx={{ bgcolor: '#F1F5F9', borderRadius: 1.5 }}><InfoOutlinedIcon fontSize="small" /></IconButton>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// export default function Docourses() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMyCourses = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         const res = await axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/my-courses', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCourses(res.data);
//       } catch (err) {
//         setError("Unable to load courses.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyCourses();
//   }, []);

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

//   return (
//     <Box sx={{ p: 5, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      
//       <Typography variant="h3" sx={{ fontWeight: 900, color: PRIMARY_COLOR, mb: 4 }}>My Courses</Typography>
//       {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
//       <Grid container spacing={3}>
//         {courses.map((c) => (
//           <Grid item xs={12} sm={6} md={4} key={c.offeringId} width={'45%'}>
//             <CourseCard course={c} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, LinearProgress,
  Button, IconButton, Chip, Stack, TextField, InputAdornment,
  CircularProgress, Alert
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';

interface Course {
  offeringId: number;
  courseId: string;
  courseName: string;
  studentCount: number;
  semester: number;
  level: number;
  progress?: number; 
}

const PRIMARY_COLOR = '#394188';

const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  const handleManageGrades = () => {
    navigate(`/doctors/docourse/${course.courseId}`, { state: { courseData: course } });
  };

  return (
    <Card sx={{ 
      borderRadius: 4, boxShadow: 'none', border: '1px solid #F1F5F9', height: '100%',
      transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Chip label={course.courseId} size="small" sx={{ bgcolor: '#F1F5F9', fontWeight: 700, color: PRIMARY_COLOR }} />
          <Box textAlign="right">
            <Typography variant="overline" sx={{ color: '#94A3B8', fontWeight: 800, display: 'block' }}>STUDENTS</Typography>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>{course.studentCount}</Typography>
          </Box>
        </Box>
        
        <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, height: '4rem', color: PRIMARY_COLOR, overflow: 'hidden' }}>
          {course.courseName}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>COMPLETION</Typography>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 800 }}>{course.progress || 0}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={course.progress || 0} sx={{ height: 8, borderRadius: 5 }} />
        </Box>

        <Stack direction="row" spacing={1}>
          <Button fullWidth variant="contained" onClick={handleManageGrades} sx={{ bgcolor: PRIMARY_COLOR, borderRadius: 1.5, fontWeight: 800 }}>
         Course Details
          </Button>
          <IconButton sx={{ bgcolor: '#F1F5F9', borderRadius: 1.5 }}><InfoOutlinedIcon fontSize="small" /></IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function Docourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // الحالة الخاصة بالبحث

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('https://credithourssystemw.premiumasp.net/api/Instructors/my-courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data);
      } catch (err) {
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  // تصفية الكورسات بناءً على كلمة البحث
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 5, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: PRIMARY_COLOR }}>My Courses</Typography>
        
      
        <TextField
          placeholder="Search by course name..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: { xs: '100%', md: 350 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'white',
              '& fieldset': { borderColor: '#394188' },
              '&:hover fieldset': { borderColor: PRIMARY_COLOR },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94A3B8' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <Grid container spacing={3}>
        {filteredCourses.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.offeringId}  sx={{width:'45%'}}>
            <CourseCard course={c} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}