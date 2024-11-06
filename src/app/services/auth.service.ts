import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { LoginDto } from '../models/dto/login.dto';
import { CustomerDto } from '../models/dto/customer.dto';
import { ContactDto } from '../models/dto/contact.dto';
import { LoginUsernameDto } from '../models/dto/loginUsername.dto';
import { RegisterUserDto } from '../models/dto/registerUser.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  basePath: string = '/auth/';
  quizPath: string = '/quiz';
  customerPath: string = 'customer/';

  constructor(private http: HttpClient) {}

  login(login: LoginDto) {
    return this.http.post<LoginDto>(
      `${API_CONFIG.baseUrl}${this.basePath}login`,
      login
    );
  }

  loginUsername(loginUsername: LoginUsernameDto) {
    return this.http.post<LoginUsernameDto>(
      `${API_CONFIG.baseUrl}${this.basePath}login/username`,
      loginUsername
    );
  }
  createPassword(form: any) {
    return this.http.post(
      `${API_CONFIG.baseUrl}${this.basePath}${this.customerPath}register`,
      form
    );
  }

  updatePassword(password: any, cpf: string | null) {
    return this.http.put(
      `${API_CONFIG.baseUrl}${this.basePath}${cpf}`,
      password
    );
  }

  getRecoverTokenToPhoneNumber(cpfCnpj: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}${this.basePath}recover/phone/${cpfCnpj}`
    );
  }

  getRecoverTokenToEmail(cpfCnpj: string) {
    return this.http.get(`${API_CONFIG.baseUrl}${this.basePath}${cpfCnpj}`);
  }

  sendRecoverToken(phoneNumber: string, token: any) {
    return this.http.post(`${API_CONFIG.baseUrl}/token/${phoneNumber}`, token);
  }

  verifyIfExistsUser(login: string) {
    return this.http.get(`${API_CONFIG.baseUrl}${this.basePath}${login}`);
  }

  saveCustomerData(form: CustomerDto) {
    return this.http.post<CustomerDto>(`${API_CONFIG.baseUrl}/customer`, form);
  }

  registerUser(registerUserDto: RegisterUserDto) {
    return this.http.post(
      `${API_CONFIG.baseUrl}${this.basePath}user/register`,
      registerUserDto
    );
  }

  sendCompanyContactData(contactForm: ContactDto) {
    return this.http.post(`${API_CONFIG.baseUrl}/contact`, contactForm);
  }
}
