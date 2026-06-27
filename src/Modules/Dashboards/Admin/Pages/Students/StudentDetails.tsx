import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type FieldValues } from "react-hook-form";
import { Box, Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import {
  type ICourse,
  type IStudent,
  type studentId,
  type IInfoFieldProps,
} from "../../../../Shared/Interfaces/index";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  updateStudent,
  getStudentProfile,
  updateStudentMaxHours,
  changeStudentStatus,
  updateRegistrationStatus,
} from "../../../../../API/AdminData/Students";

import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<IStudent>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [maxHours, setMaxHours] = useState<number>(18);
  const [isMaxHoursModalOpen, setIsMaxHoursModalOpen] = useState(false);
  const [status, setStatus] = useState<string>(student?.status || "");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isCourseStatusModalOpen, setIsCourseStatusModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<ICourse | null>(null);
  const editFields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "studentID", label: "Student ID", required: true, disabled: true },
    {
      name: "year",
      label: "Academic Year",
      required: true,
      select: true,
      options: [
        { value: "1", label: "Year 1" },
        { value: "2", label: "Year 2" },
        { value: "3", label: "Year 3" },
        { value: "4", label: "Year 4" },
        { value: "5", label: "Year 5" },
      ],
    },
    {
      name: "semester",
      label: "Semester",
      required: true,
      select: true,
      options: [
        { value: "1", label: "Semester 1" },
        { value: "2", label: "Semester 2" },
      ],
    },
    { name: "gpa", label: "GPA", halfWidth: true, disabled: true },
    {
      name: "completedHours",
      label: "Completed Hours",
      halfWidth: true,
      disabled: true,
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      const data = await getStudentProfile(id as studentId);
      setStudent(data.student);
      setCourses(data.courses);
    };

    loadData();
  }, [id]);
  if (!student)
    return <Typography sx={{ p: 4 }}>Loading Student Details...</Typography>;
  const hasCourses = courses && courses.length > 0;
  const handleSaveEdit = async (updatedData: FieldValues) => {
    try {
      const apiPayload = {
        name: updatedData.fullName,
        email: updatedData.email,
        year: updatedData.year?.toString(),
        semester: updatedData.semester?.toString(),
      };

      console.log("Sending to API (Swagger Specs Only):", apiPayload);

      await updateStudent(id as studentId, apiPayload);

      setStudent((prev) => ({ ...prev, ...updatedData }) as IStudent);
      setEditModalOpen(false);

      toast.success("The student details have been successfully updated! ✅");
    } catch (error) {
      console.error("Update failed:", error);

      toast.error(
        "Failed to update student details. Please try again later. ❌",
      );
    }
  };
  const handleUpdateMaxHours = async (data: FieldValues) => {
    try {
      const hours = parseInt(data.maxHours);
      await updateStudentMaxHours(id as studentId, hours);

      setMaxHours(hours);
      setIsMaxHoursModalOpen(false);
      toast.success("Max hours updated successfully! ✅");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update max hours. ❌");
    }
  };
  const handleUpdateStatus = async (data: FieldValues) => {
    try {
      await changeStudentStatus(id as studentId, data.newStatus);
      setStatus(data.newStatus); // تحديث الواجهة
      setIsStatusModalOpen(false);
      toast.success("Student status updated successfully! ✅");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update status. ❌");
    }
  };
