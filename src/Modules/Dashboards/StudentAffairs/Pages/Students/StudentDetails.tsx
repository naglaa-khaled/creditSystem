import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid as Grid, Typography } from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import { getStudentProfile } from "../../../../../API/SyudentAffairsData/Students";
import {
  type studentId,
  type IInfoFieldProps,
  type IFullStudentProfile,
} from "../../../../Shared/Interfaces/index";
import { AxiosError } from "axios";
import { Chip } from "@mui/material";

const StudentDetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<IFullStudentProfile | null>(null);
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      const numericId = Number(id);
      try {
        const data = await getStudentProfile(numericId as studentId);
        setProfile(data);
      } catch (error: unknown) {
        // استخدام unknown بدلاً من any
        if (error instanceof AxiosError) {
          console.error(
            "Failed to load student profile:",
            error.response?.status,
            error.response?.data,
          );
        } else if (error instanceof Error) {
          console.error("Failed to load student profile:", error.message);
        }
      }
    };
    loadData();
  }, [id]);

  if (!profile)
    return (
      <Typography
        sx={{
          p: 4,
          color: "text.primary",
        }}
      >
        Loading Student Details...
      </Typography>
    );
  const hasCourses = profile.courses && profile.courses.length > 0;

  return (
    <>
      <DetailsLayout
        PageName="Students"
        title={profile.student.fullName || profile.student.nameEn}
        isAdmin={false}
        tableTitle="Enrolled Courses"
        noDataMessage="This student is not enrolled in any courses yet."
        tableData={hasCourses ? profile.courses : []}
        tableColumns={[
          { id: "courseID", label: "Course ID" },
          { id: "courseName", label: "Course Name" },
          { id: "creditsHours", label: "Credits" },
          {
            id: "status",
            label: "Status",
            render: (row) => (
              <Chip
                label={row.status}
                color={
                  row.status === "Registered"
                    ? "primary"
                    : row.status === "Waiting"
                      ? "warning"
                      : row.status === "In Progress"
                        ? "secondary"
                        : "default"
                }
                size="small"
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                }}
              />
            ),
          },
        ]}
      >
        <Grid container spacing={3}>
          <InfoField label="Student ID" value={profile.student.studentID} />
          <InfoField label="Email" value={profile.student.email} />
          <InfoField label="GPA" value={profile.student.gpa} isGpa />
          <InfoField label="Academic Year" value={profile.student.year} />
          <InfoField label="Semester" value={profile.student.semester} />
          <InfoField
            label="Status"
            value={profile.student.status}
            isStatus
          />{" "}
          <InfoField
            label="maxAllowedHours"
            value={profile.student.maxAllowedHours}
          />
        </Grid>
      </DetailsLayout>
    </>
  );
};

interface InfoFieldProps extends IInfoFieldProps {
  isStatus?: boolean;
}

const InfoField = ({ label, value, isGpa, isStatus }: InfoFieldProps) => {
  const getStatusColor = () => {
    switch (value) {
      case "Active":
        return "success";

      case "Suspended":
        return "warning";

      case "Graduated":
        return "info";

      case "Inactive":
        return "error";

      case "Registered":
        return "primary";

      case "Waiting":
        return "warning";

      case "In Progress":
        return "secondary";

      default:
        return "default";
    }
  };

  return (
    <Grid size={{ xs: 6, md: 4 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 0.5 }}
      >
        {label}
      </Typography>

      {isStatus ? (
        <Chip
          label={value || "---"}
          color={getStatusColor()}
          size="small"
          variant="filled"
          sx={{
            fontWeight: 700,
            borderRadius: "8px",
            px: 1,
          }}
        />
      ) : (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: isGpa ? "success.main" : "text.primary",
          }}
        >
          {value ?? "---"}
        </Typography>
      )}
    </Grid>
  );
};

export default StudentDetails;
