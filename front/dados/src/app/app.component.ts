import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dados';

  dadoIzquierdo:string = "dados/dice1.png"
  dadoDerecho:string = "dados/dice4.png"

  numero1 = 1;
  numero2 = 2;

  resultado = "";
  


  tirarDados(){
    this.numero1 = Math.round(Math.random() * 5) + 1
    this.numero2 = Math.round(Math.random() * 5) + 1

    console.log(this.numero1);
    console.log(this.numero2);

    this.dadoDerecho = 'dados/dice' + this.numero1 + '.png';
    this.dadoIzquierdo = 'dados/dice' + this.numero2 + '.png';

    if(this.numero1 == this.numero2){
      this.resultado = "¡GANASTE PA! DESDE TS"
    }else{
      this.resultado = "PERDISTE PA! DESDE TS"
    }
  }
}
