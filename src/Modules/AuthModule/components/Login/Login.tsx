
// import { Stack, TextField, Button, Typography, Divider, Link } from "@mui/material";
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../../../context/AuthContext";
// import { jwtDecode } from 'jwt-decode';

// export default function Login() {
//   // استخدام useForm للتحقق من المدخلات
//   let { register, formState: { errors }, handleSubmit } = useForm();
  
//   // استدعاء دالة حفظ البيانات من الـ Context
//   let { saveLoginData } = useContext(AuthContext);
//   let navigate = useNavigate();


// let onsubmit = async (data: any) => {
//   try {
//     let response = await axios.post('https://credithourssystemw.premiumasp.net/api/Auth/login', data);
    
//     console.log("Full Response:", response.data); // شوفي الشكل هنا في الكونسول

    
//     const resData = response.data;
//     const token = resData.token || resData.accessToken || resData.data?.token;
//     const userRole = resData.role || resData.data?.role;

//     if (token) {
//       localStorage.setItem('accessToken', token);
//       saveLoginData();

//       console.log("User Role detected:", userRole);

      
//       if (userRole === "Admin") {
//         navigate('/admin', { replace: true });
//       } else if (userRole === "instructor") {
//         navigate('/doctors/dashboarddoc', { replace: true });
//       } else if (userRole === "StudentAffairs") {
//         navigate('/student-affairs', { replace: true });
//       }
//     } else {
//       console.error("No token found in response!");
//     }
//   } catch (error: any) {
//     console.log("Login Error Details:", error.response?.data);
//   }
// }
//   return (
//     <Stack sx={{ margin: 'auto', m: 2 }}>
//       <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//         Login to your account
//       </Typography>

//       <form onSubmit={handleSubmit(onsubmit)}>
//         {/* حقل البريد الإلكتروني */}
//         <TextField
//           {...register('email', { required: 'This field is required' })}
//           fullWidth
//           type="email"
//           label="Email"
//           sx={{ display: 'block', margin: '2rem 0', width: "350px" }}
//           error={!!errors.email}
//           helperText={errors.email?.message as React.ReactNode}
//         />

//         {/* حقل كلمة المرور */}
//         <TextField
//           {...register('password', { required: 'This field is required' })}
//           fullWidth
//           type="password"
//           label="Password"
//           sx={{ display: 'block', margin: '0.5rem 0' }}
//           error={!!errors.password}
//           helperText={errors.password?.message as React.ReactNode}
//         />

//         {/* رابط نسيت كلمة المرور */}
//         <Link component={RouterLink} to="/forgetpass" underline="hover"
//           sx={{ display: "block", textAlign: "right", m: 1, fontSize: 14 }}
//         >
//           Forgot Password?
//         </Link>

      
//         <Button 
//           type="submit" 
//           fullWidth 
//           variant="contained" 
//           sx={{ backgroundColor: '#394188', marginBottom: '1rem', py: 1.5 }}
//         >
//           Login
//         </Button>

//         <Divider sx={{ my: 2 }}>Are You Student?</Divider>
//       </form>

      
//       <Button 
//         onClick={() => navigate('/register')}
//         variant="contained" 
//         sx={{ bgcolor: "#2E7D6B", mb: 2 }}
//       >
//         Register Here
//       </Button>
//     </Stack>
//   );
// }
import { Stack, TextField, Button, Typography, Divider, Link, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
  const { saveLoginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onsubmit = async (data: any) => {
    // إظهار رسالة تحميل فوراً
    const toastId = toast.loading("Verifying your credentials... Please wait.");
    
    try {
      let response = await axios.post('https://credithourssystemw.premiumasp.net/api/Auth/login', data);
      const resData = response.data;
      const token = resData.token || resData.accessToken;
      const userRole = resData.role ? resData.role.toLowerCase() : "";

      if (token) {
        localStorage.setItem('accessToken', token);
        saveLoginData();

       
        toast.update(toastId, { render: `Welcome back, ${resData.name || 'User'}!`, type: "success", isLoading: false, autoClose: 2000 });

        setTimeout(() => {
          if (userRole === "Admin") navigate('/admin', { replace: true });
          else if (userRole === "instructor") navigate('/doctors/dashboarddoc', { replace: true });
          else if (userRole === "Studentaffairs") navigate('/student-affairs', { replace: true });
          else navigate('/', { replace: true });
        }, 1000);
      }
    } catch (error: any) {
      toast.update(toastId, { render: "Login failed! Please check your email or password.", type: "error", isLoading: false, autoClose: 3000 });
      console.log("Login Error:", error);
    }
  };

  return (
    <Stack sx={{ margin: 'auto', p: 4, width: '400px', borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', mt: 8, bgcolor: 'white' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#394188', mb: 1 }}>
        Login
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray', mb: 4 }}>
        Access to your Account
      </Typography>

      <form onSubmit={handleSubmit(onsubmit)}>
        {/* البريد الإلكتروني */}
        <TextField
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address (e.g., example@mail.com)"
            }
          })}
          fullWidth
          label="Email Address"
          placeholder="Enter your email"
          sx={{ mb: 3 }}
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

       
        <TextField
          {...register('password', { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          sx={{ mb: 1 }}
          error={!!errors.password}
          helperText={errors.password?.message as string}
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

        <Link component={RouterLink} to="/forgetpass" underline="hover"
          sx={{ display: "block", textAlign: "right", mb: 1.5, fontSize: 13, color: '#394188', fontWeight: 500 }}
        >
          Forgot Password?
        </Link>

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          disabled={isSubmitting}
          sx={{ 
            backgroundColor: '#394188', 
            mb: 1, 
            py: 1.5, 
            borderRadius: 2,
            fontSize: '16px',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#2b3166' }
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Login Now"}
        </Button>

        <Divider sx={{ my: 2 }}>Are You Student?</Divider>
      </form>

      {/* <Button 
        onClick={() => navigate('/register')}
        variant="outlined" 
        fullWidth
        sx={{ 
          borderColor: "#2E7D6B", 
          color: "#2E7D6B", 
          borderRadius: 2,
          py: 1.2,
          textTransform: 'none',
          '&:hover': { borderColor: "#1f564a", bgcolor: "#f0fdfa" }
        }}
      >
        Create New Account
      </Button> */}
      
       <Button 
         onClick={() => navigate('/register')}
         variant="contained" 
         sx={{ bgcolor: "#2E7D6B", mb: 2 }}
       >
         Register Here
      </Button>
    </Stack>
  );
}