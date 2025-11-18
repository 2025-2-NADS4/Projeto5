import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
//import DashboardCards from "../components/DashboardCards";
//import PerformanceChart from "../components/PerformanceChart";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import AreaChartComponent from "../components/AreaChartComponent";
import TopProductsChart from "../components/TopProductsChart";

export default function Settings() {
  return (
    <div className="h-screen flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 bg-gradient-to-b from-pink-50 to-white pb-12">

        {/* Header */}
        <Header />

        <main className="max-w-5xl mx-auto px-6 mt-10 space-y-8">

          {/* Título */}
          <h1 className="text-2xl font-bold text-gray-700">
            Configurações do Sistema ⚙️
          </h1>

          {/* Seção 1 — Dados da Empresa */}
          <Card title="Dados da Empresa">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Input label="Nome da Empresa" placeholder="Ilonnac Delivery" />
              <Input label="CNPJ" placeholder="00.000.000/0000-00" />

              <Input label="E-mail de Contato" placeholder="contato@empresa.com" />
              <Input label="Telefone" placeholder="(11) 99999-0000" />

            </div>

            <button className="mt-6 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600">
              Salvar alterações
            </button>
          </Card>

          {/* Seção 2 — Preferências do Sistema */}
          <Card title="Preferências do Sistema">
            <div className="flex flex-col gap-4">

              {/*<Toggle label="Ativar modo escuro" />*/}
              <Toggle label="Enviar alertas por e-mail" />
              <Toggle label="Backup automático semanal" />

            </div>
          </Card>

          {/* Seção 3 — Segurança */}
          <Card title="Segurança">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nova Senha" type="password" />
              <Input label="Confirmar Nova Senha" type="password" />
            </div>

            <button className="mt-6 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600">
              Atualizar senha
            </button>
          </Card>

        </main>

        {/* Rodapé */}
        <footer className="max-w-5xl mx-auto px-6 mt-12 text-xs text-gray-400">
          Ilonnac Dashboard • Configurações • © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

/* -------------------- COMPONENTES REUTILIZÁVEIS -------------------- */

function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/60">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="p-3 border rounded-xl focus:ring-2 ring-pink-300 outline-none"
      />
    </div>
  );
}

function Toggle({ label }) {
  return (
    <label className="flex items-center justify-between p-3 border rounded-xl bg-white cursor-pointer">
      <span className="text-gray-700">{label}</span>
      <input type="checkbox" className="toggle-checkbox" />
    </label>
  );
}
