import { useEffect, useState, useMemo } from "react";
import SharedTable from "../../../../Shared/components/SharedTable/SharedTable";
import { FilterBar } from "../../../../Shared/components/FilterBar/FilterBar";
import FormModal from "../../../../Shared/components/Modals/FormModel";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../../../../../API/AdminData/User";
import CustomButton from "../../../../Shared/components/Button/Button";
import { Chip } from "@mui/material";

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
import { type Column, type IUsers } from "../../../../Shared/Interfaces"; // 👈 استخدام الـ IUsers هنا
import { toast } from "react-toastify";

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = useState(false);

  const [allUsers, setAllUsers] = useState<IUsers[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUsers | null>(null);

  const handleOpenEditModal = (user: IUsers) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const userFields = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: false },
    {
      name: "role",
      label: "Role",
      select: true,
      required: true,
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Instructor", label: "Instructor" },
        { value: "student-affairs", label: "Student Affairs" },
      ],
    },
    {
      name: "isActive",
      label: "Active Status",
      select: true,
      required: true,
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  ];
  const loadDataFromApi = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setAllUsers(data);
    } catch (error) {
      console.error("Failed to load Users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataFromApi();
  }, []);

  const handleOpenDeleteModal = (id: string | number) => {
    setSelectedUserId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await deleteUser(selectedUserId);

        setAllUsers((prev) =>
          prev.filter((user) => {
            const currentId = user?.userID;
            return Number(currentId) !== Number(selectedUserId);
          }),
        );
        setDeleteModalOpen(false);
        setSelectedUserId(null);

        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Delete failed from server:", error);
        toast.error(
          "لا يمكن حذف هذا المستخدم نظراً لارتباطه بعمليات أخرى داخل النظام.",
        );
        setDeleteModalOpen(false);
        

        setDeleteModalOpen(false);
        setSelectedUserId(null);
      }
    }
  };

const handleSaveUser = async (data: FieldValues) => {
  try {
    if (selectedUser) {
      // نقوم بتجهيز الـ finalData مباشرة مع تحديد الخصائص التي نحتاجها
      const finalData = {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        password: data.password || "KEEP_EXISTING_PASSWORD", // إذا كان فارغاً نرسل القيمة الرمزية
        isActive: data.isActive === "active" // تحويل مباشر لـ boolean
      };

      await updateUser(selectedUser.userID, finalData);
      toast.success("User updated successfully");
    } else {
      // عند الإضافة، نحول الـ isActive أيضاً
      const newData = { ...data, isActive: data.isActive === "active" };
      await addUser(newData);
      toast.success("User added successfully");
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
    await loadDataFromApi();
  } catch (error) {
    console.error("Save failed:", error);
    toast.error("An error occurred while saving.");
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  }
};

  const filteredData = useMemo(() => {
    if (!allUsers) return [];

    return allUsers.filter((student) => {
      const searchLower = searchTerm.toLowerCase();

      const name = (student?.fullName || student?.fullName || "").toLowerCase();
      const id = (student?.userID || "").toString().toLowerCase();

      return name.includes(searchLower) || id.includes(searchLower);
    });
  }, [allUsers, searchTerm]);

  const userColumns: Column<IUsers>[] = [
    { id: "userID", label: "ID" },
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    {
      id: "role",
      label: "Role",
      render: (row: IUsers) => {
        const value = row.role;
        let color: "primary" | "secondary" | "info" | "default" = "default";
        if (value === "Admin") color = "primary";
        else if (value === "Instructor" || value == "instructor")
          color = "secondary";
        else if (value === "StudentAffairs" || value === "student-affairs")
          color = "info";

        return (
          <Chip
            label={value}
            color={color}
            size="small"
            sx={{ fontWeight: "600", borderRadius: "6px", fontSize: "0.75rem" }}
          />
        );
      },
    },
    {
      id: "isActive",
      label: "Status",
      render: (row: IUsers) => {
        const value = row.isActive;
        return (
          <Chip
            label={value ? "Active" : "Inactive"}
            color={value ? "success" : "error"}
            size="small"
            variant="outlined"
            sx={{ fontWeight: "700", borderRadius: "6px", fontSize: "0.75rem" }}
          />
        );
      },
    },
  ];

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "primary.main" }}>
        Users Management
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
            placeholder="Search by User name or ID..."
          />
        </Box>
        <CustomButton
          label="Add User"
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
            Loading Users...
          </Typography>
        </Box>
      ) : filteredData.length > 0 ? (
        <SharedTable
          columns={userColumns}
          data={filteredData}
          idField="userID"
          detailsPath="/admin/Users/details"
          isAdmin={true}
          onDelete={handleOpenDeleteModal}
          onEdit={handleOpenEditModal}
          showView={false}
        />
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: "8px",
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h6" color="primary.main">
            {searchTerm
              ? `No Users found matching "${searchTerm}"`
              : "No Users available."}
          </Typography>
        </Box>
      )}

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this user record?"
      />

      <FormModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveUser}
        title="Add New User"
        fields={userFields}
      />
      <FormModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveUser}
        title="Edit User"
        fields={userFields}
        initialData={
          selectedUser
            ? {
                ...selectedUser,
                isActive: selectedUser.isActive ? "active" : "inactive",
              }
            : {}
        }
      />
    </div>
  );
};

export default UsersPage;
