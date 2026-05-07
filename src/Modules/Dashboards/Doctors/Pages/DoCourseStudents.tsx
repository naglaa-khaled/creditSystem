// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Typography, Grid, Card, CardContent, Button, Chip, Stack,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, LinearProgress, Avatar, TextField
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import SearchIcon from '@mui/icons-material/Search';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

// // --- Interfaces ---
// interface CourseAnalytics {
//   courseInfo: { courseId: string; courseName: string | null; academicYear: number; semester: number; };
//   summary: { totalStudents: number; passed: number; failed: number; average: number; highestGrade: number; lowestGrade: number; };
//   gradeDistribution: { grade: string; count: number; }[];
// }

// interface Student {
//   studentID: number;
//   studentName: string;
//   registrationDate: string;
//   status: string;
// }

// interface Prerequisite {
//   prereqID: number;
//   courseID: string;
//   prerequisiteCourseID: string;
// }

// export default function DoCourseStudents() {
//   const [analytics, setAnalytics] = useState<CourseAnalytics | null>(null);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   const MAIN_COLOR = "#394188";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
      
//         await new Promise(resolve => setTimeout(resolve, 1000));

    
//         const mockAnalytics: CourseAnalytics = {
//           courseInfo: { courseId: "CS201", courseName: "OOP", academicYear: 2026, semester: 1 },
//           summary: { totalStudents: 2, passed: 2, failed: 0, average: 78, highestGrade: 81, lowestGrade: 75 },
//           gradeDistribution: [
//             { grade: "+B", count: 1 },
//             { grade: "B", count: 1 }
//           ]
//         };

//         // 2. بيانات وهمية مطابقة لصورة الـ Swagger (Students List)
//         const mockStudents: Student[] = [
//           { studentID: 100, studentName: "أحمد محمد علي", registrationDate: "2026-04-21T23:52:41", status: "Active" },
//           { studentID: 101, studentName: "سارة حسن محمود", registrationDate: "2026-04-21T23:52:41", status: "Active" }
//         ];

//         // 3. بيانات وهمية مطابقة لصورة الـ Swagger (Prerequisites)
//         const mockPrereqs: Prerequisite[] = [
//           { prereqID: 1, courseID: "CS201", prerequisiteCourseID: "CS101" },
//           { prereqID: 2, courseID: "CS201", prerequisiteCourseID: "CS102" }
//         ];

//         setAnalytics(mockAnalytics);
//         setStudents(mockStudents);
//         setPrerequisites(mockPrereqs);

//       } catch (error) {
//         console.error("Error fetching mock data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleRemovePrereq = (id: number) => {
//     setPrerequisites(prev => prev.filter(p => p.prereqID !== id));
//   };

//   if (loading) return <Box sx={{ width: '100%', mt: 10 }}><LinearProgress sx={{ color: MAIN_COLOR }} /><Typography align="center" sx={{ mt: 2 }}>Loading Academic Data...</Typography></Box>;

//   return (
//     <Box sx={{ p: { xs: 2, lg: 3 }, bgcolor: '#F8FAFC', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      
//       {/* 1. Header Banner */}
//       <Paper sx={{ bgcolor: MAIN_COLOR, color: 'white', p: 3, borderRadius: 3, mb: 3 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Chip label="COURSE CORE" size="small" sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 900, mb: 1.5 }} />
//             <Typography variant="h4" sx={{ fontWeight: 900 }}>Object-Oriented Programming</Typography>
//             <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                Catalog ID: {analytics?.courseInfo.courseId} • Year {analytics?.courseInfo.academicYear} — Sem {analytics?.courseInfo.semester}
//             </Typography>
//           </Box>
//           <Stack direction="row" spacing={2}>
//             <Button variant="contained" sx={{ bgcolor: 'white', color: 'black', fontWeight: 700, borderRadius: 2 }}>Edit Curriculum</Button>
//             <Button variant="contained" sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 700, borderRadius: 2 }}>Generate Report</Button>
//           </Stack>
//         </Stack>
//       </Paper>

