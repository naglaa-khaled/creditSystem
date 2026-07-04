import { useState } from "react";
import { Box, Chip, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import FormModal, {
  type FieldConfig,
} from "../../../../Shared/components/Modals/FormModel";
import CustomButton from "../../../../Shared/components/Button/Button";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";
import GradeIcon from "@mui/icons-material/Grade";

import {
  getGrades,
  exportCourseGrades,
  getCourseGrades,
  getStudentGrades,
  publishSemesterResults,
  importGrades,
} from "../../../../../API/AdminData/Grades";
import { type Column, type IGradeRow, type IPublishFormData } from "../../../../Shared/Interfaces";

const Reports = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // States
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchedData, setSearchedData] = useState<IGradeRow[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allGrades, setAllGrades] = useState<IGradeRow[]>([]);
  const [loadingCount, setLoadingCount] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchType, setSearchType] = useState<"student" | "course">("student");
  const activeApiFilters = {
    level: "",
    semester: "",
    academicYear: "2026",
  };
  const [selectedGroup, setSelectedGroup] = useState<{
    level: string;
    semester: string;
  } | null>(null);


  const cardOptions = [
    { level: "1", semester: "1" },
    { level: "1", semester: "2" },
    { level: "2", semester: "1" },
    { level: "2", semester: "2" },
    { level: "3", semester: "1" },
    { level: "3", semester: "2" },
    { level: "4", semester: "1" },
    { level: "4", semester: "2" },
    { level: "5", semester: "1" },
    { level: "5", semester: "2" },
  ];
  const exportFields: FieldConfig[] = [
    { name: "courseID", label: "Course ID", required: true },
    {
      name: "academicYear",
      label: "Academic Year",
      required: true,
      select: true,
      options: [{ value: "2026", label: "2026" }],
    },
    {
      name: "semester",
      label: "Semester",
      required: true,
      select: true,
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ],
    },
  ];
  // إضافة دالة الـ Publish
const handlePublish = async (data: IPublishFormData) => {
  const res = await publishSemesterResults(
    data.academicYear,
    data.semester,
    data.level
  );
  if (res.success) {
    toast.success("Grades published successfully!");
  } else {
    toast.error(res.message || "Failed to publish");
  }
}

  const searchFields: FieldConfig[] = [
    { name: "searchValue", label: "Enter ID", required: true },
    {
      name: "academicYear",
      label: "Academic Year",
      required: true,
      select: true,
      options: [{ value: "2026", label: "2026" }],
    },
    {
      name: "semester",
      label: "Semester",
      required: true,
      select: true,
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ],
    },
    {
      name: "level",
      label: "Level",
      required: true,
      select: true,
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
      ],
    },
  ];

  const handleSearch = async (data: {
    searchValue: string;
    academicYear: string;
    semester: string;
    level: string;
  }) => {
    setIsSearching(true);
    setSearchLoading(true);

    try {
      const res =
        searchType === "student"
          ? await getStudentGrades(
              data.searchValue,
              data.academicYear,
              data.semester,
            )
          : await getCourseGrades(
              data.searchValue,
              data.academicYear,
              data.semester,
            );

      const rawData = Array.isArray(res) ? res : res?.data || [];

      const formattedData: IGradeRow[] = rawData.map(
        (item: Record<string, unknown>) => ({
          // في بحث الطالب، الـ ID هو الـ searchValue الذي أدخلتِه
          // في بحث الكورس، الـ API يرسل studentID في كل كائن
          studentID: (item.studentID as string | undefined) || data.searchValue,

          // هنا التعديل: سنحاول البحث عن الاسم في عدة أماكن، وإذا لم نجد شيئاً، سنظهر الـ ID فقط
          studentName:
            item.studentFullName ||
            item.studentName ||
            `Student ID: ${data.searchValue}`,
          courseID: item.courseID || "-",
          courseName: item.courseName || "-",
          courseLevel: item.level || "-",
          courseSemester: item.semester || "-",
          category: item.category || "-",
          hours: item.hours || "-",
          numericGrade: item.numericGrade || "-",
          percentage: item.percentage || "-",
          letterGrade: item.letterGrade || "-",
          gradePoints: item.gradePoints || "-",
        }),
      );

      setSearchedData(formattedData);
    } catch (error) {
      console.error("Search Error:", error);
      setSearchedData([]);
    } finally {
      setSearchLoading(false);
    }
  };
   const getGradeColor = (
    value: string | number
  ): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    const valueString = String(value).trim();
    if (!valueString) return "default";

    if (/^[A-F]$/i.test(valueString)) {
      switch (valueString.toUpperCase()) {
        case "A":
          return "success";
        case "B":
          return "primary";
        case "C":
          return "info";
        case "D":
          return "warning";
        case "F":
          return "error";
      }
    }

    const numeric = parseFloat(valueString);
    if (Number.isNaN(numeric)) return "default";

    if (numeric <= 4.5) {
      if (numeric >= 3.5) return "success";
      if (numeric >= 2.5) return "primary";
      if (numeric >= 2.0) return "info";
      if (numeric >= 1.0) return "warning";
      return "error";
    }

    if (numeric >= 85) return "success";
    if (numeric >= 65) return "info";
    if (numeric >= 50) return "warning";
    return "error";
  };

  const handleCardClick = async (level: string, semester: string) => {
    setSelectedGroup({ level, semester });
    setAllGrades([]);
    setLoadingCount(true);
    try {
      const students = await getGrades(
        activeApiFilters.academicYear,
        semester,
        level,
      );
      const grades: IGradeRow[] = students.flatMap((student) =>
        student.coursesReviewed.map((course) => ({
          studentID: student.studentID,
          studentName: student.studentName,
          courseID: course.courseCode,
          courseName: course.courseName,
          courseLevel: Number(student.level),
          courseSemester: student.semester,
          numericGrade: course.numericGrade ?? "-",
          letterGrade: course.letterGrade ?? "-",
          percentage: course.percentage ?? "-",
          gradePoints: course.gradePoints ?? "-",
          hours: course.hours,
          category: course.category,
        })),
      );
      setAllGrades(grades);
    } catch (error) {
      console.error("Failed to load Grades:", error);
    } finally {
      setLoadingCount(false);
    }
  };


