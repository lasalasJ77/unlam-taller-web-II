import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  empleados = [
    {
      id: 1,
      nombre: "Juan Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation"
      }
    },
    {
      id: 2,
      nombre: "Camila Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation"
      }
    },
    {
      id: 3,
      nombre: "Alexis Perez"
    },
    {
      id: 4,
      nombre: "Maria Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation 2"
      }
    },
    {
      id: 5,
      nombre: "Jota Perez",
      empresa: {
        id: 1,
        nombre: "Perez corporation 2"
      }
    },
  ]

  http = inject(HttpClient)

  constructor() { }

  listEmpleados() {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.get(`${environment.api_url}/empleado/`,
      {
        headers : headers
      }
    ).pipe(
      map((res:any)=>{
        console.log(res);
        
        return res
      }),
    )
  }

  getEmpleado(id:number | null) {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.get(`${environment.api_url}/empleado/${id}`,
      {
        headers : headers
      }
    ).pipe(
      map((res:any)=>{
        return res
      }),
    )
  }

  createEmpleado(empleado: any) {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.post(`${environment.api_url}/empleado/`,empleado,
      {
        headers: headers
      }
    ).pipe(
      map((res: any) => {
        return res
      }),
    )
  }

  updateEmpleado(id:number | null ,empleado: any):Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.put<any>(`${environment.api_url}/empleado/$${id}` ,empleado,
      {
        headers: headers
      }
    ).pipe(
      map((res: any) => {
        return res
      }),
    )
  }

  eliminarEmpleado(empleado: any) {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.delete(`${environment.api_url}/empleado/${empleado.id}`,
      {
        headers: headers
      }
    ).pipe(
      map((res: any) => {
        return res
      }),
    )
  }
}
