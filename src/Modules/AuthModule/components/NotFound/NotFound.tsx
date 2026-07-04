// import { Box, Typography, Button } from "@mui/material";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import { useNavigate } from "react-router-dom";

// export default function NotFound() {
//   const navigate = useNavigate();
//   const handleGoHome = () => {
//     const role = localStorage.getItem("role");

//     switch (role) {
//       case "admin":
//         navigate("/admin");
//         break;

//       case "StudentAffairs":
//         navigate("/student-affairs");
//         break;

//       case "Doctor":
//         navigate("/doctors");
//         break;

//       default:
//         navigate("/login");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         bgcolor: "background.default",
//         px: 2,
//       }}
//     >
//       <Box
//         sx={{
//           textAlign: "center",
//           maxWidth: 500,
//         }}
//       >
//         <ErrorOutlineIcon color="primary" sx={{ fontSize: 90, mb: 2 }} />

//         <Typography
//           variant="h1"
//           sx={{
//             fontWeight: "bold",
//             color: "primary.main",
//             fontSize: { xs: "70px", md: "100px" },
//           }}
//         >
//           404
//         </Typography>

//         <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
//           Page Not Found
//         </Typography>

//         <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//           Sorry, the page you are looking for doesn't exist or has been moved.
//         </Typography>

//         <Button variant="contained" size="large" onClick={handleGoHome}>
//           Go Home
//         </Button>
//       </Box>
//     </Box>
//   );
// }
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotFound() {
  const navigate = useNavigate();


  const MAIN_COLOR = "#394188";

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '8rem', sm: '12rem' },
            fontWeight: 900,
            backgroundImage: `linear-gradient(45deg, ${MAIN_COLOR}, #6366F1)`,
            backgroundSize: '100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            mb: 2,
            animation: 'pulse 2s infinite ease-in-out',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.03)' },
            },
          }}
        >
          404
        </Typography>

  
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}
        >
          Oops! Page Not Found
        </Typography>

     
        <Typography 
          variant="body1" 
          sx={{ color: 'text.secondary', maxWidth: '500px', mb: 5, fontSize: '1.1rem' }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              borderColor: MAIN_COLOR,
              color: MAIN_COLOR,
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                borderColor: MAIN_COLOR,
                bgcolor: 'rgba(57, 65, 136, 0.04)',
              },
            }}
          >
            Go Back
          </Button>

          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              bgcolor: MAIN_COLOR,
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(57, 65, 136, 0.3)',
              '&:hover': {
                bgcolor: '#2c326b',
                boxShadow: '0 6px 20px rgba(57, 65, 136, 0.4)',
              },
            }}
          >
            Back to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}