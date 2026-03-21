import DashboardLayout from "../../Shared/components/DashboardLayout/DashboardLayout";
import Sidebar from "./Sidebar"

const StudentAffairsDashboard = () => {
  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <p>Dashboard Content</p>
    </DashboardLayout>
  );
};

export default StudentAffairsDashboard;