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
    // ألوان توازن بين الوضوح والأناقة (تليق باللايت والدارك مود)
    { text: "Dashboard", icon: <DashboardIcon sx={{ color: "#7B61FF" }} />, path: "/admin" },      // بنفسجي ملكي
    { text: "Users", icon: <PeopleIcon sx={{ color: "#3B82F6" }} />, path: "/admin/users" },          // أزرق حيوي
    { text: "Students", icon: <SchoolIcon sx={{ color: "#F59E0B" }} />, path: "/admin/students" },    // برتقالي دافئ
    { text: "Courses", icon: <MenuBook sx={{ color: "#10B981" }} />, path: "/admin/courses" },       // أخضر زمردي
    { text: "instructors", icon: <PersonOutlineIcon sx={{ color: "#EC4899" }} />, path: "/admin/instructors" }, // وردي ناعم
    { text: "Grades", icon: <GradeIcon sx={{ color: "#8B5CF6" }} />, path: "/admin/grades" },        // بنفسجي فاتح
    { text: "Schedule", icon: <CalendarMonthIcon sx={{ color: "#F43F5E" }} />, path: "/admin/schedule" }, // أحمر مرجاني
    { text: "System Settings", icon: <SettingsIcon sx={{ color: "#6B7280" }} />, path: "/admin/system-settings" }, // رمادي هادئ
  ]}
/>
  );
}

export default Sidebar;
