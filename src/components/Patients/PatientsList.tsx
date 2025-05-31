import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PatientCard from "./PatientCard";

// Временные данные для примера
const mockPatients = [
  {
    id: "1",
    name: "Иванов Иван",
    age: 45,
    status: "active" as const,
    lastMonitoring: "2024-02-20 15:30",
  },
  {
    id: "2",
    name: "Петров Петр",
    age: 32,
    status: "inactive" as const,
    lastMonitoring: "2024-02-19 10:15",
  },
  {
    id: "3",
    name: "Сидорова Анна",
    age: 28,
    status: "active" as const,
    lastMonitoring: "2024-02-20 14:45",
  },
];

const PatientsList = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age) {
      const patient = {
        id: String(patients.length + 1),
        name: newPatient.name,
        age: parseInt(newPatient.age),
        status: "active" as const,
        lastMonitoring: new Date().toLocaleString(),
      };
      setPatients([...patients, patient]);
      setNewPatient({ name: "", age: "" });
      handleClose();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: { xs: 2, sm: 0 },
          mb: 3,
        }}
      >
        <Typography variant="h5">Пациенты</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          fullWidth={isMobile}
        >
          Добавить пациента
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {patients.map((patient) => (
          <Box key={patient.id}>
            <PatientCard {...patient} />
          </Box>
        ))}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Добавить нового пациента</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="ФИО"
              value={newPatient.name}
              onChange={(e) =>
                setNewPatient({ ...newPatient, name: e.target.value })
              }
              fullWidth
              autoFocus
            />
            <TextField
              label="Возраст"
              type="number"
              value={newPatient.age}
              onChange={(e) =>
                setNewPatient({ ...newPatient, age: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAddPatient} variant="contained">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientsList;
