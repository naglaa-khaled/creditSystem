import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
  MenuItem,
  Menu,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import photo from "../../../../assets/images/logoazhar.png";
import BasicModal from "../Modal/Modal"; // استدعاء المودال العام

interface NavebarProps {
  toggleSidebar: () => void;
}

const Navebar = ({ toggleSidebar }: NavebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openLogout, setOpenLogout] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed"elevation={0} >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "var(--bg)",
            borderBottom: "1px solid var(--gray)"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
            }}
          >
            {isMobile && (
              <IconButton
                onClick={toggleSidebar}
                sx={{ color: "var(--primary)", "&:focus": { outline: "none" } }}
                disableRipple
              >
                <DensityMediumIcon />
              </IconButton>
            )}
            <Box
              component="img"
              src={photo}
              alt="Logo"
              sx={{ width: 45, height: 45 }}
            />
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: "15px", sm: "18px", md: "20px", lg: "24px" },
                color: "var(--primary)",
              }}
            >
              Al-Azhar University
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 3 },
            }}
          >
            <IconButton
              onClick={handleMenuOpen}
              disableRipple
              sx={{ "&:focus": { outline: "none" },  }}
            >
              <Avatar sx={{color: "var(--primary)"}} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  boxShadow: "none",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <Avatar sx={{ width: 40, height: 40 }} />
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ color: "var(--primary)" }}
                  >
                    Naglaa Khaled
                  </Typography>
                  <Typography variant="body2" sx={{ color: "var(--primary)" }}>
                    naglaayoness14@gmail.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ borderTop: "1px solid var(--gray)", my: 1 }} />
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setOpenChangePassword(true);
                }}
              >
                <LockIcon sx={{ color: "var(--error)", mr: 1 }} />
                Change Password
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setOpenLogout(true);
                }}
              >
                <LogoutIcon sx={{ color: "var(--error)", mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <BasicModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        title="Change Password"
        content={
          <>
            <TextField
              label="Old Password"
              type="password"
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
            />
          </>
        }
        actions={
          <>
            <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
            <Button variant="contained" sx={{ color: "#ddd" }}>
              Save
            </Button>
          </>
        }
      />

      <BasicModal
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        title="Confirm Logout"
        content={<Typography>Are you sure you want to logout?</Typography>}
        actions={
          <>
            <Button onClick={() => setOpenLogout(false)}>Cancel</Button>
            <Button variant="contained" sx={{ color: "#ddd" }}>
              Logout
            </Button>
          </>
        }
      />
    </>
  );
};

export default Navebar;
