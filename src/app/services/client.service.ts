import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { CsvDto } from '../models/dto/csv.dto';
import { CustomerDto } from '../models/dto/customer.dto';
import { customerStatusDTO } from '../models/dto/customerStatus.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  csvPath: string = '/csv/';
  customerPath: string = '/customer/';

  constructor(private http: HttpClient) { 

  }

  createCompany(data: any){
    return this.http.post(
      `${API_CONFIG.baseUrl}/company`,
      data
    )
  }

  createAndDeleteClientsByCsv(csv: File, cnpj: string, productId: number){
    const formData: FormData = new FormData();
    formData.append('file', csv, csv.name);
    
    return this.http.post<CsvDto>(
      `${API_CONFIG.baseUrl}${this.csvPath}${cnpj}/product/${productId}`,
      formData
    )
  }

  getCustomerDataById(id: number) {
    return this.http.get<CustomerDto>(
      `${API_CONFIG.baseUrl}${this.customerPath}details/${id}`
    )
  }

  getEncryptClientData(customerId: string){
    return this.http.get<CustomerDto>(
      `${API_CONFIG.baseUrl}${this.customerPath}encrypt/details/${customerId}`
    );
  }

  getCompanyData(cnpj: string){
    return this.http.get(
      `${API_CONFIG.baseUrl}/company/${cnpj}`
    );
  }
  
  getCsvList(productId: number){
    return this.http.get<CsvDto[]>(
      `${API_CONFIG.baseUrl}${this.csvPath}product/${productId}`
    )
  }

  verifyIfExists(cpf:string) {
    return this.http.get<CustomerDto>(
      `${API_CONFIG.baseUrl}${this.customerPath}exists/${cpf}`
    );
  }
  
  updateCustomerStatus(customerCpf:string | undefined,statusCode:number) {
    const cpf = customerCpf;
    const dto: customerStatusDTO = {
      statusCode: statusCode
    }
    return this.http.put(`${API_CONFIG.baseUrl}${this.customerPath}${cpf}`,dto)
  }

  saveLogo(logo: File, cnpj: string){
    const formData: FormData = new FormData();
    const logoType = logo.name.substring(logo.name.lastIndexOf(".") + 1).toLowerCase()
    formData.append('logo', logo, `logo.${logoType}`);
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    return this.http.post(
      `${API_CONFIG.baseUrl}/company/logo/${cnpj}`,
      formData,
      { headers }
    )
  }

  getLogoByCnpj(cnpj: string){
    return this.http.get(
      `${API_CONFIG.baseUrl}/company/logo/${cnpj}`, 
      { responseType: 'blob' }
    )
  }

  saveProfilePicture(profilePicture: File, clientId: string, cnpj: string){
    const formData: FormData = new FormData();
    const profilePictureType = profilePicture.name.substring(profilePicture.name.lastIndexOf(".") + 1).toLowerCase()
    formData.append('profilePicture', profilePicture, `profile-picture.${profilePictureType}`);
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    
    return this.http.post(
      `${API_CONFIG.baseUrl}${this.customerPath}profile/${cnpj}/${clientId}`,
      formData,
      { headers }
    )
  }

  getProfilePicture(clientId: string, cnpj: string){
    return this.http.get(
      `${API_CONFIG.baseUrl}${this.customerPath}profile/${cnpj}/${clientId}`, 
      { responseType: 'blob' }
    )
  }

}
