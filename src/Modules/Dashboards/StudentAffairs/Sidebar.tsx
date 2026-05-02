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
        { text: "Dashboard", icon: <DashboardIcon />, path: "/student-affairs" },
        { text: "Students", icon: <PeopleIcon />, path: "/student-affairs/students" },
        { text: "Courses", icon: <SchoolIcon />, path: "/student-affairs/courses" },
        { text: "Instructors", icon: <PersonIcon />, path: "/student-affairs/instructors" },
        { text: "Grades", icon: <GradeIcon />, path: "/student-affairs/grades" },
        { text: "Schedule", icon: <CalendarMonthIcon />, path: "/student-affairs/schedule" },
      ]}
    />
  )
}

export default Sidebar