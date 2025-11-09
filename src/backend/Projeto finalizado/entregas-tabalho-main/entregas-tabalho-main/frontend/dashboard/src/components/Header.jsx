export default function Header() {
  const handleProfileClick = () => {
    alert("🔎 Em breve: página de perfil da Ana");
  };

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Deseja realmente sair?");
    if (confirmLogout) {
      alert("👋 Até logo, Ana!");
      window.location.reload(); // simula um logout por enquanto
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">Ilonnac Dashboard</h1>
      <div className="flex gap-4">
        <button
          onClick={handleProfileClick}
          className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
        >
          Perfil
        </button>
        <button
          onClick={handleLogoutClick}
          className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
