import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  getSchedules,
  addSchedule,
  deleteSchedule,
} from "../../../../../API/SyudentAffairsData/Schedual";
import CustomButton from "../../../../Shared/components/Button/Button";
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import ConfirmDeleteModal from "../../../../Shared/components/Modals/DeleteModal";
import AddIcon from "@mui/icons-material/Add";
import { type FieldValues } from "react-hook-form";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { type Column, type ISchedule } from "../../../../Shared/Interfaces";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";

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

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSchedualeId, setselectedSchedualeId] = useState<
    string | number | null
  >(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const SchedualField = [
    { name: "courseName", label: "Course Name", required: true },
    { name: "courseID", label: "Course Code/ID", required: true },
    {
      name: "day",
      label: "Day",
      select: true,
      required: true,
      options: [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
      ],
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "time",
      required: true,
    },
    {
      name: "endTime",
      label: "End Time",
      type: "time",
      required: true,
    },
    { name: "room", label: "Room / Hall", required: true },
    {
      name: "courseLevel",
      label: "Level",
      select: true,
      required: true,
      options: [
        { value: "1", label: "Level 1" },
        { value: "2", label: "Level 2" },
        { value: "3", label: "Level 3" },
        { value: "4", label: "Level 4" },
        { value: "5", label: "Level 5" },
      ],
    },
    {
      name: "courseSemester",
      label: "Semester",
      select: true,
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
      const data = await getSchedules(year, semester);
      console.log("Schedual data from API:", data);
      setAllSchedual(data);
    } catch (error) {
      console.error("Failed to load Scheduals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  const handleOpenDeleteModal = (id: string | number) => {
    setselectedSchedualeId(id);
    setDeleteModalOpen(true);
  };

  //delete Schedual handler
  const handleConfirmDelete = async () => {
    if (selectedSchedualeId) {
      try {
        await deleteSchedule(selectedSchedualeId);
        setAllSchedual((prev) =>
          prev.filter((schedual) => {
            return schedual.courseID !== selectedSchedualeId;
          }),
        );
        setDeleteModalOpen(false);
        setselectedSchedualeId(null);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };
  // add Schedual handler
  const handleSaveSchedual = async (data: FieldValues) => {
    try {
      await addSchedule(data);
      setIsAddModalOpen(false);
      loadDataFromApi();
    } catch (error) {
      console.error("Add failed", error);
    }
  };

  const filteredData = useMemo(() => {
    return allSchedual.filter((schedaul) =>
      schedaul.courseName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allSchedual, searchTerm]);

  const groupedSchedaul = useMemo(() => {
    const groups: Record<string, ISchedule[]> = {};

    filteredData.forEach((schedual) => {
      const level = schedual.courseLevel;
      const semester = schedual.courseSemester;
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

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
    const updatedFilters = { ...activeApiFilters, [type]: value };
    setActiveApiFilters(updatedFilters);
    loadDataFromApi(updatedFilters.year, updatedFilters.semester);
  };

  const SchedaulTable: Column<ISchedule>[] = [
    { id: "courseID", label: "Course ID" },
    { id: "courseName", label: "Course Name" },
    { id: "day", label: "day" },
    { id: "startTime", label: "startTime" },
    { id: "endTime", label: "endTime" },
    { id: "room", label: "room" },
  ];

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>
        Schedual Management
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
          label="Add Schedual"
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
                  icon={<AssignmentIcon />}
                  text="Schedual"
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
                ? `No Schedual found matching "${searchTerm}"`
                : "No Schedual available for the selected filters."}
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
              Schedual - Level {selectedGroup.level} / Semester{" "}
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
            columns={SchedaulTable}
            data={
              groupedSchedaul[
                `${selectedGroup.level}-${selectedGroup.semester}`
              ] || []
            }
            idField="courseID"
            detailsPath="/admin/schedule/details"
            isAdmin={true}
            onDelete={handleOpenDeleteModal}
          />
        </Box>
      )}

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this schedual record?"
      />
      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveSchedual}
        title="Add New Schedaul"
        fields={SchedualField}
      />
    </div>
  );
};

export default SchedaulPage;
