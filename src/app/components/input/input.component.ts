import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponentInterface } from '../base.component.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends BaseComponentInterface {
  @Input() type: string = 'text';
  @Input() class: string = 'text';
  @Input() name?: string;
  @Input() mask?: string;
  @Input() inputValue: string = ''; 

  

  @Output() blur = new EventEmitter();
  @Output() keyDown = new EventEmitter();

  constructor() {
    super();
  }

   onblur() {
    this.blur.emit();
   }

    onKeyDown() {
    this.keyDown.emit();
   }

}
