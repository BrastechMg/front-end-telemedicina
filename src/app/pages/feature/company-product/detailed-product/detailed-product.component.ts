import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { BenefitDto } from 'src/app/models/dto/benefit.dto';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { PageService } from 'src/app/services/page-service';
import { ProductsService } from 'src/app/services/products.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.scss']
})
export class DetailedProductComponent {
  //Route variables
  pageTitle: string = 'Benefícios';
  pageLogo: string = ''
  backButtonRoute: string = '/renderProduct/company/products/create';
  navigateRoute: string = '/renderProduct/company/products';
 
  companyProduct!: ProductDto;
  allBenefits: BenefitDto[] = [];
  productId: number = 0; 
  newProduct: any;
  renderedProduct: any;
  formPrice = this.formBuilder.group({
    productPrice: new FormControl('',[Validators.required]),
  })
  modalRef!: NgbModalRef;
  userData: any;
  localStorageKey: string = environment.localStorageKey
  constructor(
    private activatedRoute: ActivatedRoute, 
    public router: Router, 
    private formBuilder: FormBuilder, 
    private productsService: ProductsService,
    private modalService: NgbModal,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private toastService: ToastBasicService,
    private pageService: PageService
  ){ 
    this.pageService.setPageName('Meus produtos')
  }

  ngOnInit(): void {
    this.getUserData()
    this.getRouteId();
    if (this.productId) {
      this.getProduct(this.productId)
      return
    } 
    let localProduct = localStorage.getItem('localProduct')
    if(localProduct) this.newProduct = JSON.parse(localProduct);     
    this.getRouteElements()
    this.getAllBenefits()   
  }

  getRouteId(){
    if(this.activatedRoute.snapshot.paramMap.get("productId")){
      this.productId = Number(this.activatedRoute.snapshot.paramMap.get("productId"));
    }
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

  getAllBenefits(){
    this.productsService.getAllBenefits().subscribe({
      next: (res: BenefitDto[]) => {
        this.allBenefits = res;  
        this.renderProduct()
      },
      error: (err) => {
      }
    })
  }

  renderProduct(){
    let benefities: any = [];

    this.newProduct.benefits.forEach((benefitId: number) => {
      this.allBenefits.forEach((benefit: BenefitDto) => {
        if(benefitId == benefit.id){
          benefities.push(benefit)
        }
      });
    });
    this.renderedProduct = {
      ...this.newProduct,
      benefities,
    }
    
  }

  //Troca variáveis baseado na rota
  getRouteElements(){
    let route = this.router.url;

    if(this.companyProduct && '/feature/company/products/'+this.companyProduct.id){
      this.pageTitle = this.companyProduct.name;
      this.pageLogo = 'http://localhost:4200/assets/logo-saude-ouro.png';
      this.backButtonRoute = '/feature/company/products';
      this.navigateRoute = '/feature/company/products/edit/add-benefities/'+this.companyProduct.id;     
    }
    else{
      this.pageTitle = this.newProduct.name;
      this.pageLogo = this.newProduct.logo;
      this.backButtonRoute = '/feature/company/create/product-benefities';
      this.navigateRoute = '/feature/company/products/create/add-benefities';
    }
  }

  getProductPrice(){  
    if(this.companyProduct){
      return this.companyProduct?.productBenefits.reduce((acc: number, benefit: any) =>  acc + benefit.price ,0).toFixed(2);
    }
    return this.renderedProduct?.benefities.reduce((acc: number, benefit: any) =>  acc + benefit.price ,0).toFixed(2);
  }

  createProduct(){
    this.productsService.createProduct(
      this.userData.cnpj, 
      {
        ...this.newProduct,
        price: this.formPrice.value.productPrice && +(+this.formPrice.value.productPrice).toFixed(2),
      }
  ).subscribe({
      next: (res: any) => {
        this.toastService.sucess(
          'Produto criado',
          'O produto foi criado com sucesso!'
        )
        this.router.navigate(['/feature/company/products'])
        localStorage.removeItem('localProduct')
      },
      error: (err) => {
        this.toastService.error(
          'Erro inesperado',
          'Ocorreu um erro na criação do produto! Tente novamente.'
        )
      }
    })
  }

  cancelProduct(){
    this.modalRef = this.modalService.open(ConfirmModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Cancelar produto',
      message: 'Deseja cancelar a criação desse produto?',
      confirmBtnMessage: 'Cancelar produto',
      cancelBtnMessage: 'Nao cancelar',
    };

   this.modalRef.closed.subscribe(() => {
      localStorage.removeItem('localProduct');
      this.toastService.sucess(
        'Produto cancelado',
        'Esse produto foi cancelado com sucesso!'
      )
      this.router.navigate(['/feature/company/products'])
    });
  }

  deleteProduct(){
    this.modalRef = this.modalService.open(ConfirmModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Deletar produto',
      message: 'Deseja deletar esse produto?',
      confirmBtnMessage: 'Deletar',
      cancelBtnMessage: 'Cancelar',
    };
    this.modalRef.closed.subscribe(() => {
      this.productsService.deleteProduct(this.companyProduct.id).subscribe((res: any) => {
        this.toastService.sucess(
          'Produto deletado',
          'Esse produto foi deletado com sucesso!'
        )
        this.router.navigate(['/feature/company/products'])
      })
    });
  }

  getUserData(){
    const encryptedData = localStorage.getItem('encryptedLoginData')

    if(encryptedData){
      this.userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey);
    }
  }
}