//       {/* 2. Stats Row */}
//       <Grid container spacing={2} mb={4} sx={{ width: '100%', margin: 0 }}>
//         {[
//           { label: "TOTAL STUDENTS", val: analytics?.summary.totalStudents, color: 'black' },
//           { label: "PASSED", val: analytics?.summary.passed, color: '#10B981' },
//           { label: "FAILED", val: analytics?.summary.failed, color: '#EF4444' },
//           { label: "AVERAGE GRADE", val: `${analytics?.summary.average}/100`, color: MAIN_COLOR },
//           { label: "HIGHEST", val: analytics?.summary.highestGrade, color: '#3B82F6' },
//           { label: "LOWEST", val: analytics?.summary.lowestGrade, color: '#64748B' },
//         ].map((item, idx) => (
//           <Grid item xs={6} md={2} key={idx} sx={{ paddingLeft: '16px !important' }}>
//             <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none', textAlign: 'center' }}>
//               <CardContent sx={{ py: 2 }}>
//                 <Typography variant="overline" sx={{ fontWeight: 800, color: '#94A3B8', fontSize: '0.6rem' }}>{item.label}</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 900, color: item.color }}>{item.val}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid container spacing={3}>
//         {/* Left Column */}
//         <Grid item xs={12} md={4}>
//           <Stack spacing={3}>
//             {/* Distribution Curve */}
//             <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
//               <CardContent>
//                 <Typography sx={{ fontWeight: 900, mb: 3, fontSize: '0.75rem' }}>DISTRIBUTION CURVE</Typography>
//                 {analytics?.gradeDistribution.map((item, i) => (
//                   <Box key={i} sx={{ mb: 2 }}>
//                     <Stack direction="row" justifyContent="space-between" mb={0.5}>
//                       <Typography variant="body2" sx={{ fontWeight: 800 }}>Grade {item.grade}</Typography>
//                       <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.count} Student</Typography>
//                     </Stack>
//                     <LinearProgress variant="determinate" value={50} sx={{ height: 10, borderRadius: 5, bgcolor: '#F1F5F9', '& .MuiLinearProgress-bar': { bgcolor: i === 0 ? MAIN_COLOR : '#94A3B8' } }} />
//                   </Box>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Prerequisites */}
//             <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
//               <CardContent>
//                 <Stack direction="row" justifyContent="space-between" mb={2}>
//                   <Typography sx={{ fontWeight: 900, fontSize: '0.75rem' }}>PREREQUISITE MANAGEMENT</Typography>
//                   <SettingsInputComponentIcon sx={{ color: MAIN_COLOR, fontSize: 20 }} />
//                 </Stack>
//                 <Stack direction="row" spacing={1} mb={3}>
//                   <TextField fullWidth size="small" placeholder="CS101, CS102..." variant="outlined" />
//                   <Button variant="contained" sx={{ bgcolor: MAIN_COLOR, fontWeight: 700 }}>ADD</Button>
//                 </Stack>
//                 {prerequisites.map((p) => (
//                   <Box key={p.prereqID} sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, mb: 1, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
//                     <Typography sx={{ fontWeight: 800, fontSize: '0.8rem' }}>{p.prerequisiteCourseID}</Typography>
//                     <IconButton size="small" color="error" onClick={() => handleRemovePrereq(p.prereqID)}><DeleteOutlineIcon fontSize="small" /></IconButton>
//                   </Box>
//                 ))}
//               </CardContent>
//             </Card>
//           </Stack>
//         </Grid>

//         {/* Right Column: Table */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
//             <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>Registered Student Roster</Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F1F5F9', px: 1.5, py: 0.5, borderRadius: 2 }}>
//                 <SearchIcon sx={{ color: '#94A3B8', fontSize: 18, mr: 1 }} />
//                 <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>Search...</Typography>
//               </Box>
//             </Box>
//             <TableContainer>
//               <Table size="small">
//                 <TableHead sx={{ bgcolor: '#F8FAFC' }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.7rem' }}>STUDENT ID</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.7rem' }}>STUDENT NAME</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.7rem' }}>STATUS</TableCell>
//                     <TableCell align="center" sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.7rem' }}>ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {students.map((student) => (
//                     <TableRow key={student.studentID} hover>
//                       <TableCell sx={{ fontWeight: 700 }}>{student.studentID}</TableCell>
//                       <TableCell>
//                         <Stack direction="row" spacing={1.5} alignItems="center">
//                           <Avatar sx={{ bgcolor: MAIN_COLOR, width: 30, height: 30, fontSize: '0.75rem' }}>{student.studentName.charAt(0)}</Avatar>
//                           <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{student.studentName}</Typography>
//                         </Stack>
//                       </TableCell>
//                       <TableCell><Chip label={student.status} size="small" sx={{ bgcolor: '#BBF7D0', color: '#166534', fontWeight: 900, fontSize: '0.65rem' }} /></TableCell>
//                       <TableCell align="center"><IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton></TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import {
//   Box, Typography, Grid, Card, CardContent, Button, Chip, Stack,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, LinearProgress, Avatar, TextField, Alert
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import SearchIcon from '@mui/icons-material/Search';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

