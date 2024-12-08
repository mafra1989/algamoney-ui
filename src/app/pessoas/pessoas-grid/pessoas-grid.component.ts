import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

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
  @Output() excluirPessoa: EventEmitter<any> = new EventEmitter();
  @Output() mudarStatus: EventEmitter<any> = new EventEmitter();

  @ViewChild('tabela') grid: any;

  constructor(private confirmationService: ConfirmationService) {}

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = event!.first! / event!.rows!;
    this.buscarPessoas.emit(pagina);
  }

  excluir(pessoa: any) {
    this.excluirPessoa.emit({ pessoa, grid: this.grid });
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      },
    });
  }

  alternarStatus(pessoa: any) {
    this.mudarStatus.emit(pessoa);
  }

}
