
import { Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function ForgetPass() {
   let {register,formState:{errors},handleSubmit} = useForm();
  let navigate = useNavigate()
   let onsubmit=async(data:any)=>{
   try{
    let response = await axios.post('http://upskilling-egypt.com:3005/api/auth/forgot-password',data);
    localStorage.setItem('accessToken',response.data.data.accessToken);
    navigate('/home');
  console.log(response);

   }catch(error){
    console.log(error);
   

   }
 

  }
  return (
   <>
      <Stack sx={{ margin:'auto',width:'300px',height:'180px'}}>
           
            <Typography variant="h6" sx={{marginBottom:'0.5rem'}}>Forget Password !!</Typography>
        
          <form onSubmit={handleSubmit(onsubmit)}>
            
            <TextField
  {...register('email', {
    required: 'This field is required',

  })}
  fullWidth
  type="email"
  label="Email"
  sx={{display:'block' ,margin:'0.5rem 0'}}
  error={!!errors.email}
  helperText={errors.email?.message as React.ReactNode}
/>

          <Button fullWidth onClick={()=>navigate('/resetpass')}
           variant="outlined" sx={{color:'white',margin:'1rem 0',backgroundColor:'#394188'}}>send</Button>
          </form>

 </Stack>
   </>
  )
}

