import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Временные данные для примера
  const user = {
    name: "Иванов Иван",
    email: "ivanov@example.com",
    role: "Врач",
    department: "Терапевтическое отделение",
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              gap: { xs: 2, sm: 0 },
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: { xs: 80, sm: 64 },
                height: { xs: 80, sm: 64 },
                mr: { xs: 0, sm: 2 },
              }}
            >
              <AccountCircleIcon sx={{ fontSize: { xs: 80, sm: 64 } }} />
            </Avatar>
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                {user.role}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Отделение
              </Typography>
              <Typography variant="body1">{user.department}</Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                size={isMobile ? "small" : "medium"}
              >
                Изменить пароль
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
