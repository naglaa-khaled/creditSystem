import { useEffect, useState, useMemo, useRef } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  getStudents,
  addStudent,
  deleteStudent,
  exportLevelStudents,
  importLevelStudents,
} from "../../../../../API/AdminData/Students";
import CustomButton from "../../../../Shared/components/Button/Button";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConfirmDeleteModal from "../../../../Shared/components/Modals/DeleteModal";
import { type FieldValues } from "react-hook-form";
import { type IStudent, type Column } from "../../../../Shared/Interfaces";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const StudentsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);

  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeApiFilters, setActiveApiFilters] = useState({
    year: "",
    semester: "",
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<
    string | number | null
  >(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [importContext, setImportContext] = useState<{
    level: number;
    semester: number;
  } | null>(null);
  const studentFields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "studentID", label: "Student ID", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    {
      name: "year",
      label: "Year",
      select: true,
      halfWidth: true,
      required: true,
      options: [
        { value: "1", label: "1st Year" },
        { value: "2", label: "2nd Year" },
      ],
    },
    {
      name: "semester",
      label: "Semester",
      select: true,
      halfWidth: true,
      required: true,
      options: [
        { value: "1", label: "Semester 1" },
        { value: "2", label: "Semester 2" },
      ],
    },
  ];
  const [selectedGroup, setSelectedGroup] = useState<{
    level: string;
    semester: string;
  } | null>(null);

  const loadDataFromApi = async (year?: string, semester?: string) => {
    setIsLoading(true);
    try {
      const data = await getStudents(year, semester);
      setAllStudents(data);
    } catch (error) {
      console.error("Failed to load Students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  const handleOpenDeleteModal = (id: string | number) => {
    setSelectedStudentId(id);
    setDeleteModalOpen(true);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. تحديث دالة الـ import
  const handleImport = async (file: File, level: number, semester: number) => {
    try {
      await importLevelStudents(file, level, semester);
      toast.success("Imported successfully");
    } catch (error: unknown) {
      // هنا ستظهر رسالة السيرفر التي التقطناها في الـ catch أعلاه
      const errorMessage = error instanceof Error ? error.message : "Import failed";
      toast.error(errorMessage);
      console.log(error); 
    }
  };

  //delete student handler
const handleConfirmDelete = async () => {
  if (selectedStudentId) {
    try {
      await deleteStudent(selectedStudentId); // سيتم تنفيذ الـ API الآن
      setAllStudents((prev) =>
        prev.filter((student) => student.studentID !== selectedStudentId),
      );
      toast.success("Student deleted successfully"); // رسالة تأكيد للمستخدم
      setDeleteModalOpen(false);
      setSelectedStudentId(null);
    } catch (error) {
      toast.error("Failed to delete student");
      console.error("Delete failed", error);
      setDeleteModalOpen(false);
      setSelectedStudentId(null);
    }
  }
};
  //add student handler
  const handleSaveStudent = async (data: FieldValues) => {
    try {
      await addStudent(data);
      setIsAddModalOpen(false);
      loadDataFromApi();
    } catch (error) {
      console.error("Add failed", error);
    }
  };

  const filteredData = useMemo(() => {
    if (!allStudents) return [];

    return allStudents.filter((student) => {
      const searchLower = searchTerm.toLowerCase();

      const name = (student?.nameEn || student?.fullName || "").toLowerCase();
      const id = (student?.studentID || "").toString().toLowerCase();

      return name.includes(searchLower) || id.includes(searchLower);
    });
  }, [allStudents, searchTerm]);
  const groupedSchedaul = useMemo(() => {
    const groups: Record<string, IStudent[]> = {};

    filteredData?.forEach((student) => {
      const sYear = student.year;
      const sSemester = student.semester;

      if (student && sYear && sSemester) {
        const key = `${sYear}-${sSemester}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(student);
      }
    });

    return groups;
  }, [filteredData]);

  const handleApiFilterChange = (
    type: "year" | "semester" | "academicYear",
    value: string,
  ) => {
    if (type === "academicYear") return;

    const updatedFilters = {
      ...activeApiFilters,
      [type]: value,
    };
    setActiveApiFilters(updatedFilters);
    loadDataFromApi(updatedFilters.year, updatedFilters.semester);
  };
  useEffect(() => {
    if (Object.keys(groupedSchedaul).length === 0 && searchTerm !== "") {
      setSelectedGroup(null);
    }
  }, [groupedSchedaul, searchTerm]);

  const studentColumns: Column<IStudent>[] = [
    { id: "fullName", label: "Name" },
    { id: "studentID", label: "ID" },
    { id: "email", label: "Email" },
    { id: "year", label: "Year" },
    { id: "gpa", label: "GPA" },
    { id: "semester", label: "Semester" },
  ];

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "primary.main" }}>
        Students Management
      </h2>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "start",
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <FilterBar
            onSearch={(value: string) => setSearchTerm(value)}
            onFilterChange={handleApiFilterChange}
            placeholder="Search by student name or ID..."
          />
        </Box>

      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(auto-fill, minmax(280px, 1fr))",
          },
          gap: 3,
          mb: 5,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gridColumn: "1/-1",
              py: 10,
              gap: 2,
            }}
          >
            <CircularProgress size={50} />
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              Loading Students Grid...
            </Typography>
          </Box>
        ) : Object.keys(groupedSchedaul).length > 0 ? (
          Object.keys(groupedSchedaul)
            .sort((a, b) => {
              const [levelA, semA] = a.split("-");
              const [levelB, semB] = b.split("-");
              if (levelA !== levelB) return parseInt(levelA) - parseInt(levelB);
              return semA.localeCompare(semB);
            })
            .map((key) => {
              const [level, semester] = key.split("-");
              const isActive =
                selectedGroup?.level === level &&
                selectedGroup?.semester === semester;
              return (
                <SemesterCard
                  icon={<GroupsIcon />}
                  key={key}
                  level={level}
                  semester={semester}
                  count={groupedSchedaul[key].length}
                  isActive={isActive}
                  text="Student"
                  exportLabel="Dawnload Students Data"
                  onClick={() =>
                    setSelectedGroup(isActive ? null : { level, semester })
                  }
                  importLabel="Import Students Data"
                  onImport={() => {
                    setImportContext({ level: Number(level), semester: Number(semester) }); // (1) حفظنا البيانات
                    fileInputRef.current?.click(); 
                  }}
                  onExport={async () => {
                    const semesterNumber = Number(semester);
                    const levelNumber = Number(level);
                    try {
                      await exportLevelStudents(levelNumber, semesterNumber);
                    } catch (error: unknown) {
                      if (error instanceof AxiosError) {
                        console.error(
                          "Export failed:",
                          error.response?.status,
                          error.response?.data,
                        );
                      } else if (error instanceof Error) {
                        console.error("Export failed:", error.message);
                        toast.error("Failed to export Student Data");
                        
                      }
                    }
                  }}
                />
              );
            })
        ) : (
          <Box
            sx={{
              gridColumn: "1/-1",
              textAlign: "center",
              py: 10,
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: "16px",
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "primary.main", opacity: 0.7 }}
            >
              {searchTerm
                ? `No Students found matching "${searchTerm}"`
                : "No Students available."}
            </Typography>
          </Box>
        )}
      </Box>

      {selectedGroup && Object.keys(groupedSchedaul).length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            animation: "fadeIn 0.4s ease-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <h3 style={{ margin: 0, color: "primary.main" }}>
              Students List - Level {selectedGroup.level} / Semester{" "}
              {selectedGroup.semester}
            </h3>
            <CustomButton
              label="Close"
              variantType="secondary"
              onClick={() => setSelectedGroup(null)}
            />
          </Box>

          <SharedTable
            columns={studentColumns}
            data={
              groupedSchedaul[
                `${selectedGroup.level}-${selectedGroup.semester}`
              ] || []
            }
            idField="studentID"
            detailsPath="/admin/students/details"
            isAdmin={true} // تفعيل أوبشن الـ Admin عشان يظهر الـ Actions
            onDelete={handleOpenDeleteModal} // تمرير دالة الحذف
          />
        </Box>
      )}

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this student record?"
      />
      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveStudent}
        title="Add New Student"
        fields={studentFields}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && importContext) {
            handleImport(file, importContext.level, importContext.semester);
          }
        }}
      />
    </div>
  );
};

export default StudentsPage;
