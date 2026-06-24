import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import photo from "../../../../assets/images/logoazhar.png";
import { Divider, Paper ,useTheme} from "@mui/material";

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          bgcolor: "background.default",
          p: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            margin: "auto",
            bgcolor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            width: "100%",
            maxWidth: 450, 
            boxShadow: theme.palette.mode === "light" ? 3 : "none",
          }}
        >
          <Stack spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Box
              component="img"
              src={photo}
              alt="Al-Azhar University Logo"
              sx={{ width: 90, height: "auto" }}
            />
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Al-Azhar University
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Faculty of Engineering – Girls Branch
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Outlet />
        </Paper>
      </Box>
    </>
  );
}
