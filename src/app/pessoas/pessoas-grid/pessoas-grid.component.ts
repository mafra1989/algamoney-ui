import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: any = [];

  @Input() itensPorPagina = 0;
  @Input() totalRegistros = 0;

  @Output() buscarPessoas: EventEmitter<any> = new EventEmitter();

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = event!.first! / event!.rows!;
    this.buscarPessoas.emit(pagina);
  }


}
