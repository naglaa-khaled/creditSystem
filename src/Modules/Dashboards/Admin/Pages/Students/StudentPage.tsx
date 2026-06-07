import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  getStudents,
  addStudent,
  deleteStudent,
} from "../../../../../API/AdminData/Students";
import CustomButton from "../../../../Shared/components/Button/Button";
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import ConfirmDeleteModal from "../../../../Shared/components/Modals/DeleteModal";
import AddIcon from "@mui/icons-material/Add";
import { type FieldValues } from "react-hook-form";
import { type IStudent, type Column } from "../../../../Shared/Interfaces";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";

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
      console.error("Failed to load Grades:", error);
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

  //delete student handler
  const handleConfirmDelete = async () => {
    if (selectedStudentId) {
      try {
        await deleteStudent(selectedStudentId);
        setAllStudents((prev) =>
          prev.filter((student) => student.studentID !== selectedStudentId),
        );
        setDeleteModalOpen(false);
        setSelectedStudentId(null);
      } catch (error) {
        console.error("Delete failed", error);
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
    const name = student?.nameEn || student?.fullName || "";
    
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}, [allStudents, searchTerm]);
console.log(filteredData);
 const groupedSchedaul = useMemo(() => {
    const groups: Record<string, IStudent[]> = {};

    filteredData?.forEach((student) => {
     const sYear =  student.year; 
    const sSemester = student.semester;

    if (student && sYear && sSemester) {
      const key = `${sYear}-${sSemester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(student);
    }
    });

    return groups;
  }, [filteredData]);

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
    console.log(type, value);
    const updatedFilters = { ...activeApiFilters, [type]: value };
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
      <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>
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
          />
        </Box>
        <CustomButton
          label="Add Student"
          icon={<AddIcon />}
          variantType="primary"
          onClick={() => setIsAddModalOpen(true)}
        />
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
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gridColumn: "1/-1", py: 10, gap: 2 }}>
            <CircularProgress size={50} />
            <Typography variant="h6" sx={{ color: "var(--primary)" }}>
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
              const isActive = selectedGroup?.level === level && selectedGroup?.semester === semester;
              return (
                <SemesterCard
                  icon={<GroupsIcon />}
                  key={key}
                  level={level}
                  semester={semester}
                  count={groupedSchedaul[key].length}
                  isActive={isActive}
                  text="Student"
                  onClick={() => setSelectedGroup(isActive ? null : { level, semester })}
                  // إذا كنتِ لا تحتاجي الـ export في الـ Admin ممكن تشيليه أو تسيبيها فاضية
                  onExport={(e) => e.stopPropagation()} 
                />
              );
            })
        ) : (
          <Box sx={{ gridColumn: "1/-1", textAlign: "center", py: 10, border: "1px dashed #ccc", borderRadius: "16px", backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6" sx={{ color: "var(--primary)", opacity: 0.7 }}>
              {searchTerm ? `No Students found matching "${searchTerm}"` : "No Students available."}
            </Typography>
          </Box>
        )}
      </Box>

      {selectedGroup && Object.keys(groupedSchedaul).length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            animation: "fadeIn 0.4s ease-out",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <h3 style={{ margin: 0, color: "var(--primary)" }}>
              Students List - Level {selectedGroup.level} / Semester {selectedGroup.semester}
            </h3>
            <button
              onClick={() => setSelectedGroup(null)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#666" }}
            >
              Close [x]
            </button>
          </Box>

          <SharedTable
            columns={studentColumns}
            data={groupedSchedaul[`${selectedGroup.level}-${selectedGroup.semester}`] || []}
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
    </div>
  );
};

export default StudentsPage;