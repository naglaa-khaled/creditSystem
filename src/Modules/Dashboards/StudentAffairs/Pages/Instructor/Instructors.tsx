import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import { getInstructors } from "../../../../../API/SyudentAffairsData/Instructor";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type Column, type IInstructor } from "../../../../Shared/Interfaces";

const Instructors = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [allInstructors, setAllInstructors] = useState<IInstructor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadDataFromApi = async () => {
    setIsLoading(true);
    try {
      const data = await getInstructors();
      setAllInstructors(data);
    } catch (error) {
      console.error("Failed to load instructors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  const filteredData = useMemo(() => {
    return allInstructors.filter((instructor) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        instructor.fullName?.toLowerCase().includes(searchLower) ||
        instructor.instructorID
          ?.toString()
          .toLowerCase()
          .includes(searchLower) ||
        instructor.email?.toLowerCase().includes(searchLower)
      );
    });
  }, [allInstructors, searchTerm]);

  const InstructorColumns: Column<IInstructor>[] = [
    { id: "instructorID", label: "ID" },
    { id: "fullName", label: "Name" },
    { id: "email", label: "Email" },
    { id: "totalCourses", label: "Total Courses" },
  ];

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
      >
        instructor Management
      </Typography>

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
            placeholder="Search by instructor name or ID..."
          />
        </Box>
      </Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 10,
            gap: 2,
          }}
        >
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            Loading Instructors...
          </Typography>
        </Box>
      ) : filteredData.length > 0 ? (
        <SharedTable
          columns={InstructorColumns}
          data={filteredData}
          idField="instructorID"
          detailsPath="/student-affairs/instructors/details"
          isAdmin={false}
        />
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            borderRadius: "8px",
            border: "1px dashed",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h6" color="primary.main">
            {searchTerm
              ? `No instructors found matching "${searchTerm}"`
              : "No instructors available."}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Instructors;
