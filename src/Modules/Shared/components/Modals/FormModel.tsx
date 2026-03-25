/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, MenuItem } from "@mui/material";
import { useForm, Controller, type FieldValues } from "react-hook-form";
import BasicModal from "./BasicModal";
import CustomButton from "../Button/Button";
import { useEffect } from "react";

export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  select?: boolean;
  options?: { value: string | number; label: string }[];
  required?: boolean;
  halfWidth?: boolean;
}

interface DynamicFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FieldValues) => void;
  title: string;
  fields: FieldConfig[];
  initialData?: any; 
}

const FormModal = ({ open, onClose, onSave, title, fields, initialData }: DynamicFormModalProps) => {
  const { 
    control, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<FieldValues>();

  useEffect(() => {
    if (open) {
      reset(initialData || {});
    }
  }, [open, reset, initialData]);

  const onSubmit = (data: FieldValues) => {
    onSave(data);
  };

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={title}
      content={
        <Box 
          component="form" 
          sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 2, 
            mt: 2, 
            minWidth: { xs: "100%", sm: "70%" } 
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
                pattern: field.type === "email" ? {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format"
                } : undefined
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label={field.label}
                  select={field.select}
                  type={field.type || "text"}
                  size="small"
                  sx={{ flex: field.halfWidth ? "1 1 calc(50% - 10px)" : "1 1 100%" }}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  value={value ?? ""} 
                  onChange={onChange}
                >
                  {field.select && field.options?.map((opt) => (
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
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", width: "100%", p: 1 }}>
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