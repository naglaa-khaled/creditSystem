import { useLocation } from "react-router-dom";
import BasicSidebar from "../../Shared/components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School"; 
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment"; 

function Sidebar() {
  const location = useLocation();
  

 
  const sidebarItems = [
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
  ];

 
  const formattedItems = sidebarItems.map((item) => {
    const isActive = location.pathname === item.path;

    return {
      ...item,
    
      active: isActive, 
     
      sx: {
        backgroundColor: isActive ? "rgba(59, 130, 246, 0.08)" : "transparent",
        color: isActive ? "#3b82f6" : "inherit",
        fontWeight: isActive ? "700" : "500",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isActive ? "rgba(59, 130, 246, 0.12)" : "rgba(0,0,0,0.04)",
        }
      }
    };
  });

  return (
    <BasicSidebar items={formattedItems} />
  );
}

export default Sidebar;