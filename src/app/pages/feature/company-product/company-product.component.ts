import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { PageService } from 'src/app/services/page-service';
import { ProductsService } from 'src/app/services/products.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-product',
  templateUrl: './company-product.component.html',
  styleUrls: ['./company-product.component.scss']
})
export class CompanyProductComponent implements OnInit {
  companyProducts: ProductDto[] = [];
  userData: any;
  localStorageKey: string = environment.localStorageKey
  constructor(
    public router: Router, 
    private productsService: ProductsService,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private pageService: PageService
  ){
    this.pageService.setPageName('Meus produtos')
  }

  ngOnInit(): void {
    this.getUserData()
    this.getCompanyProducts(this.userData.cnpj);
    localStorage.removeItem('localProduct')
  }

  getCompanyProducts(cnpj: string){
    this.productsService.getAllCompanyProducts(cnpj).subscribe({
      next: (res: ProductDto[]) => {
        this.companyProducts = res;
      },
    })
  }

  getUserData(){
    const encryptedData = localStorage.getItem('encryptedLoginData')

    if(encryptedData){
      this.userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey);
    }
  }
}

