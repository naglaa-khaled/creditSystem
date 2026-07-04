import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Chip,
  Grid as Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DetailsLayout from "../../../../Shared/components/DetailsLayout/DetailsLayout";
import {
  getCourseProfile,
  updateCourse,
  getPrerequisitesByCourseId,
  getOfferingsByCourse,
  getStudentsInOffering,
  updateRegistrationStatus,
  dropStudentRegistration,
  deleteOffering,
  addPrerequist,
  setupCourseOfferingAndSchedule,
  adminManualRegistration,
  removePrerequisite,
} from "../../../../../API/AdminData/Courses";
import {
  type IInfoFieldProps,
  type IFullCourseProfile,
  type ICoursePrerequisite,
  type ISchedule,
  type IEnrolledStudent,
} from "../../../../Shared/Interfaces/index";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import CustomButton from "../../../../Shared/components/Button/Button";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteModal from "../../../../Shared/components/Modals/DeleteModal";

const CourseDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [profile, setProfile] = useState<IFullCourseProfile | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [prereqs, setPrereqs] = useState<ICoursePrerequisite[]>([]);
  const [offerings, setOfferings] = useState<ISchedule[]>([]);
  const [selectedOffering, setSelectedOffering] = useState<number | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<IEnrolledStudent[]>(
    [],
  );
  const [showTable, setShowTable] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<
    number | string | null
  >(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddPrerequisiteModalOpen, setAddPrerequisiteModalOpen] =
    useState(false);
  const [isDeletePrereqModalOpen, setDeletePrereqModalOpen] = useState(false);
  const [selectedPrereqId, setSelectedPrereqId] = useState<string | null>(null);

  const [isAddOfferingModalOpen, setAddOfferingModalOpen] = useState(false);

  const [isAddStudentModalOpen, setAddStudentModalOpen] = useState(false);

  const [studentStatusInitialData, setStudentStatusInitialData] = useState({});
  const [selectedOfferingToDelete, setSelectedOfferingToDelete] = useState<
    number | null
  >(null);
  const [isDeleteOfferingModalOpen, setDeleteOfferingModalOpen] =
    useState(false);
  const [isLoadingPrereqs, setIsLoadingPrereqs] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const loadStudentsInOffering = async (offeringId: number) => {
    setIsLoadingStudents(true);

    try {
      const students = await getStudentsInOffering(offeringId);
      setEnrolledStudents(students);
    } catch (error) {
      toast.error(`Failed to load students${error}`);
    } finally {
      setIsLoadingStudents(false);
    }
  };
  const statusFields = [
    {
      name: "newStatus",
      label: "New Status",
      required: true,
      select: true,
      options: [
        { value: "inprogress", label: "inprogress" },
        { value: "waiting", label: "waiting" },
        { value: "Registered", label: "Registered" },
      ],
    },
  ];
  const registrationFields = [
    {
      name: "studentId",
      label: "Student ID",
      required: true,
    },
  ];
  const prerequisiteFields = [
    {
      name: "prerequisiteCourseID",
      label: "Prerequisite Course ID",
      required: true,
      type: "text",
    },
  ];
  useEffect(() => {
    if (id) {
      getOfferingsByCourse(id).then(setOfferings);
    }
  }, [id]);
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
        { value: "Mandatory", label: "Mandatory" },
        { value: "Optional", label: "Optional" }, // تم تعديلها من optional إلى Optional
        { value: "Core", label: "Core" },
        { value: "Elective", label: "Elective" },
        // تم تعديلها من core إلى Core
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
    {
      name: "CourseCategory",
      label: "Course Category",
      required: true,
      select: true,
      options: [
        { value: "UR", label: "UR" },
        { value: "ENG", label: "ENG" },
        { value: "ISE", label: "ISE" },
        { value: "VIS", label: "VIS" },
        { value: "NLP", label: "NLP" },
        { value: "CNS", label: "CNS" },
        { value: "ROB", label: "ROB" },
      ],
    },
  ];
  const offeringFields = [
    {
      name: "instructorId",
      label: "Instructor ID",
      required: true,
      type: "text",
    },
    {
      name: "capacity",
      label: "Capacity",
      required: true,
      type: "number",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        setIsLoadingPrereqs(true);

        const profileData = await getCourseProfile(id);
        setProfile(profileData);

        const allPrereqs = await getPrerequisitesByCourseId(id);
        setPrereqs(allPrereqs.filter((p) => String(p.courseID) === String(id)));

        const offeringsData = await getOfferingsByCourse(id);
        setOfferings(offeringsData);
      } catch (error) {
        toast.error(`Failed to load data.${error}`);
      } finally {
        setIsLoadingPrereqs(false);
      }
    };

    loadData();
  }, [id]);
  const handleAddRegistration = async (data: FieldValues) => {
    if (!selectedOffering) return;

    try {
      const response = await adminManualRegistration(
        Number(data.studentId),
        selectedOffering,
      );

      if (response.success) {
        const students = await getStudentsInOffering(selectedOffering);

        setEnrolledStudents(students);

        toast.success("Student registered successfully");
        setAddStudentModalOpen(false);
      } else {
        toast.error(response.message);
        setAddStudentModalOpen(false);
      }
    } catch (error) {
      toast.error(`An error occurred ${error}`);
      setAddStudentModalOpen(false);
    }
  };
  const handleConfirmDeleteOffering = async () => {
    if (!selectedOfferingToDelete) return;

    try {
      // افترضي أن لديك دالة في API تسمى deleteOffering
      const response = await deleteOffering(selectedOfferingToDelete);

      if (response.success) {
        setOfferings((prev) =>
          prev.filter((o) => o.id !== selectedOfferingToDelete),
        );
        toast.success("Offering deleted successfully");
        if (selectedOffering === selectedOfferingToDelete) {
          setShowTable(false);
          setSelectedOffering(null);
        }
      } else {
        toast.error(response.message || "Failed to delete offering");
        setDeleteOfferingModalOpen(false);
      }
    } catch (error) {
      toast.error(`An error occurred ${error}`);
      setDeleteOfferingModalOpen(false);
    } finally {
      setDeleteOfferingModalOpen(false);
      setSelectedOfferingToDelete(null);
    }
  };
  const handleAddPrerequisite = async (data: FieldValues) => {
    if (!id) return;

    try {
      const response = await addPrerequist(id, data.prerequisiteCourseID);

      if (response.success) {
        const updated = await getPrerequisitesByCourseId(id);

        setPrereqs(updated.filter((p) => String(p.courseID) === String(id)));

        toast.success("Prerequisite added successfully");
        setAddPrerequisiteModalOpen(false);
      } else {
        toast.error(response.message || "Failed to add prerequisite");
        setAddPrerequisiteModalOpen(false);
      }
    } catch (error) {
      toast.error(`An error occurred ${error}`);
      setAddPrerequisiteModalOpen(false);
    }
  };
  const handleAddOffering = async (data: FieldValues) => {
    if (!id) return;

    try {
      console.log("Route id:", id);
      console.log("Profile:", profile);

      const payload = {
        courseID: profile?.courseID,
        instructorID: Number(data.instructorId),
        capacity: Number(data.capacity),
      };

      console.log(payload);

      const response = await setupCourseOfferingAndSchedule(payload);

      if (response.success) {
        const updated = await getOfferingsByCourse(id);

        setOfferings(updated);

        toast.success("Offering added successfully");
        setAddOfferingModalOpen(false);
      } else {
        toast.error(response.message || "Failed to add offering");
        setAddOfferingModalOpen(false);
      }
    } catch (error) {
      toast.error(`An error occurred ${error}`);
      setAddOfferingModalOpen(false);
    }
  };
  // في ملف CourseDetails.tsx

  const handleDeletePrerequisite = async () => {
    if (!id || !selectedPrereqId) return;

    try {
      const response = await removePrerequisite(id, selectedPrereqId);

      if (response.success) {
        setPrereqs((prev) =>
          prev.filter((p) => p.prerequisiteCourseID !== selectedPrereqId),
        );
        toast.success("Prerequisite removed successfully");
        setDeletePrereqModalOpen(false);
      } else {
        toast.error(response.message || "Failed to remove prerequisite");
        setDeletePrereqModalOpen(false);
      }
    } catch (error) {
      toast.error(`An error occurred ${error}`);
      setDeletePrereqModalOpen(false);
    }
  };
  const handleOpenDeleteModal = (id: string | number) => {
    setSelectedStudentId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStudentId || !selectedOffering) return;

    try {
      const response = await dropStudentRegistration(
        Number(selectedStudentId),
        Number(selectedOffering),
      );

      if (response.success) {
        setEnrolledStudents((prev) =>
          prev.filter((s) => s.studentID !== selectedStudentId),
        );
        setDeleteModalOpen(false);
        setSelectedStudentId(null);
        toast.success("Student dropped successfully");
      } else {
        toast.error(response.message || "Failed to drop student");
        setDeleteModalOpen(false);
        setSelectedStudentId(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("An error occurred while deleting");
      setDeleteModalOpen(false);
      setSelectedStudentId(null);
    } finally {
      setDeleteModalOpen(false);
      setSelectedStudentId(null);
    }
  };

  const handleSaveEdit = async (updatedData: FieldValues) => {
    try {
      if (!id) return;

      const payload = {
        courseID: String(updatedData.courseID),
        courseNameEn: String(updatedData.courseNameEn),
        courseNameAr: String(updatedData.courseNameAr),
        creditHours: Number(updatedData.creditHours),
        level: Number(updatedData.level),
        semester: Number(updatedData.semester),
        courseType: String(updatedData.courseType),
        // هنا نضع القيمة مباشرة من الحقل الذي يملؤه الـ FormModal
        CourseCategory:
          updatedData.CourseCategory ?? updatedData.courseCategory ?? "",
      };
      console.log("Payload being sent:", payload);

      // إرسال الكائن الجاهز للسيرفر
      const response = await updateCourse(id, payload);

      if (response.success) {
        const updatedProfile = await getCourseProfile(id);

        setProfile(updatedProfile);

        setEditModalOpen(false);
        toast.success("Course details updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update course details.");
      setEditModalOpen(false);
    }
  };
  const handleUpdateStatus = async (data: FieldValues) => {
    if (!selectedStudentId || !selectedOffering) return;

    const response = await updateRegistrationStatus(
      selectedStudentId,
      selectedOffering,
      data.newStatus,
    );

    if (response.success) {
      toast.success("Status updated successfully!");
      setIsStatusModalOpen(false);
      // تحديث قائمة الطلاب بعد التعديل
      await loadStudentsInOffering(selectedOffering);
    } else {
      toast.error(response.message || "Failed to update status");
      setIsStatusModalOpen(false);
    }
  };

  const handleSelectOffering = async (offeringId: number) => {
    setSelectedOffering(offeringId);
    setShowTable(true);

    await loadStudentsInOffering(offeringId);
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
        title={profile.courseNameEn}
        showTableActions={false}
        isAdmin={true}
        tableColumns={[]}
        onEdit={() => setEditModalOpen(true)}
      >
        <Grid container spacing={3}>
          <InfoField label="Course ID" value={profile.courseID} />
          <InfoField label="Level" value={profile.level} />
          <InfoField label="Semester" value={profile.semester} />
          <InfoField label="Credits Hours" value={profile.creditHours} />
          <InfoField label="Course Type" value={profile.courseType} />
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
            <CustomButton
              label="Add"
              icon={<AddIcon />}
              variantType="primary"
              onClick={() => setAddPrerequisiteModalOpen(true)}
            />
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {isLoadingPrereqs ? (
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                Loading prerequisites...
              </Typography>
            ) : prereqs.length > 0 ? (
              prereqs.map((prereq) => (
                <Chip
                  key={prereq.prereqID}
                  label={
                    <Box sx={{ py: 0.5 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {prereq.prerequisiteCourseName}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        {prereq.prerequisiteCourseID}
                      </Typography>
                    </Box>
                  }
                  onDelete={() => {
                    setSelectedPrereqId(prereq.prerequisiteCourseID);
                    setDeletePrereqModalOpen(true);
                  }}
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    fontWeight: 500,
                    height: "auto",
                    "& .MuiChip-label": {
                      display: "block",
                      py: 1,
                    },
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
          <CustomButton
            label="Add Offering"
            icon={<AddIcon />}
            variantType="primary"
            onClick={() => setAddOfferingModalOpen(true)}
          />
        </Box>

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

              <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOfferingToDelete(Number(o.id));
                    setDeleteOfferingModalOpen(true);
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
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
              {offerings.find((o) => o.id === selectedOffering)?.instructorName}
            </Typography>

            <CustomButton
              label="Add New Student Registration"
              icon={<AddIcon />}
              variantType="primary"
              onClick={() => setAddStudentModalOpen(true)}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            />
          </Box>

          {isLoadingStudents ? (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ p: 3, textAlign: "center" }}
            >
              Loading students...
            </Typography>
          ) : enrolledStudents.length > 0 ? (
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
                isAdmin={true}
                showView={false}
                onEditStatus={(student) => {
                  setSelectedStudentId(student.studentID);
                  setIsStatusModalOpen(true);
                  setStudentStatusInitialData({ newStatus: student.status });
                }}
                onDelete={(id) => {
                  handleOpenDeleteModal(id);
                }}
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
      <FormModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Course Details"
        fields={editCourseFields}
        initialData={
          profile
            ? {
                ...profile,
                CourseCategory: profile.courseCategory,
              }
            : {}
        }
      />

      <DeleteModal
        open={isDeletePrereqModalOpen}
        onClose={() => {
          setDeletePrereqModalOpen(false);
          setSelectedPrereqId(null);
        }}
        onConfirm={handleDeletePrerequisite}
        title="Confirm Delete Prerequisite"
        message="Are you sure you want to remove this course as a prerequisite?"
      />
      <FormModal
        open={isAddPrerequisiteModalOpen}
        onClose={() => setAddPrerequisiteModalOpen(false)}
        onSave={handleAddPrerequisite}
        title="Add Prerequisite"
        fields={prerequisiteFields}
      />

      <FormModal
        open={isAddOfferingModalOpen}
        onClose={() => setAddOfferingModalOpen(false)}
        onSave={handleAddOffering}
        title="Add Offering"
        fields={offeringFields}
      />

      <FormModal
        open={isAddStudentModalOpen}
        onClose={() => setAddStudentModalOpen(false)}
        onSave={handleAddRegistration}
        title={`Add Student to Offering #${selectedOffering}`}
        fields={registrationFields}
      />
      <DeleteModal
        open={isDeleteOfferingModalOpen}
        onClose={() => {
          setDeleteOfferingModalOpen(false);
          setSelectedOfferingToDelete(null);
        }}
        onConfirm={handleConfirmDeleteOffering}
        title="Confirm Delete Offering"
        message="Are you sure you want to delete this offering? This will remove all associated registrations."
        // itemName={`Offering ID: ${selectedOfferingToDelete}`}
      />
      <FormModal
        open={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onSave={handleUpdateStatus}
        title="Update Student Status"
        fields={statusFields}
        initialData={studentStatusInitialData}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedStudentId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete Student"
        message="Are you sure you want to delete this student from the course?"
        itemName={`Student ID: ${selectedStudentId}`}
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
