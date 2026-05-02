// import { Button, Stack, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


// export default function ChangePass() {
//      let {register,formState:{errors},handleSubmit} = useForm();
//   let navigate = useNavigate();
//   let onsubmit=async(data:any)=>{
//    try{
//     let response = await axios.post('https://upskilling-egypt.com:3007/api/auth/change-password',data,
//         {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//     },
//   }
//     );
//     localStorage.setItem('accessToken',response.data.data.accessToken);
//     navigate('/home');
//   console.log(response);

//    }catch(error){
//     console.log(error);

//    }
//   return (
//          <Stack sx={{width:'300px' , margin:'auto'}}>
//             <Typography variant="subtitle1">Welcome back!</Typography>
//             <Typography variant="h5" sx={{marginBottom:'2rem'}}>Change Your Password Easily</Typography>
        
//           <form onSubmit={handleSubmit(onsubmit)}>
            
//             <TextField
//   {...register('password', {
//     required: 'This field is required',
 
//   })}
//   fullWidth
//   type="password"
//   label="Old Password"
//   sx={{display:'block' ,margin:'1rem 0'}}
//   error={!!errors.oldPassword}
//   helperText={errors.oldPassword?.message as React.ReactNode}
// />
//           <TextField
//   {...register('password_new', {
//     required: 'This field is required',
 
//   })}
//   fullWidth
//   type="password"
//   label="New Password"
//   sx={{display:'block' ,margin:'2rem 0'}}
//   error={!!errors.newPassword}
//   helperText={errors.newPassword?.message as React.ReactNode}
// />

//  <TextField
//   {...register('confirmPassword', {
//     required: 'This field is required',
//   })}
//   fullWidth
//   type="password"
//   label="Confirm New Password"
//   error={!!errors.confirmPassword}
//   helperText={errors.confirmPassword?.message as React.ReactNode}
// /> 


//             <Button  type="submit" fullWidth variant="contained" sx={{backgroundColor:'#EF6B4A' , marginBottom:'1rem'}}>SAVE</Button>
      
//           </form>

//  </Stack>
//   )
// }}


export default function ChangePass() {
    let {register,formState:{errors},handleSubmit} = useForm();
  let navigate = useNavigate();
  let onsubmit=async(data:any)=>{
   try{
    let response = await axios.post('https://upskilling-egypt.com:3007/api/auth/change-password',data,
        {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  }
    );
    localStorage.setItem('accessToken',response.data.data.accessToken);
    navigate('/home');
  console.log(response);

   }catch(error){
    console.log(error);

   }
 

  }

  return (
   <>
      <Stack sx={{width:'350px' , margin:'auto'}}>
           
            <Typography variant="h5" sx={{marginBottom:'0.5rem'}}>Change Your Password Easily..</Typography>
        
          <form onSubmit={handleSubmit(onsubmit)}>
            
            <TextField
  {...register('password', {
    required: 'This field is required',
 
  })}
  fullWidth
  type="password"
  label="Old Password"
  sx={{display:'block' ,margin:'1rem 0'}}
  error={!!errors.oldPassword}
  helperText={errors.oldPassword?.message as React.ReactNode}
/>
          <TextField
  {...register('password_new', {
    required: 'This field is required',
 
  })}
  fullWidth
  type="password"
  label="New Password"
  sx={{display:'block' ,margin:'1rem 0'}}
  error={!!errors.newPassword}
  helperText={errors.newPassword?.message as React.ReactNode}
/>

{/* <TextField
  {...register('confirmPassword', {
    required: 'This field is required',
  })}
  fullWidth
  type="password"
  label="Confirm New Password"
  error={!!errors.confirmPassword}
  helperText={errors.confirmPassword?.message as React.ReactNode}
/> */}


            <Button  type="submit" fullWidth variant="contained" sx={{backgroundColor:'#394188' , marginBottom:'1rem'}}>SAVE</Button>
      
          </form>

 </Stack>
   </>
  )
}

