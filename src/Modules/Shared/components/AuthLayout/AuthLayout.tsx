
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import photo from "../../../../assets/images/logoazhar.png"
import { Divider, Paper,  } from "@mui/material";





export default function AuthLayout() {
  return (
   <>



     <Box sx={{  
  height:'100vh',
      display:"flex",
      
      alignItems:'center',
      justifyContent:'center'
    }}> 
      <Paper sx={{p: 4, borderRadius: 3,boxShadow: 6, margin:'auto'}}>
        <Stack spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Box
            component="img"
            src={photo}
            alt="Al-Azhar University Logo"
            sx={{ width: 90, height: "auto" }}
          />
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            Al-Azhar University
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            Faculty of Engineering – Girls Branch
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Outlet />
      </Paper>


</Box>



     </>
  )
}
