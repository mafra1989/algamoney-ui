import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from './../../core/model';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.buscarLancamento(codigoLancamento);
    }

  }

  carregarCategorias() {
    this.categoriaService.consultar().then((categorias: any) => {
      this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.codigo }));
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  carregarPessoas() {
    this.pessoaService.listarPessoas().then((pessoas: any) => {
      this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.codigo }));
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  get editando(): boolean {
    return Boolean(this.lancamento.codigo);
  }

  salvar(form: NgForm) {
    if(this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento).then((resultado: any) => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' })
      form.reset();
      this.lancamento = new Lancamento();
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento).then((lancamento: any) => {
      this.lancamento = lancamento;
      this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' })
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  buscarLancamento(codigo: number) {
    this.lancamentoService.buscarLancamento(codigo).then((lancamento: any) => {
      this.lancamento = lancamento;
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

}
