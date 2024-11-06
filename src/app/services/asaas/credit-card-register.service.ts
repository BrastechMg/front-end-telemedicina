import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardDTO } from 'src/app/models/dto/creditCardDTO';
import { TokenizationCreditCardDTO } from 'src/app/models/dto/tokenizationCreditCardDTO';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CreditCardRegisterService {

  constructor(private httpClient: HttpClient) { }

  registerCreditCard(creditCard: TokenizationCreditCardDTO): Observable<TokenizationCreditCardDTO> {
    return this.httpClient.post<TokenizationCreditCardDTO>(`${API_CONFIG.baseUrl}/payments/tokenize`, creditCard)
  }
}
