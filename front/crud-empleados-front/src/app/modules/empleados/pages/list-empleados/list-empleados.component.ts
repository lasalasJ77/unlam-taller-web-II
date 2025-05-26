import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-list-empleados',
  imports: [TableModule, ButtonModule, ToastModule,ProgressSpinner],
  templateUrl: './list-empleados.component.html',
  styleUrl: './list-empleados.component.css',
  providers: [MessageService]
})
export class ListEmpleadosComponent implements OnInit, OnDestroy {

  empleadoService = inject(EmpleadoService)

  messageService = inject(MessageService)

  router = inject(Router)

  empleados: any = []

  spinner = true;

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.listEmpleados();
  }

  listEmpleados() {
    console.log("List empleados");

    this.empleadoService.listEmpleados()
      .subscribe(
        {
          next: (data) => {
            this.empleados = data
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.spinner = false;
          }
        }
      )

  }

  createEmpleado() {
    this.router.navigate(['/empleados/create-empleado'])
  }

  updateEmpleado(empleado: any) {
    this.router.navigate(['/empleados/update-empleado', empleado.id])
  }

  detailEmpleado(empleado: any) {
    this.router.navigate(['/empleados/detail-empleado', empleado.id])
  }

  eliminarEmpleado(empleado: any) {
    this.empleadoService.eliminarEmpleado(empleado)
      .subscribe(
        {
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'El empleado fue eliminado' });
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.listEmpleados();
          }
        }
      )
  }

}
