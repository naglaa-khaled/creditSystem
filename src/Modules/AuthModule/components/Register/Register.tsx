// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Link,
//   Stack
// } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function Register() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit
//   } = useForm();

//   const [agree, setAgree] = useState(false);
//   const navigate = useNavigate();

//   const onsubmit = async (data: any) => {
//     try {
//       const response = await axios.post(
//         "https://credithourssystemw.premiumasp.net/api/StudentRegister/register",
//         data
//       );

//       toast.success("Account created successfully! Please check your email.");

//       // 2. التحويل لصفحة CheckEmail بعد ثانيتين
//       setTimeout(() => {
//         navigate("/checkemail");
//       }, 1000);

//     } catch (error: any) {

//       const message = error.response?.data?.message || "Registration failed. Try again.";
//       toast.error(message);
//       console.log(error);
//     }
//   };

//   return (
//     <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
//       <Paper elevation={4} sx={{ width: 420, p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
//           Create Account
//         </Typography>

//         <form onSubmit={handleSubmit(onsubmit)}>
//           <TextField
//             {...register("fullName", { required: "Full Name is required" })}
//             fullWidth label="Full Name" margin="normal"
//             error={!!errors.fullName} helperText={errors.fullName?.message as string}
//           />

//           <TextField
//             {...register("email", { required: "Email is required" })}
//             fullWidth type="email" label="Email" margin="normal"
//             error={!!errors.email} helperText={errors.email?.message as string}
//           />

//           <TextField
//             {...register("year", {
//               required: "Year is required",
//               pattern: { value: /^[0-9]{1,2}$/, message: "Enter a valid year" }
//             })}
//             fullWidth label="Year" margin="normal"
//             error={!!errors.year} helperText={errors.year?.message as string}
//           />

//           <FormControlLabel
//             sx={{ mt: 2 }}
//             control={
//               <Checkbox
//                 checked={agree}
//                 onChange={(e) => setAgree(e.target.checked)}
//                 sx={{ color: "text.secondary", "&.Mui-checked": { color: "#394188" } }}
//               />
//             }
//             label={
//               <Typography variant="body2">
//                 I agree to the{" "}
//                 <Link component={RouterLink} to="/regulations" underline="hover">
//                   Student Regulations
//                 </Link>
//               </Typography>
//             }
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             disabled={!agree}
//             sx={{
//               bgcolor: "#394188",
//               mt: 3,
//               py: 1.2,
//               borderRadius: 2,
//               "&:hover": { bgcolor: "#2e356e" }
//             }}
//           >
//             Register
//           </Button>
//         </form>
//       </Paper>
//     </Stack>
//   );
// }
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Link,
//   Stack,
//   Box
// } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

// export default function Register() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit
//   } = useForm();

//   const [agree, setAgree] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false); // حالة النجاح لإظهار الاحتفال
//   const [loading, setLoading] = useState(false); // حالة التحميل للزرار
//   const { width, height } = useWindowSize();
//   const navigate = useNavigate();

//   const onsubmit = async (data: any) => {
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://credithourssystemw.premiumasp.net/api/StudentRegister/register",
//         data
//       );

//       // تفعيل حالة النجاح
//       setIsSuccess(true);
//       toast.success("Registration Successful!");

//     } catch (error: any) {
//       const message = error.response?.data?.message || "Registration failed. Try again.";
//       toast.error(message);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isSuccess) {
//     return (
//       <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
//         <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />

//         <Paper elevation={6} sx={{ width: 450, p: 5, textAlign: "center", borderRadius: 4 }}>
//           <MarkEmailReadIcon sx={{ fontSize: 100, color: "#4caf50", mb: 2 }} />

//           <Typography variant="h4" fontWeight="bold" gutterBottom color="#394188">
//             Welcome Aboard! 🎉
//           </Typography>

//           <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
//             Your account has been created successfully.
//             <br />
//             We've sent a <b>verification link</b> to your email.
//             Please check your inbox to activate your account.
//           </Typography>

//         </Paper>
//       </Stack>
//     );
//   }

//   return (
//     <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
//       <Paper elevation={4} sx={{ width: 420, p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="#394188">
//           Create Account
//         </Typography>

