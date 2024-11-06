import { TestBed } from '@angular/core/testing';

import { CustomerAsaasService } from './customer-asaas.service';

describe('CustomerAsaasService', () => {
  let service: CustomerAsaasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAsaasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
