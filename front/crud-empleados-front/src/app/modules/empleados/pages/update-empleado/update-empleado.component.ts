import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { EmpleadoService } from '../../../../api/services/empleado/empleado.service';
import { EmpresaService } from '../../../../api/services/empresa/empresa.service';

@Component({
  selector: 'app-update-empleado',
  imports: [ProgressSpinner, ButtonModule, RouterLink, ReactiveFormsModule, InputTextModule, SelectModule, Toast],
  providers: [MessageService],
  templateUrl: './update-empleado.component.html',
  styleUrl: './update-empleado.component.css'
})
export class UpdateEmpleadoComponent {


  spinner = true;

  private fb = inject(FormBuilder)
  messageService = inject(MessageService)

  empleadoService = inject(EmpleadoService)
  empresaService = inject(EmpresaService)

  form!: FormGroup;

  empresas: any = []

  activatedRouter = inject(ActivatedRoute)

  id: number | null = null;

  empleado: any;

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'))
    this.spinner = false;

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      empresa: ['', [Validators.required]]
    })

    this.listEmpresas()
    this.getEmpleado()

  }

  getEmpleado() {
    this.empleadoService.getEmpleado(this.id).subscribe(
      {
        next: (data) => {
          this.empleado = data;
          console.log(data);
          this.form.patchValue({
            nombre: this.empleado.nombre,
            empresa: this.empleado?.empresa?.id
          })
        },
        error: (err) => {
          console.log(err);
          
        },
        complete: () => {

        }
      }
    )
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

  updateEmpleado() {
    if (this.form.valid) {
      this.empleadoService.updateEmpleado(this.id ,{ nombre: this.form.value.nombre, id_empresa: this.form.value.empresa }).subscribe(
        {
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Empleado actualizado con exito' });
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
