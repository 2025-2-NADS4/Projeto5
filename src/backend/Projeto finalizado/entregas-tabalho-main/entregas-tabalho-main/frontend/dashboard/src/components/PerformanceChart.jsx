import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Seg", pedidos: 120 },
  { name: "Ter", pedidos: 200 },
  { name: "Qua", pedidos: 180 },
  { name: "Qui", pedidos: 250 },
  { name: "Sex", pedidos: 300 },
  { name: "Sáb", pedidos: 280 },
  { name: "Dom", pedidos: 150 },
];

export default function PerformanceChart() {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Desempenho Semanal 📈
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="pedidos" stroke="#ec4899" strokeWidth={3} dot={{ r: 5, fill: "#f97316" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
