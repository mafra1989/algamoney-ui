import { PessoaService } from './../pessoa.service';
import { Component } from '@angular/core';
import { PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros: number = 0

  filtro: PessoaFiltro = new PessoaFiltro();

  pessoas: any = [];

  constructor(private pessoaService: PessoaService) {

  }

  aoMudarPagina(pagina: number) {
    this.consultar(pagina);
  }

  consultar(pagina: number = 0) {
    this.filtro.pagina = pagina;

     this.pessoaService.consultar(this.filtro).then(resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.total;
    });
  }

}
