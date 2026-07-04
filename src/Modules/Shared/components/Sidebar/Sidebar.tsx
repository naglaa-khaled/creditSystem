import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  IconButton,
} from "@mui/material";
import { useLocation, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Box
      sx={{
        width: isOpen ? { xs: 240, sm: 250, md: 270 } : 78,
        // حركة أنيميشن من نوع Spring ناعمة جداً وسريعة ومريحة للعين
        transition: "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
          height: "115vh",
        backgroundColor: theme.palette.primary.light,
        color: "primary.main",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: isOpen
          ? "4px 0 24px rgba(0,0,0,0.03)"
          : "2px 0 12px rgba(0,0,0,0.02)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isOpen ? "flex-end" : "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
          p: 1.5,
        }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            color: theme.palette.primary.main,
            backgroundColor: "rgba(0,0,0,0.03)",

            transition: "transform 0.3s ease, background-color 0.2s",

            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.08)",
              transform: "scale(1.1)",
            },
            "&:active": { transform: "scale(0.95)" },
          }}
        >
          {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <List
        sx={{
          px: 1,
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {" "}
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
              <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path || "#"}
                  onClick={() => {
                    if (onItemClick) onItemClick();
                  }}
                  sx={{
                    margin: "4px 8px",
                    borderRadius: "14px", // زوايا دائرية عصرية جداً (Rounded-xl)
                    color: isActive ? "#fff" : theme.palette.text.secondary,

                    // حركة متدرجة نيون (Glow Effect) لو الـ Item نشط
                    background: isActive
                      ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #4f46e5 100%)`
                      : "transparent",
                    boxShadow: isActive
                      ? "0 8px 16px -4px rgba(79, 70, 229, 0.4)"
                      : "none",

                    justifyContent: isOpen ? "initial" : "center",
                    px: isOpen ? 2.5 : 0,
                    py: 1.5,

                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

                    "&:hover": {
                      background: isActive
                        ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #4f46e5 100%)`
                        : "rgba(0, 0, 0, 0.03)",
                      color: isActive ? "#fff" : theme.palette.primary.main,
                      transform: isActive ? "none" : "translateX(4px)", // تأثير سحب خفيف لليمين عند الـ Hover

                      "& .MuiListItemIcon-root": {
                        color: isActive ? "#fff" : theme.palette.primary.main,
                        transform: "scale(1.15) translateY(-1px)", // الأيقونة بتكبر وتترفع سنة لفوق لحركة تفاعلية
                      },
                    },
                  }}
                >
                  {item.icon && (
                    <ListItemIcon
                      sx={{
                        color: isActive ? "#fff" : theme.palette.text.secondary,
                        minWidth: isOpen ? 42 : "auto",
                        justifyContent: "center",

                        transition:
                          "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.2s",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  )}

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: isActive ? 700 : 600,
                      letterSpacing: "0.2px",
                    }}
                    sx={{
                      opacity: isOpen ? 1 : 0,
                      display: isOpen ? "block" : "none",
                      transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default Sidebar;
