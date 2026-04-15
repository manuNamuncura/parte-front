// src/pages/DashboardHome.tsx
import { HardHat, ClipboardList, Clock, TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  /* snap-center: Hace que la tarjeta se centre al soltar el scroll en móvil */
  <div className="min-w-[85vw] md:min-w-0 snap-center bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
        <Icon size={24} />
      </div>
      <span className="text-xs font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">
      {title}
    </h3>
    <p className="text-2xl font-bold dark:text-white mt-1">{value}</p>
  </div>
);

export const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Contenedor de Métricas */}
      <div
        className="
        flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar
        md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0
      "
      >
        <StatCard
          title="Total Obras"
          value="12"
          icon={HardHat}
          trend="+2 este mes"
        />
        <StatCard
          title="Partes Diarios"
          value="154"
          icon={ClipboardList}
          trend="+12 hoy"
        />
        <StatCard
          title="Horas Totales"
          value="1,240h"
          icon={Clock}
          trend="+15%"
        />
        <StatCard
          title="Eficiencia"
          value="94%"
          icon={TrendingUp}
          trend="+2.4%"
        />
      </div>

      {/* Área de Gráficos (Ya configurada para ser responsiva) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-4 dark:text-white">
            Productividad de Obras
          </h3>
          {/* Aquí iría el componente DashboardChart que hicimos antes */}
        </div>
      </div>
    </div>
  );
};
