import React, { useState, useEffect } from 'react';
import type { Theme } from "@mui/material/styles";
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Grid, 
  CircularProgress,
  useTheme
} from '@mui/material';
import { Clock, BookOpen, Users, Target, Printer, Calendar, MapPin, GraduationCap, Layers } from 'lucide-react';

interface ScheduleItem {
  day: string;
  courseName: string;
  courseCode: string;
  level: number;
  semester: string;
  startTime: string;
  endTime: string;
  room: string;
  capacity: number;
  sessionType: string;
}

export default function Schedule(): React.JSX.Element {
  const theme = useTheme();
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token: string | null = localStorage.getItem('accessToken'); 

    fetch('https://credithourssystemw.premiumasp.net/api/Instructors/my-schedule', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ''}` 
      }
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ScheduleItem[]) => {
        setScheduleData(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Error fetching schedule:", err);
        setError("ERROR!");
        setLoading(false);
      });
  }, []);

  const calculateTotalHours = (): string => {
    let totalMinutes = 0;
    scheduleData.forEach((item: ScheduleItem) => {
      if (item.startTime?.includes(':') && item.endTime?.includes(':')) {
        const startParts = item.startTime.split(':');
        const endParts = item.endTime.split(':');
        
        const startH = Number(startParts[0]);
        const startM = Number(startParts[1]);
        const endH = Number(endParts[0]);
        const endM = Number(endParts[1]);
        
        if (!isNaN(startH) && !isNaN(startM) && !isNaN(endH) && !isNaN(endM)) {
          totalMinutes += (endH * 60 + endM) - (startH * 60 + startM);
        }
      }
    });
    const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
    const mins = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hours}:${mins}`;
  };

  const mockStudentsCount = (capacity: number, index: number): number => {
    return index % 2 === 0 ? Math.floor(capacity * 0.8) : Math.floor(capacity * 0.6);
  };

  const totalMockStudents: number = scheduleData.reduce(
    (acc: number, item: ScheduleItem, index: number) => acc + mockStudentsCount(item.capacity ?? 41, index), 
    0
  );


  const getDayBadgeStyle = () => ({ 
    padding: '6px 14px', 
    borderRadius: '12px', 
    fontSize: '11px', 
    fontWeight: '700', 
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: '6px', 
    letterSpacing: '0.5px',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(57, 65, 136, 0.08)' : 'rgba(238, 242, 255, 0.1)', 
    color: theme.palette.text.primary, 
    border: `1px solid ${theme.palette.divider}`
  });

  const getSessionTypeStyle = (type: string) => {
    const base = { 
      padding: '5px 12px', 
      borderRadius: '10px', 
      fontSize: '11px', 
      fontWeight: '700', 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '4px' 
    };
    if (type === 'Lecture') {
      return { 
        ...base, 
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.info.light : 'rgba(49, 130, 206, 0.2)', 
        color: theme.palette.info.main, 
        border: `1px solid ${theme.palette.info.dark}33` 
      };
    }
    return { 
      ...base, 
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.warning.light : 'rgba(236, 201, 75, 0.2)', 
      color: theme.palette.warning.dark, 
      border: `1px solid ${theme.palette.warning.main}33` 
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: theme.palette.background.default, gap: 2 }}>
        <CircularProgress color="primary" />
        <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: '600', letterSpacing: '2px' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
        <Paper sx={{ p: 5, borderRadius: '28px', textAlign: 'center', boxShadow: theme.shadows[3], maxWidth: '400px', backgroundColor: theme.palette.background.paper }}>
          <Box sx={{ width: '60px', height: '6px', backgroundColor: theme.palette.error.main, borderRadius: '10px', margin: '0 auto 25px' }}></Box>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: '800', mb: 1 }}>Session Verification Failed</Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 4, lineHeight: '1.6' }}>Your instructor access token is invalid or has expired.</Typography>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()} fullWidth sx={{ p: 1.5 }}>
            Reauthenticate
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.default, 
      minHeight: '100vh', 
      p: { xs: '20px 16px', md: '30px 24px', lg: '45px 60px' },
      backgroundImage: theme.palette.mode === 'light' 
        ? 'radial-gradient(at 0% 0%, rgba(57, 65, 136, 0.03) 0, transparent 50%)'
        : 'radial-gradient(at 0% 0%, rgba(30, 41, 59, 0.5) 0, transparent 50%)'
    }}>
      
      {/* Top Premium Bar */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' }, mb: 5, gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: 1 }}>
            <Box component="span" sx={{ fontSize: '10px', color: '#ffffff', backgroundColor: theme.palette.success.main, p: '4px 10px', borderRadius: '8px', fontWeight: '800', letterSpacing: '0.8px' }}>CONNECTED</Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: '700', letterSpacing: '0.5px' }}>PORTAL / INSTRUCTOR SCHEDULE</Typography>
          </Box>
          <Typography variant="h3" component="h1" sx={{ color: theme.palette.text.primary, fontWeight: '900', letterSpacing: '-0.8px', fontSize: { xs: '28px', md: '36px' } }}>Academic Roster</Typography>
        </Box>
        <Button variant="outlined" startIcon={<Printer size={15} />} sx={{ borderColor: theme.palette.divider, color: theme.palette.text.secondary, backgroundColor: theme.palette.background.paper, width: { xs: '100%', sm: 'auto' } }}>
          Export Official PDF
        </Button>
      </Box>

      {/* Premium Dashboard Metrics */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
       <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard theme={theme} label="TOTAL LECTURE HOURS" value={calculateTotalHours()} badge="Weekly" icon={<Clock size={18} color={theme.palette.primary.main}/>} />
        </Grid>
       <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard theme={theme} label="ASSIGNED MODULES" value={scheduleData.length.toString().padStart(2, '0')} badge="Active" icon={<BookOpen size={18} color={theme.palette.info.main}/>} />
        </Grid>
       <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard theme={theme} label="TOTAL STUDENT CAPACITY" value={totalMockStudents} badge="Roster" icon={<Users size={18} color={theme.palette.success.main}/>} />
        </Grid>
       <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <MetricCard theme={theme} label="MINIMUM ATTENDANCE TARGET" value="95%" badge="Standard" icon={<Target size={18} color={theme.palette.error.main}/>} />
        </Grid>
      </Grid>

      {/* Main Table Container */}
      <TableContainer component={Paper} sx={{ maxHeight: '55vh', overflowY: 'auto', borderRadius: '28px', boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <Table stickyHeader sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: '24px 30px' }}>Day & Time</TableCell>
              <TableCell sx={{ p: '24px 30px' }}>Course Details</TableCell>
              <TableCell sx={{ p: '24px 30px' }}>Academic Level</TableCell>
              <TableCell sx={{ p: '24px 30px' }}>Location</TableCell>
              <TableCell sx={{ p: '24px 30px', textAlign: 'right' }}>Seat Occupancy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleData.map((item: ScheduleItem, index: number) => {
              const capacity = item.capacity ?? 41; 
              const currentStudents = mockStudentsCount(capacity, index);
              const percentage = Math.round((currentStudents / capacity) * 100);

              return (
                <TableRow key={`${item.courseCode}-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  
                  {/* Day & Time */}
                  <TableCell sx={{ p: '22px 30px' }}>
                    <Box style={getDayBadgeStyle()}>
                      <Calendar size={12} />
                      {item.day}
                    </Box>
                    <Box sx={{ fontSize: '13px', color: theme.palette.text.secondary, mt: 1.5, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={12} color={theme.palette.text.disabled} />
                      {item.startTime && item.endTime ? `${item.startTime.substring(0, 5)} - ${item.endTime.substring(0, 5)}` : "Not Set"}
                    </Box>
                  </TableCell>
                  
                  {/* Course Identity */}
                  <TableCell sx={{ p: '22px 30px' }}>
                    <Typography sx={{ fontWeight: '700', color: theme.palette.text.primary, fontSize: '15px', mb: 1, direction: 'rtl', textAlign: 'left' }}>
                      {item.courseName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box component="span" sx={{ fontSize: '10px', backgroundColor: theme.palette.primary.light, p: '4px 10px', borderRadius: '8px', color: theme.palette.primary.main, fontWeight: '800', letterSpacing: '0.5px', border: `1px solid ${theme.palette.divider}` }}>
                        {item.courseCode}
                      </Box>
                      <Box style={getSessionTypeStyle(item.sessionType)}>
                        <Layers size={11} /> {item.sessionType}
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Academic Level */}
                  <TableCell sx={{ p: '22px 30px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Typography component="span" sx={{ fontSize: '13px', color: theme.palette.text.primary, fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <GraduationCap size={14} color={theme.palette.text.secondary} /> Level {item.level}
                      </Typography>
                      <Typography component="span" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: '600', pl: '18px' }}>
                        Semester {item.semester}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  {/* Hall / Lab */}
                  <TableCell sx={{ p: '22px 30px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: theme.palette.text.primary, fontWeight: '700', fontSize: '14px' }}>
                      <MapPin size={14} color={theme.palette.secondary.main} style={{ opacity: 0.8 }} />
                      {item.room ?? "TBD"}
                    </Box>
                  </TableCell>
                  
                  {/* Capacity Bar */}
                  <TableCell sx={{ p: '22px 30px', textAlign: 'right' }}>
                    <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap: '6px', width: '130px', textAlign: 'left' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: theme.palette.text.secondary }}>
                        <Box component="span" sx={{ color: theme.palette.secondary.main }}>{percentage}%</Box>
                        <Box component="span" sx={{ color: theme.palette.text.disabled }}>{currentStudents} / {capacity}</Box>
                      </Box>
                      <Box sx={{ width: '100%', height: '5px', backgroundColor: theme.palette.divider, borderRadius: '10px', overflow: 'hidden' }}>
                        <Box sx={{ width: `${percentage}%`, height: '100%', borderRadius: '10px', backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)` }}></Box>
                      </Box>
                    </Box>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  badge: string;
  icon: React.ReactNode;
  theme: Theme;
}

function MetricCard({ label, value, badge, icon, theme }: MetricCardProps): React.JSX.Element {
  return (
    <Paper sx={{ p: '26px', borderRadius: '24px', border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[0], backgroundColor: theme.palette.background.paper }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontSize: '10px', color: theme.palette.text.secondary, fontWeight: '800', letterSpacing: '0.8px', textTransform: 'uppercase', m: 0 }}>{label}</Typography>
        <Box sx={{ width: '38px', height: '38px', backgroundColor: theme.palette.background.default, borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${theme.palette.divider}` }}>
          {icon}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Typography sx={{ fontSize: '32px', fontWeight: '800', color: theme.palette.text.primary, letterSpacing: '-0.8px' }}>{value}</Typography>
        <Box component="span" sx={{ fontSize: '10px', backgroundColor: theme.palette.divider, p: '4px 10px', borderRadius: '8px', color: theme.palette.text.primary, fontWeight: '700', letterSpacing: '0.3px' }}>{badge}</Box>
      </Box>
    </Paper>
  );
}