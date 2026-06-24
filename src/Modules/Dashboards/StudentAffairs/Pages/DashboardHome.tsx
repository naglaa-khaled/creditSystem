import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SharedCard from "../../../Shared/components/cards/Card";
import { type IStudent } from "../../../Shared/Interfaces";
import {
  getDashboardStats,
  getRecentStudent,
} from "../../../../API/SyudentAffairsData/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Skeleton,
} from "@mui/material";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
  });
  const [recentStudents, setRecentStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true); 

  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const basePath = isAdmin ? "/admin" : "/student-affairs";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
      const statsData = await getDashboardStats();
      const studentsData = await getRecentStudent();

      setStats(statsData);
      setRecentStudents(Array.isArray(studentsData) ? studentsData : []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false); 
    }
  };
  fetchData();
}, []);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "var(--primary)",
          fontSize: "1.8rem",
        }}
      >
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back to the university management system
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SharedCard
            icon={<SchoolIcon sx={{ fontSize: 40, color: "var(--primary)" }} />}
            title="Total Students"
            value={stats.totalStudents}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SharedCard
            icon={<PersonIcon sx={{ fontSize: 40, color: "var(--primary)" }} />}
            title="Total Professors"
            value={stats.totalInstructors}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SharedCard
            icon={
              <MenuBookIcon sx={{ fontSize: 40, color: "var(--primary)" }} />
            }
            title="Total Courses"
            value={stats.totalCourses}
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              boxShadow: "none",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Recent Students
            </Typography>
            <List>
  {loading
    ? // لو بيحمل، اعرض 5 سطور وهمية (Skeleton)
      [1, 2, 3, 4, 5].map((item) => (
        <Box key={item}>
          <ListItem sx={{ px: 0, py: 1.5 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
            <ListItemText
              primary={<Skeleton variant="text" width="40%" height={25} />}
              secondary={<Skeleton variant="text" width="60%" height={20} />}
            />
          </ListItem>
          {item < 5 && <Divider />}
        </Box>
      ))
    : // لو خلص تحميل، اعرض الداتا الحقيقية
      recentStudents.map((student, index) => {
        const displayName = student.nameEn || student.fullName || "N/A";
        return (
          <Box key={student.studentID}>
            <ListItem sx={{ px: 0, py: 1.5 }}>
              <Avatar sx={{ bgcolor: "#EEF2FF", color: "#5D5FEF", mr: 2, fontWeight: "bold" }}>
                {displayName[0]?.toUpperCase()}
              </Avatar>
              <ListItemText
                primary={<Typography sx={{ fontWeight: "600" }}>{displayName}</Typography>}
                secondary={`${student.email} | Year ${student.year}`}
              />
              <Typography variant="caption" color="text.secondary">
                Semester: {student.semester}
              </Typography>
            </ListItem>
            {index < recentStudents.length - 1 && <Divider />}
          </Box>
        );
      })}
</List>
            <Button
              component={Link}
              to={`${basePath}/students`}
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#5D5FEF",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              {" "}
              View All Students
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                component={Link}
                to={`${basePath}/students`}
                fullWidth
                variant="contained"
                startIcon={<PersonIcon />}
                sx={{
                  backgroundColor: "#eef2ff",
                  color: "#3730a3",
                  boxShadow: "none",
                  textTransform: "none",
                  justifyContent: "flex-start",
                }}
              >
                Manage Students
              </Button>

              <Button
                component={Link}
                to={`${basePath}/instructors`}
                fullWidth
                variant="contained"
                startIcon={<SchoolIcon />}
                sx={{
                  backgroundColor: "#eef2ff",
                  color: "#3730a3",
                  boxShadow: "none",
                  textTransform: "none",
                  justifyContent: "flex-start",
                }}
              >
                Manage Professors
              </Button>

              <Button
                component={Link}
                to={`${basePath}/courses`}
                fullWidth
                variant="contained"
                startIcon={<MenuBookIcon />}
                sx={{
                  backgroundColor: "#eef2ff",
                  color: "#3730a3",
                  boxShadow: "none",
                  textTransform: "none",
                  justifyContent: "flex-start",
                }}
              >
                Manage Courses
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