const SchedaulTable: Column<IGradeRow>[] = [
  { id: "studentID", label: "Student ID" },
  { id: "studentName", label: "Student Name" },
  { id: "courseID", label: "Course ID" },
  { id: "courseName", label: "Course Name" },
  { id: "courseLevel", label: "Level" },
  { id: "courseSemester", label: "Semester" },
  { id: "category", label: "Category" },
  { id: "hours", label: "Hours" },
  { 
    id: "numericGrade", 
    label: "Numeric Grade",
    render: (row) => (
        <Chip
          label={row.numericGrade}
          color={getGradeColor(row.numericGrade)}
          size="small"
          sx={{ fontWeight: "bold", borderRadius: "6px" }}
        />
    )
  },
  { 
    id: "percentage", 
    label: "Percentage",
    render: (row) => `${row.percentage}%` 
  },
 { 
    id: "letterGrade", 
    label: "Letter Grade",
    render: (row) => (
      <Chip 
        label={row.letterGrade} 
        color={getGradeColor(row.letterGrade)}
        size="small"
        sx={{ fontWeight: "bold", borderRadius: "6px", minWidth: "40px" }}
      />
    )
  },
{ 
    id: "gradePoints", 
    label: "Grade Points",
    render: (row) => (
        <Chip 
        label={row.gradePoints} 
        color={getGradeColor(row.gradePoints)}
        size="small"
        sx={{ fontWeight: "bold", borderRadius: "6px" }}
        variant="outlined" // تغيير طفيف لتمييزها عن التقدير الحرفي
      />
    )
  },];

  const filteredCards = cardOptions;

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "primary.main" }}>
        Grades Management
      </h2>

      <Box sx={{ display: "flex", gap: 2, mb: 3 ,flexWrap: "wrap"}}>
        <CustomButton
          label="Search by Student"
          onClick={() => {
            setSearchType("student");
            setIsModalOpen(true);
          }}
        />
        <CustomButton
          label="Search by Course"
          onClick={() => {
            setSearchType("course");
            setIsModalOpen(true);
          }}
        />
        <CustomButton
          label="Export Course Grades"
          variantType="secondary"
          onClick={() => setIsExportModalOpen(true)}
        />

        <CustomButton
          label="Import Grades"
          variantType="secondary"
          onClick={() => setIsImportModalOpen(true)}
        />
        <CustomButton
          label="Publish Grades"
          variantType="primary"
          onClick={() => setIsPublishModalOpen(true)}
        />
      </Box>

      {isSearching ? (
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: 3,
          }}
        >
          <CustomButton
            sx={{ mb: 2 }}
            label="Close"
            variantType="secondary"
            onClick={() => setIsSearching(false)}
          />
          {searchLoading ? (
            <CircularProgress size={50} />
          ) : (
            <SharedTable
              columns={SchedaulTable}
              data={searchedData}
              idField="courseID"
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(auto-fill, minmax(280px, 1fr))",
            },
            gap: 3,
          }}
        >
          {filteredCards.map(({ level, semester }) => (
            <SemesterCard
              key={`${level}-${semester}`}
              icon={<GradeIcon />}
              level={level}
              semester={semester}
              count={
                loadingCount
                  ? undefined
                  : selectedGroup?.level === level &&
                      selectedGroup?.semester === semester
                    ? allGrades.length
                    : undefined
              }
              loading={
                loadingCount &&
                selectedGroup?.level === level &&
                selectedGroup?.semester === semester
              }
              text="Grades"
              isActive={
                selectedGroup?.level === level &&
                selectedGroup?.semester === semester
              }
              onClick={() => handleCardClick(level, semester)}
            />
          ))}
        </Box>
      )}
      {selectedGroup && !isSearching && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <h3>
              Grades - Level {selectedGroup.level} / Semester{" "}
              {selectedGroup.semester}
            </h3>

            <CustomButton
              label="Close"
              variantType="secondary"
              onClick={() => {
                setSelectedGroup(null);
                setAllGrades([]);
              }}
            />
          </Box>

          {loadingCount ? (
            <CircularProgress />
          ) : allGrades.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>No grades found.</Box>
          ) : (
            <SharedTable
              columns={SchedaulTable}
              data={allGrades}
              idField="courseID"
              detailsPath=""
              isAdmin={false}
              showView={false}
            />
          )}
        </Box>
      )}
      {/* موديل الاستيراد (Import) */}
{/* موديل الاستيراد */}
<FormModal
  open={isImportModalOpen}
  title="Import Grades"
  buttonLabel="Upload"
  onClose={() => setIsImportModalOpen(false)}
  fields={[
    { name: "courseId", label: "Course ID", required: true },
    { name: "level", label: "Level", required: true, select: true, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }] },
    { name: "academicYear", label: "Academic Year", required: true, select: true, options: [{ value: "2026", label: "2026" }] },
    { name: "semester", label: "Semester", required: true, select: true, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }] },
    { name: "file", label: "Select File", type: "file", required: true }
  ]}
  onSave={async (data) => {
    await importGrades(data.file, data.courseId, data.level, data.academicYear, data.semester);
    toast.success("Imported successfully");
    setIsImportModalOpen(false);
  }}
