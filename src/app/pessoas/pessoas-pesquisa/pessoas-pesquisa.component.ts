
import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros: number = 0

  filtro: PessoaFiltro = new PessoaFiltro();

  pessoas: any = [];

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  aoMudarPagina(pagina: number) {
    this.consultar(pagina);
  }

  consultar(pagina: number = 0) {
    this.filtro.pagina = pagina;

     this.pessoaService.consultar(this.filtro).then(resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.total;
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  excluirPessoa(obj: any) {
    this.pessoaService.excluir(obj.pessoa.codigo).then(() => {
      obj.grid.reset();
      this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' })
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  alternarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus).then(() => {
      pessoa.ativo = novoStatus;

      let acao = novoStatus ? 'ativada' : 'desativada';
      this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` })
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });;
  }

}
