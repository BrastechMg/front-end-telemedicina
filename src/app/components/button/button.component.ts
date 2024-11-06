import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() color: string = '0068B4';
  @Input() type: string = 'button';
  @Input() isDisabled = false;
  @Input() class?: string;
  @Input() value?: any;

  @Output() click = new EventEmitter();

  _click() {
    // this.click.emit();
  }
}
