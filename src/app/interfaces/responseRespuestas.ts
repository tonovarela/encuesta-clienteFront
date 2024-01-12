

export interface ResponseRespuestas {
    ok:         boolean;
    respuestas: Respuesta[];
}

export interface Respuesta {
    id_respuesta: number;
    descripcion:  string;
}
