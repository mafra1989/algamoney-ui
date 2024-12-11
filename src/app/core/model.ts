export class Categoria {
  codigo?: number;
}

export class Pessoa {
  codigo?: number;
  nome?: string;
  ativo = true;
  endereco = new Endereco();
}

export class Endereco {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
}

export class Lancamento {
  codigo?: number;
  descricao?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  valor?: number;
  observacao?: string;
  tipo = 'DESPESA';
  categoria = new Categoria();
  pessoa = new Pessoa();
}
