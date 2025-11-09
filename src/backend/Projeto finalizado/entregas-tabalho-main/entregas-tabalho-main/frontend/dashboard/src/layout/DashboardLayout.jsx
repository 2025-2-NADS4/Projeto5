import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-ilonnac text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10">Ilonnac</h1>
        <nav className="space-y-4">
          <a href="#" className="hover:bg-white/20 rounded px-3 py-2 block">Início</a>
          <a href="#" className="hover:bg-white/20 rounded px-3 py-2 block">Relatórios</a>
          <a href="#" className="hover:bg-white/20 rounded px-3 py-2 block">Usuários</a>
          <a href="#" className="hover:bg-white/20 rounded px-3 py-2 block">Configurações</a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 bg-white rounded-tl-3xl p-8 shadow-inner">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Painel de Controle</h2>
          <button className="btn-gradient">Novo Relatório</button>
        </header>

        <div className="p-4 bg-gray-100 rounded-xl h-full">
          {children || <p>Conteúdo do dashboard aqui...</p>}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
