import BasicSidebar from "../../Shared/components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuBook from "@mui/icons-material/MenuBook";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";

function Sidebar() {
  return (
    <BasicSidebar
      items={[
        { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
        {
          text: "Users",
          icon: <PeopleIcon />,
          path: "/admin/users",
        },

        { text: "Students", icon: <SchoolIcon />, path: "/admin/students" },
        { text: "Courses", icon: <MenuBook />, path: "/admin/courses" },
        {
          text: "instructors",
          icon: <PersonOutlineIcon />,
          path: "/admin/instructors",
        },
        { text: "Grades", icon: <GradeIcon />, path: "/admin/grades" },
        {
          text: "Schedule",
          icon: <CalendarMonthIcon />,
          path: "/admin/schedule",
        },
        { text: "System Settings", icon: <SettingsIcon />, path: "/admin/system-settings" },
      ]}
    />
  );
}

export default Sidebar;
