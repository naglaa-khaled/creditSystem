import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useLocation, NavLink } from "react-router-dom";

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
    </Box>
  );
};

export default Sidebar;