// // --- Interfaces aligned with Swagger response ---
// interface Student {
//   studentID: number;
//   studentName: string;
//   registrationDate: string;
//   status: string;
//   courseName: string;
// }

// interface CourseAnalytics {
//   courseInfo: { courseId: string; courseName: string | null; academicYear: number; semester: number; };
//   summary: { totalStudents: number; passed: number; failed: number; average: number; highestGrade: number; lowestGrade: number; };
// }

// export default function DoCourseStudents() {
//   const { courseId } = useParams(); 
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [analytics, setAnalytics] = useState<CourseAnalytics | null>(null);

//   const MAIN_COLOR = "#394188";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const token = localStorage.getItem('accessToken');
        
//         // Fetching from the API shown in image_48eaa2.jpg
//         const targetId = courseId || "ENG 111"; 
//         const response = await axios.get(`https://credithourssystemw.premiumasp.net/api/Instructors/course-students-by-id/${targetId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setStudents(response.data);

//         // Map analytics based on API response
//         setAnalytics({
//           courseInfo: { 
//             courseId: targetId, 
//             courseName: response.data[0]?.courseName || "Course Details", 
//             academicYear: 2026, 
//             semester: 1 
//           },
//           summary: { 
//             totalStudents: response.data.length, 
//             passed: response.data.length, 
//             failed: 0, 
//             average: 85, 
//             highestGrade: 98, 
//             lowestGrade: 60 
//           }
//         });

//       } catch (err) {
//         console.error("API Error:", err);
//         setError("Failed to fetch student data from the server.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   if (loading) return (
//     <Box sx={{ width: '100%', mt: 10 }}>
//       <LinearProgress sx={{ bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: MAIN_COLOR } }} />
//       <Typography align="center" sx={{ mt: 2, fontWeight: 700, color: MAIN_COLOR }}>Loading Student Data...</Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ p: { xs: 2, lg: 3 }, bgcolor: '#F8FAFC', minHeight: '100vh', width: '100%' }}>
      
//       {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

//       {/* 1. Header Banner */}
//       <Paper sx={{ bgcolor: MAIN_COLOR, color: 'white', p: 3, borderRadius: 3, mb: 3 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Chip label="CREDIT HOURS SYSTEM" size="small" sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 900, mb: 1.5 }} />
//             <Typography variant="h4" sx={{ fontWeight: 900 }}>{analytics?.courseInfo.courseName}</Typography>
//             <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                Catalog ID: {analytics?.courseInfo.courseId} • Academic Year {analytics?.courseInfo.academicYear}
//             </Typography>
//           </Box>
//           {/* <Stack direction="row" spacing={2}>
//             <Button variant="contained" sx={{ bgcolor: 'white', color: 'black', fontWeight: 700, borderRadius: 2, textTransform: 'none' }}>Edit Syllabus</Button>
//             <Button variant="contained" sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 700, borderRadius: 2, textTransform: 'none' }}>Export Report</Button>
//           </Stack> */}
//         </Stack>
//       </Paper>

