import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", pedidos: 65 },
  { name: "Fev", pedidos: 57 },
  { name: "Mar", pedidos: 37 },
  { name: "Abr", pedidos: 38 },
  { name: "Mai", pedidos: 33 },
  { name: "Jun", pedidos: 40 },
];

export default function BarChartComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Substitua a URL abaixo pela rota real do seu backend
    fetch("http://localhost:5000/dashboard/pedidos-mensais")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados de pedidos mensais");
        }
        return response.json();
      })
      .then((dados) => setData(dados))
      .catch((error) => console.error("Erro na requisição:", error));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Pedidos por Mês em 2025
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pedidos" fill="#ec4899" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
