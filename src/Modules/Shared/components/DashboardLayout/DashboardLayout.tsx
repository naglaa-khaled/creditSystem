import {
  Box,
  Drawer,
  Stack,
  useTheme,
  useMediaQuery,
  Toolbar,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Navebar from "../Navebar/Navebar";

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const DashboardLayout = ({ sidebar, children }: DashboardLayoutProps) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Navbar */}
      <Navebar toggleSidebar={toggleSidebar} />
      <Toolbar />
      {isMobile ? (
        
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Drawer
            anchor="left"
            open={openSidebar}
            onClose={() => setOpenSidebar(false)}
            PaperProps={{
              sx: {
                backgroundColor: "#eff2fe", 
                width: 250,
                overflow: "hidden",
                border: "none",
              },
            }}
          >
            <Box sx={{ width: 250, height: "100%", p: 0 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={() => setOpenSidebar(false)}
                  sx={{ height: "100%" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box onClick={() => setOpenSidebar(false)}>{sidebar}</Box>
            </Box>
          </Drawer>

          <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
      ) : (
        <Stack direction="row" sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Box 
            sx={{ 
              height: "100%", 
              backgroundColor: "#eff2fe", 
              borderRight: "2px solid #eceef1",
              overflow: "hidden", 
              flexShrink: 0 
            }}
          >{sidebar}</Box>

          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              overflowY: "auto", 
              backgroundColor: "#f8f9fa", 
              height: "100%" 
            }}
          >{children}</Box>
        </Stack>
      )}
    </Box>
  );
};

export default DashboardLayout;
