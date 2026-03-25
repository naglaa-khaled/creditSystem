import { Button, type ButtonProps, type SxProps, type Theme } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  label: string;
  icon?: React.ReactNode;
  variantType?: "primary" | "error" | "outline-error" | "secondary";
}

const CustomButton = ({ label, icon, variantType = "primary", sx, ...props }: CustomButtonProps) => {
  
  const getStyles = (): SxProps<Theme> => {
    const baseStyles: SxProps<Theme> = {
      textTransform: "none",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: 1,
      "&.Mui-focused": {
        outline: "none",
      },
      ...sx, 
    };

    switch (variantType) {
      case "primary":
        return {
          ...baseStyles,
          backgroundColor: "var(--primary, #1a237e)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "var(--primary-hover, #0d1440)",
            boxShadow: "0px 4px 12px rgba(26, 35, 126, 0.3)",
            transform: "translateY(-1px)",
          },
        };
      case "outline-error":
        return {
          ...baseStyles,
          border: "1px solid var(--error, #d32f2f)",
          color: "#fff",
          backgroundColor: "var(--error, #d32f2f)",
          boxShadow: "none",
          "&.Mui-focused, &:active": {
            borderColor: "var(--error, #d32f2f)",
          },
          "&:hover": {
            backgroundColor: "var(--error, #d32f2f)",
            borderColor: "var(--error, #d32f2f)",
            boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.3)",
            transform: "translateY(-1px)",
          },
        };
      case "error":
        return {
          ...baseStyles,
          backgroundColor: "var(--error, #d32f2f)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#b71c1c",
            boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.3)",
            transform: "translateY(-1px)",
          },
        };
      default:
        return baseStyles;
    }
  };

  return (
    <Button 
      variant={variantType === "outline-error" ? "outlined" : "contained"} 
      startIcon={icon} 
      sx={getStyles()} 
      disableRipple 
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomButton;