import { Request } from "express";
import { Response } from "express";
import { EmpleadoRepository } from "../repository/empleado.repository";
import { EmpleadoService } from "../services/empleado.service";
import { EmpresaRepository } from "../repository/empresa.repository";
import { EmpresaService } from "../services/empresa.service";

const empresaRepository = new EmpresaRepository()
const empresaService = new EmpresaService(empresaRepository);

export class EmpresaController {

    constructor() { }

    public getEmpresas = async (_req: Request, res: Response) => {
        try {
            const empleados = await empresaService.getEmpresas();
            res.status(200).json(empleados)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener las empresas', error })
        }
    }

    public getEmpresaById = async (req: Request, res: Response) => {
        try {

            const id = Number(req.params.id);

            console.log(id);

            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido' })
            }

            const empresa = await empresaService.obtenerEmpresaPorId(id);

            if (!empresa) {
                return res.status(404).json({ message: 'Empresa no encontrada' })
            }

            res.status(200).json(empresa)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el empleado', error })
        }
    }

    public createEmpresa = async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            
            const empleado = await empresaService.createEmpresa(req.body)
            res.json(200).json(empleado)
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error al crear la empresa, manda bien los datos crack', error })
        }
    }

    public updateEmpresa = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const { nombre, empleados } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }

        try {
            const actualizado = await empresaService.actualizarEmpresa({ id, nombre, empleados })
            res.json(200).json(actualizado)
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error al actualizar la empresa, manda bien los datos crack', error })
        }
    }

    public deleteEmpresa = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' })
        }

        try {
            const empresa = await empresaService.obtenerEmpresaPorId(id)

            if (!empresa) {
                return res.status(404).json({ message: 'Error al eliminar la empresa' })
            }

            await empresaService.eliminarEmpresa(id);
            res.status(204).send();
        } catch (error) {
            if (error.message == 'EmpleadoNoExiste') {
                return res.status(404).json({ message: 'Empleado no encontrado' })
            }
            console.log(error);
            res.status(400).json({ message: 'Error al eliminar el usuario, manda bien los datos crack', error })
        }

    }



}