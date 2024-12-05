import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { LancamentosModule } from '../lancamentos/lancamentos.module';
import { PessoasModule } from '../pessoas/pessoas.module';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,

    LancamentosModule,
    PessoasModule
  ],
  exports: [
    ConfirmDialogModule,
    ToastModule,

    NavbarComponent,
    LancamentosModule,
    PessoasModule,
  ],
  providers: [
    DatePipe,
    ConfirmationService
  ]
})
export class CoreModule { }
