import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import AreaChartComponent from "../components/AreaChartComponent";
import TopProductsChart from "../components/TopProductsChart";

export default function OverviewPage() {

  // Mock de dados
  const kpis = [
    { title: "Pedidos (mês)", value: "324", delta: "+8%" },
    { title: "Crescimento (mês)", value: "+8%", delta: "+2pp" },
    { title: "Ticket Médio", value: "R$ 48,50", delta: "-1%" },
    { title: "Clientes Ativos", value: "210", delta: "+5%" },
    { title: "Satisfação", value: "4.6/5", delta: "+0.1" },
  ];

  const engines = [
    { name: "DirectOrder", value: 520 },
    { name: "CannoliEngine", value: 480 },
    { name: "KDSPro", value: 450 },
    { name: "IfoodBridge", value: 430 },
  ];

  return (
    <div className="h-screen flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 min-h-screen bg-gradient-to-b from-pink-50 to-white pb-12">

        {/* Header */}
        <Header />

        <main className="max-w-7xl mx-auto px-6 mt-8">
          
          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-white/60">
                <div className="text-xs text-gray-400">{kpi.title}</div>
                <div className="flex items-baseline gap-3 mt-2">
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="text-sm text-gray-500">{kpi.delta}</div>
                </div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            
            {/* Coluna esquerda */}
            <div className="space-y-6">
              <Card title="Resumo de Vendas">
                <BarChartComponent />
              </Card>

              <Card title="Tendência semanal">
                <AreaChartComponent />
              </Card>
            </div>

            {/* Coluna direita */}
            <div className="space-y-6">
              <Card title="Distribuição de Clientes">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-65 flex items-center justify-center text-gray-400/70">
                    <PieChartComponent />
                  </div>

                  <div className="h-48 flex flex-col gap-2 justify-center">
                    <small className="text-xs text-gray-400">Top Engines usados</small>
                    <div className="space-y-2">
                      {engines.map((e) => (
                        <div key={e.name} className="flex items-center gap-3">
                          <div className="w-24 text-sm">{e.name}</div>
                          <div className="flex-1 bg-pink-100 rounded-full h-3 overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, (e.value / 600) * 100)}%` }}
                              className="h-full rounded-full bg-pink-400"
                            />
                          </div>
                          <div className="w-12 text-sm text-right">{e.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Atividades Recentes">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>📦 Pedido #1253 — Novo pedido recebido (2h atrás)</li>
                  <li>👤 Novo usuário: maria.silva@email.com (1d)</li>
                  <li>⚠️ Alerta: Queda de 12% em pedidos nas segundas-feiras</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Insights */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="Insights rápidos" className="col-span-2">
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>Promoção nas segundas pode aumentar média diária em ~12%.</li>
                <li>CannoliEngine cresceu 10% — verificar capacidade.</li>
                <li>Ticket médio caiu 1% — revisar categorias com churn.</li>
              </ul>
            </Card>

            <Card title="Acesso rápido">
              <div className="flex flex-col gap-2">
                <a className="text-sm text-pink-600 hover:underline">Ver Vendas</a>
                <a className="text-sm text-pink-600 hover:underline">Ver Clientes</a>
                <a className="text-sm text-pink-600 hover:underline">Relatórios</a>
                <a className="text-sm text-pink-600 hover:underline">Configurações</a>
              </div>
            </Card>
          </section>
        </main>

        <footer className="max-w-7xl mx-auto px-6 mt-10 text-xs text-gray-400">
          Ilonnac Dashboard • Versão 1.0 • © {new Date().getFullYear()}
        </footer>

      </div>
    </div>
  );
}

// Card reutilizável
function Card({ children, title, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-white/60 ${className}`}>
      {title && <h3 className="text-sm text-gray-600 mb-3">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
