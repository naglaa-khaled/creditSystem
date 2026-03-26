import { useEffect, useState, useMemo } from "react"; 
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import { getCourses } from "../../../../../API/SyudentAffairsData/Courses";

import { type ICourse , type Column} from "../../../../Shared/Interfaces/index";

const CoursePage = () => {
  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeApiFilters, setActiveApiFilters] = useState({
    year: "",
    semester: "",
  });

  const loadDataFromApi = async (year?: string, semester?: string) => {
    try {
      const data = await getCourses(year, semester);

      setTimeout(() => {
        setAllCourses(data);
      }, 0);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

 const filteredData = useMemo(() => {
    return allCourses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCourses, searchTerm]);

  const handleApiFilterChange = (type: "year" | "semester", value: string) => {
    const updatedFilters = { ...activeApiFilters, [type]: value };
    setActiveApiFilters(updatedFilters);
    loadDataFromApi(updatedFilters.year, updatedFilters.semester);
  };

  const coursesColumns: Column<ICourse>[] = [
    { id: "courseName", label: "Name" },
    { id: "courseID", label: "ID" },
    { id: "creditsHours", label: "Email" },
    { id: "status", label: "Year" },
    { id: "semester", label: "Semester" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>
        Courses Management
      </h2>

      <FilterBar
        onSearch={(value: string) => setSearchTerm(value)}
        onFilterChange={handleApiFilterChange}
      />

      <SharedTable
        columns={coursesColumns}
        data={filteredData} 
        idField="courseID"
        detailsPath="/student-affairs/courses/details"
        isAdmin={false}
      />
    </div>
  );
};

export default CoursePage;
