import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  getInstructors,
  addInstructor,
  deleteInstructor,
} from "../../../../../API/AdminData/Instructor";
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
import { type Column, type IInstructor } from "../../../../Shared/Interfaces";
import { toast } from "react-toastify";

const InstructorPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);

  const [allInstructors, setAllInstructors] = useState<IInstructor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState<
    string | number | null
  >(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const InstructorFields = [
    { name: "fullName", label: "Full Name ", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "password", label: "password", type: "password", required: true },
  ];

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

  const handleOpenDeleteModal = (id: string | number) => {
    setSelectedInstructorId(id);
    setDeleteModalOpen(true);
  };

  //delete Instructor handler
  const handleConfirmDelete = async () => {
    if (selectedInstructorId) {
      try {
        const response = await deleteInstructor(selectedInstructorId);

        if (response && response.status === 200 && response.success) {
          setAllInstructors((prev) =>
            prev.filter((instructor) => {
              const currentId = instructor?.instructorID;
              return Number(currentId) !== Number(selectedInstructorId);
            }),
          );
          setDeleteModalOpen(false);
          setSelectedInstructorId(null);

          toast.success("Instructor deleted successfully");
        } else {
          toast.error("Failed to delete from server");
          setDeleteModalOpen(false);
          setSelectedInstructorId(null);
        }
      } catch (error) {
        console.error("Delete failed from server:", error);
        toast.error(
          "لا يمكن حذف هذا المحاضر نظراً لارتباطه بجدول محاضرات قائم.",
        );

        setDeleteModalOpen(false);
        setSelectedInstructorId(null);
      }
    }
  };
  //add Instructor handler
  const handleSaveInstructor = async (data: FieldValues) => {
    try {
      const response = await addInstructor(data);

      if (response && response.success) {
        setIsAddModalOpen(false);
        await loadDataFromApi();

        toast.success("Instructor added successfully");
      } else {
        if (response && response.message) {
          toast.error(response.message, { rtl: true });
        } else {
          toast.error("Failed to add instructor. Please check your data.");
          setIsAddModalOpen(false);
        }
      }
    } catch (error: unknown) {
      console.error("Add failed", error);

      let serverMessage: string | undefined;
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object" &&
        (error as { response?: unknown }).response !== null
      ) {
        const response = (error as { response?: { data?: unknown } }).response;
        const data = response?.data;
        if (typeof data === "string") {
          serverMessage = data;
        } else if (
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message?: unknown }).message === "string"
        ) {
          serverMessage = (data as { message?: string }).message;
        }
      }

      if (serverMessage) {
        toast.error(serverMessage, { rtl: true });
      } else {
        toast.error(
          "An unexpected error occurred while adding the instructor.",
        );
        setIsAddModalOpen(false);
      }
    }
  };

  const filteredData = useMemo(() => {
    return allInstructors.filter((instructor) => {
      const searchLower = searchTerm.toLowerCase();

      return (
        instructor.nameEn?.toLowerCase().includes(searchLower) ||
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
      <h2 style={{ marginBottom: "20px", color: "primary.main" }}>
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
            placeholder="Search by instructor name or ID..."
          />
        </Box>
        <CustomButton
          label="Add Instructor"
          icon={<AddIcon />}
          variantType="primary"
          onClick={() => setIsAddModalOpen(true)}
        />
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
          detailsPath="/admin/Instructors/details"
          isAdmin={true}
          onDelete={handleOpenDeleteModal}
        />
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: "8px",
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

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this instructor record?"
      />
      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveInstructor}
        title="Add New Instructor"
        fields={InstructorFields}
      />
    </div>
  );
};

export default InstructorPage;
