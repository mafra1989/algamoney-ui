import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

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
  @Output() excluirLancamento: EventEmitter<any> = new EventEmitter();

  @ViewChild('tabela') grid: any;

  constructor(private confirmationService: ConfirmationService) {}

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = event!.first! / event!.rows!;
    this.buscarLancamentos.emit(pagina);
  }

  excluir(lancamento: any) {
    this.excluirLancamento.emit({ lancamento, grid: this.grid });
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      },
    });
  }

}
