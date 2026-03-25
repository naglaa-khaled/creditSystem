import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SharedCard from "../../../Shared/components/cards/Card";
import { type IStudent } from "../../../Shared/Interfaces";
import {
  getDashboardStats,
  getResentStudent,
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
} from "@mui/material";


const DashboardHome = () => {
  const [stats, setStats] = useState({
    students: 0,
    professors: 0,
    courses: 0,
  });
  const [recentStudents, setRecentStudents] = useState<IStudent[]>([]);

  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const basePath = isAdmin ? "/admin" : "/student-affairs";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getDashboardStats();
        const studentsData = await getResentStudent();

        setStats(statsData);
        setRecentStudents(studentsData.recentStudentsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back to the university management system
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SharedCard
            icon={<SchoolIcon sx={{ fontSize: 40, color: "#5d5fef" }} />}
            title="Total Students"
            value={stats.students}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SharedCard
            icon={<PersonIcon sx={{ fontSize: 40, color: "#5d5fef" }} />}
            title="Total Professors"
            value={stats.professors}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <SharedCard
            icon={<MenuBookIcon sx={{ fontSize: 40, color: "#5d5fef" }} />}
            title="Total Courses"
            value={stats.courses}
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
              {recentStudents.map((student, index) => (
                <Box key={student.studentID}>
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#EEF2FF",
                        color: "#5D5FEF",
                        mr: 2,
                        fontWeight: "bold",
                      }}
                    >
                      {student.nameEn[0]}
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: "600" }}>
                          {student.nameEn}
                        </Typography>
                      }
                      secondary={`${student.email} | Year ${student.year}`}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {student.semester}
                    </Typography>
                  </ListItem>
                  {index < recentStudents.length - 1 && <Divider />}
                </Box>
              ))}
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
                to={`${basePath}/professors`}
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