//       {/* 2. Stats Row */}
//       <Grid container spacing={2} mb={4}>
//         {[
//           { label: "Total Students", val: students.length, color: 'black' },
//           { label: "Passed", val: analytics?.summary.passed, color: '#10B981' },
//           { label: "Failed", val: analytics?.summary.failed, color: '#EF4444' },
//           { label: "Avg Grade", val: `${analytics?.summary.average}%`, color: MAIN_COLOR },
//         ].map((item, idx) => (
//           <Grid item xs={6} md={3} key={idx}>
//             <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none', textAlign: 'center' }}>
//               <CardContent sx={{ py: 2 }}>
//                 <Typography variant="overline" sx={{ fontWeight: 800, color: '#94A3B8' }}>{item.label}</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 900, color: item.color }}>{item.val}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
//             <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>Registered Student Roster</Typography>
//               <TextField 
//                 size="small" 
//                 placeholder="Search students..." 
//                 InputProps={{ startAdornment: <SearchIcon sx={{ color: '#94A3B8', mr: 1 }} /> }}
//                 sx={{ width: 250 }}
//               />
//             </Box>
//             <TableContainer>
//               <Table>
//                 <TableHead sx={{ bgcolor: '#F8FAFC' }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>STUDENT ID</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>FULL NAME</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>REG. DATE</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>STATUS</TableCell>
//                     <TableCell align="center" sx={{ fontWeight: 800, color: '#64748B' }}>ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {students.map((student) => (
//                     <TableRow key={student.studentID} hover>
//                       <TableCell sx={{ fontWeight: 700 }}>#{student.studentID}</TableCell>
//                       <TableCell>
//                         <Stack direction="row" spacing={2} alignItems="center">
//                           <Avatar sx={{ bgcolor: MAIN_COLOR, width: 32, height: 32 }}>{student.studentName.charAt(0)}</Avatar>
//                           <Typography sx={{ fontWeight: 700 }}>{student.studentName}</Typography>
//                         </Stack>
//                       </TableCell>
//                       <TableCell sx={{ color: '#64748B' }}>
//                         {new Date(student.registrationDate).toLocaleDateString('en-US')}
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={student.status} 
//                           size="small" 
//                           sx={{ 
//                             bgcolor: student.status === 'Waiting' ? '#FEF3C7' : '#BBF7D0', 
//                             color: student.status === 'Waiting' ? '#92400E' : '#166534', 
//                             fontWeight: 900 
//                           }} 
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton size="small"><MoreVertIcon /></IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import {
//   Box, Typography, Grid, Card, CardContent, Button, Chip, Stack,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, LinearProgress, Avatar, TextField, Alert
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import SearchIcon from '@mui/icons-material/Search';

// interface Student {
//   studentID: number;
//   studentName: string;
//   registrationDate: string;
//   status: string;
//   courseName: string;
// }

// interface CourseAnalytics {
//   courseInfo: { courseId: string; courseName: string | null; academicYear: number; semester: number; };
//   summary: { totalStudents: number; passed: number; failed: number; average: number; highestGrade: number; lowestGrade: number; };
// }

// export default function DoCourseStudents() {
//   // 1. Get the courseId from the URL parameters
//   const { courseId } = useParams<{ courseId: string }>(); 
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [analytics, setAnalytics] = useState<CourseAnalytics | null>(null);

//   const MAIN_COLOR = "#394188";

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!courseId) return;

//       try {
//         setLoading(true);
//         setError(null);
//         const token = localStorage.getItem('accessToken');
        
//         // 2. Fetch students specifically for this courseId
//         const response = await axios.get(`https://credithourssystemw.premiumasp.net/api/Instructors/course-students-by-id/${courseId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setStudents(response.data);

//         // 3. Automatically update the analytics and header based on the API data
//         // We use the first student's courseName to fill the title if available
//         setAnalytics({
//           courseInfo: { 
//             courseId: courseId, 
//             courseName: response.data[0]?.courseName || "Course Details", 
//             academicYear: 2026, 
//             semester: 1 
//           },
//           summary: { 
//             totalStudents: response.data.length, 
//             passed: response.data.length, // Placeholder logic
//             failed: 0, 
//             average: 85, 
//             highestGrade: 98, 
//             lowestGrade: 60 
//           }
//         });

//       } catch (err) {
//         console.error("API Error:", err);
//         setError("Failed to fetch student data for this course.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [courseId]); // Re-run if courseId changes

