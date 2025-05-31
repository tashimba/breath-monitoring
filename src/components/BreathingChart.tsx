import { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { Box, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Line } from "react-chartjs-2";

// Регистрируем компоненты Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: "100%",
  position: "relative",
}));

const StatusIndicator = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const BreathingChart = () => {
  const [dataPoints, setDataPoints] = useState<number[]>(Array(500).fill(0));
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://85.142.173.3:22811");

    ws.current.onopen = () => {
      setConnected(true);
      setError(null);
      console.log("WebSocket подключен");
    };

    ws.current.onmessage = (event) => {
      try {
        // const value = JSON.parse(event.data).value;
        const value = event.data.split(",")[1] * 1000;
        if (!isNaN(value)) {
          setDataPoints((prev) => [...prev.slice(1), value]);
        }
      } catch (e) {
        console.error("Ошибка при обработке данных:", e);
      }
    };

    ws.current.onerror = (error) => {
      setError("Ошибка соединения с сервером");
      console.error("WebSocket ошибка:", error);
    };

    ws.current.onclose = () => {
      setConnected(false);
      console.log("WebSocket отключен");
    };

    return () => {
      if (ws.current) {
        // ws.current.close();
      }
    };
  }, []);
  const chartData = {
    labels: dataPoints.map((_, i) => i),
    datasets: [
      {
        label: "Дыхание",
        data: dataPoints,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointRadius: 0,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        min: -2,
        max: 2,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <ChartContainer elevation={3}>
      <StatusIndicator>
        <Typography variant="body1">Статус:</Typography>
        {connected ? (
          <Alert severity="success" sx={{ py: 0 }}>
            Подключено
          </Alert>
        ) : (
          <Alert severity="error" sx={{ py: 0 }}>
            Отключено
          </Alert>
        )}
      </StatusIndicator>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ height: "400px", position: "relative" }}>
        {!connected && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Line data={chartData} options={options} />
      </Box>
    </ChartContainer>
  );
};

export default BreathingChart;
