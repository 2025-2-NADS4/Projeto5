export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white shadow-lg flex flex-col p-6 text-gray-800">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>
      <nav className="flex flex-col gap-3">
        <a href="#" className="hover:text-pink-500 transition">Visão Geral</a>
        <a href="#" className="hover:text-pink-500 transition">Relatórios</a>
        <a href="#" className="hover:text-pink-500 transition">Usuários</a>
        <a href="#" className="hover:text-pink-500 transition">Configurações</a>
      </nav>
    </aside>
  );
}
