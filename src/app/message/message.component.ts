import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="p-message p-message-error">
      {{text}}
    </div>
  `,
  styles: [`
    .p-message-error {
      padding: 3px;
    }
    .p-message {
      margin: 0.4rem 0;
    }
  `]
})
export class MessageComponent {

  @Input() control: any;
  @Input() error: string = '';
  @Input() text: string = '';

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
