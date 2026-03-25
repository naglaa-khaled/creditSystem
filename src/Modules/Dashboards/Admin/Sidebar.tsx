import BasicSidebar from "../../Shared/components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
function Sidebar() {
  return (
    <BasicSidebar
    items={[
        { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
        { text: "Students", icon: <PeopleIcon />, path: "/admin/students" },
        { text: "Courses", icon: <SchoolIcon />, path: "/admin/courses" },
        { text: "Instructors", icon: <PersonIcon />, path: "/admin/instructors" },
        { text: "Grades", icon: <GradeIcon />, path: "/admin/grades" },
        { text: "Schedule", icon: <CalendarMonthIcon />, path: "/admin/schedule" },
      ]}
    />
  )
}

export default Sidebar