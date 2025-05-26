import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeclaComponent } from "./tecla/tecla.component";

interface Tecla {
  numeroSonido:number,
  color:string,
  
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TeclaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'app-piano';

  teclas:Tecla[] = [
    {
      numeroSonido : 1,
      color : "red",
    },
    {
      numeroSonido : 2,
      color : "orange"
    },
    {
      numeroSonido : 3,
      color : "yellow"
    },
    {
      numeroSonido : 4,
      color : "green"
    },
    {
      numeroSonido : 5,
      color : "teal"
    },
    {
      numeroSonido : 6,
      color : "blue"
    },
    {
      numeroSonido : 7,
      color : "purple"
    },
  ]

  aplicarSonido(numero: number) {
    // Aquí puedes agregar la lógica para reproducir el sonido correspondiente al número
    const audio = new Audio();
    audio.src = 'sonidos/note' + numero + '.mp3' 
    audio.load();
    audio.play();
  }

}
