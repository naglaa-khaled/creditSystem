import { Box, Container, Typography, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Regulations() {
    const navigate = useNavigate();
  return (
  <>
   <Box
      sx={{
        minHeight: "100vh",
 
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
           background: "linear-gradient(135deg, #eef2f7 0%, #d9e2f3 100%)",
          }}
        >
        
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Student Regulations
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Faculty of Engineering for Girls
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Last Updated: March 2026
            </Typography>
          </Box>

       
          <Typography variant="h6" fontWeight="bold" mt={3}>
            1. Academic Conduct
          </Typography>
          <ul>
            <li>Students must attend classes, lectures, and lab sessions regularly.</li>
            <li>Cheating, plagiarism, and academic dishonesty are strictly prohibited.</li>
            <li>Respect faculty members, staff, and fellow students.</li>
          </ul>

          <Typography variant="h6" fontWeight="bold" mt={3}>
            2. Registration Rules
          </Typography>
          <ul>
            <li>Students must complete registration within the announced period.</li>
            <li>Providing false information may result in account suspension.</li>
            <li>Late registration may lead to penalties.</li>
          </ul>

         
          <Typography variant="h6" fontWeight="bold" mt={3}>
            3. Code of Behavior
          </Typography>
          <ul>
            <li>Maintain respectful and decent behavior within the campus.</li>
            <li>Damage to university property is prohibited.</li>
            <li>Harassment or discrimination will not be tolerated.</li>
          </ul>

          <Typography variant="h6" fontWeight="bold" mt={3}>
            4. Disciplinary Actions
          </Typography>
          <ul>
            <li>Warnings or probation periods.</li>
            <li>Suspension from the university.</li>
            <li>Expulsion in severe cases.</li>
          </ul>

          <Box mt={4}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  </>
  )
}
