  import { Stack, TextField, Button, Typography, Divider} from "@mui/material";
import {useForm} from 'react-hook-form';
import axios from 'axios'
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
export default function Login() {
   let {register,formState:{errors},handleSubmit} = useForm();
   let navigate = useNavigate();
  let onsubmit=async(data:any)=>{
   try{
    let response = await axios.post('https://upskilling-egypt.com:3007/api/auth/login',
    data
    );
    localStorage.setItem('accessToken',response.data.data.accessToken);
  
  console.log(response);

   }catch(error){
    console.log(error);
   

   }
  }
  return (
  <>
  <Stack sx={{ margin:'auto', m: 2}}>
      <Typography variant="h5" sx={{textAlign:'center'}}>Login to your account</Typography>
        <form onSubmit={handleSubmit(onsubmit)} >
           <TextField
  {...register('email', {
    required: 'This field is required',
    //  pattern: {
    //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    //   message: 'Enter a valid email address'
    // }
  })}
  fullWidth
  type="email"
  label="Email"
  sx={{display:'block' ,margin:'2rem 0',width:"350px"}}
  error={!!errors.email}
  helperText={errors.email?.message as React.ReactNode}
/>
      <TextField
  {...register('password', {
    required: 'This field is required',
    //   minLength: {
    //   value: 6, 
    //   message: 'Password must be at least 6 characters'
    // }
    
  })}
  fullWidth
  type="password"
  label="Password"
  sx={{display:'block' ,margin:'0.5rem 0'}}
  error={!!errors.password}
  helperText={errors.password?.message as React.ReactNode}
/>
<Link component={RouterLink} to="/forgetpass" underline="hover"
  sx={{
    display: "block",
    textAlign: "right",
    m: 1,
    fontSize: 14
  }}
>
  Forgot Password?
</Link>
       
        <Button  type="submit" fullWidth variant="contained" sx={{backgroundColor:'#394188' , marginBottom:'1rem'}}>Login</Button>
         <Divider>
 Are You Student?
  </Divider>
 
        </form>
         <Button    onClick={()=>navigate('/register')}
         type="submit" fullWidth variant="contained" sx={{bgcolor: "#2E7D6B", marginBlock:'1rem'
}} >Register Here</Button>
  </Stack>



  </>
  )
  }
