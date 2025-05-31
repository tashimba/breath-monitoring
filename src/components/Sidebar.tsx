import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
} from "@mui/material";
import {
  People as PeopleIcon,
  Timeline as TimelineIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const menuItems = [
  { text: "Пациенты", icon: <PeopleIcon />, path: "/patients" },
  // { text: "Live Monitoring", icon: <TimelineIcon />, path: "/monitoring" },
  // { text: "История", icon: <HistoryIcon />, path: "/history" },
  // { text: "Настройки мониторинга", icon: <SettingsIcon />, path: "/settings" },
  { text: "Профиль", icon: <PersonIcon />, path: "/profile" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          Мониторинг дыхания
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
