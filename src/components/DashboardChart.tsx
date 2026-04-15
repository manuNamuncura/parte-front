import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useThemeStore } from "../store/useThemeStore";

const data = [
  { name: "Lun", ventas: 4000 },
  { name: "Mar", ventas: 3000 },
  { name: "Mie", ventas: 5000 },
  { name: "Jue", ventas: 2780 },
  { name: "Vie", ventas: 1890 },
];

export const DashboardChart = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // Colores dinámicos basados en el tema
  const chartColor = isDarkMode ? "#3b82f6" : "#2563eb";
  const gridColor = isDarkMode ? "#1e293b" : "#e2e8f0";
  const textColor = isDarkMode ? "#94a3b8" : "#64748b";

  return (
    <div className="h-[300px] w-full p-4 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke={textColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={textColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#0f172a" : "#fff",
              border: "none",
              borderRadius: "8px",
              color: isDarkMode ? "#fff" : "#000",
            }}
          />
          <Area
            type="monotone"
            dataKey="ventas"
            stroke={chartColor}
            fillOpacity={1}
            fill="url(#colorVentas)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
