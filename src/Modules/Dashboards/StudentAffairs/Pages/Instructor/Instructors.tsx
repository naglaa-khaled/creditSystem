import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import {
  getInstructors,
  
} from "../../../../../API/SyudentAffairsData/Instructor";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import {  type Column,type IInstructor } from "../../../../Shared/Interfaces";

const Instructors = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [allInstructors, setAllInstructors] = useState<IInstructor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
 




  const loadDataFromApi = async () => {
    try {
      const data = await getInstructors();
      setTimeout(() => {
        setAllInstructors(data);
      }, 0);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  

  
  

  const filteredData = useMemo(() => {
    return allInstructors.filter((Instructor) =>
      Instructor.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allInstructors, searchTerm]);



const InstructorColumns: Column<IInstructor>[] = [
  { id: "instructorID", label: "ID" },
  { id: "name", label: "Name" },
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

      <SharedTable
        columns={InstructorColumns}
        data={filteredData}
        idField="instructorID"
        detailsPath="/student-affairs/instructors/details"
        isAdmin={false}
      />

      
      
    </div>
  );
};

export default Instructors;
