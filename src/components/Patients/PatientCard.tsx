import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface PatientCardProps {
  id: string;
  name: string;
  age: number;
  status: "active" | "inactive";
  lastMonitoring?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const PatientCard = ({
  id,
  name,
  age,
  status,
  lastMonitoring,
}: PatientCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patients/${id}`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardContent sx={{ position: "relative", pb: 2 }}>
        <StatusChip
          label={status === "active" ? "Активен" : "Неактивен"}
          color={status === "active" ? "success" : "default"}
          size="small"
        />

        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Возраст: {age} года
          </Typography>

          {lastMonitoring && (
            <Typography variant="body2" color="text.secondary">
              Последний мониторинг: {lastMonitoring}
            </Typography>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default PatientCard;