/>

{/* موديل النشر */}
<FormModal
  open={isPublishModalOpen}
  title="Publish Semester Results"
  buttonLabel="Publish"
  onClose={() => setIsPublishModalOpen(false)}
  fields={[
    { name: "level", label: "Level", required: true, select: true, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }] },
    { name: "semester", label: "Semester", required: true, select: true, options: [{ value: "1", label: "1" }, { value: "2", label: "2" }] },
    { name: "academicYear", label: "Academic Year", required: true, select: true, options: [{ value: "2026", label: "2026" }] },
  ]}
  onSave={async (data) => {
    await handlePublish(data as IPublishFormData);
    setIsPublishModalOpen(false);
  }}
/>

      <FormModal
        open={isModalOpen}
        buttonLabel={
          searchType === "student" ? "Search Student" : "Search Course"
        }
        onClose={() => setIsModalOpen(false)}
        title={`Search by ${
          searchType === "student" ? "Student ID" : "Course ID"
        }`}
        fields={searchFields}
        onSave={(data) => {
          handleSearch({
            searchValue: data.searchValue,
            academicYear: data.academicYear,
            semester: data.semester,
            level: data.level,
          });

          setIsModalOpen(false);
        }}
      />
      <FormModal
        open={isExportModalOpen}
        title="Export Course Grades"
        buttonLabel="Export"
        fields={exportFields}
        onClose={() => setIsExportModalOpen(false)}
        onSave={async (data) => {
          try {
            // استدعاء دالة التصدير من الـ API
            await exportCourseGrades(
              data.courseID,
              data.semester,
              data.academicYear,
            );
            toast.success("Export started successfully");
            setIsExportModalOpen(false);
          } catch (error) {
            console.log(error);
            toast.error("Export failed");
          }
        }}
      />
    </div>
  );
};

export default Reports;
