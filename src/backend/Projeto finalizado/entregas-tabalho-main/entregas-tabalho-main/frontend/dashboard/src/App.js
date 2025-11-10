import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCards";
import PerformanceChart from "./components/PerformanceChart";
import PieChartComponent from "./components/PieChartComponent";
import BarChartComponent from "./components/BarChartComponent";
import AreaChartComponent from "./components/AreaChartComponent";
import TopProductsChart from "./components/TopProductsChart";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState(token ? "dashboard" : "login");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // decoded.sub é uma string JSON, então precisamos fazer JSON.parse
        const userData = JSON.parse(decoded.sub);
        setUsername(userData.username);
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        localStorage.removeItem("token");
        setToken(null);
        setPage("login");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  if (page === "login") {
    return (
      <Login
        onLogin={(t) => {
          setToken(t);
          setPage("dashboard");
        }}
        goToRegister={() => setPage("register")}
      />
    );
  }

  if (page === "register") {
    return (
      <Register
        onRegistered={() => setPage("login")}
        goToLogin={() => setPage("login")}
      />
    );
  }

  // Dashboard
  return (
    <div className="h-screen flex flex-col">
      <Header onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-pink-50 to-orange-50 overflow-y-auto">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Bem-vindo(a), {username || "usuária"}! 🌸
          </h2>

          <DashboardCards />
          <PerformanceChart />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <PieChartComponent />
            <BarChartComponent />
            <AreaChartComponent />
            <TopProductsChart />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
