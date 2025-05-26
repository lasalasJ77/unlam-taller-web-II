import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresas = [
    {
      id: 1,
      nombre: "Unlam",
      empleados: [
        {
          id: 1,
          nombre: 'Joel'
        },
        {
          id: 2,
          nombre: 'Mario'
        },
        {
          id: 3,
          nombre: 'Sebastian'
        }
      ]
    }
  ]

  http = inject(HttpClient)


  constructor() { }

  listEmpresas() {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    // return this.http.get('http//localhost:3000/empleado/',
    //   {
    //     headers : headers
    //   }
    // ).pipe(
    //   map((res:any)=>{
    //     return res
    //   }),
    // )
    return of(this.empresas)
  }

}
