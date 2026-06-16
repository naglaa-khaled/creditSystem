/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, MenuItem, InputAdornment, IconButton } from "@mui/material"; 
import { useForm, Controller, type FieldValues } from "react-hook-form";
import BasicModal from "./BasicModal";
import CustomButton from "../Button/Button";
import { useEffect, useState } from "react"; 
import Visibility from "@mui/icons-material/Visibility"; 
import VisibilityOff from "@mui/icons-material/VisibilityOff"; 

export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  select?: boolean;
  options?: { value: string | number; label: string }[];
  required?: boolean;
  halfWidth?: boolean;
  disabled?: boolean;
}

interface DynamicFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FieldValues) => void;
  title: string;
  fields: FieldConfig[];
  initialData?: any;
}

const FormModal = ({
  open,
  onClose,
  onSave,
  title,
  fields,
  initialData,
}: DynamicFormModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (open) {
      reset(initialData || {});
    }
  }, [open, reset, initialData]);

  const handleClose = () => {
    setShowPassword(false);
    onClose();
  };

  const onSubmit = (data: FieldValues) => {
    onSave(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <BasicModal
      open={open}
      onClose={handleClose}
      title={title}
      content={
        <Box
          component="form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
            minWidth: { xs: "100%", sm: "70%" },
          }}
        >
          {fields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              defaultValue=""
              rules={{
                required: field.required ? `${field.label} is required` : false,
                pattern:
                  field.type === "email"
                    ? {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email format",
                      }
                    : undefined,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label={field.label}
                  select={field.select}
                  type={
                    field.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field.type || "text"
                  }
                  size="small"
                  sx={{
                    flex: field.halfWidth ? "1 1 calc(50% - 10px)" : "1 1 100%",
                    "& .MuiInputBase-input.Mui-disabled": {
                      cursor: "not-allowed",
                    },
                    "& .MuiFormLabel-root.Mui-disabled": {
                      cursor: "not-allowed",
                    },
                  }}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  value={value ?? ""}
                  onChange={onChange}
                  disabled={field.disabled}
                  InputProps={{
                    ...(field.disabled ? { readOnly: true } : {}),
                    endAdornment: field.type === "password" ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ) : undefined,
                  }}
                >
                  {field.select &&
                    field.options?.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
          ))}
        </Box>
      }
      actions={
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            width: "100%",
            p: 1,
          }}
        >
          <CustomButton
            label="Cancel"
            onClick={onClose}
            variantType="primary"
          />
          <CustomButton
            label={initialData ? "Save Changes" : "Add Item"}
            variantType="primary"
            onClick={handleSubmit(onSubmit)}
          />
        </Box>
      }
    />
  );
};

export default FormModal;