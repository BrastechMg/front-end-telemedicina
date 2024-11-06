import { TestBed } from '@angular/core/testing';

import { CreditCardValidationService } from './credit-card-validation.service';

describe('CreditCardValidationService', () => {
  let service: CreditCardValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
