import { BrowserRouter as Router } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { AppRoutes } from "./routes";
import Header from "./components/Layout/Header";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <AppRoutes />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
