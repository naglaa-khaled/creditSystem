import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import { getCourseProfile, updateCourse } from "../../../../../API/SyudentAffairsData/Courses";
import {
  type studentId,
  type IInfoFieldProps,
  type IFullCourseProfile,
  type ICourse,
} from "../../../../Shared/Interfaces/index";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import type { FieldValues } from "react-hook-form";

const SchedualDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<IFullCourseProfile | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  
const editCourseFields = [
    { name: "courseName", label: "Course Name", required: true },
    { name: "courseID", label: "Course ID", required: true },
    { name: "creditsHours", label: "Credits Hours", type: "number", required: true },
    { name: "level", label: "Level", required: true },
    { name: "courseType", label: "Course Type", required: true },
    { name: "semester", label: "Semester", required: true },
  ];
  useEffect(() => {
    const loadData = async () => {
      const data = await getCourseProfile(id as studentId);
      setProfile(data);
    };
    loadData();
  }, [id]);
const handleSaveEdit = async (updatedData: FieldValues) => {
  try {
    if (!id) return;

    const response = await updateCourse(id, updatedData as ICourse);

    if (response.success) {
      setProfile((prev) => 
        prev ? { ...prev, course: { ...prev.course, ...updatedData } as ICourse } : null
      );
      
      setEditModalOpen(false);
      
    }
  } catch (error) {
    console.error("Update failed:", error);
  }
};

  if (!profile)
    return <Typography sx={{ p: 4 }}>Loading Student Details...</Typography>;

  return (
    <>
      <DetailsLayout
        PageName="Courses"
        title={profile.course.courseName}
        isAdmin={true}
        tableTitle="Enrolled Courses"
        tableData={profile.enrolledStudents}
        tableColumns={[
          { id: "studentID", label: "Student ID" },
          { id: "studentName", label: "Student Name" },
          { id: "StudentYear", label: "Student Year" },
          
          { id: "status", label: "Status" },
        ]}
        onEdit={() => setEditModalOpen(true)}
      >
        <Grid container spacing={3}>
          <InfoField label="Course ID" value={profile.course.courseID} />
          <InfoField
            label="Credits Hours"
            value={profile.course.creditsHours}
          />
          <InfoField label="Level" value={profile.course.level} isGpa />
          <InfoField label="Course Type" value={profile.course.courseType} />
          <InfoField label="Semester" value={profile.course.semester} />
        </Grid>
      </DetailsLayout>
      <FormModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Course Details"
        fields={editCourseFields}
        initialData={profile.course} 
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
      {value || "---"}
    </Typography>
  </Grid>
);

export default SchedualDetails;
