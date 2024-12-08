import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from './../../core/model';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
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

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento).then((resultado: any) => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' })
      form.reset();
      this.lancamento = new Lancamento();
    }).catch(erro => {
      this.errorHandlerService.handle(erro);
    });
  }

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

}
