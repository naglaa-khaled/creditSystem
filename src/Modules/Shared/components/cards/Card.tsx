import { Card, CardContent, Typography, Box } from "@mui/material";

interface SharedCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const SharedCard = ({ icon, title, value }: SharedCardProps) => {
  return (
    <Card
      sx={{
        flex: 1,
        p: 3, 
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 140, 
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          component="h1"
          variant="h6" 
          sx={{ color: "var(--darkGray)", fontWeight: "bold", mb: 4 }} 
        >
          {title}
        </Typography>
        <Typography
          variant="h4" 
          sx={{ fontWeight: "bold" }}
        >
          {value}
        </Typography>
      </CardContent>
      <Box sx={{  color: "var(--primary)" }} >{icon}</Box> 
    </Card>
  );
};

export default SharedCard;
