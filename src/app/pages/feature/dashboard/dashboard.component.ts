import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalParamsDto } from 'src/app/components/modal/modal-params.dto';
import { BenefitDto } from 'src/app/models/dto/benefit.dto';
import { AuthGuardService } from 'src/app/services/guard-services/auth-guard.service';
import { PageService } from 'src/app/services/page-service';
import { ProductsService } from 'src/app/services/products.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  benefitsList!: BenefitDto[];
  userData: any;
  localStorageKey: string = environment.localStorageKey
  constructor(
    public router: Router,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private productsService: ProductsService,
    private toastService: ToastBasicService,
    private pageService: PageService
  ){

  }

  ngOnInit(): void {
    this.pageService.setPageName('Dashboard')
    this.getUserData()
    if(this.userData.role == 'CUSTOMER'){
      this.getCustomerProducts()
    }
  }

  getUserData(){
    const encryptedData = localStorage.getItem('encryptedLoginData')

    if(encryptedData){
      this.userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey);
      console.log(this.userData)
    }
  }

  getCustomerProducts(){
    this.productsService.getAllClientProducts(this.userData.productIdList).subscribe({
      next: (res: any) => {
        this.benefitsList = res[0].productBenefits;
      },
      error: (err) => {
        this.toastService.error("Tente novamento mais tarde.","Ocorreu um erro na busca dos benefícios")
      }
    })
  }
}
