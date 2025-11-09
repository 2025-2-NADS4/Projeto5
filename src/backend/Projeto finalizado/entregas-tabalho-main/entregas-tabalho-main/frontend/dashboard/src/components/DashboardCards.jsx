export default function DashboardCards() {
  const cards = [
    { title: "Clientes Ativos", value: "1.248", color: "from-pink-500 to-orange-400" },
    { title: "Pedidos Hoje", value: "327", color: "from-orange-400 to-pink-400" },
    { title: "Taxa de Conversão", value: "74%", color: "from-pink-400 to-orange-500" },
    { title: "Faturamento", value: "R$ 12.480", color: "from-orange-500 to-pink-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`p-6 rounded-2xl shadow-md text-white bg-gradient-to-r ${card.color} transition transform hover:scale-105`}
        >
          <h3 className="text-lg font-medium mb-2">{card.title}</h3>
          <p className="text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
