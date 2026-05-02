import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  getInstructors,
  addInstructor,
  deleteInstructor,
} from "../../../../../API/SyudentAffairsData/Instructor";
import CustomButton from "../../../../Shared/components/Button/Button";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import ConfirmDeleteModal from "../../../../Shared/components/Modals/DeleteModal";
import AddIcon from "@mui/icons-material/Add";
import { type FieldValues } from "react-hook-form";
import {  type Column,type IInstructor } from "../../../../Shared/Interfaces";

const InstructorPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [allInstructors, setAllInstructors] = useState<IInstructor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
 

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState<
    string | number | null
  >(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const InstructorFields = [
  { name: "nameAr", label: "Instructor Name (Arabic)", required: true },
  { name: "instructorID", label: "Instructor ID", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
];

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

  const handleOpenDeleteModal = (id: string | number) => {
    setSelectedInstructorId(id);
    setDeleteModalOpen(true);
  };

  //delete Instructor handler
  const handleConfirmDelete = async () => {
    if (selectedInstructorId) {
      try {
        await deleteInstructor(selectedInstructorId);
        setAllInstructors((prev) =>
          prev.filter((Instructor) => Instructor.instructorID !== selectedInstructorId),
        );
        setDeleteModalOpen(false);
        setSelectedInstructorId(null);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };
  //add student handler
  const handleSaveStudent = async (data: FieldValues) => {
    try {
      await addInstructor(data);
      setIsAddModalOpen(false);
      loadDataFromApi();
    } catch (error) {
      console.error("Add failed", error);
    }
  };

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
        <CustomButton
          label="Add Instructor"
          icon={<AddIcon />}
          variantType="primary"
          onClick={() => setIsAddModalOpen(true)}
        />
      </Box>

      <SharedTable
        columns={InstructorColumns}
        data={filteredData}
        idField="instructorID"
        detailsPath="/admin/Instructors/details"
        isAdmin={true}
        onDelete={handleOpenDeleteModal}
      />

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this instructor record?"
      />
      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveStudent}
        title="Add New Student"
        fields={InstructorFields} 
      />
    </div>
  );
};

export default InstructorPage;
