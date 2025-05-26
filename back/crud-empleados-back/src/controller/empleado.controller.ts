import { Request } from "express";
import { Response } from "express";
import { prisma } from "../prisma";


export class EmpleadoController {

    constructor() {

    }

    public getEmpleados = async (_req: Request, res: Response) => {
        try {
            const empleados = await prisma.empleado.findMany(
                {
                    include: { empresa: true }
                }
            )
            res.status(200).json(empleados)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el empleado', error })
        }
    }
}