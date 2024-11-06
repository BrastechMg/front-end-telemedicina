import { Component, Injectable, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  template: '',
})
export abstract class BaseComponentInterface implements ControlValueAccessor {
  @Input() formControlName: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';

  @Input() appCustomInputValueAccessor = '';

  disabled: boolean = false;
  value?: string | number;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  updateValue(value: any): void {
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  input(target: any): void {
    const value = target.value;

    this.onChange(value);
    this.onTouched();
  }

}
