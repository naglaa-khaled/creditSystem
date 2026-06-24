import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import {
  getCourseProfile,
  updateCourse,
} from "../../../../../API/AdminData/Courses";
import {
  type studentId,
  type IInfoFieldProps,
  type IFullCourseProfile,
  type ICourse,
} from "../../../../Shared/Interfaces/index";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<IFullCourseProfile | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const editCourseFields = [
    {
      name: "courseNameEn",
      label: "English Course Name",
      required: true,
    },
    {
      name: "courseNameAr",
      label: "Arabic Course Name",
      required: true,
    },
    {
      name: "courseID",
      label: "Course ID",
      required: true,
    },
    {
      name: "creditHours",
      label: "Credits Hours",
      type: "number",
      required: true,
      inputProps: { min: 1, max: 4 },
    },
    {
      name: "level",
      label: "Level",
      required: true,
      select: true,
      options: [
        { value: 1, label: "Level 1" },
        { value: 2, label: "Level 2" },
        { value: 3, label: "Level 3" },
        { value: 4, label: "Level 4" },
        { value: 5, label: "Level 5" },
      ],
    },
    {
      name: "courseType",
      label: "Course Type",
      required: true,
      select: true,
      options: [
        { value: "Core", label: "Core (إجباري)" },
        { value: "Elective", label: "Elective (اختياري)" },
      ],
    },
    {
      name: "semester",
      label: "Semester",
      required: true,
      select: true,
      options: [
        { value: 1, label: "Semester 1" },
        { value: 2, label: "Semester 2" },
      ],
    },
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
        setProfile((prev) => (prev ? { ...prev, ...updatedData } : null));
        setEditModalOpen(false);
        toast.success("Course details updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update course details.");
    }
  };

  if (!profile)
    return <Typography sx={{ p: 4 }}>Loading Course Details...</Typography>;

  return (
    <>
      <DetailsLayout
        PageName="Courses"
        noDataMessage="No students have registered in this course yet."
        title={profile.courseNameEn}
        isAdmin={true}
        tableTitle="Enrolled Students"
        tableData={profile.students}
        tableColumns={[
          { id: "studentID", label: "Student ID" },
          { id: "studentName", label: "Student Name" },
          { id: "status", label: "Status" },
        ]}
        onEdit={() => setEditModalOpen(true)}
      >
        <Grid container spacing={3}>
          <InfoField label="Course ID" value={profile.courseID} />
          <InfoField label="Credits Hours" value={profile.creditHours} />
          <InfoField label="Level" value={profile.level} />
          <InfoField label="Course Type" value={profile.courseType} />
          <InfoField label="Semester" value={profile.semester} />
        </Grid>
      </DetailsLayout>
      <FormModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Course Details"
        fields={editCourseFields}
        initialData={profile}
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
        color: isGpa ? "success.main" : "primary.main",
      }}
    >
      {value || "---"}
    </Typography>
  </Grid>
);

export default CourseDetails;
