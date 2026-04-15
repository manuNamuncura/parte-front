import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { obraSchema, type ObraFormData } from "../../schemas/obras";
import { useCreateObra } from "../../hooks/useObras";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export const FormNuevaObra = ({ onSuccess }: { onSuccess: () => void }) => {
  const mutation = useCreateObra();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ObraFormData>({
    resolver: zodResolver(obraSchema),
  });

  const onSubmit = (data: ObraFormData) => {
    mutation.mutate(data, {
      onSuccess: () => onSuccess(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo Nombre */}
      <div className="space-y-1">
        <label className="text-sm font-medium dark:text-slate-300">
          Nombre de la Obra
        </label>
        <input
          {...register("nombre")}
          className={cn(
            "w-full p-2 rounded-lg border bg-transparent dark:text-white outline-none transition-all",
            errors.nombre
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-200 dark:border-slate-800 focus:ring-blue-500",
          )}
        />
        {errors.nombre && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.nombre.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Campo Cliente */}
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Cliente
          </label>
          <input
            {...register("cliente")}
            className={cn(
              "w-full p-2 rounded-lg border bg-transparent dark:text-white outline-none",
              errors.cliente
                ? "border-red-500"
                : "border-slate-200 dark:border-slate-800",
            )}
          />
          {errors.cliente && (
            <p className="text-xs text-red-500">{errors.cliente.message}</p>
          )}
        </div>

        {/* Campo Dirección */}
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Dirección
          </label>
          <input
            {...register("direccion")}
            className={cn(
              "w-full p-2 rounded-lg border bg-transparent dark:text-white outline-none",
              errors.direccion
                ? "border-red-500"
                : "border-slate-200 dark:border-slate-800",
            )}
          />
          {errors.direccion && (
            <p className="text-xs text-red-500">{errors.direccion.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Fechas */}
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Inicio
          </label>
          <input
            type="date"
            {...register("fechaInicio")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
          />
          {errors.fechaInicio && (
            <p className="text-xs text-red-500">{errors.fechaInicio.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Fin esperado
          </label>
          <input
            type="date"
            {...register("fechaFin")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
          />
          {errors.fechaFin && (
            <p className="text-xs text-red-500">{errors.fechaFin.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 mt-2"
      >
        {mutation.isPending ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Guardar Obra"
        )}
      </button>
    </form>
  );
};
