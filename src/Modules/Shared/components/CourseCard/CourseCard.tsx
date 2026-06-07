import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // الأيقونة الأنسب للمظهر الهابط
import DownloadIcon from "@mui/icons-material/Download"; 
import { Box, IconButton, Button, Typography } from "@mui/material";
import { type ReactNode } from "react";

interface ISemesterCardProps {
  level: string;
  semester: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  onExport?: (e: React.MouseEvent) => void; 
  icon: ReactNode;
  text: string;
}

// دالة ديناميكية لتوليد الألوان بناءً على الـ Level لتتناسق تلقائياً كالصورة
const getCardColors = (level: string) => {
  const lvl = level.toString().trim();
  if (lvl === "1" || lvl.toLowerCase() === "one") {
    return { bg: "#e8f5e9", text: "#2e7d32", iconBg: "#e8f5e9", iconColor: "#2e7d32" }; // الأخضر
  }
  if (lvl === "2") {
    return { bg: "#e3f2fd", text: "#1565c0", iconBg: "#e3f2fd", iconColor: "#1565c0" }; // الأزرق
  }
  if (lvl === "3") {
    return { bg: "#fff3e0", text: "#ef6c00", iconBg: "#fff3e0", iconColor: "#ef6c00" }; // البرتقالي
  }
  if (lvl === "4") {
    return { bg: "#e3f2fd", text: "#1565c0", iconBg: "#e3f2fd", iconColor: "#1565c0" }; // الأزرق للمستوى الرابع
  }
  if (lvl === "5") {
    return { bg: "#ffebee", text: "#c62828", iconBg: "#ffebee", iconColor: "#c62828" }; // الأحمر
  }
  return { bg: "#f3e5f5", text: "#7b1fa2", iconBg: "#f3e5f5", iconColor: "#7b1fa2" }; // الموف الافتراضي للمستويات الأخرى
};

export const SemesterCard = ({
  level,
  semester,
  count,
  isActive,
  onClick,
  onExport,
  text,
  icon,
}: ISemesterCardProps) => {
  const colors = getCardColors(level);

  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: "16px",
        border: isActive ? "2px solid #3f51b5" : "1px solid #e2e8f0",
        bgcolor: "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: isActive
          ? "0 8px 30px rgba(63, 81, 181, 0.12)"
          : "0 2px 12px rgba(0,0,0,0.03)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2.5, display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", flexGrow: 1 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              bgcolor: colors.iconBg,
              color: colors.iconColor,
              p: 1.5,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
            }}
          >
            {icon}
          </Box>

          {/* نصوص المستويات والترم */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Typography component="h3" sx={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#1e293b" }}>
              Level {level}
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", margin: 0, fontSize: "0.875rem" }}>
              Semester {semester}
            </Typography>
          </Box>
        </Box>

        {/* كبسولة عدد الطلاب بألوانها المطابقة */}
        <Box
          sx={{
            backgroundColor: colors.bg,
            color: colors.text,
            px: 1.5,
            py: 0.75,
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: "700",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {count} {text}
        </Box>
      </Box>

      {/* خط فاصل أنيق يفصل بين البيانات والتحكم السفلي */}
      <Box sx={{ height: "1px", bgcolor: "#f1f5f9", mx: 2.5 }} />

      {/* الشريط السفلي الذي يحتوي على أزرار الأكشن التفاعلية */}
      <Box 
        sx={{ 
          px: 2.5, 
          py: 1.25, 
          display: "flex", 
          alignItems: "center", 
justifyContent: onExport ? "space-between" : "center",
          bgcolor: "#fafafa" ,
          mt: "auto"
        }}
      >
       {onExport && (
          <Button
            variant="text"
            startIcon={<DownloadIcon sx={{ fontSize: "18px !important" }} />}
            onClick={(e) => {
              e.stopPropagation(); 
              onExport(e);
            }}
            sx={{
              color: "#2e7d32",
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "uppercase",
              p: "4px 8px",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#e8f5e9",
              },
            }}
          >
            Download Data
          </Button>
        )}

        {/* سهم التوسيع المحسن */}
        <IconButton 
          size="small" 
          disableRipple
          sx={{ 
            color: isActive ? "#3f51b5" : "#94a3b8",
            transition: "transform 0.3s ease",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
            // التعديل 6: إضافة خلفية خفيفة جداً عند تمرير الماوس فوق السهم عندما يكون منفرداً لزيادة حيوية التصميم
            "&:hover": {
              bgcolor: onExport ? "transparent" : "rgba(0, 0, 0, 0.04)"
            }
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};