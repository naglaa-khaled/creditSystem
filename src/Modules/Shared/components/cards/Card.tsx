import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

interface SharedCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  loading?: boolean;
}

const SharedCard = ({ icon, title, value, loading }: SharedCardProps) => {
  return (
    <Card
      sx={{
        flex: 1,
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 130,
        borderRadius: "20px",
        bgcolor: "background.paper",
        border: (theme) => `1px solid ${theme.palette.divider}`,
       boxShadow: "none", // يفضل الاعتماد على الظل الافتراضي أو إزالته
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => `0px 12px 32px ${theme.palette.action.hover}`,
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent
        sx={{ p: 0, display: "flex", flexDirection: "column", gap: 1 }}
      >
        <Typography
          component="h2"
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            fontSize: "16px",
            letterSpacing: "0.3px",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {loading ? (
            <Skeleton width="80px" height={40} animation="wave" />
          ) : (
            value
          )}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: "14px",
          bgcolor: (theme) => `${theme.palette.primary.main}15`,
          color: "primary.main",
          transition: "transform 0.3s ease",
          "& svg": {
            fontSize: "26px",
          },
          ".MuiCard-root:hover &": {
            transform: "scale(1.05)",
            bgcolor: (theme) => `${theme.palette.primary.main}25`,
          },
        }}
      >
        {icon}
      </Box>
    </Card>
  );
};

export default SharedCard;
