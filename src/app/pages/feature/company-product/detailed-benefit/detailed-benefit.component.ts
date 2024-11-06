import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { BenefitDto } from 'src/app/models/dto/benefit.dto';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { PageService } from 'src/app/services/page-service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-detailed-benefit',
  templateUrl: './detailed-benefit.component.html',
  styleUrls: ['./detailed-benefit.component.scss']
})
export class DetailedBenefitComponent implements OnInit {
  benefitId: number = 0; 
  productId: number = 0; 
  benefit!: BenefitDto;
  allBenefits!: BenefitDto[];
  companyProduct!: ProductDto;
    
  //Route Variables
  pageIcon: string = 'add_circle'
  backButtonRoute: string = '/feature/company/edit/product-benefities/';
  saveNavigateRoute: string = '/feature/company/products/create/card';
  isRemoveProduct: boolean = false;
  modalRef!: NgbModalRef;
  
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private modalService: NgbModal,
    private toastService: ToastBasicService,
    private pageService: PageService
  ){ 
    this.pageService.setPageName('Configurar benefício');
  }

  ngOnInit(): void {
    this.getRouteId()
    if (this.benefitId) {
      this.getAllBenefits()
    } 
    if(this.productId){
      this.getProduct(this.productId)
    }
    this.getRouteElements()
  }

  getRouteId(){
    if(this.activatedRoute.snapshot.paramMap.get("productId")){
      this.productId = Number(this.activatedRoute.snapshot.paramMap.get("productId"));
    }
    if(this.activatedRoute.snapshot.paramMap.get("benefitId")){
      this.benefitId = Number(this.activatedRoute.snapshot.paramMap.get("benefitId"));
    }
  }

  getAllBenefits(){
    this.productsService.getAllBenefits().subscribe({
      next: (res: BenefitDto[]) => {
        this.allBenefits =  res;
        this.getBenefit()
        this.getRouteElements()
      },
      error: (err) => {

      }
    })
  }

  getBenefit(){
    this.allBenefits.forEach((benefit: BenefitDto) => {
      if(benefit.id == this.benefitId){
        this.benefit = benefit;
      }
    });
  }

  getProduct(productId: number){
    this.productsService.getProduct(productId).subscribe({
      next: (res: ProductDto) => {
        this.companyProduct = res;
        this.getRouteElements()
      },
      error: (err) => {

      }
    })
  }

  //Troca variáveis baseado na rota
  getRouteElements(){
    let route = this.router.url;

    if(this.benefit){
      switch (route){
        case '/feature/company/products/create/add/benefit/'+this.benefit.id:
          this.pageIcon = 'add_circle'
          this.backButtonRoute = '/feature/company/products/create/add-benefities';
          this.saveNavigateRoute = '/feature/company/create/product-benefities';
          this.isRemoveProduct = false;
        break;
  
        case '/feature/company/products/create/remove/benefit/'+this.benefit.id:
          this.pageIcon = 'add_circle'
          this.backButtonRoute = '/feature/company/create/product-benefities';
          this.saveNavigateRoute = '/feature/company/create/product-benefities';
          this.isRemoveProduct = true;
        break;

        case '/feature/company/products/'+this.productId+'/edit/remove/benefit/'+this.benefit.id: 
          this.pageIcon = 'edit'
          this.backButtonRoute = '/feature/company/edit/product-benefities/'+this.productId;
          this.saveNavigateRoute = '/feature/company/edit/product-benefities/'+this.productId;
          this.isRemoveProduct = true;
        break;
          
        case '/feature/company/products/'+this.productId+'/add/benefit/'+this.benefit.id: 
          this.pageIcon = 'add_circle'
          this.backButtonRoute = '/feature/company/products/edit/add-benefities/'+this.productId;
          this.saveNavigateRoute = '/feature/company/edit/product-benefities/'+this.productId;
          this.isRemoveProduct = false;
        break;
        default:
  
        break;
      }
    } 
  }
  
  addBenefit(){
    let route = this.router.url;

    if(route === '/feature/company/products/create/add/benefit/'+this.benefit.id){
      
      let storageProduct = localStorage.getItem('localProduct');
      if(storageProduct){
        let newProduct = JSON.parse(storageProduct);
        
        if(this.verifyHasBenefit(newProduct)){
          alert('Você já tem esse benefício cadastrado')
          this.router.navigate([this.saveNavigateRoute]);
          return;
        }
        
        newProduct.benefits.push(this.benefit.id)
        localStorage.setItem('localProduct', JSON.stringify(newProduct));
        this.toastService.sucess(
          'Benefício adicionado', 
          'O benefício '+this.benefit.name+' foi adicionado com sucesso!'
        )
        this.router.navigate([this.saveNavigateRoute]);
        return
      }
    }

    this.modalRef = this.modalService.open(ConfirmModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Adicionar benefício',
      message: 'Deseja adicionar o benefício '+this.benefit.name+' ao produto?',
      confirmBtnMessage: 'Adicionar',
      cancelBtnMessage: 'Cancelar',
    };

    this.modalRef.closed.subscribe(() => {
      if(this.verifyHasBenefit(this.companyProduct)){
        alert('Você já tem esse benefício cadastrado')
        this.router.navigate([this.saveNavigateRoute]);
        return;
      }
      this.productsService.addProductBenefit(
        { 
          id: this.productId, 
          benefits: [this.benefitId] 
        }
      ).subscribe({
        next: (res: any) => {
          this.toastService.sucess(
            'Benefício adicionado', 
            'O benefício '+this.benefit.name+' foi adicionado com sucesso!'
          )
          this.router.navigate([this.saveNavigateRoute])
        },
        error: (err) => {

        }
      })
    });
  }
 
  verifyHasBenefit(product: any){
    let route = this.router.url;
    let res: boolean = false;
    
    if(route === '/feature/company/products/create/add/benefit/'+this.benefit.id){
      product.benefits.forEach((benefit: number) => {
        if(benefit == this.benefit.id){
          res = true
        }   
      })
      return res;
    }
    product.productBenefits.forEach((benefit: BenefitDto) => {
      if(this.benefit.id == benefit.id){
        res = true
      }
    })
    return res;
  }

  removeBenefit(){
    
    let route = this.router.url;

    if(route === '/feature/company/products/create/remove/benefit/'+this.benefit.id){
      let storageProduct = localStorage.getItem('localProduct');

      if(storageProduct){
        let newProduct = JSON.parse(storageProduct);
        let index = newProduct.benefits.indexOf(this.benefit.id)

        if(index > -1){
          this.modalRef = this.modalService.open(ConfirmModalComponent)
          this.modalRef.componentInstance.params = {
            title: 'Remover benefício',
            message: 'Deseja remover o benefício '+this.benefit.name+' do produto?',
            confirmBtnMessage: 'Remover',
            cancelBtnMessage: 'Cancelar',
          };

          this.modalRef.closed.subscribe(() => {
            newProduct.benefits.splice(index, 1);
            localStorage.setItem('localProduct', JSON.stringify(newProduct));
            this.toastService.sucess(
              'Benefício removido', 
              'O benefício '+this.benefit.name+' foi removido com sucesso!'
            )
            this.router.navigate([this.saveNavigateRoute])
          });
        }
      }
      return
    }
    
    this.modalRef = this.modalService.open(ConfirmModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Remover benefício',
      message: 'Deseja remover o benefício '+this.benefit.name+' do produto?',
      confirmBtnMessage: 'Remover',
      cancelBtnMessage: 'Cancelar',
    };
    this.modalRef.closed.subscribe(() => {
      this.productsService.deleteProductBenefit(
        { 
          id: this.productId, 
          benefits: [this.benefitId] 
        }
      ).subscribe({
        next: (res: any) => {
          this.toastService.sucess(
            'Benefício removido', 
            'O benefício '+this.benefit.name+' foi removido com sucesso!'
          )
          this.router.navigate([this.saveNavigateRoute])
        },
        error: (err) => {
  
        }
      })
    });
  }
}
