import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import {
  getStudentById,
  getStudentCourses,
} from "../../../../../API/SyudentAffairsData/Students";
import { type ICourse, type IStudent ,type studentId , type IInfoFieldProps } from "../../../../Shared/Interfaces/index";

const StudentDetails = () => {
  

 

  const { id } = useParams();
  const [student, setStudent] = useState<IStudent>();
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const sData = await getStudentById(id as studentId);
      const cData = await getStudentCourses(id as studentId);
      setStudent(sData);
      setCourses(cData);
    };
    loadData();
  }, [id]);

  return (
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
      onEdit={() => console.log("Open Edit Modal")}
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
