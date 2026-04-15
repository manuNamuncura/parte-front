import { useObras, useCreateObra } from "../hooks/useObras";
import { HardHat, Plus, MapPin, Calendar, Loader2 } from "lucide-react";

export const ListaObras = () => {
  const { data, isLoading, isError } = useObras();
  const createObraMutation = useCreateObra();

  if (isLoading)
    return <Loader2 className="animate-spin text-blue-500 mx-auto" />;
  if (isError)
    return (
      <p className="text-red-500">Ocurrió un error al cargar los datos.</p>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <HardHat /> Gestión de Obras
        </h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          disabled={createObraMutation.isPending}
        >
          <Plus size={18} /> Nueva Obra
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((obra) => (
          <div
            key={obra.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg mb-2 dark:text-slate-100">
              {obra.nombre}
            </h3>
            <p className="text-slate-500 text-sm flex items-center gap-1 mb-1">
              <MapPin size={14} /> {obra.direccion}
            </p>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <Calendar size={14} />{" "}
              {new Date(obra.fechaInicio).toLocaleDateString()}
            </p>
            <div className="mt-4 pt-4 border-t dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-blue-500 font-medium">{obra.cliente}</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                {obra.partes?.length || 0} Partes
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
