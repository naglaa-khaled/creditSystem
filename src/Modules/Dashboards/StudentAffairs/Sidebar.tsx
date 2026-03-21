import { Box, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}  >
      <Typography>Courses</Typography>
      <Typography>Students</Typography>
      <Typography>Doctors</Typography>
    </Box>
  );
};

export default Sidebar; 