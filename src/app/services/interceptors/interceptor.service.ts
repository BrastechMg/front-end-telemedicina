import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptAndDecrypt } from '../../utils/encrypt-and-decrypt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  localStorageKey: string = environment.localStorageKey

  constructor(
    private encryptAndDecrypt: EncryptAndDecrypt
  ){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const encryptedData = localStorage.getItem('encryptedLoginData')
    let clonedRequest = req;
     
    if(encryptedData){
      const token = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey).accessToken; 

      clonedRequest = req.clone({
        headers: req.headers.set('Authorization',  `Bearer ${token}`)
      });
    }

    return next.handle(clonedRequest)
  }
}
