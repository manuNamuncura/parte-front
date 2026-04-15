import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { obraSchema, type ObraFormData } from "../../schemas/obras";
import { useCreateObra, useUpdateObra } from "../../hooks/useObras"; // Importamos el update
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Obra } from "../../types/obra";

interface Props {
  onSuccess: () => void;
  obraParaEditar?: Obra; // Propiedad opcional para modo edición
}

export const FormObra = ({ onSuccess, obraParaEditar }: Props) => {
  const createMutation = useCreateObra();
  const updateMutation = useUpdateObra();

  const isEditing = !!obraParaEditar;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ObraFormData>({
    resolver: zodResolver(obraSchema),

    defaultValues: obraParaEditar
      ? {
          nombre: obraParaEditar.nombre,
          cliente: obraParaEditar.cliente,
          direccion: obraParaEditar.direccion,

          fechaInicio: obraParaEditar.fechaInicio.split("T")[0],
          fechaFin: obraParaEditar.fechaFin.split("T")[0],
        }
      : {},
  });

  const onSubmit = (data: ObraFormData) => {
    if (isEditing && obraParaEditar) {
      updateMutation.mutate(
        { id: obraParaEditar.id, data },
        { onSuccess: () => onSuccess() },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => onSuccess(),
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium dark:text-slate-300">
          Nombre de la Obra
        </label>
        <input
          {...register("nombre")}
          className={cn(
            "w-full p-2 rounded-lg border bg-transparent dark:text-white outline-none",
            errors.nombre
              ? "border-red-500"
              : "border-slate-200 dark:border-slate-800 focus:ring-blue-500",
          )}
        />
        {errors.nombre && (
          <p className="text-xs text-red-500">{errors.nombre.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Cliente
          </label>
          <input
            {...register("cliente")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Dirección
          </label>
          <input
            {...register("direccion")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Inicio
          </label>
          <input
            type="date"
            {...register("fechaInicio")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">Fin</label>
          <input
            type="date"
            {...register("fechaFin")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all flex justify-center items-center gap-2"
      >
        {isPending ? (
          <Loader2 className="animate-spin" size={20} />
        ) : isEditing ? (
          "Actualizar Obra"
        ) : (
          "Guardar Obra"
        )}
      </button>
    </form>
  );
};
