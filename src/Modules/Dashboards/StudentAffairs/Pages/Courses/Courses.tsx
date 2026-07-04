import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import { getCourses } from "../../../../../API/SyudentAffairsData/Courses";
import { type ICourse, type Column } from "../../../../Shared/Interfaces/index";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";
import SchoolIcon from "@mui/icons-material/School";
import CustomButton from "../../../../Shared/components/Button/Button";
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

  const [selectedGroup, setSelectedGroup] = useState<{
    level: string;
    semester: string;
  } | null>(null);

  const filteredData = useMemo(() => {
    return allCourses.filter((course) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        course.courseName?.toLowerCase().includes(searchLower) ||
        course.courseNameAr?.toLowerCase().includes(searchLower) ||
        course.courseID?.toString().toLowerCase().includes(searchLower)
      );
    });
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

  const coursesColumns: Column<ICourse>[] = [
    { id: "courseName", label: "Name" },
    { id: "courseID", label: "ID" },
    { id: "creditHours", label: "Email" },
    { id: "level", label: "Year" },
    { id: "semester", label: "Semester" },
  ];
  useEffect(() => {
    if (Object.keys(groupedCourses).length === 0) {
      setSelectedGroup(null);
    }
  }, [groupedCourses]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
      >
        Grade Management
      </Typography>
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
            showYear
            showSemester
            showAcademicYear={false}
            onFilterChange={handleApiFilterChange}
            placeholder="Search by course name or ID..."
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
              borderRadius: "16px",
              border: "1px dashed",
              borderColor: "divider",
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "primary.main", opacity: 0.7 }}
            >
              {searchTerm
                ? `No courses found matching "${searchTerm}"`
                : "No courses available for the selected filters."}
            </Typography>
          </Box>
        )}
      </Box>
      {selectedGroup && Object.keys(groupedCourses).length > 0 && (
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
              Courses - Level {selectedGroup.level} / Semester{" "}
              {selectedGroup.semester}
            </h3>
            <CustomButton
              label="Close"
              variantType="secondary"
              onClick={() => setSelectedGroup(null)}
            />
          </Box>

          <SharedTable
            columns={coursesColumns}
            data={
              groupedCourses[
                `${selectedGroup.level}-${selectedGroup.semester}`
              ] || []
            }
            idField="courseID"
            detailsPath="/student-affairs/courses/details"
            isAdmin={false}
          />
        </Box>
      )}
    </div>
  );
};

export default CoursePage;