const handleUpdateCourseStatus = async (data: FieldValues) => {
  if (!selectedRegistration) return; 

  try {
    await updateRegistrationStatus(
      Number(id), 
      selectedRegistration.courseID, 
      data.newStatus
    );
    
    setCourses(prev => prev.map(c => 
      c.courseID === selectedRegistration.courseID 
        ? {...c, status: data.newStatus} 
        : c
    ));
    
    setIsCourseStatusModalOpen(false);
    toast.success("Course status updated successfully! ✅");
  } catch {
    toast.error("Failed to update course status. ❌");
  }
};

  return (
    <>
      <DetailsLayout
        PageName="Students"
        title={student?.fullName || student?.nameEn}
        isAdmin={true}
        tableTitle="Enrolled Courses"
        noDataMessage="This student is not enrolled in any courses yet."
        tableData={hasCourses ? courses : []}
        tableColumns={[
          { id: "courseID", label: "Course ID" },
          { id: "courseName", label: "Course Name" },
          { id: "creditsHours", label: "Credits" },
          { id: "status", label: "Status" },
          {
            id: "actions",
            label: "Actions",
            render: (row: ICourse) => (
              <EditIcon
                sx={{ cursor: "pointer", color: "primary.main", fontSize: 18 }}
                onClick={() => {
                  setSelectedRegistration(row);
                  setIsCourseStatusModalOpen(true);
                }}
              />
            ),
          },
        ]}
        onEdit={() => setEditModalOpen(true)}
      >
        <Grid container spacing={3}>
          <InfoField label="Student ID" value={student?.studentID} />
          <InfoField label="Email" value={student?.email} />
          <InfoField label="GPA" value={student?.gpa} isGpa />
          <InfoField label="Academic Year" value={student?.year} />
          <InfoField label="Semester" value={student?.semester} />
          <InfoField label="Completed Hours" value={student?.completedHours} />
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 0.5 }}
            >
              Max Hours
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {maxHours}
              </Typography>
              <EditIcon
                sx={{ fontSize: 16, cursor: "pointer", color: "primary.main" }}
                onClick={() => setIsMaxHoursModalOpen(true)}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 0.5 }}
            >
              Student Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {status || "Active"}
              </Typography>
              <EditIcon
                sx={{ fontSize: 16, cursor: "pointer", color: "primary.main" }}
                onClick={() => setIsStatusModalOpen(true)}
              />
            </Box>
          </Grid>
        </Grid>
      </DetailsLayout>
      <FormModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Student Details"
        fields={editFields}
        initialData={{
          ...student,
          fullName: student?.fullName || student?.nameEn || "",
        }}
      />
      <FormModal
        open={isMaxHoursModalOpen}
        onClose={() => setIsMaxHoursModalOpen(false)}
        onSave={handleUpdateMaxHours}
        title="Update Max Hours"
        fields={[
          {
            name: "maxHours",
            label: "Max Hours",
            type: "number",
            required: true,
          },
        ]}
        initialData={{ maxHours: maxHours }}
      />
      <FormModal
        open={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onSave={handleUpdateStatus}
        title="Update Student Status"
        fields={[
          {
            name: "newStatus",
            label: "New Status",
            required: true,
            select: true,
            options: [
              { value: "Active", label: "Active" },
              { value: "Suspended", label: "Suspended" },
              { value: "Graduated", label: "Graduated" },
            ],
          },
        ]}
        initialData={{ newStatus: status || "Active" }}
      />
      <FormModal
        open={isCourseStatusModalOpen}
        onClose={() => setIsCourseStatusModalOpen(false)}
        onSave={handleUpdateCourseStatus}
        title="Update Course Status"
        fields={[
          {
            name: "newStatus",
            label: "Status",
            required: true,
            select: true,
            options: [
              { value: "Registered", label: "Registered" },
              { value: "In Progress", label: "In Progress" },
              { value: "Waiting", label: "Waiting" },
            ],
          },
        ]}
        initialData={{ newStatus: selectedRegistration?.status }}
      />
    </>
  );
};

const InfoField = ({ label, value, isGpa }: IInfoFieldProps) => (
  <Grid size={{ xs: 6, md: 4 }}>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "block", mb: 0.5 }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        color: isGpa ? "#38a169" : "#1a202c",
      }}
    >
      {value !== undefined && value !== null && value !== "" ? value : "---"}
    </Typography>
  </Grid>
);

export default StudentDetails;
