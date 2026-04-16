import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  parteSchema,
  type ParteFormData,
  type ParteFormInput,
} from "../../schemas/parte";
import { useCreateParte } from "../../hooks/usePartes";
import { Loader2 } from "lucide-react";

export const FormParte = ({
  obraId,
  onSuccess,
}: {
  obraId: string;
  onSuccess: () => void;
}) => {
  const mutation = useCreateParte();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParteFormInput, unknown, ParteFormData>({
    resolver: zodResolver(parteSchema),
    defaultValues: {
      obraId,
      fecha: new Date().toISOString().split("T")[0],
      estado: "NORMAL",
      horas: 8,
    },
  });

  const onSubmit = (data: ParteFormData) => {
    mutation.mutate(data, { onSuccess: () => onSuccess() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Fecha
          </label>
          <input
            type="date"
            {...register("fecha")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium dark:text-slate-300">
            Estado
          </label>
          <select
            {...register("estado")}
            className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white outline-none"
          >
            <option value="NORMAL">Normal</option>
            <option value="RETRASADO">Retrasado</option>
            <option value="INCIDENTE">Incidente</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium dark:text-slate-300">
          Horas trabajadas
        </label>
        <input
          type="number"
          {...register("horas", { valueAsNumber: true })}
          className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white"
        />
        {errors.horas && (
          <p className="text-xs text-red-500">{errors.horas.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium dark:text-slate-300">
          Descripción de tareas
        </label>
        <textarea
          {...register("descripcion")}
          rows={3}
          placeholder="Ej: Excavación de bases y nivelación de terreno..."
          className="w-full p-2 rounded-lg border dark:border-slate-800 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.descripcion && (
          <p className="text-xs text-red-500">{errors.descripcion.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl flex justify-center items-center gap-2"
      >
        {mutation.isPending && <Loader2 className="animate-spin" size={18} />}
        Guardar Parte Diario
      </button>
    </form>
  );
};
