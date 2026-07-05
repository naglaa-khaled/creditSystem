import { useEffect, useState, useMemo } from "react";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import { AxiosError } from "axios";
import {
  getSchedules,
  addSchedule,
  deleteSchedule,
  updateSchedule,
} from "../../../../../API/AdminData/Schedual";
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
import AssignmentIcon from "@mui/icons-material/Assignment";
import { type ISchedule } from "../../../../Shared/Interfaces";
import { SemesterCard } from "../../../../Shared/components/CourseCard/CourseCard";
import WeeklyTimetable from "../../../../Shared/components/weekelyTimeTable/WeekelyTimeTable";
import { toast } from "react-toastify";

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
  const [courseOfferings, setCourseOfferings] = useState<ISchedule[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<ISchedule | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSchedualeId, setselectedSchedualeId] = useState<
    string | number | null
  >(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const SchedualField = [
    { name: "courseID", label: "Course ID", required: true },
    { name: "instructorID", label: "Instructor ID", required: true },
    {
      name: "day",
      label: "Day",
      select: true,
      required: true,
      options: [
        { value: "Saturday", label: "Saturday" },
        { value: "sunday", label: "Sunday" },
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
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
      name: "level",
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
      name: "semester",
      label: "Semester",
      select: true,
      required: true,
      options: [
        { value: "1", label: "Semester 1" },
        { value: "2", label: "Semester 2" },
      ],
    },
    { name: "capacity", label: "Capacity", type: "number", required: true },
    {
      name: "sessionType",
      label: "Session Type",
      select: true,
      required: true,
      options: [
        { value: "Lecture", label: "Lecture" },
        { value: "Section", label: "Section" },
        { value: "Lab", label: "Lab" },
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
      setAllSchedual(data);
      setCourseOfferings(data);
    } catch (error) {
      console.error("Failed to load Scheduals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);
  const handleOpenEditModal = (lecture: ISchedule) => {
    const course = courseOfferings.find((c) => c.courseID === lecture.courseID);

    setScheduleToEdit({
      ...lecture,
      courseName: course?.courseName ?? "",
    });

    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (id: string | number) => {
    setselectedSchedualeId(id);
    setDeleteModalOpen(true);
  };

const handleConfirmDelete = async () => {
  if (selectedSchedualeId) {
    try {
      await deleteSchedule(selectedSchedualeId);
      toast.success("Schedule deleted successfully!");
      setAllSchedual((prev) => prev.filter((item) => item.id !== selectedSchedualeId));
    } catch (error) {
      // نقوم بفحص ما إذا كان الخطأ من نوع AxiosError
      if (error instanceof AxiosError) {
        // نستخرج الرسالة من السيرفر، مع افتراض أن الـ response.data هو نص
        const message = error.response?.data as string || "Failed to delete schedule.";
        toast.error(message);
      } else {
        // في حال كان الخطأ غير متوقع وليس من Axios
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setDeleteModalOpen(false);
      setselectedSchedualeId(null);
    }
  }
};
  // add Schedual handler
  const handleSaveSchedual = async (data: FieldValues) => {
    try {
      const payload = {
        courseID: data.courseID,
        instructorID: Number(data.instructorID),
        semester: Number(data.semester),
        year: Number(data.year),
        capacity: Number(data.capacity),
        day: data.day,
        sessionType: data.sessionType,
        startTime: `${data.startTime}:00`,
        endTime: `${data.endTime}:00`,
        room: data.room,
      };
      console.log(payload);
      await addSchedule(payload);
      setIsAddModalOpen(false);
      loadDataFromApi();
      toast.success("New schedule added successfully!");
    } catch (error) {
      console.error("Add failed", error);
      toast.error("Failed to add schedule.");
      setIsAddModalOpen(false);
    }
  };
const handleUpdateSchedule = async (data: FieldValues) => {
  if (!scheduleToEdit) return;

  const payload = {
    courseID: data.courseID,
    instructorID: Number(data.instructorID),
    semester: Number(data.semester),
  year: Number(data.level), // السيرفر عايز year
    capacity: Number(data.capacity),
    day: data.day,
    sessionType: data.sessionType,
    startTime: data.startTime,
    endTime: data.endTime,
    room: data.room,
  };

  console.log("Payload:", payload);

  try {
    await updateSchedule(scheduleToEdit.id, payload);

    toast.success("Schedule updated successfully!");
    setIsEditModalOpen(false);
    setScheduleToEdit(null);
    loadDataFromApi();
  } catch (error) {
    console.error(error);
    toast.error("Failed to update schedule.");
  }
};
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
      <h2 style={{ marginBottom: "20px", color: "primary.main" }}>
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
            placeholder="Search by course name or ID..."
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
          onDelete={handleOpenDeleteModal}
          onEdit={handleOpenEditModal}
        />
      )}

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this schedule record?"
      />

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveSchedual}
        title="Add New Schedule"
        fields={SchedualField}
      />
      <FormModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setScheduleToEdit(null);
        }}
        onSave={handleUpdateSchedule}
        title="Edit Schedule"
        fields={SchedualField}
        initialData={scheduleToEdit || undefined}
      />
    </div>
  );
};

export default SchedaulPage;
