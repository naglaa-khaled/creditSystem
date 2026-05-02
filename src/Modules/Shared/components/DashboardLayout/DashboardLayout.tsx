import { useState } from "react";
import {
  Box,
  Drawer,
  Stack,
  useTheme,
  useMediaQuery,
  Toolbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Navebar from "../Navebar/Navebar";

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}
const DashboardLayout = ({ sidebar, children }:DashboardLayoutProps) => {
  
  const [openSidebar, setOpenSidebar] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Box>

      {/* Navbar */}
      <Navebar toggleSidebar={toggleSidebar} />
      <Toolbar />
      {isMobile ? (
        <>
          <Drawer
            anchor="left"
            open={openSidebar}
            onClose={() => setOpenSidebar(false)}
          >
            <Box sx={{ width: 250, p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => setOpenSidebar(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {sidebar}
            </Box>
          </Drawer>

          <Box sx={{ p: 2 }}>
            {children}
          </Box>
        </>
      ) : (
        <Stack direction="row">
          <Box sx={{ width: 250, p: 2 }}>
            {sidebar}
          </Box>

          <Box sx={{ flexGrow: 1, p: 2 }}>
            {children}
          </Box>

        </Stack>
      )}
    </Box>
  );
};

export default DashboardLayout;