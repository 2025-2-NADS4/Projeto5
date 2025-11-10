import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Segunda", vendas: 124 },
  { name: "Terça", vendas: 107 },
  { name: "Quarta", vendas: 118 },
  { name: "Quinta", vendas: 107 },
  { name: "Sexta", vendas: 107 },
  { name: "Sábado", vendas: 125 },
  { name: "Domingo", vendas: 102 },
];

export default function AreaChartComponent() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Tendência de Vendas por dia da Semana 
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="vendas"
            stroke="#ec4899"
            fillOpacity={1}
            fill="url(#colorVendas)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
