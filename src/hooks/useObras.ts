import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateObraDto, Obra, ObrasResponse } from "../types/obra";

//const API_URL = '/api/obras';
const API_BASE_URL = import.meta.env.VITE_API_URL;
const OBRAS_URL = `${API_BASE_URL}/api/obras`;
//Obtener todas las obras.
export const useObras = (page = 1, limit = 10) => {
    return useQuery<ObrasResponse>({
        queryKey: ['obras', { page, limit }],
        queryFn: async () => {
            const response = await fetch(`${OBRAS_URL}?page=${page}&limit=${limit}`);
            if (!response.ok) throw new Error('Error al obtener obras');
            return response.json();
        },
    });
};

//Crear una obra.
export const useCreateObra = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (nuevaObra: CreateObraDto): Promise<Obra> => {
            const response = await fetch(OBRAS_URL, {
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

//Obtener una obra.
export const useObra = (id: string) => {
    return useQuery<Obra>({
        queryKey: ['obras', id],
        queryFn: async () => {
            const response = await fetch(`${OBRAS_URL}/${id}`);
            if (!response.ok) throw new Error('Obra no encontrada');
            return response.json();
        },
        enabled: !!id,
    });
};

//Actualizar Obra.
export const useUpdateObra = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<CreateObraDto> }) => {
            const response = await fetch(`${OBRAS_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['obras'] });
            queryClient.invalidateQueries({ queryKey: ['obras', data.id] });
        },
    });
};

//Eliminar Obra.
export const useDeleteObra = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${OBRAS_URL}/${id}`, { method: 'DELETE' });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['obras'] });
        }
    })
}