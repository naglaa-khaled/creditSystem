// import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import Checkbox from '@mui/material/Checkbox';
// import React from "react";
// const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };


// export default function Register() {
//     let {register,formState:{errors},handleSubmit} = useForm();
//      const [checked, setChecked] = React.useState(true);
//    let navigate = useNavigate();
//   let onsubmit=async(data:any)=>{
//    try{
//     let response = await axios.post('https://upskilling-egypt.com:3007/api/auth/login',
//     data
//     );
//     localStorage.setItem('accessToken',response.data.data.accessToken);
  
//   console.log(response);

//    }catch(error){
//     console.log(error);
   

//    }
//   }


//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked);
//   };

//   return (
//    <>
//    <Stack sx={{ margin:'auto', m: 2}}>
//       <Typography variant="h5" sx={{textAlign:'center'}}>Login to your account</Typography>
//         <form onSubmit={handleSubmit(onsubmit)} >
        
//       <TextField
//   {...register('fullName', {
//     required: 'This field is required',
   
//   })} 
//   fullWidth
//   type="text"
//   label="Full Name"
//   sx={{ display: 'block', margin: '0.5rem 0' }}
//   error={!!errors.fullname}
//   helperText={errors.fullname?.message as React.ReactNode}
// /> 
//  <TextField
//   {...register('email', {
//     required: 'This field is required', 
//     //  pattern: { 
//      //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
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
//  <TextField
//   {...register('year', {
//     required: 'This field is required',
//      pattern: { value: /^[0-9]{1,2}$/, message: 'Enter a valid year' }
//   })}
//   fullWidth
//   type="text" 
//   label="Year"
//   sx={{ display: 'block', margin: '0.5rem 0' }}
//   error={!!errors.year}
//   helperText={errors.year?.message as React.ReactNode}
// />
//        <Checkbox
//   {...label}
//   defaultChecked
//   sx={{
//     color: '#394188', 
//     '&.Mui-checked': {
//       color: '#394188', 
//     },
//   }}
// /> 
//          <Button  onClick={()=>navigate('/regulations')}
//          type="submit" fullWidth variant="contained" sx={{bgcolor:'#394188', marginBlock:'1rem'
// }} >Register </Button>
//         </form> 
    
//    </Stack>
 
//    </>
//   )
// }
import {

  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
   const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const onsubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3007/api/auth/login",
        data
      );

      localStorage.setItem(
        "accessToken",
        response.data.data.accessToken
      );

      console.log(response);
       navigate("/checkemail"); 
   
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     <Stack
      sx={{display: "flex",justifyContent: "center",alignItems: "center"}}
    >
      <Paper
        elevation={4}
        sx={{width: 420, p: 4,borderRadius:3}}
      >
        <Typography variant="h5"fontWeight="bold"textAlign="center" mb={3} >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit(onsubmit)}>
          <TextField
            {...register("fullName", {
              required: "This field is required"
            })}
            fullWidth
            label="Full Name"
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
          />

          <TextField
            {...register("email", {
              required: "This field is required"
            })}
            fullWidth
            type="email"
            label="Email"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <TextField
            {...register("year", {
              required: "This field is required",
              pattern: {
                value: /^[0-9]{1,2}$/,
                message: "Enter a valid year"
              }
            })}
            fullWidth
            label="Year"
            margin="normal"
            error={!!errors.year}
            helperText={errors.year?.message as string}
          />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                sx={{
                  color: "#394188",
                  "&.Mui-checked": {
                    color: "#394188"
                  }
                }}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link
                  component={RouterLink}
                  to="/regulations"
                  underline="hover"
                >
                  Student Regulations
                </Link>
              </Typography>
            }
          />

          <Button
       
            type="submit"
            fullWidth
            variant="contained"
            disabled={!agree}
            sx={{
              bgcolor: "#394188",
              mt: 3,
              py: 1.2,
              borderRadius: 2
            }}
          >
            Register
          </Button>
        </form>
      </Paper>
   </Stack>
    </>
  )
}




