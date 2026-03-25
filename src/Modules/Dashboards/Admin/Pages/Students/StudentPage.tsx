import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  getStudents,
  addStudent,
  deleteStudent,
} from "../../../../../API/SyudentAffairsData/Students";
import CustomButton from "../../../../Shared/components/Button/Button";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ConfirmDeleteModal from "../../../../Shared/components/Modals/DeleteModal";
import AddIcon from "@mui/icons-material/Add";
import { type FieldValues } from "react-hook-form";
import { type IStudent, type Column } from "../../../../Shared/Interfaces";

const StudentsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    { name: "nameEn", label: "Full Name", required: true },
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

  const loadDataFromApi = async (year?: string, semester?: string) => {
    try {
      const data = await getStudents(year, semester);
      setTimeout(() => {
        setAllStudents(data);
      }, 0);
    } catch (error) {
      console.error("Failed to load students:", error);
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
    return allStudents.filter((student) =>
      student.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allStudents, searchTerm]);

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
    const updatedFilters = { ...activeApiFilters, [type]: value };
    setActiveApiFilters(updatedFilters);
    loadDataFromApi(updatedFilters.year, updatedFilters.semester);
  };

  const studentColumns: Column<IStudent>[] = [
    { id: "nameEn", label: "Name" },
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

      <SharedTable
        columns={studentColumns}
        data={filteredData}
        idField="studentID"
        detailsPath="/admin/students/details"
        isAdmin={true}
        onDelete={handleOpenDeleteModal}
      />

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
