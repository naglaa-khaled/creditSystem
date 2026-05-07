
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
import { useContext, useState } from "react";
import { useForm } from "react-hook-form"; // استدعاء useForm
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import photo from "../../../../assets/images/logoazhar.png";
import BasicModal from "../Modals/BasicModal";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // استخدام navigate للتحويل
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";

interface NavebarProps {
  toggleSidebar: () => void;
}

const Navebar = ({ toggleSidebar }: NavebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openLogout, setOpenLogout] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const { logout } = useContext(AuthContext);

  // إعداد react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // دالة الإرسال
  // const onsubmit = async (data: any) => {
  //   try {
  //    let response = await axios.post(
  //       'https://credithourssystemw.premiumasp.net/api/Password/change',
  //       data, // ستحتوي على currentPassword و newPassword
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //         },
  //       }
  //     );

  //     toast.success("Password changed! Please login again.");
  //     setOpenChangePassword(false);
  //     reset();
  //     localStorage.removeItem('accessToken'); 
  //     //  localStorage.setItem('accessToken',response.data.data.accessToken);
  //     // navigate('/login');
  //   } catch (error: any) {
  //     const errorMsg = error.response?.data || "Failed to change password";
  //     toast.error(typeof errorMsg === 'string' ? errorMsg : "Error occurred");
  //   }
  // };

  const onsubmit = async (data: any) => {
    try {
      let response = await axios.post(
        'https://credithourssystemw.premiumasp.net/api/Password/change',
        data, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

     
      const newToken = response.data.accessToken;

      if (newToken) {
       
        localStorage.setItem('accessToken', newToken);
        
        toast.success("Password updated successfully!");
      } else {
      
        toast.info("Password changed. You can continue using the system.");
      }

     
      setOpenChangePassword(false);
      reset();

    } catch (error: any) {
     
      const errorMsg = error.response?.data || "Failed to change password";
      toast.error(typeof errorMsg === 'string' ? errorMsg : "Error occurred");
      console.error("Change Password Error:", error);
    }
  };

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "var(--bg)",
            borderBottom: "1px solid var(--gray)"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
            {isMobile && (
              <IconButton
                onClick={toggleSidebar}
                sx={{ color: "var(--primary)", "&:focus": { outline: "none" } }}
                disableRipple
              >
                <DensityMediumIcon />
              </IconButton>
            )}
            <Box component="img" src={photo} alt="Logo" sx={{ width: 45, height: 45 }} />
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

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 3 } }}>
            <IconButton onClick={handleMenuOpen} disableRipple sx={{ "&:focus": { outline: "none" } }}>
              <Avatar sx={{ color: "var(--primary)" }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ sx: { boxShadow: "none" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2, py: 1 }}>
                <Avatar sx={{ width: 40, height: 40 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "var(--primary)" }}>
                    Naglaa Khaled
                  </Typography>
                  <Typography variant="body2" sx={{ color: "var(--primary)" }}>
                    naglaayoness14@gmail.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ borderTop: "1px solid var(--gray)", my: 1 }} />
              <MenuItem onClick={() => { handleMenuClose(); setOpenChangePassword(true); }}>
                <LockIcon sx={{ color: "var(--primary)", mr: 1 }} />
                Change Password
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); setOpenLogout(true); }}>
                <LogoutIcon sx={{ color: "var(--error)", mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <BasicModal
        open={openChangePassword}
        onClose={() => { setOpenChangePassword(false); reset(); }}
        title="Change Password"
        content={
          <Box component="form" id="change-pass-form" onSubmit={handleSubmit(onsubmit)}>
            <TextField
              {...register('currentPassword', { required: 'Old password is required' })}
              label="Old Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message as string}
            />
            <TextField
              {...register('newPassword', { 
                required: 'New password is required',
                minLength: { value: 6, message: 'Min length 6 characters' }
              })}
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message as string}
            />
          </Box>
        }
        actions={
          <>
            <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
            <Button 
              type="submit" 
              form="change-pass-form" // ربط الزر بالفورم عن طريق الـ ID
              variant="contained" 
              sx={{ color: "#fff", backgroundColor: "var(--primary)" }}
            >
              Save
            </Button>
          </>
        }
      />

      {/* مودال تسجيل الخروج */}
      <BasicModal
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        title="Confirm Logout"
        content={<Typography>Are you sure you want to logout?</Typography>}
        actions={
          <>
            <Button onClick={() => setOpenLogout(false)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={logout}>
              Logout
            </Button>
          </>
        }
      />
    </>
  );
};

export default Navebar;
