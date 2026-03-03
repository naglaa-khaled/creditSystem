import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


export default function ResetPass() {
     let {register,formState:{errors},handleSubmit} = useForm();
  let navigate = useNavigate()
  let onsubmit=async(data:any)=>{
   try{
    let response = await axios.post('https://upskilling-egypt.com:3007/api/auth/login',data);
    localStorage.setItem('accessToken',response.data.data.accessToken);
    navigate('/home');
  console.log(response);

   }catch(error){
    console.log(error);
   

   }
 

  }
  return (
    <>
         <Stack sx={{margin:'auto',width:'300px'}}>
     
            <Typography variant="h6" sx={{marginBottom:'0.5rem'}}>Reset Your Password Now !</Typography>
        
          <form onSubmit={handleSubmit(onsubmit)}>
           
            <TextField
  {...register('email', {
    required: 'This field is required',
  })}
  fullWidth
  type="email"
  label="Email"
  sx={{display:'block' ,margin:'1rem 0'}}
  error={!!errors.email}
  helperText={errors.email?.message as React.ReactNode}
/>



            <TextField
  {...register('password', {
    required: 'This field is required',

    
  })}
  fullWidth
  type="password"
  label="Password"
  sx={{display:'block' ,margin:'1rem 0'}}
  error={!!errors.password}
  helperText={errors.password?.message as React.ReactNode}
/>


            <Button  type="submit" fullWidth variant="contained" sx={{backgroundColor:'#394188' , marginBottom:'1rem'}}>Send</Button>
          <Button fullWidth onClick={()=>navigate('/login')}
           variant="outlined" sx={{color:'#2435cd'}}>LOGIN</Button>
          </form>

 </Stack>
    </>
  )
}
