import {
  Box,
  TextField,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  onSearch: (value: string) => void;
  onFilterChange?: (
    type: "year" | "semester" | "academicYear",
    value: string,
  ) => void;

  placeholder?: string;
  yearOptions?: FilterOption[];

  showYear?: boolean;
  showSemester?: boolean;
  showAcademicYear?: boolean;
}

// FilterBar.tsx المحدث
export const FilterBar = ({
  onSearch,
  onFilterChange,
  placeholder = "Search by name or ID...",
  yearOptions = [],
  showYear = true,
  showSemester = true,
  showAcademicYear = false,
}: FilterBarProps) => {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        placeholder={placeholder}
        size="small"
        onChange={(e) => onSearch(e.target.value)}
        sx={{
          width: isTabletOrMobile || !onFilterChange ? "100%" : "300px",
          bgcolor: "background.paper",
        }}
      />

      {onFilterChange && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flex: isTabletOrMobile ? "1" : "none",
            width: isTabletOrMobile ? "100%" : "auto",
          }}
        >
          {/* الفلتر الاختياري للسنوات (سيظهر فقط إذا مررتِ yearOptions) */}
          {showYear && (
          <Select
            displayEmpty
            size="small"
            defaultValue=""
            onChange={(e) => onFilterChange("year", e.target.value as string)}
            sx={{
              flex: 1,
              minWidth: isTabletOrMobile ? "0" : "150px",
              bgcolor: "background.paper",
              borderRadius: "8px",
            }}
          >
            <MenuItem value="">All Years</MenuItem>
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
            <MenuItem value="5">5th Year</MenuItem>
          </Select>
          )}
          {showSemester && (
          <Select
            displayEmpty
            size="small"
            defaultValue=""
            onChange={(e) =>
              onFilterChange("semester", e.target.value as string)
            }
            sx={{
              flex: 1,
              minWidth: isTabletOrMobile ? "0" : "150px",
              bgcolor: "background.paper",
              borderRadius: "8px",
            }}
          >
            <MenuItem value="">All Semesters</MenuItem>
            <MenuItem value="1">Semester 1</MenuItem>
            <MenuItem value="2">Semester 2</MenuItem>
          </Select>
          )}
          {showAcademicYear && (
            <Select
              displayEmpty
              size="small"
              defaultValue="2026"
              onChange={(e) =>
                onFilterChange("academicYear", e.target.value as string)
              }
              sx={{
                flex: 1,
                minWidth: isTabletOrMobile ? "0" : "150px",
                bgcolor: "background.paper",
                borderRadius: "8px",
              }}
            >
              {yearOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      )}
    </Box>
  );
};
