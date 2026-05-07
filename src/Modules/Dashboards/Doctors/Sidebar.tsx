
import BasicSidebar from "../../Shared/components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People"; // ينفع لـ Grads
import SchoolIcon from "@mui/icons-material/School"; // ينفع لـ Courses
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment"; // أيقونة أنسب لـ Grades

function Sidebar() {
  return (
    <BasicSidebar
      items={[
        { 
          text: "Dashboard", 
          icon: <DashboardIcon />, 
          path: "/doctors" 
        },
        { 
          text: "Doc Courses", 
          icon: <SchoolIcon />, 
          path: "/doctors/courses" 
        },
        // { 
        //   text: "Manage Grades", 
        //   icon: <AssessmentIcon />, 
        //   path: "/doctors/grads" 
        // },
        { 
          text: "Students Grads", 
          icon: <PeopleIcon />, 
          path: "/doctors/grads" 
        },
        { 
          text: "Schedule", 
          icon: <CalendarMonthIcon />, 
          path: "/doctors/schedule" 
        },
      ]}
    />
  );
}

export default Sidebar;
