import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type FieldValues } from "react-hook-form";
import { Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import {
  getStudentById,
  getStudentCourses,
} from "../../../../../API/SyudentAffairsData/Students";
import { type ICourse, type IStudent ,type studentId , type IInfoFieldProps } from "../../../../Shared/Interfaces/index";
import FormModal from "../../../../Shared/components/Modals/FormModel";

const StudentDetails = () => {
 
  const { id } = useParams();
  const [student, setStudent] = useState<IStudent>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const editFields = [
    { name: "nameEn", label: "Full Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "studentID", label: "Student ID", required: true },
    { name: "year", label: "Academic Year", required: true },
    { name: "semester", label: "Semester", required: true },
    { name: "gpa", label: "GPA", halfWidth: true },
    { name: "completedHours", label: "Completed Hours", halfWidth: true },
  ];

  useEffect(() => {
    const loadData = async () => {
      const sData = await getStudentById(id as studentId);
      const cData = await getStudentCourses(id as studentId);
      setStudent(sData);
      setCourses(cData);
    };
    loadData();
  }, [id]);
  const handleSaveEdit = async (updatedData: FieldValues) => {
    try {
      console.log("Sending to API:", updatedData);
      setStudent((prev) => ({ ...prev, ...updatedData } as IStudent));
      setEditModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
    <DetailsLayout
      PageName="Students"
      title={student?.nameEn}
      isAdmin={true}
      tableTitle="Enrolled Courses"
      tableData={courses}
      tableColumns={[
        { id: "courseID", label: "Course ID" },
        { id: "courseName", label: "Course Name" },
        { id: "credits", label: "Credits" },
        { id: "status", label: "Status" },
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
      </Grid>
    </DetailsLayout>
    <FormModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Student Details"
        fields={editFields}
        initialData={student} // ببعت بيانات الطالب الحالية عشان تظهر في الخانات
      />
    </>
  );
};

const InfoField = ({
  label,
  value,
  isGpa,
}: IInfoFieldProps) => (
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
      {value || "---"}
    </Typography>
  </Grid>
);

export default StudentDetails;
