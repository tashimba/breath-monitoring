import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import StopIcon from "@mui/icons-material/Stop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BreathingChart from "../BreathingChart";

interface MonitoringConfig {
  frequency: number; // частота измерений в секундах
  duration: number | null; // длительность в минутах, null означает бесконечный мониторинг
  startDate: string;
  endDate: string | null;
  isActive: boolean;
}

interface BreathingStats {
  averageRatePerDay: number;
  averageRateTotal: number;
  apneaCount: number;
  lastUpdate: string;
}

interface MonitoringRecord {
  date: string;
  duration: string;
  status: string;
  breathingStats: {
    averageRate: number;
    apneaCount: number;
  };
  breathingData: number[]; // Добавляем массив данных для графика
}

interface Patient {
  id: string;
  name: string;
  age: number;
  status: "active" | "inactive";
  lastMonitoring: string;
  history: MonitoringRecord[];
  monitoringConfig: MonitoringConfig;
  breathingStats: BreathingStats;
}

interface MockPatients {
  [key: string]: Patient;
}

// Вспомогательная функция для форматирования даты
const formatDate = (date: Date) => {
  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Временные данные для примера
const mockPatients: MockPatients = {
  "1": {
    id: "1",
    name: "Максимов Матвей",
    age: 22,
    status: "active",
    lastMonitoring: formatDate(new Date()),
    monitoringConfig: {
      frequency: 30,
      duration: 60,
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
      isActive: true,
    },
    breathingStats: {
      averageRatePerDay: 16.5,
      averageRateTotal: 15.8,
      apneaCount: 3,
      lastUpdate: formatDate(new Date()),
    },
    history: [
      {
        date: formatDate(new Date()),
        duration: "30 минут",
        status: "Норма",
        breathingStats: {
          averageRate: 16.2,
          apneaCount: 1,
        },
        breathingData: Array.from(
          { length: 180 },
          () => Math.floor(Math.random() * 100) + 50
        ),
      },
      {
        date: formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000)), // вчера
        duration: "45 минут",
        status: "Норма",
        breathingStats: {
          averageRate: 15.5,
          apneaCount: 0,
        },
        breathingData: Array.from(
          { length: 270 },
          () => Math.floor(Math.random() * 100) + 50
        ),
      },
      {
        date: formatDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // позавчера
        duration: "60 минут",
        status: "Норма",
        breathingStats: {
          averageRate: 16.0,
          apneaCount: 2,
        },
        breathingData: Array.from(
          { length: 360 },
          () => Math.floor(Math.random() * 100) + 50
        ),
      },
    ],
  },
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = id ? mockPatients[id] : mockPatients["1"];
  const [openConfig, setOpenConfig] = useState(false);
  const [config, setConfig] = useState<MonitoringConfig | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MonitoringRecord | null>(
    null
  );
  const [openHistoryChart, setOpenHistoryChart] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenConfig = () => {
    setConfig(patient.monitoringConfig);
    setOpenConfig(true);
  };

  const handleCloseConfig = () => {
    setOpenConfig(false);
  };

  const handleSaveConfig = () => {
    if (config) {
      // В реальном приложении здесь будет запрос к API
      console.log("Сохранение конфигурации:", config);
      handleCloseConfig();
    }
  };

  const handleStopMonitoring = () => {
    // В реальном приложении здесь будет запрос к API
    console.log("Остановка мониторинга");
  };

  const handleOpenHistoryChart = (record: MonitoringRecord) => {
    setSelectedRecord(record);
    setOpenHistoryChart(true);
  };

  const handleCloseHistoryChart = () => {
    setOpenHistoryChart(false);
    setSelectedRecord(null);
  };

  if (!patient) {
    return (
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/patients")}
          sx={{ mb: 3 }}
          size={isMobile ? "small" : "medium"}
        >
          Назад к списку
        </Button>
        <Typography variant="h5" color="error">
          Пациент не найден
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/patients")}
        sx={{ mb: 3 }}
        size={isMobile ? "small" : "medium"}
      >
        Назад к списку
      </Button>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1fr",
          },
          gap: 3,
          minHeight: { lg: "calc(100vh - 200px)" },
        }}
      >
        {/* Левая колонка с информацией */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            height: "100%",
          }}
        >
          <Paper sx={{ p: { xs: 2, sm: 3 }, flex: 1 }} elevation={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: 2, sm: 0 },
                mb: 2,
              }}
            >
              <Typography variant="h5" sx={{ wordBreak: "break-word" }}>
                {patient.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Chip
                  label={patient.status === "active" ? "Активен" : "Неактивен"}
                  color={patient.status === "active" ? "success" : "default"}
                  size={isMobile ? "small" : "medium"}
                />
                <Button
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  onClick={handleOpenConfig}
                  size={isMobile ? "small" : "medium"}
                >
                  Настройки
                </Button>
                {patient.monitoringConfig.isActive && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<StopIcon />}
                    onClick={handleStopMonitoring}
                    size={isMobile ? "small" : "medium"}
                  >
                    Остановить
                  </Button>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1">
                Возраст: {patient.age} года
              </Typography>
              <Typography variant="body1">
                Последний мониторинг: {patient.lastMonitoring}
              </Typography>
              <Typography variant="body1">
                Частота измерений: каждые {patient.monitoringConfig.frequency}{" "}
                секунд
              </Typography>
              <Typography variant="body1">
                Длительность:{" "}
                {patient.monitoringConfig.duration
                  ? `${patient.monitoringConfig.duration} минут`
                  : "Бесконечно"}
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: { xs: 2, sm: 3 }, flex: 1 }} elevation={3}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, 1fr)",
                },
                gap: 3,
                height: "100%",
              }}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Средняя частота дыхания за день
                </Typography>
                <Typography variant="h4" color="primary">
                  {patient.breathingStats.averageRatePerDay}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  вдохов в минуту
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Средняя частота дыхания за все время
                </Typography>
                <Typography variant="h4" color="primary">
                  {patient.breathingStats.averageRateTotal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  вдохов в минуту
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Количество остановок дыхания
                </Typography>
                <Typography variant="h4" color="error">
                  {patient.breathingStats.apneaCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  за все время мониторинга
                </Typography>
              </Box>
            </Box>
            {/* <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: "block" }}
            >
              Последнее обновление: {patient.breathingStats.lastUpdate}
            </Typography> */}
          </Paper>
        </Box>

        {/* Правая колонка с графиком */}
        <Box sx={{ height: "100%" }}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              height: "100%",
              position: { lg: "sticky" },
              top: { lg: 24 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <BreathingChart />
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* История мониторинга на всю ширину */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          История мониторинга
        </Typography>
        <Paper sx={{ p: { xs: 2, sm: 3 } }} elevation={3}>
          {patient.history.map((record: MonitoringRecord, index: number) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: { xs: 2, sm: 3 },
                  py: { xs: 1.5, sm: 2 },
                }}
              >
                <Box
                  sx={{
                    minWidth: 0,
                    flex: { xs: "1 1 100%", sm: "1 1 200px" },
                  }}
                >
                  <Typography variant="body1" noWrap>
                    {record.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Длительность: {record.duration}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: { xs: "left", sm: "center" },
                    flex: { xs: "1 1 100%", sm: "1 1 150px" },
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Средняя частота дыхания
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {record.breathingStats.averageRate} вдохов/мин
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: { xs: "left", sm: "center" },
                    flex: { xs: "1 1 100%", sm: "1 1 150px" },
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Остановки дыхания
                  </Typography>
                  <Typography
                    variant="body1"
                    color={
                      record.breathingStats.apneaCount > 0 ? "error" : "success"
                    }
                  >
                    {record.breathingStats.apneaCount}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    flex: { xs: "1 1 100%", sm: "0 0 auto" },
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenHistoryChart(record)}
                    size={isMobile ? "small" : "medium"}
                  >
                    Просмотр
                  </Button>
                </Box>
              </Box>
              {index < patient.history.length - 1 && <Divider />}
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Модальное окно с графиком истории */}
      <Dialog
        open={openHistoryChart}
        onClose={handleCloseHistoryChart}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>График дыхания за {selectedRecord?.date}</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Box
              sx={{
                height: { xs: "300px", sm: "400px" },
                width: "100%",
                mt: 2,
              }}
            >
              <BreathingChart />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryChart}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfig}
        onClose={handleCloseConfig}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>Настройки мониторинга</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Частота измерений (секунды)"
              type="number"
              value={config?.frequency || ""}
              onChange={(e) =>
                setConfig({ ...config!, frequency: parseInt(e.target.value) })
              }
              fullWidth
              autoFocus
            />
            <TextField
              label="Длительность (минуты)"
              type="number"
              value={config?.duration || ""}
              onChange={(e) =>
                setConfig({
                  ...config!,
                  duration: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              fullWidth
            />
            <TextField
              label="Дата начала"
              type="datetime-local"
              value={config?.startDate || ""}
              onChange={(e) =>
                setConfig({ ...config!, startDate: e.target.value })
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={!config?.endDate}
                  onChange={(e) =>
                    setConfig({
                      ...config!,
                      endDate: e.target.checked
                        ? null
                        : new Date().toISOString().slice(0, 16),
                    })
                  }
                />
              }
              label="Бесконечный мониторинг"
            />
            {!config?.endDate && (
              <TextField
                label="Дата окончания"
                type="datetime-local"
                value={config?.endDate || ""}
                onChange={(e) =>
                  setConfig({ ...config!, endDate: e.target.value })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button onClick={handleCloseConfig}>Отмена</Button>
          <Button onClick={handleSaveConfig} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientDetails;
