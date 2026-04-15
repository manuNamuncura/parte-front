import { useForm } from "react-hook-form";
import { useCreateObra } from "../../hooks/useObras";
import { type CreateObraDto } from "../../types/obra";
import { Loader2 } from "lucide-react";

export const FormNuevaObra = ({ onSuccess }: { onSuccess: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateObraDto>();
  const mutation = useCreateObra();

  const onSubmit = (data: CreateObraDto) => {
    mutation.mutate(data, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium dark:text-slate-300">
          Nombre de la Obra
        </label>
        <input
          {...register("nombre", { required: true })}
          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Ej: Edificio Central"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-slate-300">
            Cliente
          </label>
          <input
            {...register("cliente", { required: true })}
            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-slate-300">
            Dirección
          </label>
          <input
            {...register("direccion", { required: true })}
            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-slate-300">
            Fecha Inicio
          </label>
          <input
            type="date"
            {...register("fechaInicio", { required: true })}
            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-slate-300">
            Fecha Fin
          </label>
          <input
            type="date"
            {...register("fechaFin", { required: true })}
            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition-colors flex justify-center items-center gap-2"
      >
        {mutation.isPending && <Loader2 className="animate-spin" size={18} />}
        Crear Obra
      </button>
    </form>
  );
};