//   if (loading) return (
//     <Box sx={{ width: '100%', mt: 10 }}>
//       <LinearProgress sx={{ bgcolor: '#E2E8F0', '& .MuiLinearProgress-bar': { bgcolor: MAIN_COLOR } }} />
//       <Typography align="center" sx={{ mt: 2, fontWeight: 700, color: MAIN_COLOR }}>Loading Course Data...</Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ p: { xs: 2, lg: 3 }, bgcolor: '#F8FAFC', minHeight: '100vh', width: '100%' }}>
      
//       {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

//       {/* Header Banner - Now reflects the specific course */}
//       <Paper sx={{ bgcolor: MAIN_COLOR, color: 'white', p: 3, borderRadius: 3, mb: 3 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Box>
//             <Chip label="ACADEMIC MANAGEMENT" size="small" sx={{ bgcolor: '#10B981', color: 'white', fontWeight: 900, mb: 1.5 }} />
//             <Typography variant="h4" sx={{ fontWeight: 900 }}>
//                 {analytics?.courseInfo.courseName}
//             </Typography>
//             <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                Catalog ID: {analytics?.courseInfo.courseId} • Academic Year 2026
//             </Typography>
//           </Box>
//         </Stack>
//       </Paper>

//       {/* Stats Row - Automatically calculated from fetched data */}
//       <Grid container spacing={2} mb={4}>
//         {[
//           { label: "Total Students", val: students.length, color: 'black' },
//           { label: "Passed", val: analytics?.summary.passed, color: '#10B981' },
//           { label: "Failed", val: analytics?.summary.failed, color: '#EF4444' },
//           { label: "Avg Performance", val: `${analytics?.summary.average}%`, color: MAIN_COLOR },
//         ].map((item, idx) => (
//           <Grid item xs={6} md={3} key={idx}>
//             <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none', textAlign: 'center' }}>
//               <CardContent sx={{ py: 2 }}>
//                 <Typography variant="overline" sx={{ fontWeight: 800, color: '#94A3B8' }}>{item.label}</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 900, color: item.color }}>{item.val}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card sx={{ borderRadius: 3, border: '1px solid #E2E8F0', boxShadow: 'none' }}>
//             <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>Registered Student Roster</Typography>
//               <TextField 
//                 size="small" 
//                 placeholder="Search students..." 
//                 InputProps={{ startAdornment: <SearchIcon sx={{ color: '#94A3B8', mr: 1 }} /> }}
//                 sx={{ width: 250 }}
//               />
//             </Box>
//             <TableContainer>
//               <Table>
//                 <TableHead sx={{ bgcolor: '#F8FAFC' }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>STUDENT ID</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>FULL NAME</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>REG. DATE</TableCell>
//                     <TableCell sx={{ fontWeight: 800, color: '#64748B' }}>STATUS</TableCell>
//                     <TableCell align="center" sx={{ fontWeight: 800, color: '#64748B' }}>ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {students.map((student) => (
//                     <TableRow key={student.studentID} hover>
//                       <TableCell sx={{ fontWeight: 700 }}>#{student.studentID}</TableCell>
//                       <TableCell>
//                         <Stack direction="row" spacing={2} alignItems="center">
//                           <Avatar sx={{ bgcolor: MAIN_COLOR, width: 32, height: 32 }}>{student.studentName.charAt(0)}</Avatar>
//                           <Typography sx={{ fontWeight: 700 }}>{student.studentName}</Typography>
//                         </Stack>
//                       </TableCell>
//                       <TableCell sx={{ color: '#64748B' }}>
//                         {new Date(student.registrationDate).toLocaleDateString('en-US')}
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={student.status} 
//                           size="small" 
//                           sx={{ 
//                             bgcolor: student.status === 'Waiting' ? '#FEF3C7' : '#BBF7D0', 
//                             color: student.status === 'Waiting' ? '#92400E' : '#166534', 
//                             fontWeight: 900 
//                           }} 
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton size="small"><MoreVertIcon /></IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';
// import {
//   Box, Typography, Grid, Card, CardContent, Chip, Stack,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Avatar, Button, CircularProgress, Alert, IconButton
// } from '@mui/material';
// import FolderOpenIcon from '@mui/icons-material/FolderOpen';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// export default function DoCourseStudents() {
//   const { courseId } = useParams<{ courseId: string }>();
//   const location = useLocation();
//   const courseFromState = location.state?.courseData; // استلام البيانات

