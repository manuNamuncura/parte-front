export interface Parte {
    id: string;
    fecha: string;
    descripcion: string;
    horas: number;
    estado: 'NORMAL' | 'RETRASO' | 'INCIDENTE' | 'FINALIZADO'
}

export interface Obra {
    id: string;
    nombre: string;
    cliente: string;
    direccion: string;
    fechaInicio: string;
    fechaFin: string;
    partes?: Parte[];
    createdAt: string;
    updatedAt: string;
}

export interface ObrasResponse {
    data: Obra[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface CreateObraDto {
    nombre: string;
    cliente: string;
    direccion: string;
    fechaInicio: string;
    fechaFin: string;
}
