import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Switch,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useLocation, NavLink } from "react-router-dom";
import { toggleRegistration,getRegistrationStatus } from "../../../../API/AdminData/REports";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface SidebarItem {
  text: string;
  icon?: React.ReactNode;
  path?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  onItemClick?: () => void;
}

const Sidebar = ({ items, onItemClick }: SidebarProps) => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");
  const theme = useTheme();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // حالة جديدة
useEffect(() => {
  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      const status = await getRegistrationStatus(); 
      setIsRegistrationOpen(status);
    } catch (error) {
      console.error("Error fetching registration status:", error);
    } finally {
      setIsLoading(false); // انتهى التحميل مهما كانت النتيجة
    }
  };
  fetchStatus();
}, []);
const handleToggle = async (checked: boolean) => {
  const res = await toggleRegistration(checked);
  if (res.success) {
    setIsRegistrationOpen(checked);
    // تخصيص الرسالة بناءً على الحالة
    const message = checked ? "تم فتح التسجيل بنجاح" : "تم غلق التسجيل بنجاح";
    toast.success(message);
  } else {
    // تخصيص رسالة الخطأ أيضاً
    const errorMessage = checked ? "فشل فتح التسجيل" : "فشل غلق التسجيل";
    toast.error(errorMessage);
  }
};
  return (
    <Box
      sx={{
        width: { xs: 240, sm: 250, md: 260 },
        height: "100vh",
        backgroundColor: theme.palette.primary.light,
        color: "primary.main",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List>
        {items?.length > 0 &&
          items.map((item, index) => {
            const path = item.path || "";
            const currentPath = location.pathname;
            const isActive = [
              "/admin",
              "/student-affairs",
              "/doctors",
            ].includes(path)
              ? currentPath === path
              : currentPath.toLowerCase().startsWith(path.toLowerCase());
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path || "#"}
                  onClick={() => {
                    console.log("clicked");
                    if (onItemClick) onItemClick();
                  }}
                  sx={{
                    margin: "8px 12px",
                    borderRadius: "10px",
                    color: isActive ? "#fff" : theme.palette.text.secondary,
                    backgroundColor: isActive
                      ? theme.palette.primary.main
                      : "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      "& .MuiListItemIcon-root": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  {item.icon && (
                    <ListItemIcon
                      sx={{
                        color: isActive ? "#fff" : theme.palette.text.secondary,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      {userRole?.toLowerCase() === "admin" && (
        <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {isLoading ? "جاري التحميل..." : (isRegistrationOpen ? "غلق التسجيل" : "فتح التسجيل")}
            </Typography>
            
            {/* الجزء الجديد: عرض الـ Spinner أثناء التحميل */}
            {isLoading ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : (
              <Switch
                checked={isRegistrationOpen}
                onChange={(e) => handleToggle(e.target.checked)}
                color="primary"
              />
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
