
// import { Button, Stack, TextField, Typography } from '@mui/material'
// import axios from 'axios';
// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

// export default function ForgetPass() {
//    let {register,formState:{errors},handleSubmit} = useForm();
//   let navigate = useNavigate()
//    let onsubmit=async(data:any)=>{
//    try{
//     let response = await axios.post('https://credithourssystemw.premiumasp.net/api/PasswordReset/request-code',data);
//     localStorage.setItem('accessToken',response.data.accessToken);
//     navigate('/home');
//   console.log(response);

//    }catch(error){
//     console.log(error);
   

//    }
 

//   }
//   return (
//    <>
//       <Stack sx={{ margin:'auto',width:'300px',height:'180px'}}>
           
//             <Typography variant="h6" sx={{marginBottom:'0.5rem'}}>Forget Password !!</Typography>
        
//           <form onSubmit={handleSubmit(onsubmit)}>
            
//             <TextField
//   {...register('email', {
//     required: 'This field is required',

//   })}
//   fullWidth
//   type="email"
//   label="Email"
//   sx={{display:'block' ,margin:'0.5rem 0'}}
//   error={!!errors.email}
//   helperText={errors.email?.message as React.ReactNode}
// />

//           <Button fullWidth onClick={()=>navigate('/resetpass')}
//            variant="outlined" sx={{color:'white',margin:'1rem 0',backgroundColor:'#394188'}}>send</Button>
//           </form>

//  </Stack>
//    </>
//   )
// }
// import { Button, Stack, TextField, Typography } from '@mui/material'
// import axios from 'axios';
// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; 

// export default function ForgetPass() {
//   let { register, formState: { errors }, handleSubmit } = useForm();
//   let navigate = useNavigate();

  
//   let onsubmit = async (data: any) => {
//   console.log("Data from form:", data);
//   try {
//     let response = await axios.post('https://credithourssystemw.premiumasp.net/api/PasswordReset/request-code', data);
//     console.log("Success:", response.data);
//     navigate('/resetpass');
//   } catch (error: any) {
//     console.log("Server Response Error:", error.response?.data);
//     toast.error(error.response?.data?.message || "User not found");
//   }
// }

//   return (
//     <>
//       <Stack sx={{ margin: 'auto', width: '300px', mt: 5 }}>
//         <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>Forget Password !!</Typography>

//         <form onSubmit={handleSubmit(onsubmit)}>
//           <TextField
//             {...register('email', {
//               required: 'This field is required',
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "invalid email address"
//               }
//             })}
//             fullWidth
//             type="email"
//             label="Email"
//             sx={{ display: 'block', margin: '0.5rem 0' }}
//             error={!!errors.email}
//             helperText={errors.email?.message as React.ReactNode}
//           />

//           <Button 
//             fullWidth 
//             type="submit" 
//             variant="contained" 
//             sx={{ 
//               color: 'white', 
//               margin: '1rem 0', 
//               backgroundColor: '#394188',
//               '&:hover': { backgroundColor: '#2e356e' } 
//             }}
//           >
//             Send Code
//           </Button>
//         </form>
//       </Stack>
//     </>
//   )
// }
import { Button, TextField, Typography, Paper, InputAdornment, Box, CircularProgress } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ForgetPass() {
  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
  let navigate = useNavigate();

  let onsubmit = async (data: any) => {
    // إظهار رسالة تحميل
    const toastId = toast.loading("Sending recovery code to your email...");
    
    try {
      await axios.post('https://credithourssystemw.premiumasp.net/api/PasswordReset/request-code', data);
      
     
      toast.update(toastId, { 
        render: "Done! Please check your Gmail inbox ", 
        type: "success", 
        isLoading: false, 
        autoClose: 5000 
      });

      setTimeout(() => {
        navigate('/resetpass');
      }, 2000);

    } catch (error: any) {
      const errorMsg = error.response?.data || "User not found";
      toast.update(toastId, { 
        render: typeof errorMsg === 'string' ? errorMsg : "User not found", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  }

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
          <EmailIcon fontSize="large" />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#394188', mb: 1 }}>
          Forgot Password?
        </Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          No worries! Enter your email and we will send you a verification code.
        </Typography>

        <form onSubmit={handleSubmit(onsubmit)}>
          <TextField
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            fullWidth
            type="email"
            label="Email Address"
            placeholder="example@gmail.com"
            error={!!errors.email}
            helperText={errors.email?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#394188' }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Button 
            fullWidth 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
            sx={{ 
              py: 1.5,
              borderRadius: '8px',
              backgroundColor: '#394188',
              fontSize: '16px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#2e356e' } 
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Send Verification Code"}
          </Button>
        </form>

        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/login')}
          sx={{ mt: 2, color: '#394188', textTransform: 'none', fontWeight: 500 }}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  )
}
