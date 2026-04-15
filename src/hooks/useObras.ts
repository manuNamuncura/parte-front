import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateObraDto, Obra, ObrasResponse } from "../types/obra";

const API_URL = '/api/obras';

export const useObras = (page = 1, limit = 10) => {
    return useQuery<ObrasResponse>({
        queryKey: ['obras', { page, limit }],
        queryFn: async () => {
            const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
            if (!response.ok) throw new Error('Error al obtener obras');
            return response.json();
        },
    });
};

export const useCreateObra = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (nuevaObra: CreateObraDto): Promise<Obra> => {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaObra),
            })
            if (!response.ok) throw new Error('Error al crear la obra');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['obras'] });
        },
    });
};