//         <form onSubmit={handleSubmit(onsubmit)}>
//           <TextField
//             {...register("fullName", { required: "Full Name is required" })}
//             fullWidth label="Full Name" margin="normal"
//             error={!!errors.fullName} helperText={errors.fullName?.message as string}
//           />

//           <TextField
//             {...register("email", { required: "Email is required" })}
//             fullWidth type="email" label="Email" margin="normal"
//             error={!!errors.email} helperText={errors.email?.message as string}
//           />

//           <TextField
//             {...register("year", {
//               required: "Year is required",
//               pattern: { value: /^[0-9]{1,2}$/, message: "Enter a valid year" }
//             })}
//             fullWidth label="Year" margin="normal"
//             error={!!errors.year} helperText={errors.year?.message as string}
//           />

//           <FormControlLabel
//             sx={{ mt: 2 }}
//             control={
//               <Checkbox
//                 checked={agree}
//                 onChange={(e) => setAgree(e.target.checked)}
//                 sx={{ color: "#394188", "&.Mui-checked": { color: "#394188" } }}
//               />
//             }
//             label={
//               <Typography variant="body2">
//                 I agree to the{" "}
//                 <Link component={RouterLink} to="/regulations" underline="hover">
//                   Student Regulations
//                 </Link>
//               </Typography>
//             }
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             disabled={!agree || loading}
//             sx={{
//               bgcolor: "#394188",
//               mt: 3,
//               py: 1.2,
//               borderRadius: 2,
//               "&:hover": { bgcolor: "#2e356e" }
//             }}
//           >
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </form>
//       </Paper>
//     </Stack>
//   );
// }
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Link,
//   Stack,
//   Box
// } from "@mui/material";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";
// // import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

// export default function Register() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit
//   } = useForm();

//   const [agree, setAgree] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { width, height } = useWindowSize();
//   const navigate = useNavigate();

//   const onsubmit = async (data: any) => {
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://credithourssystemw.premiumasp.net/api/StudentRegister/register",
//         data
//       );

//       setIsSuccess(true);
//       toast.success("Registration Successful!");

//     } catch (error: any) {
//       const message = error.response?.data?.message || "Registration failed. Try again.";
//       toast.error(message);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isSuccess) {
//     return (
//       <Box
//         sx={{
//           position: "fixed", // ثابت بالنسبة للشاشة وليس الـ Layout
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           bgcolor: "#f4f6f8", // لون خلفية يغطي الشاشة
//           zIndex: 9999, // أعلى من أي عنصر آخر (مثل الـ Navbar)
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//        {/* <Confetti width={width} height={height} numberOfPieces={300} recycle={false} /> */}

//         <Paper
//           elevation={6}
//           sx={{
//             width: { xs: "90%", sm: 450 },
//             p: 5,
//             textAlign: "center",
//             borderRadius: 4,
//             position: "relative",
//             zIndex: 10000
//           }}
//         >
//           <MarkEmailReadIcon sx={{ fontSize: 100, color: "#4caf50", mb: 2 }} />

//           <Typography variant="h4" fontWeight="bold" gutterBottom color="#394188">
//             Welcome ! 🎉
//           </Typography>

//           <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
//             Your account has been created successfully.
//             <br />
//             We've sent a <b>verification link</b> to your email.
//             Please check your inbox to activate your account.
//           </Typography>

//         </Paper>
//       </Box>
//     );
//   }

//   return (
//     <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
//       <Paper elevation={4} sx={{ width: 420, p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="#394188">
//           Create Account
//         </Typography>

//         <form onSubmit={handleSubmit(onsubmit)}>
//           <TextField
//             {...register("fullName", { required: "Full Name is required" })}
//             fullWidth label="Full Name" margin="normal"
//             error={!!errors.fullName} helperText={errors.fullName?.message as string}
//           />

//           <TextField
//             {...register("email", { required: "Email is required" })}
//             fullWidth type="email" label="Email" margin="normal"
//             error={!!errors.email} helperText={errors.email?.message as string}
//           />

//           <TextField
//             {...register("year", {
//               required: "Year is required",
//               pattern: { value: /^[0-9]{1,2}$/, message: "Enter a valid year" }
//             })}
//             fullWidth label="Year" margin="normal"
//             error={!!errors.year} helperText={errors.year?.message as string}
//           />

