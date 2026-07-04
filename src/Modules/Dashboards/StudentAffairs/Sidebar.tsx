import BasicSidebar from "../../Shared/components/Sidebar/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Sidebar() {
  // لاحظي هنا: حذفنا الـ return function، وأصبح المكون يعيد الـ JSX مباشرة
  return (
    <BasicSidebar
      items={[
        {
          text: "Dashboard",
          icon: <DashboardIcon sx={{ color: "#7B61FF" }} />,
          path: "/student-affairs",
        },
        {
          text: "Students",
          icon: <PeopleIcon sx={{ color: "#3B82F6" }} />,
          path: "/student-affairs/students",
        },
        {
          text: "Courses",
          icon: <SchoolIcon sx={{ color: "#F59E0B" }} />,
          path: "/student-affairs/courses",
        },
        {
          text: "Instructors",
          icon: <PersonIcon sx={{ color: "#EC4899" }} />,
          path: "/student-affairs/instructors",
        },
        {
          text: "Grades",
          icon: <GradeIcon sx={{ color: "#10B981" }} />,
          path: "/student-affairs/grades",
        },
        {
          text: "Schedule",
          icon: <CalendarMonthIcon sx={{ color: "#F43F5E" }} />,
          path: "/student-affairs/schedule",
        },
      ]}
    />
  );
}

export default Sidebar;