import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ import correto (sem chaves)
import OverviewPage from "./pages/Overview"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");

  // ✅ Decodifica o token corretamente
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // `decoded.sub` já é um objeto, não precisa de JSON.parse()
        const userData = decoded.sub;
        setUsername(userData.username);
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <Router>
    <Routes>
  
      {/* Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login onLogin={(t) => setToken(t)} />
          )
        }
      />
  
      {/* Register */}
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
        }
      />
  
      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard username={username} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
  
      {/* Overview */}
      <Route path="/overview" element={<OverviewPage />} />
  
      {/* Settings (correto!) */}
      <Route
        path="/settings"
        element={
          isAuthenticated ? <Settings/> : <Navigate to="/login" />
        }
      />
  
      {/* Rota final catch-all */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
  
    </Routes>
  </Router>
  );
}

export default App;
