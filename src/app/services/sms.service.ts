import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
smsPath: string = "/sms/"
tokenPath: string = "/token/"
  constructor(private httpClient: HttpClient) { }

  validateToken(token: any, number: string) {
    return this.httpClient.post(
      `${API_CONFIG.baseUrl}${this.tokenPath}${number}`, 
      token
    )
  }

  getToken(number: string){
    return this.httpClient.post<String>(
      `${API_CONFIG.baseUrl}${this.smsPath}${number}`, 
      number
    )
  }

  resendToken(number: string){
    return this.httpClient.put<String>(
      `${API_CONFIG.baseUrl}${this.smsPath}resend/${number}`, 
      number
    )
  }

}
