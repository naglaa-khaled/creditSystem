import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import { getCourseProfile } from "../../../../../API/SyudentAffairsData/Courses";
import {
  type studentId,
  type IInfoFieldProps,
  type IFullCourseProfile,
} from "../../../../Shared/Interfaces/index";

const CourseDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<IFullCourseProfile | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCourseProfile(id as studentId);
      setProfile(data);
    };
    loadData();
  }, [id]);

  if (!profile)
    return <Typography sx={{ p: 4 }}>Loading Student Details...</Typography>;

  return (
    <>
      <DetailsLayout
        PageName="Courses"
        title={profile.courseNameEn}
        isAdmin={false}
        tableTitle="Enrolled Courses"
        tableData={profile.students}
        tableColumns={[
          { id: "studentID", label: "Student ID" },
          { id: "studentName", label: "Student Name" },
          { id: "status", label: "Status" },
        ]}
      >
        <Grid container spacing={3}>
          <InfoField label="Course ID" value={profile.courseID} />
          <InfoField
            label="Credits Hours"
            value={profile.creditHours}
          />
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

export default CourseDetails;
