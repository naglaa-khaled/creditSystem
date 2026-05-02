import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import {
  getStudentProfile,
} from "../../../../../API/SyudentAffairsData/Students";
import {

  type studentId,
  type IInfoFieldProps,
  type IFullStudentProfile,
} from "../../../../Shared/Interfaces/index";

const StudentDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<IFullStudentProfile | null>(null);



  useEffect(() => {
    const loadData = async () => {
      const data = await getStudentProfile(id as studentId);
      setProfile(data);
    };
    loadData();
  }, [id]);

  if (!profile) return <Typography sx={{ p: 4 }}>Loading Student Details...</Typography>;

  return (
    <>
      <DetailsLayout
        PageName="Students"
        title={profile.student.nameEn}
        isAdmin={false}
        tableTitle="Enrolled Courses"
        tableData={profile.courses}
        tableColumns={[
          { id: "courseID", label: "Course ID" },
          { id: "courseName", label: "Course Name" },
          { id: "credits", label: "Credits" },
          { id: "status", label: "Status" },
        ]}
      >
        <Grid container spacing={3}>
          <InfoField label="Student ID" value={profile.student.studentID} />
          <InfoField label="Email" value={profile.student.email} />
          <InfoField label="GPA" value={profile.student.gpa} isGpa />
          <InfoField label="Academic Year" value={profile.student.year} />
          <InfoField label="Semester" value={profile.student.semester} />
          <InfoField label="Completed Hours" value={profile.student.completedHours} />
        </Grid>
      </DetailsLayout>
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
      {value || "---"}
    </Typography>
  </Grid>
);

export default StudentDetails;
