import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';

@Component({
  selector: 'app-create-empleado',
  imports: [ProgressSpinner, ButtonModule, RouterLink, ReactiveFormsModule, InputTextModule, SelectModule, Toast],
  providers: [MessageService],
  templateUrl: './create-empleado.component.html',
  styleUrl: './create-empleado.component.css',
})
export class CreateEmpleadoComponent implements OnInit, OnDestroy {

  spinner = true;

  private fb = inject(FormBuilder)
  messageService = inject(MessageService)

  empleadoService = inject(EmpleadoService)
  empresaService = inject(EmpresaService)

  form!: FormGroup;

  empresas: any = []

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.spinner = false;

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      empresa: ['', [Validators.required]]
    })

    this.listEmpresas()

  }

  listEmpresas() {
    this.empresaService.listEmpresas().subscribe(
      {
        next: (data) => {
          this.empresas = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

        }
      }
    )
  }

  createEmpleado() {
    console.log("SE ENVIO EL FORM");

    if (this.form.valid) {
      this.empleadoService.createEmpleado({ nombre: this.form.value.nombre, id_empresa: this.form.value.empresa }).subscribe(
        {
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Empleado creado con exito' });
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {

          }
        }
      )
    } else {
      this.messageService.add({ severity: 'success', summary: '????', detail: '¿Qué haces flaco?' });

    }

  }

}
