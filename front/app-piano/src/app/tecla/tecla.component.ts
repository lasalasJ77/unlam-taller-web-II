import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tecla',
  imports: [],
  templateUrl: './tecla.component.html',
  styleUrl: './tecla.component.css',
})
export class TeclaComponent implements OnInit {

  @Input()
  numero = 1;

  @Input()
  color = "red";

  @Output()
  sonidoReproducido = new EventEmitter<number>();

  ngOnInit(): void {
    console.log(this.numero);

  }

  aplicarSonido(){
    this.sonidoReproducido.emit(this.numero);
  }

}
