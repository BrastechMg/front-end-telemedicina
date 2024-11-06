import { Injectable } from '@angular/core';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  localStorageKey: string = environment.localStorageKey

  constructor(private encryptAndDecrypt: EncryptAndDecrypt, private productService: ProductsService) { }

  decryptData() {
    return this.encryptAndDecrypt.decryptData(localStorage.getItem('encryptedLoginData'), this.localStorageKey);
  }

  verifyProductsPermission(): Observable<any>{
    let benefitsList: any[] = []
    const clientId = this.decryptData().id;
    const clientProductsService: any = this.productService.getAllClientProducts(clientId)
    return clientProductsService;
   
  }
}
