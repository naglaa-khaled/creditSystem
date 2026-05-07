// import { Button, Stack, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";


// export default function ResetPass() {
//      let {register,formState:{errors},handleSubmit} = useForm();
//   let navigate = useNavigate()
//   let onsubmit=async(data:any)=>{
//    try{
//     let response = await axios.post('https://credithourssystemw.premiumasp.net/api/PasswordReset/reset-password',data);
//     localStorage.setItem('accessToken',response.data.data.accessToken);
//     navigate('/home');
//   console.log(response);

//    }catch(error){
//     console.log(error);
   

//    }
 

//   }
//   return (
//     <>
//          <Stack sx={{margin:'auto',width:'300px'}}>
     
//             <Typography variant="h6" sx={{marginBottom:'0.5rem'}}>Reset Your Password Now !</Typography>
        
//           <form onSubmit={handleSubmit(onsubmit)}>
           
//             <TextField
//   {...register('email', {
//     required: 'This field is required',
//   })}
//   fullWidth
//   type="email"
//   label="Email"
//   sx={{display:'block' ,margin:'1rem 0'}}
//   error={!!errors.email}
//   helperText={errors.email?.message as React.ReactNode}
// />



//             <TextField
//   {...register('password', {
//     required: 'This field is required',

    
//   })}
//   fullWidth
//   type="password"
//   label="Password"
//   sx={{display:'block' ,margin:'1rem 0'}}
//   error={!!errors.password}
//   helperText={errors.password?.message as React.ReactNode}
// />


//             <Button  type="submit" fullWidth variant="contained" sx={{backgroundColor:'#394188' , marginBottom:'1rem'}}>Send</Button>
//           <Button fullWidth onClick={()=>navigate('/login')}
//            variant="outlined" sx={{color:'#2435cd'}}>LOGIN</Button>
//           </form>

//  </Stack>
//     </>
//   )
// }
// import { Button, Stack, TextField, Typography, Paper } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function ResetPass() {
//   const { register, formState: { errors }, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onsubmit = async (data: any) => {
//     try {
    
//       const response = await axios.post(
//         'https://credithourssystemw.premiumasp.net/api/PasswordReset/reset-password', 
//         data
//       );
      
//       toast.success("Password reset successfully!");

//       navigate('/login');
      
//       console.log(response);
//     } catch (error: any) {
//       console.log(error);
//       const message = error.response?.data?.message || "Failed to reset password";
//       toast.error(message);
//     }
//   };

//   return (
//     <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
//       <Paper elevation={2} sx={{ width: 400, p: 4, borderRadius: 2 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="#1A237E">
//           Reset Password
//         </Typography>
        
//         <form onSubmit={handleSubmit(onsubmit)}>
     
//           <TextField
//             {...register('email', {
//               required: 'Email is required',
//               pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Invalid email format' }
//             })}
//             fullWidth
//             type="email"
//             label="Email Address"
//             margin="normal"
//             size="small"
//             error={!!errors.email}
//             helperText={errors.email?.message as string}
//           />

   
//           <TextField
//             {...register('code', {
//               required: 'Reset code is required',
//             })}
//             fullWidth
//             label="OTP Code"
//             placeholder="Enter the code sent to your email"
//             margin="normal"
//             size="small"
//             error={!!errors.code}
//             helperText={errors.code?.message as string}
//           />

//           <TextField
//             {...register('newPassword', {
//               required: 'New password is required',
//               minLength: { value: 6, message: 'Password must be at least 6 characters' }
//             })}
//             fullWidth
//             type="password"
//             label="New Password"
//             margin="normal"
//             size="small"
//             error={!!errors.newPassword}
//             helperText={errors.newPassword?.message as string}
//           />

//           <Button 
//             type="submit" 
//             fullWidth 
//             variant="contained" 
//             sx={{ 
//               backgroundColor: '#1A237E', 
//               mt: 3, 
//               mb: 2, 
//               py: 1,
//               boxShadow: "none",
//               "&:hover": { backgroundColor: "#0D47A1", boxShadow: "none" }
//             }}
//           >
//             Reset Password
//           </Button>

//           <Button 
//             fullWidth 
//             onClick={() => navigate('/login')}
//             variant="outlined" 
//             sx={{ 
//               color: '#2435cd', 
//               borderColor: '#2435cd',
//               textTransform: 'none'
//             }}
//           >
//             Back to Login
//           </Button>
//         </form>
//       </Paper>
//     </Stack>
//   );
// }
import { Button, Stack, TextField, Typography, Paper, InputAdornment, IconButton, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ResetPass() {
  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onsubmit = async (data: any) => {
    // 1. إظهار رسالة تحميل تفاعلية أثناء تحديث البيانات
    const toastId = toast.loading("Verifying code and updating your password...");
    
    try {
      const response = await axios.post(
        'https://credithourssystemw.premiumasp.net/api/PasswordReset/reset-password', 
        data
      );
      
      // 2. تحديث التنبيه لرسالة نجاح عند الاستجابة السليمة
      toast.update(toastId, { 
        render: "Password reset successfully! Redirecting to login... 🎉", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });

      // 3. توجيه المستخدم لصفحة تسجيل الدخول بعد ثانيتين
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
      console.log(response);
    } catch (error: any) {
      console.log(error);

      const message = error.response?.data || "Failed to reset password. Please check the code.";
      
      toast.update(toastId, { 
        render: typeof message === 'string' ? message : "Invalid code or expired", 
        type: "error", 
        isLoading: false, 
        autoClose: 4000 
      });
    }
  };

  return (
    <Box sx={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      p: 2 
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: '400px', 
          borderRadius: '16px',
          textAlign: 'center'
        }}
      >
    
        <Box sx={{ 
          backgroundColor: '#f0f2ff', 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1rem',
          color: '#394188'
        }}>
          <VpnKeyIcon fontSize="large" />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#394188', mb: 1 }}>
          Reset Password
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Enter the verification code sent to your email and choose a new password.
        </Typography>
        
        <form onSubmit={handleSubmit(onsubmit)}>
          
          {/* حقل البريد الإلكتروني */}
          <TextField
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Invalid email format' }
            })}
            fullWidth
            type="email"
            label="Email Address"
            margin="normal"
            size="medium"
            error={!!errors.email}
            helperText={errors.email?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#394188' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* حقل كود التحقق OTP */}
          <TextField
            {...register('code', {
              required: 'Reset code is required',
            })}
            fullWidth
            label="OTP Code"
            placeholder="Enter the code sent to your email"
            margin="normal"
            size="medium"
            error={!!errors.code}
            helperText={errors.code?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon sx={{ color: '#394188' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* حقل كلمة المرور الجديدة */}
          <TextField
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            fullWidth
            type={showPassword ? "text" : "password"}
            label="New Password"
            placeholder="Choose a strong password"
            margin="normal"
            size="medium"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#394188' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* زر إعادة التعيين */}
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            disabled={isSubmitting}
            sx={{ 
              backgroundColor: '#394188', 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              borderRadius: '8px',
              fontSize: '16px',
              textTransform: 'none',
              boxShadow: "none",
              "&:hover": { backgroundColor: "#2e356e", boxShadow: "none" }
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
          </Button>

      
          <Button 
            fullWidth 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/login')}
            variant="outlined" 
            sx={{ 
              color: '#394188', 
              borderColor: '#394188',
              borderRadius: '8px',
              py: 1.2,
              textTransform: 'none',
              '&:hover': { borderColor: '#2e356e', bgcolor: '#f0f2ff' }
            }}
          >
            Back to Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
