import { Component, OnInit } from '@angular/core';

import { LancamentoFiltro, LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  totalRegistros: number = 0

  filtro: LancamentoFiltro = new LancamentoFiltro();

  lancamentos: any = [];

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
  }

  aoMudarPagina(pagina: number) {
    this.consultar(pagina);
  }

  consultar(pagina: number = 0) {
    this.filtro.pagina = pagina;

     this.lancamentoService.consultar(this.filtro).then(resultado => {
      this.lancamentos = resultado.lancamentos;
      this.totalRegistros = resultado.total;
    });
  }

}
