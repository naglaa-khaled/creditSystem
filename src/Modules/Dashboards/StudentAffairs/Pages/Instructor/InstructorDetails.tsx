import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import { getInstructorProfile } from "../../../../../API/SyudentAffairsData/Instructor";
import {
  type studentId,
  type IInstructor,
} from "../../../../Shared/Interfaces/index";

const InstructorDetails = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState<IInstructor | null>(null);



  useEffect(() => {
    const loadData = async () => {
      const data = await getInstructorProfile(id as studentId);
      setInstructor(data);
    };
    loadData();
  }, [id]);



  if (!instructor)
    return <Typography sx={{ p: 4 }}>Loading Instructor Details...</Typography>;

  return (
    <>
      <DetailsLayout
        PageName="Instructors"
        title={instructor.nameEn}
        isAdmin={false}
        tableTitle="Assigned Courses"
        tableData={instructor.coursesList || []}
        tableColumns={[
          { id: "courseID", label: "Course ID" },
          { id: "courseName", label: "Course Name" },
          { id: "studentsCount", label: "Students Count" },
        ]}
      >
        <Grid container spacing={3}>
          <InfoField label="Instructor ID" value={instructor.instructorID} />
          <InfoField label="Email Address" value={instructor.email} />
          <InfoField label="Total Courses" value={instructor.totalCourses} />
        </Grid>
      </DetailsLayout>

      
    </>
  );
};

const InfoField = ({ label, value }: { label: string; value: string | number }) => (
  <Grid size={{ xs: 12, md: 4 }}>
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600, color: "#1a202c" }}>
      {value || "---"}
    </Typography>
  </Grid>
);

export default InstructorDetails;