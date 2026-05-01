import { useEffect, useState, useMemo } from "react"; 
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import { getStudents } from "../../../../../API/SyudentAffairsData/Students";

import { type IStudent , type Column} from "../../../../Shared/Interfaces/index";

const StudentsPage = () => {
  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeApiFilters, setActiveApiFilters] = useState({
    year: "",
    semester: "",
  });

  const loadDataFromApi = async (year?: string, semester?: string) => {
    try {
      const data = await getStudents(year, semester);

      setTimeout(() => {
        setAllStudents(data);
      }, 0);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

 const filteredData = useMemo(() => {
    return allStudents.filter((student) =>
      student.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allStudents, searchTerm]);

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
    const updatedFilters = { ...activeApiFilters, [type]: value };
    setActiveApiFilters(updatedFilters);
    loadDataFromApi(updatedFilters.year, updatedFilters.semester);
  };

  const studentColumns: Column<IStudent>[] = [
    { id: "nameEn", label: "Name" },
    { id: "studentID", label: "ID" },
    { id: "email", label: "Email" },
    { id: "year", label: "Year" },
    { id: "gpa", label: "GPA" },
    { id: "semester", label: "Semester" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>
        Students Management
      </h2>

      <FilterBar
        onSearch={(value: string) => setSearchTerm(value)}
        onFilterChange={handleApiFilterChange}
      />

      <SharedTable
        columns={studentColumns}
        data={filteredData} 
        idField="studentID"
        detailsPath="/student-affairs/students/details"
        isAdmin={false}
      />
    </div>
  );
};

export default StudentsPage;
