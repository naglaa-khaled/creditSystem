import { Box, Typography } from "@mui/material";
import BasicModal from "./BasicModal";
import CustomButton from "../Button/Button";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this record? This action cannot be undone.",
  itemName,
}: ConfirmDeleteModalProps) => {
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={title}
      content={
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1">{message}</Typography>
          {itemName && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontWeight: "bold",
                color: (theme) => theme.palette.error.main,
              }}
            >
              Item: {itemName}
            </Typography>
          )}
        </Box>
      }
      actions={
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <CustomButton
            label="Cancel"
            onClick={onClose}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#475569" : "#94a3b8",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#334155" : "#64748b",
              },
            }}
          />
          <CustomButton
            label="Yes, Delete"
            variantType="error"
            onClick={onConfirm}
          />
        </Box>
      }
    />
  );
};

export default ConfirmDeleteModal;
