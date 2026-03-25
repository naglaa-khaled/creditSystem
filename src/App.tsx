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
import CoursesPage from "./Modules/Dashboards/StudentAffairs/Pages/Courses";
import AdminDashboard from "./Modules/Dashboards/Admin/Dashboard";
import StudentDetailsPage from "./Modules/Dashboards/StudentAffairs/Pages/Students/StudentDetails";
import Students from "./Modules/Dashboards/Admin/Pages/Students/StudentPage";
import StudentDetails from "./Modules/Dashboards/Admin/Pages/Students/StudentDetails";

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
      ],
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "students", element: <Students /> },
        { path: "students/details/:id", element: <StudentDetails /> },
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
