import { Router } from "express";
import { EmpleadoController } from "../../controller/empleado.controller";

export const empleadoRouter = Router();

const empleadoController = new EmpleadoController();


empleadoRouter.get('/', empleadoController.getEmpleados.bind(empleadoController))