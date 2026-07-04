import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Chip,
  Grid as Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import { getCourseProfile } from "../../../../../API/SyudentAffairsData/Courses";
import {
  type IInfoFieldProps,
  type IEnrolledStudent,
  type IFullCourseProfile,
  type ICoursePrerequisite,
  type ISchedule,
} from "../../../../Shared/Interfaces/index";
import {
  getOfferingsByCourse,
  getPrerequisitesByCourseId,
  getStudentsInOffering,
} from "../../../../../API/SyudentAffairsData/Courses";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [profile, setProfile] = useState<IFullCourseProfile | null>(null);
  const [prereqs, setPrereqs] = useState<ICoursePrerequisite[]>([]);
  const [offerings, setOfferings] = useState<ISchedule[] | null>(null);
  const [selectedOffering, setSelectedOffering] = useState<number | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<IEnrolledStudent[]>(
    [],
  );
  const [showTable, setShowTable] = useState(false);
  useEffect(() => {
    if (id) {
      getOfferingsByCourse(id).then(setOfferings);
    }
  }, [id]);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        // 1. جلب بيانات المقرر الأساسية
        const profileData = await getCourseProfile(id);
        setProfile(profileData);

        // 2. جلب المتطلبات (بشكل مستقل لمعالجة الـ 404)
        try {
          const allPrereqs = await getPrerequisitesByCourseId(id);
          setPrereqs(allPrereqs.filter((p) => String(p.courseID) === String(id)));
        } catch (error: unknown) {
          const isAxiosLikeError = (
            err: unknown,
          ): err is { response?: { status?: number } } =>
            typeof err === "object" &&
            err !== null &&
            "response" in err &&
            typeof (err as { response?: unknown }).response === "object" &&
            (err as { response?: unknown }).response !== null;

          if (isAxiosLikeError(error) && error.response?.status === 404) {
            setPrereqs([]);
          } else {
            console.error("Error fetching prerequisites:", error);
          }
        }

        // 3. جلب العروض
        try {
          const offeringsData = await getOfferingsByCourse(id);
          setOfferings(offeringsData || []);
        } catch (error) {
          setOfferings([]);
          console.log(error);
        }
      } catch (error) {
        toast.error(`Failed to load course profile.`);
        console.log(error);
      }
    };
    loadData();
  }, [id]);

  const handleSelectOffering = async (offeringId: number) => {
    setSelectedOffering(offeringId);
    setShowTable(true);
    const data = await getStudentsInOffering(offeringId);
    setEnrolledStudents(data);
  };

  if (!profile)
    return (
      <Typography
        sx={{
          p: 4,
          color: "text.primary",
        }}
      >
        Loading Course Details...
      </Typography>
    );

  return (
    <>
      <DetailsLayout
        PageName="Courses"
        title={profile.courseName}
        showTableActions={false}
        isAdmin={false}
        tableColumns={[]}
      >
        <Grid container spacing={3}>
          <InfoField label="Course ID" value={profile.courseID} />
          <InfoField label="Credits Hours" value={profile.creditHours} />
          <InfoField label="Level" value={profile.level} />
          <InfoField label="Course Type" value={profile.courseType} />
          <InfoField label="Semester" value={profile.semester} />
          <InfoField label="Course Category" value={profile.courseCategory} />
        </Grid>
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: "16px",
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Course Prerequisites
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {prereqs.length > 0 ? (
              prereqs.map((prereq) => (
                <Chip
                  key={prereq.prereqID}
                  label={
                    prereq.prerequisiteCourseName || prereq.prerequisiteCourseID
                  }
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    fontWeight: 500,
                  }}
                />
              ))
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                This Course doesn't have prerequisites.
              </Typography>
            )}
          </Stack>
        </Box>
      </DetailsLayout>

      <Paper
        sx={{
          p: 3,
          borderRadius: "16px",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "none",
          mx: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Course Offerings
          </Typography>
        </Box>

        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
          {offerings === null ? (
    <Typography>Loading offerings...</Typography>
  ) : offerings.length > 0 ? (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
      {offerings.map((o) => (
            <Paper
              key={o.id}
              onClick={() => handleSelectOffering(Number(o.id))}
              sx={{
                p: 2,
                cursor: "pointer",
                borderRadius: "20px",
                border:
                  selectedOffering === Number(o.id)
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`,
                bgcolor:
                  selectedOffering === Number(o.id)
                    ? "primary.light"
                    : "background.paper",
                width: 250,
                position: "relative",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Dr. {o.instructorName}
              </Typography>
              <Typography variant="body2">Offering #{o.id}</Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity: {o.capacity || "0"}
              </Typography>

              <Box sx={{ position: "absolute", top: 8, right: 8 }}></Box>
            </Paper>
          ))}
        </Stack>
        ) : (
    <Typography variant="body2" color="text.secondary">
      No offerings available in this course.
    </Typography>
  )}
        </Stack>
      </Paper>

      {showTable && (
        <Box sx={{ my: 4, mx: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              mb: 2,
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
              Enrolled Students -{" "}
              {offerings?.find((o) => o.id === selectedOffering)?.instructorName}
            </Typography>
          </Box>

          {enrolledStudents.length > 0 ? (
            <Box
              sx={{
                borderRadius: "20px",
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: "background.paper",
              }}
            >
              <SharedTable
                columns={[
                  { id: "studentID", label: "Student ID" },
                  { id: "studentName", label: "Student Name" },
                  {
                    id: "status",
                    label: "Status",
                    render: (row: IEnrolledStudent) => {
                      const value = row.status; // القيمة مثل "Registered" أو "waiting"

                      // تحديد الألوان بناءً على الحالة
                      const isRegistered = value === "Registered";

                      return (
                        <Chip
                          label={value}
                          size="small"
                          sx={{
                            backgroundColor: isRegistered
                              ? "#e8f5e9"
                              : "#fff3e0", // أخضر فاتح للمسجل / برتقالي فاتح للانتظار
                            color: isRegistered ? "#2e7d32" : "#ef6c00", // أخضر غامق للمسجل / برتقالي غامق للانتظار
                            fontWeight: "700",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            border: isRegistered
                              ? "1px solid #c8e6c9"
                              : "1px solid #ffe0b2",
                          }}
                        />
                      );
                    },
                  },
                  { id: "registrationDate", label: "Registration Date" },
                ]}
                data={enrolledStudents}
                idField="studentID"
                isAdmin={false}
                showView={false}
              />
            </Box>
          ) : (
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: "12px",
                border: `1px dashed ${theme.palette.divider}`,
                bgcolor: "background.default",
                mb: 2,
                mx: 2.5,
              }}
            >
              <Typography
                sx={{ color: "primary.main", fontWeight: "bold" }}
                variant="h6"
              >
                No students registered in this offering yet.
              </Typography>
            </Paper>
          )}
        </Box>
      )}
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
