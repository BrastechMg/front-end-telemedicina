import { TestBed } from '@angular/core/testing';

import { CreditCardRegisterService } from './credit-card-register.service';

describe('CreditCardRegisterService', () => {
  let service: CreditCardRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
