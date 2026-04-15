import { useState } from "react";
import { Dialog } from "../components/ui/Dialog";
import { FormObra } from "../components/obras/FormNuevaObra";
import { useParams, Link } from "@tanstack/react-router";
import { useObra, useDeleteObra } from "../hooks/useObras";
import {
  Calendar,
  MapPin,
  User,
  ChevronLeft,
  Trash2,
  Edit,
  FileText,
} from "lucide-react";
import { cn } from "../lib/utils";

export const DetalleObra = () => {
  const { id } = useParams({ from: "/obras/$id" });
  const { data: obra, isLoading } = useObra(id);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const deleteMutation = useDeleteObra();

  if (isLoading)
    return (
      <div className="p-8 text-center dark:text-white">Cargando obra...</div>
    );
  if (!obra)
    return (
      <div className="p-8 text-center text-red-500">Obra no encontrada</div>
    );

  return (
    <div className="space-y-6">
      {/* Botón Volver y Acciones */}
      <div className="flex justify-between items-center">
        <Link
          to="/obras"
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={20} /> Volver a Obras
        </Link>
        <div className="flex gap-2">
          {/* BOTÓN EDITAR CON DIALOG */}
          <Dialog
            title="Editar Obra"
            description="Modifica los campos necesarios para actualizar la información de la obra."
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            trigger={
              <button className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-lg hover:text-blue-600">
                <Edit size={20} />
              </button>
            }
          >
            <FormObra
              obraParaEditar={obra}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          </Dialog>
          <button
            onClick={() => {
              if (confirm("¿Eliminar obra?")) deleteMutation.mutate(id);
            }}
            className="p-2 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Header de Info */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-3xl font-bold dark:text-white mb-4">
          {obra.nombre}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <User size={18} className="text-blue-500" />
            <span>{obra.cliente}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-blue-500" />
            <span>{obra.direccion}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" />
            <span>
              {new Date(obra.fechaInicio).toLocaleDateString()} -{" "}
              {new Date(obra.fechaFin).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Listado de Partes Diarios */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <FileText size={22} className="text-blue-500" /> Partes Diarios
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            + Nuevo Parte
          </button>
        </div>

        <div className="grid gap-3">
          {obra.partes?.map((parte) => (
            <div
              key={parte.id}
              className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center hover:border-blue-500/50 transition-colors cursor-pointer"
            >
              <div>
                <p className="font-bold dark:text-white">{parte.descripcion}</p>
                <p className="text-sm text-slate-500">
                  {new Date(parte.fecha).toLocaleDateString()} • {parte.horas}{" "}
                  horas
                </p>
              </div>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  parte.estado === "NORMAL"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-700",
                )}
              >
                {parte.estado}
              </span>
            </div>
          ))}
          {obra.partes?.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500">
              No hay partes cargados para esta obra.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
