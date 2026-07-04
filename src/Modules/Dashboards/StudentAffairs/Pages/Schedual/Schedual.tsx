import { useEffect, useState, useMemo } from "react";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import { getSchedules } from "../../../../../API/SyudentAffairsData/Schedual";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type ISchedule } from "../../../../Shared/Interfaces";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WeeklyTimetable from "../../../../Shared/components/weekelyTimeTable/WeekelyTimeTable";

const SchedaulPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [allSchedual, setAllSchedual] = useState<ISchedule[]>([]);
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
      const data = await getSchedules(year, semester);
      console.log("Schedual data from API:", data);
      setAllSchedual(data);
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
    return allSchedual.filter((schedual) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        schedual.courseName?.toLowerCase().includes(searchLower) ||
        schedual.courseID?.toString().toLowerCase().includes(searchLower)
      );
    });
  }, [allSchedual, searchTerm]);

  const groupedSchedaul = useMemo(() => {
    const groups: Record<string, ISchedule[]> = {};

    filteredData.forEach((schedual) => {
      const level = schedual.level;
      const semester = schedual.semester;

      const key = `${level}-${semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(schedual);
    });

    return groups;
  }, [filteredData]);

  useEffect(() => {
    if (selectedGroup) {
      const key = `${selectedGroup.level}-${selectedGroup.semester}`;
      if (!groupedSchedaul[key]) {
        setSelectedGroup(null);
      }
    }
  }, [groupedSchedaul, selectedGroup]);

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

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
      >
        Schedule Management
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
            placeholder="Search by course name or ID..."
            showYear
            showSemester
            showAcademicYear={false}
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
              Loading Schedual...
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
                  text="Schedual"
                  icon={<AssignmentIcon />}
                  key={key}
                  level={level}
                  semester={semester}
                  count={groupedSchedaul[key].length}
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
              border: (theme) => `1px dashed ${theme.palette.divider}`,
              borderRadius: "16px",
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.02)"
                  : "rgba(255, 255, 255, 0.03)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "primary.main", opacity: 0.7 }}
            >
              {searchTerm
                ? `No Schedual found matching "${searchTerm}"`
                : "No Schedual available for the selected filters."}
            </Typography>
          </Box>
        )}
      </Box>
      {selectedGroup && Object.keys(groupedSchedaul).length > 0 && (
        <WeeklyTimetable
          title={`Schedules — Level ${selectedGroup.level} / Semester ${selectedGroup.semester}`}
          data={
            groupedSchedaul[
              `${selectedGroup.level}-${selectedGroup.semester}`
            ] || []
          }
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  );
};

export default SchedaulPage;
