import { ButtonComponent } from "./button.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TodoService', () => {
  let servico: ButtonComponent;

  beforeEach(() => {
    servico = new ButtonComponent();
  });


  it('should create', () => {
    expect(ButtonComponent).toBeTruthy();
  });
});