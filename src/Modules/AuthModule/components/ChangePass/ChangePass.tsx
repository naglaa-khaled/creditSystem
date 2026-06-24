// import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { Box } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function ChangePass() {
//     let {register,formState:{errors},handleSubmit} = useForm();
//   let navigate = useNavigate();
//   let onsubmit=async(data:any)=>{
//    try{
//     let response = await axios.post('https://credithourssystemw.premiumasp.net/api/Password/change',data,
//         {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//     },
//   }
//     );
//     // localStorage.setItem('accessToken',response.data.data.accessToken);
//     localStorage.removeItem('accessToken');
//     toast.success("Password changed! Please login again.");
//    navigate('/login');
//   console.log(response);

//    }catch(error){
//     toast.error("Failed to change password");

//    }

//   }

//   return (
//    <>
//       <Stack sx={{width:'350px' , margin:'auto'}}>

//             <Typography variant="h5" sx={{marginBottom:'0.5rem'}}>Change Your Password Easily..</Typography>

//           <form onSubmit={handleSubmit(onsubmit)}>

//             <TextField
//   {...register('currentPassword', {
//     required: 'This field is required',

//   })}
//   fullWidth
//   type="password"
//   label="Current Password"
//   sx={{display:'block' ,margin:'1rem 0'}}
//   error={!!errors.oldPassword}
//   helperText={errors.oldPassword?.message as React.ReactNode}
// />
//           <TextField
//   {...register('newPassword', {
//     required: 'This field is required',

//   })}
//   fullWidth
//   type="password"
//   label="New Password"
//   sx={{display:'block' ,margin:'1rem 0'}}
//   error={!!errors.newPassword}
//   helperText={errors.newPassword?.message as React.ReactNode}
// />

//             <Button  type="submit" fullWidth variant="contained" sx={{backgroundColor:'#394188' , marginBottom:'1rem'}}>SAVE</Button>

//           </form>

//  </Stack>
//    </>

//   )
// }
import {
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockIcon from "@mui/icons-material/Lock";
import ShieldIcon from "@mui/icons-material/Shield";

export default function ChangePass() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  // حالات للتحكم في إظهار الباسورد
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const onsubmit = async (data: any) => {
    const toastId = toast.loading("Updating your password...");
    try {
      const response = await axios.post(
        "https://credithourssystemw.premiumasp.net/api/Password/change",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      localStorage.removeItem("accessToken");
      toast.update(toastId, {
        render: "Password changed successfully! Please login again.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => navigate("/login"), 2000);
      console.log(response);
    } catch {
      toast.update(toastId, {
        render:
          "Failed to change password. Please check your current password.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "400px",
          borderRadius: 4,
          textAlign: "center",
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => `${theme.palette.primary.main}15`,
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            color: "primary.main",
          }}
        >
          <LockResetIcon fontSize="large" />
        </Box>

        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "text.primary", mb: 3 }}
        >
          Change Your password !
        </Typography>
        {/* <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          Change your password easily to keep your account safe.
        </Typography> */}

        <form onSubmit={handleSubmit(onsubmit)}>
          {/* كلمة المرور الحالية */}
          <TextField
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            fullWidth
            type={showOldPass ? "text" : "password"}
            label="Current Password"
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message as string}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPass(!showOldPass)}
                    edge="end"
                  >
                    {showOldPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* كلمة المرور الجديدة */}
          <TextField
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            })}
            fullWidth
            type={showNewPass ? "text" : "password"}
            label="New Password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message as string}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShieldIcon sx={{ color: "primary.main" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPass(!showNewPass)}
                    edge="end"
                  >
                    {showNewPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{
              bgcolor: "primary.main",
              py: 1.5,
              borderRadius: 2,
              fontSize: "16px",
              textTransform: "none",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
