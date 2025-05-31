import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Мониторинг дыхания
        </Typography>
        <Box>
          <Button
            color="inherit"
            startIcon={<AccountCircleIcon />}
            onClick={() => navigate("/profile")}
            size="large"
          >
            {isMobile ? "" : "Профиль"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
