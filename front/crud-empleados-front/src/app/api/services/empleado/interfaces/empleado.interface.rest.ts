export interface EmpleadoRest {
    id:         number;
    nombre:     string;
    id_empresa?: number;
    empresa?:    EmpresaRest;
}

export interface EmpresaRest {
    id:     number;
    nombre: string;
}
