import { Card, CardContent, Typography, Box } from "@mui/material";

interface SharedCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const SharedCard = ({ icon, title, value }: SharedCardProps) => {
  return (
    <Card sx={{ flex: 1, p: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ fontSize: 32 }}>{icon}</Box>
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default SharedCard;
