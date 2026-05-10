import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  getCourses,
  addCourse,
  deleteCourse,
} from "../../../../../API/AdminData/Courses";
import SchoolIcon from "@mui/icons-material/School";

import CustomButton from "../../../../Shared/components/Button/Button";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConfirmDeleteModal from "../../../../Shared/components/Modals/DeleteModal";
import AddIcon from "@mui/icons-material/Add";
import { type FieldValues } from "react-hook-form";
import { type Column, type ICourse } from "../../../../Shared/Interfaces";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";
import { toast } from "react-toastify";

const CoursePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);

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
    { name: "nameEn", label: "Course Name", required: true },
    { name: "courseID", label: "Course Code/ID", required: true },
    {
      name: "creditHours",
      label: "Credits Hours",
      type: "number",
      required: true,
    },
    {
      name: "level",
      label: "Level",
      select: true,
      options: [
        { value: "1", label: "Level 1" },
        { value: "2", label: "Level 2" },
        { value: "3", label: "Level 3" },
        { value: "4", label: "Level 4" },
        { value: "5", label: "Level 5" },
      ],
    },
    {
      name: "semester",
      label: "semester",
      select: true,
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
      const data = await getCourses(year, semester);
      setAllCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  const handleOpenDeleteModal = (id: string | number) => {
    setSelectedCourseId(id);
    setDeleteModalOpen(true);
  };

  //delete course handler
  const handleConfirmDelete = async () => {
    if (selectedCourseId) {
      try {
        await deleteCourse(selectedCourseId);
        setAllCourses((prev) =>
          prev.filter((course) => course.courseID !== selectedCourseId),
        );
        setDeleteModalOpen(false);
        setSelectedCourseId(null);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };
  //add course handler
  const handleSavecourse = async (data: FieldValues) => {
    const formattedData = {
      courseId: data.courseID,
      nameEn: data.nameEn,
      nameAr: data.nameEn,
      hours: Number(data.creditHours),
      level: Number(data.level),
      semester: Number(data.semester),
      courseType: "Active",
    };
    try {
      const response = await addCourse(formattedData);
      if (response.success) {
        setIsAddModalOpen(false);
        loadDataFromApi();
        toast.success("Course Added Successfully!");
      } else {
        console.log(response);
        toast.error("Fail To Add Course!");
      }
    } catch (error) {
      console.error("Add failed", error);
      toast.error("Fail To Add Course!");
    }
  };

  const filteredData = useMemo(() => {
    return allCourses.filter((course) =>
      course.courseNameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allCourses, searchTerm]);

  const groupedCourses = useMemo(() => {
    const groups: Record<string, ICourse[]> = {};

    filteredData.forEach((course) => {
      const key = `${course.level}-${course.semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(course);
    });

    return groups;
  }, [filteredData]);

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
    const updatedFilters = { ...activeApiFilters, [type]: value };
    setActiveApiFilters(updatedFilters);
    loadDataFromApi(updatedFilters.year, updatedFilters.semester);
  };

  const CourseColumns: Column<ICourse>[] = [
    { id: "courseID", label: "Course ID" },
    { id: "courseNameEn", label: "Course Name" },
    { id: "creditHours", label: "Credits" },
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
          alignItems: isMobile ? "stretch" : "center",
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
          label="Add Course"
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
            <Typography variant="h6" sx={{ color: "var(--primary)" }}>
              Loading Courses...
            </Typography>
          </Box>
        ) : Object.keys(groupedCourses).length > 0 ? (
          Object.keys(groupedCourses)
            .sort((a, b) => {
              const [levelA, semA] = a.split("-");
              const [levelB, semB] = b.split("-");

              if (levelA !== levelB) {
                return parseInt(levelA) - parseInt(levelB);
              }
              return semA.localeCompare(semB);
            })
            .map((key) => {
              const [level, semester] = key.split("-");
              const isActive =
                selectedGroup?.level === level &&
                selectedGroup?.semester === semester;

              return (
                <SemesterCard
                  text="Courses"
                  icon={<SchoolIcon />}
                  key={key}
                  level={level}
                  semester={semester}
                  count={groupedCourses[key].length}
                  isActive={isActive}
                  onClick={() =>
                    setSelectedGroup(isActive ? null : { level, semester })
                  }
                />
              );
            })
        ) : (
          <Box
            sx={{
              gridColumn: "1/-1",
              textAlign: "center",
              py: 10,
              border: "1px dashed #ccc",
              borderRadius: "16px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "var(--primary)", opacity: 0.7 }}
            >
              {searchTerm
                ? `No courses found matching "${searchTerm}"`
                : "No courses available for the selected filters."}
            </Typography>
          </Box>
        )}
      </Box>

      {selectedGroup && (
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <h3 style={{ margin: 0, color: "var(--primary)" }}>
              Courses - Level {selectedGroup.level} / Semester{" "}
              {selectedGroup.semester}
            </h3>
            <button
              onClick={() => setSelectedGroup(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666",
              }}
            >
              Close [x]
            </button>
          </Box>

          <SharedTable
            columns={CourseColumns}
            data={
              groupedCourses[
                `${selectedGroup.level}-${selectedGroup.semester}`
              ] || []
            }
            idField="courseID"
            detailsPath="/admin/courses/details"
            isAdmin={true}
            onDelete={handleOpenDeleteModal}
          />
        </Box>
      )}

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this Course record?"
      />
      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSavecourse}
        title="Add New Course"
        fields={CourseFields}
      />
    </div>
  );
};

export default CoursePage;
