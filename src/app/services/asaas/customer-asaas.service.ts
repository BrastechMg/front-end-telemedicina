import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerDto } from 'src/app/models/dto/customer.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerAsaasService {

  constructor(private httpClient: HttpClient) { }

  createAsaasCustomer(customer: CustomerDto, productId: number) { 
    return this.httpClient.post(`${API_CONFIG.baseUrl}/customers/register/${productId}`, customer)
  }
}
