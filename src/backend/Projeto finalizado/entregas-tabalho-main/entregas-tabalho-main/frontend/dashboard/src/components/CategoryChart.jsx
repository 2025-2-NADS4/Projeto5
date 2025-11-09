import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { categoria: "Rápida", entregas: 240 },
  { categoria: "Padrão", entregas: 180 },
  { categoria: "Express", entregas: 120 },
  { categoria: "Premium", entregas: 90 },
];

export default function CategoryChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Entregas por Categoria
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="entregas" fill="#ec4899" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
