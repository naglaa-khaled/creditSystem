import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  getCourses,
  addCourse,
  deleteCourse,
} from "../../../../../API/SyudentAffairsData/Courses";
import CustomButton from "../../../../Shared/components/Button/Button";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ConfirmDeleteModal from "../../../../Shared/components/Modals/DeleteModal";
import AddIcon from "@mui/icons-material/Add";
import { type FieldValues } from "react-hook-form";
import {  type Column,type ICourse } from "../../../../Shared/Interfaces";

const CoursePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeApiFilters, setActiveApiFilters] = useState({
    year: "",
    semester: "",
  });

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<
    string | number | null
  >(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const CourseFields = [
    { name: "courseName", label: "Course Name", required: true },
    { name: "courseID", label: "Course Code/ID", required: true },
    { name: "creditsHours", label: "Credits Hours", type: "number", required: true },
    { 
      name: "level", 
      label: "Level", 
      select: true, 
      options: [
        { value: "100", label: "Level 1" },
        { value: "200", label: "Level 2" },
        { value: "300", label: "Level 3" },
      ] 
    },
  ];

  const loadDataFromApi = async (year?: string, semester?: string) => {
    try {
      const data = await getCourses(year, semester);
      setTimeout(() => {
        setAllCourses(data);
      }, 0);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  const handleOpenDeleteModal = (id: string | number) => {
    setSelectedCourseId(id);
    setDeleteModalOpen(true);
  };

  //delete student handler
  const handleConfirmDelete = async () => {
    if (selectedCourseId) {
      try {
        await deleteCourse(selectedCourseId);
        setAllCourses((prev) =>
          prev.filter((student) => student.courseID !== selectedCourseId),
        );
        setDeleteModalOpen(false);
        setSelectedCourseId(null);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };
  //add student handler
  const handleSaveStudent = async (data: FieldValues) => {
    try {
      await addCourse(data);
      setIsAddModalOpen(false);
      loadDataFromApi();
    } catch (error) {
      console.error("Add failed", error);
    }
  };

  const filteredData = useMemo(() => {
    return allCourses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allCourses, searchTerm]);

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
    const updatedFilters = { ...activeApiFilters, [type]: value };
    setActiveApiFilters(updatedFilters);
    loadDataFromApi(updatedFilters.year, updatedFilters.semester);
  };

  const CourseColumns: Column<ICourse>[] = [
    { id: "courseID", label: "Course ID" },
    { id: "courseName", label: "Course Name" },
    { id: "creditsHours", label: "Credits" },
    { id: "level", label: "Level" },
    { id: "semester", label: "Semester" },
  ];

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>
        Courses Management
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
        columns={CourseColumns}
        data={filteredData}
        idField="courseID"
        detailsPath="/admin/courses/details"
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
        fields={CourseFields}
      />
    </div>
  );
};

export default CoursePage;
