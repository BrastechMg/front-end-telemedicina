import {
  Component,
  Input,
  OnInit,
  Optional,
  Self,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { Option } from './option.dto';
import { BaseComponentInterface } from '../base.component.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends BaseComponentInterface {
  @Input() options?: Option[];
  @Input() defaultOptionLabel: string  = 'Selecione';
  @Input() class?: string;

  constructor() {
    super();
  }

}
