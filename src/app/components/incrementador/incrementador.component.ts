import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: [

  ]
})
export class IncrementadorComponent implements OnInit {


  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valor') progress: number = 50;
  @Input() btnClass: string = 'btn-primary'
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();



  cambiarValor(valor: number) {
    if (this.progress <= 0 && valor < 0) {
      this.valorSalida.emit(0);

    }
    if (this.progress >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
    }
    this.progress = this.progress + valor;
    this.valorSalida.emit(this.progress);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progress = 100;
    }else if(nuevoValor <=0){
      this.progress = 0;
    }else{
      this.progress = nuevoValor;
    }
    this.valorSalida.emit(this.progress);
  }

  get getProgress() {
    return `${this.progress}%`;
  }

}