//   const [students, setStudents] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const MAIN_DARK = "#0B121E"; // اللون الكحلي الغامق من الصورة

//   useEffect(() => {
//     const getStudents = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('accessToken');
//         const response = await axios.get(`https://credithourssystemw.premiumasp.net/api/Instructors/course-students-by-id/${courseId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setStudents(response.data);
//       } catch (err: any) {
//         setError(err.response?.status === 404 ? "Course data not found (404)." : "Connection Error.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     getStudents();
//   }, [courseId]);

//   return (
//     <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
//       {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

//       {/* --- الجزء الملون الكبير (The Dark Banner) --- */}
//       <Paper sx={{ bgcolor: MAIN_DARK, color: 'white', p: 6, borderRadius: 4, mb: 4 }}>
//         <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
//           <Chip label="COURSE CORE" size="small" sx={{ bgcolor: '#22C55E', color: 'white', fontWeight: 900 }} />
//           <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 600 }}>
//              Academic Year 2026 — Semester 1
//           </Typography>
//         </Stack>

//         <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: -1 }}>
//           {courseFromState?.courseName || "Course Roster"}
//         </Typography>

//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Stack direction="row" spacing={1} alignItems="center">
//             <FolderOpenIcon sx={{ fontSize: 20, opacity: 0.6 }} />
//             <Typography variant="body1" sx={{ fontWeight: 600, opacity: 0.8 }}>
//               Catalog ID: <span style={{ color: 'white' }}>{courseId}</span>
//             </Typography>
//           </Stack>
          
//           <Stack direction="row" spacing={2}>
//             <Button variant="contained" sx={{ bgcolor: 'white', color: 'black', fontWeight: 700, px: 3 }}>Edit Curriculum</Button>
//             <Button variant="contained" sx={{ bgcolor: '#2DD4BF', color: 'black', fontWeight: 700, px: 3 }}>Generate Report</Button>
//           </Stack>
//         </Stack>
//       </Paper>

//       {/* --- الإحصائيات السريعة --- */}
//       <Grid container spacing={2} mb={4}>
//         <Grid item xs={12} md={2}>
//           <Card sx={{ borderRadius: 3, textAlign: 'center', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
//             <CardContent>
//               <Typography variant="overline" sx={{ fontWeight: 800, color: '#94A3B8' }}>Total Students</Typography>
//               <Typography variant="h4" sx={{ fontWeight: 900 }}>{students.length}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
     
//       </Grid>