//           <FormControlLabel
//             sx={{ mt: 2 }}
//             control={
//               <Checkbox
//                 checked={agree}
//                 onChange={(e) => setAgree(e.target.checked)}
//                 sx={{ color: "#394188", "&.Mui-checked": { color: "#394188" } }}
//               />
//             }
//             label={
//               <Typography variant="body2">
//                 I agree to the{" "}
//                 <Link component={RouterLink} to="/regulations" underline="hover">
//                   Student Regulations
//                 </Link>
//               </Typography>
//             }
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             disabled={!agree || loading}
//             sx={{
//               bgcolor: "#394188",
//               mt: 3,
//               py: 1.2,
//               borderRadius: 2,
//               "&:hover": { bgcolor: "#2e356e" }
//             }}
//           >
//             {loading ? "Registering..." : "Register"}
//           </Button>
//         </form>
//       </Paper>
//     </Stack>
//   );
// }
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Link,
//   Stack,
//   Box,
//   MenuItem,
//   InputAdornment,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { useForm, Controller } from "react-hook-form";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import SchoolIcon from "@mui/icons-material/School";

// export default function Register() {
//   const {
//     register,
//     control,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const [agree, setAgree] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onsubmit = async (data: any) => {
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://credithourssystemw.premiumasp.net/api/StudentRegister/register",
//         data
//       );

