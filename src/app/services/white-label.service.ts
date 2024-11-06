import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { WhiteLabelDto } from '../models/dto/white-label.dto';

@Injectable({
  providedIn: 'root'
})
export class WhiteLabelService {


  constructor(private http: HttpClient) { }

  setWhiteLabelLayout(variables: any, cnpj: string){
    return this.http.post(
      `${API_CONFIG.baseUrl}/configuration/${cnpj}`, 
      variables
    )
  }

  getWhiteLabelLayout(url: any) {
    return this.http.get<WhiteLabelDto>(
      `${API_CONFIG.baseUrl}/configuration/${url}`
    )
  }
}
