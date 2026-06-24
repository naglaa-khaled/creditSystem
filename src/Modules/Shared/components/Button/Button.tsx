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
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "primary.dark",
            boxShadow: (theme) => `0px 4px 12px ${theme.palette.primary.main}40`,
            transform: "translateY(-1px)",
          },
        };
      case "outline-error":
        return {
          ...baseStyles,
          border: (theme) => `1px solid ${theme.palette.error.main}`,
          backgroundColor: "error.main",
          color: "error.contrastText",
          "&:hover": {
            backgroundColor: "error.dark",
            borderColor: "error.dark",
            boxShadow: (theme) => `0px 4px 12px ${theme.palette.error.main}30`,
            transform: "translateY(-1px)",
          },
        };
      case "error":
        return {
          ...baseStyles,
          backgroundColor: "error.main",
          color: "error.contrastText",
          "&:hover": {
            backgroundColor: "error.dark",
            boxShadow: (theme) => `0px 4px 12px ${theme.palette.error.main}40`,
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