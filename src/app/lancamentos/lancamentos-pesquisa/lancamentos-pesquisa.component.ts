import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  totalRegistros: number = 0

  filtro: LancamentoFiltro = new LancamentoFiltro();

  lancamentos: any = [];

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void { }

  aoMudarPagina(pagina: number) {
    this.consultar(pagina);
  }

  consultar(pagina: number = 0) {
    this.filtro.pagina = pagina;

     this.lancamentoService.consultar(this.filtro).then(resultado => {
      this.lancamentos = resultado.lancamentos;
      this.totalRegistros = resultado.total;
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  excluirLancamento(obj: any) {
    this.lancamentoService.excluir(obj.lancamento.codigo).then(() => {
      obj.grid.reset();
      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

}
