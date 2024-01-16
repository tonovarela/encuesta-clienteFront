export interface ResponseReferencia {
    ok: boolean;
    referencia:ReferenciaOrden
}

export interface ReferenciaOrden {
    orden:string;
    contesto:number;
    nombreTrabajo:string;    
}