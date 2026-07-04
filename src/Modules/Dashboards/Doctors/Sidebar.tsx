import BasicSidebar from "../../Shared/components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School"; 
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment"; 

function Sidebar() {
  return (
    <BasicSidebar
      items={[
        { 
          text: "Overview Dashboard", 
          icon: <DashboardIcon sx={{ color: "#3b82f6", filter: "drop-shadow(0 2px 4px rgba(59,130,246,0.2))" }} />, 
          path: "/doctors" 
        },
        { 
          text: "My Courses", 
          icon: <SchoolIcon sx={{ color: "#ec4899", filter: "drop-shadow(0 2px 4px rgba(236,72,153,0.2))" }} />, 
          path: "/doctors/courses" 
        },
        { 
          text: "Grading & Evaluation",
          icon: <AssessmentIcon sx={{ color: "#10b981", filter: "drop-shadow(0 2px 4px rgba(16,185,129,0.2))" }} />, 
          path: "/doctors/grads" 
        },
        { 
          text: "Academic Schedule", 
          icon: <CalendarMonthIcon sx={{ color: "#f59e0b", filter: "drop-shadow(0 2px 4px rgba(245,158,11,0.2))" }} />, 
          path: "/doctors/schedule" 
        },
      ]}
    />
  );
}

export default Sidebar;