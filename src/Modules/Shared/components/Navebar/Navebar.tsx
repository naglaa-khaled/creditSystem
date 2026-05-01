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
import BasicModal from "../Modals/BasicModal";

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
      <AppBar position="fixed" elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "var(--bg)",
            borderBottom: "1px solid var(--gray)",
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
              sx={{ width: 50, height: 50 }}
            />
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: "16px", sm: "19px", md: "22px", lg: "25px" },
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
              sx={{ "&:focus": { outline: "none" } }}
            >
              <Avatar sx={{ color: "var(--primary)" }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              // هذا الجزء سيجعل القائمة تظهر أسفل الأفاتار تماماً وبشكل منسق
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  mt: 1.5, // مسافة بسيطة بين الأفاتار والقائمة
                  minWidth: 200,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))", // ظل احترافي
                  borderRadius: "12px", // حواف ناعمة
                  "&:before": {
                    // إضافة سهم صغير يشير للأعلى (اختياري)
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "var(--primary)" }}
                >
                  Naglaa Khaled
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                >
                  naglaayoness14@gmail.com
                </Typography>
              </Box>

              {/* الفاصل يفضل أن يكون بسيطاً وبدون ظل خاص به */}
              <Box sx={{ borderTop: "1px solid var(--gray)", my: 0.5 }} />

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setOpenChangePassword(true);
                }}
                sx={{ py: 1.2 }}
              >
                <LockIcon
                  sx={{ color: "var(--primary)", mr: 2, fontSize: "20px" }}
                />
                <Typography variant="body2">Change Password</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setOpenLogout(true);
                }}
                sx={{ py: 1.2 }}
              >
                <LogoutIcon
                  sx={{ color: "var(--error)", mr: 2, fontSize: "20px" }}
                />
                <Typography variant="body2" sx={{ color: "var(--error)" }}>
                  Logout
                </Typography>
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
            <Button variant="contained" sx={{ color: "#fff", bgcolor: "var(--error)" }}>
              Logout
            </Button>
          </>
        }
      />
    </>
  );
};

export default Navebar;
