// import { Stack, TextField, Button, Typography, Divider} from "@mui/material";
// import {useForm} from 'react-hook-form';
// import axios from 'axios'
// import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
// import { Link } from "@mui/material";
// import { useContext } from "react";
// import { AuthContext } from "../../../../context/AuthContext";
// export default function Login() {
//    let {register,formState:{errors},handleSubmit} = useForm();
//     let {saveLoginData} = useContext(AuthContext);
//    let navigate = useNavigate();
  
//   let onsubmit = async (data: any) => {
//   try {
//     let response = await axios.post('https://credithourssystemw.premiumasp.net/api/Auth/login', data);
    
//     if (response.data.token) {
//       localStorage.setItem('accessToken', response.data.token);
//       console.log("Login Successful, Token Saved!");
//       saveLoginData();
     
//     }

//   } catch (error) {
//     console.log("Login Error:", error);
//   }
// }
//   return (
//   <>
//   <Stack sx={{ margin:'auto', m: 2}}>
//       <Typography variant="h5" sx={{textAlign:'center'}}>Login to your account</Typography>
//         <form onSubmit={handleSubmit(onsubmit)} >
//            <TextField
//   {...register('email', {
//     required: 'This field is required',
//     //  pattern: {
//     //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
//     //   message: 'Enter a valid email address'
//     // }
//   })}
//   fullWidth
//   type="email"
//   label="Email"
//   sx={{display:'block' ,margin:'2rem 0',width:"350px"}}
//   error={!!errors.email}
//   helperText={errors.email?.message as React.ReactNode}
// />
//       <TextField
//   {...register('password', {
//     required: 'This field is required',
//     //   minLength: {
//     //   value: 6, 
//     //   message: 'Password must be at least 6 characters'
//     // }
    
//   })}
//   fullWidth
//   type="password"
//   label="Password"
//   sx={{display:'block' ,margin:'0.5rem 0'}}
//   error={!!errors.password}
//   helperText={errors.password?.message as React.ReactNode}
// />
// <Link component={RouterLink} to="/forgetpass" underline="hover"
//   sx={{
//     display: "block",
//     textAlign: "right",
//     m: 1,
//     fontSize: 14
//   }}
// >
//   Forgot Password?
// </Link>
       
//         <Button  type="submit" fullWidth variant="contained" sx={{backgroundColor:'#394188' , marginBottom:'1rem'}}>Login</Button>
//          <Divider>
//  Are You Student?
//   </Divider>
 
//         </form>
//          <Button    onClick={()=>navigate('/register')}
//          type="submit" fullWidth variant="contained" sx={{bgcolor: "#2E7D6B", marginBlock:'1rem'
// }} >Register Here</Button>
//   </Stack>



//   </>
//   )
//   }
import { Stack, TextField, Button, Typography, Divider, Link } from "@mui/material";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  // استخدام useForm للتحقق من المدخلات
  let { register, formState: { errors }, handleSubmit } = useForm();
  
  // استدعاء دالة حفظ البيانات من الـ Context
  let { saveLoginData } = useContext(AuthContext);
  let navigate = useNavigate();

  // let onsubmit = async (data: any) => {
  //   try {
  //     // إرسال بيانات اللوجين للـ API
  //     let response = await axios.post('https://credithourssystemw.premiumasp.net/api/Auth/login', data);

  //     if (response.data.token) {
  //       const token = response.data.token;
        
  //       // 1. حفظ التوكن في المتصفح
  //       localStorage.setItem('accessToken', token);
        
  //       // 2. تحديث الـ Context عشان السيستم كله يحس باللوجين
  //       saveLoginData();

  //       // 3. فك التوكن لحظياً لمعرفة الـ Role وتوجيه المستخدم
  //       const decodedToken: any = jwtDecode(token);
        
  //       // استخراج الـ Role (تأكدي من المسمى في الـ Console عندك)
  //       const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken.role;

  //       console.log("Login Successful, Role:", userRole);

  //       // 4. التوجيه الذكي بناءً على نوع المستخدم
  //       if (userRole === "Admin") {
  //         navigate('/admin', { replace: true });
  //       } else if (userRole === "Instructor") {
  //         navigate('/doctors/dashboarddoc', { replace: true });
  //       } else if (userRole === "StudentAffairs") {
  //         navigate('/student-affairs', { replace: true });
  //       } else {
  //         // لو طالب أو مستخدم عام
  //         navigate('/', { replace: true });
  //       }
  //     }

  //   } catch (error) {
  //     console.log("Login Error:", error);
  //   }
  // };
let onsubmit = async (data: any) => {
  try {
    let response = await axios.post('https://credithourssystemw.premiumasp.net/api/Auth/login', data);
    
   
    if (response.data.success && response.data.token) {
      localStorage.setItem('accessToken', response.data.token);
      saveLoginData();

      const userRole = response.data.role; 
      console.log( userRole);

    
      if (userRole === "Admin") {
        navigate('/admin', { replace: true });
      } else if (userRole === "Instructor") {
        navigate('/doctors/dashboarddoc', { replace: true });

      }else if(userRole === "StudentAffairs"){
          navigate('/student-affairs', { replace: true });

      }
       else {
       
        navigate('/', { replace: true });
      }
    }
  } catch (error) {
    console.log("Login Error:", error);
  }
}
  return (
    <Stack sx={{ margin: 'auto', m: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Login to your account
      </Typography>

      <form onSubmit={handleSubmit(onsubmit)}>
        {/* حقل البريد الإلكتروني */}
        <TextField
          {...register('email', { required: 'This field is required' })}
          fullWidth
          type="email"
          label="Email"
          sx={{ display: 'block', margin: '2rem 0', width: "350px" }}
          error={!!errors.email}
          helperText={errors.email?.message as React.ReactNode}
        />

        {/* حقل كلمة المرور */}
        <TextField
          {...register('password', { required: 'This field is required' })}
          fullWidth
          type="password"
          label="Password"
          sx={{ display: 'block', margin: '0.5rem 0' }}
          error={!!errors.password}
          helperText={errors.password?.message as React.ReactNode}
        />

        {/* رابط نسيت كلمة المرور */}
        <Link component={RouterLink} to="/forgetpass" underline="hover"
          sx={{ display: "block", textAlign: "right", m: 1, fontSize: 14 }}
        >
          Forgot Password?
        </Link>

      
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ backgroundColor: '#394188', marginBottom: '1rem', py: 1.5 }}
        >
          Login
        </Button>

        <Divider sx={{ my: 2 }}>Are You Student?</Divider>
      </form>

      
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