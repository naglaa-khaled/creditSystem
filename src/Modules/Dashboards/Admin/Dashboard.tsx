
import { Outlet } from "react-router-dom"; 
import DashboardLayout from "../../Shared/components/DashboardLayout/DashboardLayout";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <Outlet /> 
    </DashboardLayout>
  );
};

export default Dashboard;