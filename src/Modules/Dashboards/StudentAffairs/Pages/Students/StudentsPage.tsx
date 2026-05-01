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
const SchedaulPage = () => {
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
    return allStudents.filter((Student) =>
      Student.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allStudents, searchTerm]);

  const groupedSchedaul = useMemo(() => {
    const groups: Record<string, IStudent[]> = {};

    filteredData.forEach((Students) => {
      const key = `${Students.year}-${Students.semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(Students);
    });

    return groups;
  }, [filteredData]);

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
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
                  onClick={() =>
                    setSelectedGroup(isActive ? null : { level, semester })
                  }
                  onExport={async () => {
                    try {
                      await exportLevelStudents(`level ${level}`);
                    } catch (error) {
                      console.error("Export failed", error);
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
              Students - Level {selectedGroup.level} / Semester{" "}
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

export default SchedaulPage;
