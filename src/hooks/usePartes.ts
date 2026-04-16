import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ParteFormData } from "../schemas/parte";

const API_URL = "/api/partes-diario";

export const useCreateParte = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ParteFormData) => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al crear el parte");
      return response.json();
    },
    onSuccess: (nuevoParte) => {
      queryClient.invalidateQueries({ queryKey: ["obras", nuevoParte.obraId] });
    },
  });
};
