// // import {
// //   Box,
// //   Paper,
// //   Typography,
// //   Button,
// //   Alert,
// //   CircularProgress
// // } from "@mui/material";
// // import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function CheckEmail() {
// //       const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);
// //   const [showAlert, setShowAlert] = useState(true);

// //   const handleResend = () => {
// //     setLoading(true);

// //     // محاكاة API
// //     setTimeout(() => {
// //       setLoading(false);
// //       setShowAlert(true);
// //     }, 2000);
// //   };
// //   return (
// // <>
// // <Box
// //       sx={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         p: 2
// //       }}
// //     >
// //       <Paper
// //         elevation={4}
// //         sx={{
// //           width: 420,
// //           borderRadius: 3,
// //           p: 4,
// //           textAlign: "center",
// //           position: "relative"
// //         }}
// //       >
// //         {/* Success Alert */}
// //         {showAlert && (
// //           <Alert
// //             severity="success"
// //             onClose={() => setShowAlert(false)}
// //             sx={{ mb: 3 }}
// //           >
// //             Email sent successfully!
// //           </Alert>
// //         )}

      

       
// //         <MarkEmailReadIcon
// //           sx={{
// //             fontSize: 90,
// //             color: "#4caf50",
// //             mb: 2
// //           }}
// //         />

    
// //         <Typography variant="h5" fontWeight="bold" mb={2}>
// //           Check Your Email
// //         </Typography>

     
// //         <Typography
// //           variant="body1"
// //           color="text.secondary"
// //           mb={4}
// //         >
// //           A link to access the application has been sent
// //           to your email. Please check your inbox.
// //         </Typography>

// //         {/* Resend Button */}
// //         <Button
// //           fullWidth
// //           variant="contained"
// //             onClick={() => navigate("/register")}
// //           // onClick={handleResend}
// //           disabled={loading}
// //           sx={{
// //             bgcolor: "#394188",
// //             py: 1.2,
// //             mb: 2,
// //             borderRadius: 2,
// //             "&:hover": {
// //               bgcolor: "#2f356f"
// //             }
// //           }}
// //         >
// //          {loading ? (
// //             <>
// //               <CircularProgress
// //                 size={20}
// //                 sx={{ color: "white", mr: 1 }}
                
// //               />
// //               Sending...
// //             </>
// //           ) : (
// //             "Back to register"
// //           )} 
// //         </Button>  

// //         {/* Back Button */}
// //         <Button
// //           fullWidth
// //           variant="outlined"
// //           onClick={() => navigate("/login")}
// //           sx={{
// //             py: 1.2,
// //             borderRadius: 2,
        
// //           }}
// //         >
// //           Back to Login
// //         </Button>
// //       </Paper>
// //     </Box>
// // </>
// //   )
// // }
// import {
//   Box,
//   Paper,
//   Typography,
//   Button
// } from "@mui/material";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
// import { useNavigate } from "react-router-dom";

// export default function CheckEmail() {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "80vh", // عشان يضمن التوسيط في نص الشاشة طولياً
//         p: 2
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           width: 420,
//           borderRadius: 3,
//           p: 4,
//           textAlign: "center",
//         }}
//       >
//         {/* أيقونة الإيميل */}
//         <MarkEmailReadIcon
//           sx={{
//             fontSize: 90,
//             color: "#4caf50",
//             mb: 2
//           }}
//         />

//         {/* العنوان */}
//         <Typography variant="h5" fontWeight="bold" mb={2}>
//           Check Your Email
//         </Typography>

//         {/* النص الإرشادي */}
//         <Typography
//           variant="body1"
//           color="text.secondary"
//           mb={4}
//         >
//           A link to access the application has been sent
//           to your email. Please check your inbox.
//         </Typography>

//         {/* زرار العودة للـ Register */}
//         <Button
//           fullWidth
//           variant="contained"
//           onClick={() => navigate("/register")}
//           sx={{
//             bgcolor: "#394188",
//             py: 1.2,
//             mb: 2,
//             borderRadius: 2,
//             textTransform: "none", // عشان النص ميبقاش كله Capital لو مش حابة
//             "&:hover": {
//               bgcolor: "#2f356f"
//             }
//           }}
//         >
//           Back to Register
//         </Button>

//         {/* زرار العودة للـ Login */}
//         <Button
//           fullWidth
//           variant="outlined"
//           onClick={() => navigate("/login")}
//           sx={{
//             py: 1.2,
//             borderRadius: 2,
//             textTransform: "none",
//             color: "#394188",
//             borderColor: "#394188",
//             "&:hover": {
//               borderColor: "#2f356f",
//               bgcolor: "rgba(57, 65, 136, 0.04)"
//             }
//           }}
//         >
//           Back to Login
//         </Button>
//       </Paper>
//     </Box>
//   );
// }