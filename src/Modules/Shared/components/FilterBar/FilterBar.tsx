import { Box, TextField, MenuItem, Select, InputAdornment, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FilterBarProps {
  onSearch: (value: string) => void;
  onFilterChange: (type: "year" | "semester", value: string) => void;
}

export const FilterBar = ({ onSearch, onFilterChange }: FilterBarProps) => {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box 
      sx={{ 
        display: "flex", 
        gap: 2, 
        mb: 3, 
        flexWrap: "wrap", 
        alignItems: "center"
      }}
    >
      <TextField
        placeholder="Search by name..."
        size="small"
        onChange={(e) => onSearch(e.target.value)} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#9ca3af", fontSize: "20px" }} />
            </InputAdornment>
          ),
        }}
        sx={{ 
          width: isTabletOrMobile ? "100%" : "300px", 
          bgcolor: "white",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          }
        }}
      />

      <Box sx={{ 
        display: "flex", 
        gap: 2, 
        flex: isTabletOrMobile ? "1" : "none", 
        width: isTabletOrMobile ? "100%" : "auto" 
      }}>
        <Select
          displayEmpty
          size="small"
          defaultValue=""
          onChange={(e) => onFilterChange("year", e.target.value as string)}
          sx={{ 
            flex: 1,  
            minWidth: isTabletOrMobile ? "0" : "150px",
            bgcolor: "white",
            borderRadius: "8px"
          }}
        >
          <MenuItem value="">All Years</MenuItem>
          <MenuItem value="1">1st Year</MenuItem>
          <MenuItem value="2">2nd Year</MenuItem>
        </Select>

        <Select
          displayEmpty
          size="small"
          defaultValue=""
          onChange={(e) => onFilterChange("semester", e.target.value as string)}
          sx={{ 
            flex: 1, 
            minWidth: isTabletOrMobile ? "0" : "150px",
            bgcolor: "white",
            borderRadius: "8px"
          }}
        >
          <MenuItem value="">All Semesters</MenuItem>
          <MenuItem value="1">Semester 1</MenuItem>
          <MenuItem value="2">Semester 2</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};