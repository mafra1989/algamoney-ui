import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos: any = [];

  @Input() itensPorPagina = 0;
  @Input() totalRegistros = 0;

  @Output() buscarLancamentos: EventEmitter<any> = new EventEmitter();

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = event!.first! / event!.rows!;
    this.buscarLancamentos.emit(pagina);
  }

}