//       {/* --- جدول الطلاب --- */}
//       <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #E2E8F0' }}>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="h6" sx={{ fontWeight: 900 }}>Registered Student Roster</Typography>
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead sx={{ bgcolor: '#F8FAFC' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 800 }}>STUDENT ID</TableCell>
//                 <TableCell sx={{ fontWeight: 800 }}>STUDENT NAME</TableCell>
//                 <TableCell sx={{ fontWeight: 800 }}>STATUS</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 800 }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow><TableCell colSpan={4} align="center"><CircularProgress size={20} /></TableCell></TableRow>
//               ) : (
//                 students.map((s) => (
//                   <TableRow key={s.studentID} hover>
//                     <TableCell sx={{ fontWeight: 700 }}>{s.studentID}</TableCell>
//                     <TableCell>
//                       <Stack direction="row" spacing={2} alignItems="center">
//                         <Avatar sx={{ bgcolor: '#394188', width: 32, height: 32 }}>{s.studentName[0]}</Avatar>
//                         <Typography sx={{ fontWeight: 700 }}>{s.studentName}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell><Chip label={s.status} size="small" color="success" variant="soft" /></TableCell>
//                     <TableCell align="center"><IconButton><MoreVertIcon /></IconButton></TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//     </Box>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, Chip, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Avatar, Button, CircularProgress, Alert, IconButton
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function DoCourseStudents() {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const courseFromState = location.state?.courseData;

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  const CUSTOM_BLUE = "#394188"; 

  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`https://credithourssystemw.premiumasp.net/api/Instructors/course-students-by-id/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data);
      } catch (err: any) {
        setError(err.response?.status === 404 ? "Course data not found (404)." : "Connection Error.");
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, [courseId]);

  return (
    <Box sx={{ p: 4, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

  
      <Paper sx={{ 
        bgcolor: CUSTOM_BLUE, 
        color: 'white', 
        p: 4, 
        borderRadius: 4, 
        mb: 4,
        boxShadow: '0 10px 30px rgba(57, 65, 136, 0.2)'
      }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Chip 
            label="COURSE CORE" 
            size="small" 
            sx={{ bgcolor: '#22C55E', color: 'white', fontWeight: 900, fontSize: '0.65rem' }} 
          />
          <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 600 }}>
             Academic Year 2026 — Semester 1
          </Typography>
        </Stack>

        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: -1 }}>
          {courseFromState?.courseName || "Course Roster"}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <FolderOpenIcon sx={{ fontSize: 18, opacity: 0.7 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.9 }}>
              Catalog ID: <span style={{ fontWeight: 800 }}>{courseId}</span>
            </Typography>
          </Stack>
          
          {/* <Stack direction="row" spacing={1.5}>
            <Button variant="contained" sx={{ bgcolor: 'white', color: 'black', fontWeight: 700, textTransform: 'none', borderRadius: 2, '&:hover': { bgcolor: '#f0f0f0' } }}>
              Edit Curriculum
            </Button>
            <Button variant="contained" sx={{ bgcolor: '#2DD4BF', color: 'black', fontWeight: 700, textTransform: 'none', borderRadius: 2, '&:hover': { bgcolor: '#24b09e' } }}>
              Generate Report
            </Button>
          </Stack> */}
        </Stack>
      </Paper>

      {/* --- كروت الإحصائيات (الثلاثة كروت) --- */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={2.5 }  sx={{ width:'18%'}}>
          <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #E2E8F0'  ,width:'100%'}}>
            <CardContent sx={{ p: '20px !important' }}>
              <Typography variant="overline" sx={{ fontWeight: 800, color: '#94A3B8', display: 'block', mb: 1 }}>Total Students</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{students.length}</Typography>
                <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem' }}>👥</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={2.5}  sx={{ width:'18%'}}>
          <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #E2E8F0' ,width:'100%' }}>
            <CardContent sx={{ p: '20px !important'  }}>
              <Typography variant="overline" sx={{ fontWeight: 800, color: '#10B981', display: 'block', mb: 1 }}>Passed</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#10B981' }}>{students.length}</Typography>
                <CheckCircleOutlineIcon sx={{ color: '#10B981', fontSize: 20 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={2.5} sx={{ width:'18%'}}>
          <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #E2E8F0' }}>
            <CardContent sx={{ p: '20px !important'  }}>
              <Typography variant="overline" sx={{ fontWeight: 800, color: '#EF4444', display: 'block', mb: 1 }}>Failed</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#EF4444' }}>0</Typography>
                <HighlightOffIcon sx={{ color: '#EF4444', fontSize: 20 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- الجدول --- */}
      <Card sx={{ borderRadius: 4, boxShadow: 'none', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'white' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#1E293B' }}>Registered Student Roster</Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Showing {students.length} registered students</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.75rem' }}>STUDENT ID</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.75rem' }}>STUDENT NAME</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.75rem' }}>REGISTRATION DATE</TableCell>
                <TableCell sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.75rem' }}>STATUS</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800, color: '#64748B', fontSize: '0.75rem' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 5 }}><CircularProgress size={30} sx={{ color: CUSTOM_BLUE }} /></TableCell></TableRow>
              ) : (
                students.map((s) => (
                  <TableRow key={s.studentID} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ fontWeight: 600, color: '#1E293B' }}>{s.studentID}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: CUSTOM_BLUE, width: 32, height: 32, fontSize: '0.85rem', fontWeight: 700 }}>
                          {s.studentName[0]}
                        </Avatar>
                        <Typography sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.9rem' }}>{s.studentName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ color: '#64748B', fontSize: '0.85rem' }}>
                      {new Date().toISOString().split('T')[0]} {/* تاريخ افتراضي */}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={s.status || "Active"} 
                        size="small" 
                        sx={{ bgcolor: '#DCFCE7', color: '#166534', fontWeight: 800, fontSize: '0.7rem' }} 
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small"><MoreVertIcon sx={{ color: '#94A3B8' }} /></IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}