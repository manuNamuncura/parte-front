import { useState } from "react";
import { Dialog } from "./ui/Dialog";
import { FormObra } from "./obras/FormNuevaObra";
import { useObras } from "../hooks/useObras";
import { HardHat, Plus, MapPin, Calendar, Loader2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const ListaObras = () => {
  const { data, isLoading, isError } = useObras();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

        <Dialog
          title="Nueva Obra"
          description="Completa los datos para dar de alta una nueva obra en el sistema."
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          trigger={
            <button className="bg-blue-600 text-white p-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2">
              <Plus size={20} />
              <span className="hidden md:inline">Nueva Obra</span>
            </button>
          }
        >
          <FormObra onSuccess={() => setIsDialogOpen(false)} />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((obra) => (
          <Link
            key={obra.id}
            to="/obras/$id"
            params={{ id: obra.id }}
            className="group p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg mb-2 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                {obra.nombre}
              </h3>
              <ArrowRight
                size={18}
                className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              />
            </div>

            <p className="text-slate-500 text-sm flex items-center gap-1 mb-1">
              <MapPin size={14} /> {obra.direccion}
            </p>
            <p className="text-slate-400 text-xs flex items-center gap-1">
              <Calendar size={14} />
              {new Date(obra.fechaInicio).toLocaleDateString()}
            </p>

            <div className="mt-4 pt-4 border-t dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-blue-500 font-medium">{obra.cliente}</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                {obra.partes?.length || 0} Partes
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
