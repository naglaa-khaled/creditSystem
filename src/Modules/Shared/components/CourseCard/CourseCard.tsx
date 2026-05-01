import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/Download"; 
import { Box, IconButton, Tooltip } from "@mui/material";
import { type ReactNode } from "react";

interface ISemesterCardProps {
  level: string;
  semester: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  onExport?: (e: React.MouseEvent) => void; 
  icon: ReactNode;
  text:string;
}

export const SemesterCard = ({
  level,
  semester,
  count,
  isActive,
  onClick,
  onExport,
  text,
  icon,
}: ISemesterCardProps) => (
  <Box
    onClick={onClick}
    sx={{
      p: 2.5,
      borderRadius: "16px",
      border: isActive ? "2px solid #3f51b5" : "1px solid #f0f0f0",
      bgcolor: isActive ? "#f8faff" : "white",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: isActive
        ? "0 4px 20px rgba(63, 81, 181, 0.15)"
        : "0 2px 10px rgba(0,0,0,0.05)",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
      },
      display: "flex",
      gap:{md:1.5,lg:2}, 
      alignItems: "center",
      position: "relative", 
    }}
  >
  <Box sx={{ display: "flex", alignItems: "center", gap: {xs: 4, md: 4, lg: 5}, flexGrow: 1 }}>
      <Box
      sx={{
        bgcolor: "#eff2fe",
        p: 1.5,
        borderRadius: "12px",
        color: "#3f51b5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </Box>

    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
      <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#2d3748" }}>
        Level {level}
      </h3>
      <p style={{ color: "#718096", margin: "4px 0", fontSize: "0.9rem" }}>
        Semester {semester}
      </p>
      <Box sx={{ mt: 1 }}>
        <span
          style={{
            backgroundColor: "#edf2f7",
            padding: "8px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            color: "#3f51b5",
            fontWeight: "600",
          }}
        >
          {count} {text}
        </span>
      </Box>
    </Box>
  </Box>

    {onExport && (
      <Tooltip title="Export CSV">
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); 
            onExport(e);
          }}
          sx={{
            bgcolor: "#f0fdf4",
            color: "#16a34a",
            "&:hover": { bgcolor: "#dcfce7" },
          }}
        >
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    )}

    {isActive ? (
      <ExpandMoreIcon color="primary" />
    ) : (
      <ChevronRightIcon color="disabled" />
    )}
  </Box>
);