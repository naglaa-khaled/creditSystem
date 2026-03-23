import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";

interface SidebarItem {
  text: string;
  icon?: React.ReactNode;
  path?: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        backgroundColor: "var(--bg)",
        color: "var(--primary)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--gray)",
      }}
    >
      <List>
        {items?.length > 0 &&
          items.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.path}
                  sx={{
                    color: isActive ? "#fff" : "#5f5858e4",
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                    "&:hover": {
                      backgroundColor: "var(--primary)",
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
                        color: isActive ? "#fff" : "#5f5858e4",
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
