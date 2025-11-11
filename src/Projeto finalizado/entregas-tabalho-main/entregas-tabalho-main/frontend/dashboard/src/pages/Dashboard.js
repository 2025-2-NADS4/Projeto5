import Header from "../components/Header";
//import Sidebar from "../components/Sidebar";
//import DashboardCards from "../components/DashboardCards";
//import PerformanceChart from "../components/PerformanceChart";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import AreaChartComponent from "../components/AreaChartComponent";
import TopProductsChart from "../components/TopProductsChart";

export default function Dashboard({ username, onLogout }) {
  return (
    <div className="h-screen flex flex-col">
      <Header onLogout={onLogout} />
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1 p-8 bg-gradient-to-br from-pink-50 to-orange-50 overflow-y-auto">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Bem-vindo(a), {username || "usuário"}! 🌸
          </h2>

           {/*<DashboardCards /> */}
          {/*<PerformanceChart /> */}
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

