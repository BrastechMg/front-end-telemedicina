import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-config-services',
  templateUrl: './config-services.component.html',
  styleUrls: ['./config-services.component.scss']
})
export class ConfigServicesComponent {
  isPaymentCollapsed = true;

   //Route variables
   pageTitle: string = 'Benefícios';
   pageIcon: string = 'add_circle'
   backButtonRoute: string = '/feature/company/products/create';
   btnNavigate: string = '/feature/company/products';
   productId: number = 0;

   constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService
  ){
    this.pageService.setPageName('Configurações de serviço')
  }

   ngOnInit(): void {
    this.getRouteId()
    // if(this.productId){
    //   this.getProduct(this.productId)
    // }
    // this.getAllBenefits()
    let storageProduct = localStorage.getItem('localProduct')
    //if(storageProduct) this.newProduct = JSON.parse(storageProduct);     
    this.getRouteElements()
  }

  getRouteId(){
    if(this.activatedRoute.snapshot.paramMap.get("productId")){
      this.productId = Number(this.activatedRoute.snapshot.paramMap.get("productId"));
    }
  }


   //Troca variáveis baseado na rota
  getRouteElements(){
    let route = this.router.url;

    switch (route){
      case '/feature/company/products/create/config-services':
        this.pageTitle = 'Configurações de serviço';
        this.pageIcon = 'settings';
        this.backButtonRoute = 'feature/company/products';
        this.btnNavigate = 'feature/company/products/create';
        break;
      case '/feature/company/products/'+this.productId+'/config-services':
          this.pageTitle = 'Configurações de serviços';
          this.pageIcon = 'settings';
          this.backButtonRoute = '/feature/company/products/settings/'+this.productId;
          this.btnNavigate = 'feature/company/products/'+this.productId+'/add/benefit/';
        break;
      default:

      break;
    }
  }

  saveSettings(){
    //TODO: CRIAR MÉTODO DE SALVAMENTO
    console.log('salvar no local storage?');
    
    this.router.navigate([this.btnNavigate])
  }
}
