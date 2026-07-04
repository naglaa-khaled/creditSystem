import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import {
  getStudents,
  exportLevelStudents,
} from "../../../../../API/SyudentAffairsData/Students";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  type IStudent,
  type Column,
} from "../../../../Shared/Interfaces/index";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";
import GroupsIcon from "@mui/icons-material/Groups";
import CustomButton from "../../../../Shared/components/Button/Button";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
const StudentPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeApiFilters, setActiveApiFilters] = useState({
    year: "",
    semester: "",
  });

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
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
      >
        Students Management
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
            onFilterChange={handleApiFilterChange}
            showYear
            showSemester
            showAcademicYear={false}
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
              Loading Students...
            </Typography>
          </Box>
        ) : Object.keys(groupedSchedaul).length > 0 ? (
          Object.keys(groupedSchedaul)
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
                  icon={<GroupsIcon />}
                  key={key}
                  level={level}
                  semester={semester}
                  count={groupedSchedaul[key].length}
                  isActive={isActive}
                  text="Student"
                  exportLabel="Download Students Data"
                  onClick={() =>
                    setSelectedGroup(isActive ? null : { level, semester })
                  }
                  onExport={async () => {
                    const semesterNumber = parseInt(semester, 10);
                    const levelNumber = parseInt(level, 10);
                    try {
                      await exportLevelStudents(levelNumber, semesterNumber);
                    } catch (error: unknown) {
                      // التحقق من نوع الخطأ بدلاً من any
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
                ? `No Students found matching "${searchTerm}"`
                : "No Students available for the selected filters."}
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
              Students - Level {selectedGroup.level} / Semester{" "}
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
            detailsPath="/student-affairs/students/details"
            isAdmin={false}
          />
        </Box>
      )}
    </div>
  );
};

export default StudentPage;
