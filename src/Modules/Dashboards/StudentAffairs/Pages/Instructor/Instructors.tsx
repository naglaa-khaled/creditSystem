import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import {
  getInstructors,
  
} from "../../../../../API/SyudentAffairsData/Instructor";
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import {  type Column,type IInstructor } from "../../../../Shared/Interfaces";

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
    return allInstructors.filter((Instructor) =>
      Instructor.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allInstructors, searchTerm]);



const InstructorColumns: Column<IInstructor>[] = [
  { id: "instructorID", label: "ID" },
  { id: "nameEn", label: "Name" },
  { id: "email", label: "Email" },
  { id: "totalCourses", label: "Total Courses" },
];

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>
        Instructors Management
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
            gap: 2
          }}
        >
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ color: "var(--primary)" }}>
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

      
      ): (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            border: "1px dashed #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}
        >
          <Typography variant="h6" color="var(--primary)">
            {searchTerm ? `No instructors found matching "${searchTerm}"` : "No instructors available."}
          </Typography>
        </Box>
      )}
    </div>


  );
};

export default Instructors;
