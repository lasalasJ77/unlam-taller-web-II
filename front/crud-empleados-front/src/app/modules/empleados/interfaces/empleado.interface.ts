export interface Empleado {
    id:         number;
    nombre:     string;
    id_empresa?: number;
    empresa?:    Empresa;
}

export interface Empresa {
    id:     number;
    nombre: string;
}
