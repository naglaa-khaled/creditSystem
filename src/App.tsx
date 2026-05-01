import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Modules/Shared/components/AuthLayout/AuthLayout";
import Login from "./Modules/AuthModule/components/Login/Login";
import Register from "./Modules/AuthModule/components/Register/Register";
import ResetPass from "./Modules/AuthModule/components/ResetPass/ResetPass";
import ChangePass from "./Modules/AuthModule/components/ChangePass/ChangePass";
import ForgetPass from "./Modules/AuthModule/components/ForgetPass/ForgetPass";
import Regulations from "./Modules/AuthModule/components/Regulations/Regulations";
import CheckEmail from "./Modules/AuthModule/components/CheckEmail/CheckEmail";
import StudentAffairsDashboard from "./Modules/Dashboards/StudentAffairs/Dashboard";
import DashboardHome from "./Modules/Dashboards/StudentAffairs/Pages/DashboardHome";
import StudentsPage from "./Modules/Dashboards/StudentAffairs/Pages/Students/StudentsPage";
import CoursesPage from "./Modules/Dashboards/StudentAffairs/Pages/Courses/Courses";
import AdminDashboard from "./Modules/Dashboards/Admin/Dashboard";
import StudentDetailsPage from "./Modules/Dashboards/StudentAffairs/Pages/Students/StudentDetails";
import Students from "./Modules/Dashboards/Admin/Pages/Students/StudentPage";
import StudentDetails from "./Modules/Dashboards/Admin/Pages/Students/StudentDetails";
import CourseDetails from "./Modules/Dashboards/StudentAffairs/Pages/Courses/CourseDetails";
import Courses from "./Modules/Dashboards/Admin/Pages/courses/Courses";
import ACourseDetails from "./Modules/Dashboards/Admin/Pages/courses/CourseDetails";
import Instructors from "./Modules/Dashboards/Admin/Pages/Instructor/Instructor";
import AInstructorDetails from "./Modules/Dashboards/Admin/Pages/Instructor/InstructorDetails";
import Instructor from "./Modules/Dashboards/StudentAffairs/Pages/Instructor/Instructors";
import InstructorDetails from "./Modules/Dashboards/StudentAffairs/Pages/Instructor/InstructorDetails";
import Schedual from "./Modules/Dashboards/Admin/Pages/Scheduals/Schedual";
import SchedualDetails from "./Modules/Dashboards/Admin/Pages/Scheduals/SchedualDetails";
import SchedualPage from "./Modules/Dashboards/StudentAffairs/Pages/Schedual/Schedual"
import GradesPage from "./Modules/Dashboards/StudentAffairs/Pages/Grades/Grades"
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "regulations", element: <Regulations /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "resetpass", element: <ResetPass /> },
        { path: "changepass", element: <ChangePass /> },
      ],
    },
    {
      path: "/checkemail",
      element: <CheckEmail />,
    },
    {
      path: "/student-affairs",
      element: <StudentAffairsDashboard />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "students", element: <StudentsPage /> },
        { path: "students/details/:id", element: <StudentDetailsPage /> },
        { path: "courses", element: <CoursesPage /> },
        {path: "courses/details/:id", element: <CourseDetails /> },
        { path: "instructors", element: <Instructor /> },
        {path: "instructors/details/:id", element: <InstructorDetails /> },
        {path: "schedule", element: <SchedualPage /> },
        {path: "grades", element: <GradesPage /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "students", element: <Students /> },
        { path: "students/details/:id", element: <StudentDetails /> },
        { path: "courses", element: <Courses /> },
        { path: "courses/details/:id", element: <ACourseDetails /> },
        { path: "instructors", element: <Instructors /> },
        { path: "instructors/details/:id", element: <AInstructorDetails /> },
        { path: "schedule", element: <Schedual /> },
        { path: "schedule/details/:id", element: <SchedualDetails /> },


      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