//       setIsSuccess(true);
//       toast.success("Registration Successful!");
//     } catch (error: any) {
//       const message = error.response?.data?.message || "Registration failed. Try again.";
//       toast.error(message);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // شاشة النجاح بعد التسجيل
//   if (isSuccess) {
//     return (
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           bgcolor: "#f4f6f8",
//           zIndex: 9999,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             width: { xs: "90%", sm: 450 },
//             p: 5,
//             textAlign: "center",
//             borderRadius: 4,
//           }}
//         >
//           <MarkEmailReadIcon sx={{ fontSize: 100, color: "#4caf50", mb: 2 }} />
//           <Typography variant="h4" fontWeight="bold" gutterBottom color="#394188">
//             Welcome! 🎉
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
//             Your account has been created successfully.
//             <br />
//             We've sent a <b>verification link</b> to your email.
//             Please check your inbox to activate your account.
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => navigate("/login")}
//             sx={{ bgcolor: "#394188", px: 4, py: 1, borderRadius: 2 }}
//           >
//             Go to Login
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   return (
//     <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", py: 4 }}>
//       <Paper elevation={4} sx={{ width: { xs: "90%", sm: 420 }, p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1} color="#394188">
//           Create Account
//         </Typography>
//         <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
//           Join Al-Azhar University Portal
//         </Typography>

//         <form onSubmit={handleSubmit(onsubmit)}>
//           {/* الاسم بالكامل */}
//           <TextField
//             {...register("fullName", { required: "Full Name is required" })}
//             fullWidth
//             label="Full Name"
//             margin="normal"
//             error={!!errors.fullName}
//             helperText={errors.fullName?.message as string}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* البريد الإلكتروني */}
//           <TextField
//             {...register("email", {
//               required: "Email is required",
//               pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
//             })}
//             fullWidth
//             type="email"
//             label="Email Address"
//             margin="normal"
//             error={!!errors.email}
//             helperText={errors.email?.message as string}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <EmailIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             {...register("year", { required: "Academic Year is required" })}
//             select
//             fullWidth
//             label="Academic Year"
//             margin="normal"
//             defaultValue=""
//             error={!!errors.year}
//             helperText={errors.year?.message as string}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SchoolIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//           >
//             {[1, 2, 3, 4, 5].map((option) => (
//               <MenuItem key={option} value={option}>
//                {option}
//               </MenuItem>
//             ))}
//           </TextField>

//           <FormControlLabel
//             sx={{ mt: 2 }}
//             control={
//               <Checkbox
//                 checked={agree}
//                 onChange={(e) => setAgree(e.target.checked)}
//                 sx={{ color: "#394188", "&.Mui-checked": { color: "#394188" } }}
//               />
//             }
//             label={
//               <Typography variant="body2">
//                 I agree to the{" "}
//                 <Link component={RouterLink} to="/regulations" underline="hover" sx={{ color: "#394188", fontWeight: "bold" }}>
//                   Student Regulations
//                 </Link>
//               </Typography>
//             }
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             disabled={!agree || loading}
//             sx={{
//               bgcolor: "#394188",
//               mt: 3,
//               py: 1.5,
//               borderRadius: 2,
//               fontSize: "16px",
//               textTransform: "none",
//               "&:hover": { bgcolor: "#2e356e" },
//             }}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Register Now"}
//           </Button>

//           <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
//             Already have an account?{" "}
//             <Link component={RouterLink} to="/login" sx={{ color: "#394188", fontWeight: "bold", textDecoration: "none" }}>
//               Login
//             </Link>
//           </Typography>
//         </form>
//       </Paper>
//     </Stack>
//   );
// }
import {
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  Box,
  MenuItem,
  InputAdornment,
  CircularProgress,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [agree, setAgree] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverData, setServerData] = useState<any>(null); // لحفظ بيانات الإيميل الجامعي
  const navigate = useNavigate();
  const theme = useTheme();
  const onsubmit = async (data: any) => {
    setLoading(true);

    // تجهيز البيانات بناءً على تجربة الـ Swagger الناجحة
    const studentData = {
      fullName: data.fullName,
      email: data.email,
      year: String(data.year), // تحويل القيمة لنص لضمان قبول السيرفر
    };

    try {
      const response = await axios.post(
        "https://credithourssystemw.premiumasp.net/api/StudentRegister/register",
        studentData,
      );

      setServerData(response.data); // حفظ الرد لإظهار الإيميل الجامعي
      setIsSuccess(true);
      toast.success("Registration Successful!");
    } catch (error: any) {
      const message =
        error.response?.data || "Registration failed. Please check your data.";
      toast.error(
        typeof message === "string" ? message : "Error in registration",
      );
      console.log("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "background.default",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper elevation={0} sx={{ width: { xs: "100%", sm: 500 }, p: 6, textAlign: "center", borderRadius: 4, border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
          <MarkEmailReadIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="text.primary"
          >
            Welcome to Al-Azhar University! 🎉
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.7, fontSize: "1.1rem" }}
          >
            Your account has been created successfully.
            <br />
            Please <b>check your email</b> to find your university login details
            and activation link.
          </Typography>

          {/* زر العودة لتسجيل الدخول */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/login")}
            sx={{
              bgcolor:theme.palette.primary.main,
              py: 1.5,
              borderRadius: 2,
              fontSize: "16px",
              textTransform: "none",
              "&:hover": { bgcolor: "main.primary.dark" },
            }}
          >
            Go to Login Page
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: { xs: "95%", sm: 450 }, p: 4, borderRadius: 4 }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="text.secondary">
            Join Us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your student account to get started
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onsubmit)}>
          {/* الاسم بالكامل */}
          <TextField
            {...register("fullName", { required: "Full Name is required" })}
            fullWidth
            label="Full Name"
            placeholder="Enter your name.."
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            fullWidth
            type="email"
            label="Personal Email"
            placeholder="example@gmail.com"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register("year", { required: "Academic Year is required" })}
            select
            fullWidth
            label="Level / Year"
            margin="normal"
            defaultValue=""
            error={!!errors.year}
            helperText={errors.year?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          >
            {[1, 2, 3, 4, 5].map((option) => (
              <MenuItem key={option} value={String(option)}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                sx={{ color: "text.secondary", "&.Mui-checked": { color: "text.secondary" } }}
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                I agree to the{" "}
                <Link
                  component={RouterLink}
                  to="/regulations"
                  underline="hover"
                  sx={{ color: "text.secondary", fontWeight: "bold" }}
                >
                  Student Regulations
                </Link>
              </Typography>
            }
          />

          {/* زر التسجيل التفاعلي */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!agree || loading}
            sx={{
              bgcolor: "primary.main",
              mt: 4,
              py: 1.8,
              borderRadius: 3,
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(57, 65, 136, 0.3)",
              "&:hover": { bgcolor: "primary.dark", boxShadow: "none" },
            }}
          >
            {loading ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              "Register Now"
            )}
          </Button>

          <Button
            fullWidth
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/login")}
            sx={{ mt: 2, color: "text.secondary", textTransform: "none" }}
          >
            Back to Login
          </Button>
        </form>
      </Paper>
    </Stack>
  );
}
