import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { ProductsService } from 'src/app/services/products.service';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-edit-card',
  templateUrl: './create-edit-card.component.html',
  styleUrls: ['./create-edit-card.component.scss']
})
export class CreateEditCardComponent {
  //Route variables
  pageTitle: string = 'Criar novo cartão';
  pageIcon: string = 'add_circle'
  backButtonRoute: string = '/feature/company/products/create';
  saveNavigateRoute: string = '/feature/company/products';

  cardForm = this.formBuilder.group({
    cardType: new FormControl( 1, [Validators.required]),
  })
  newProduct: any;
  cardChoose1: boolean = true;
  cardChoose2!: boolean;
  cardChoose3!: boolean;
  companyProduct!: ProductDto;
  productId: number = 0; 
  modalRef!: NgbModalRef;
  
  constructor(
    public router: Router, 
    private activatedRoute : ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private productsService: ProductsService,
    private modalService: NgbModal
  ){
  }

  ngOnInit(): void {
    this.getRouteId()
    if (this.productId) {
      this.getProduct(this.productId)
    } 
    this.getRouteElements();
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

  //Troca variáveis baseado na rota
  getRouteElements(){
    let route = this.router.url;

    if(this.companyProduct && '/feature/company/products/edit/card/'+this.companyProduct.id){
      this.pageTitle = 'Editar Cartão: '+this.companyProduct.name;
      this.pageIcon = 'edit';
      this.backButtonRoute = '/feature/company/products/settings/'+this.companyProduct.id;
      this.saveNavigateRoute = '/feature/company/products/'+this.companyProduct.id;
    }else{
      this.pageTitle = 'Criar novo cartão';
      this.pageIcon = 'add_circle';
      this.backButtonRoute = '/feature/company/products/create';
      this.saveNavigateRoute = '/feature/company/create/product-benefities';
    }
  }

  saveCard(){
    let localProduct = localStorage.getItem('localProduct');
    let route = this.router.url;

    if(route === '/feature/company/products/create/card' && localProduct){
      this.newProduct = {
        ...JSON.parse(localProduct),
        cardType: Number(this.cardForm.value.cardType),
        benefits: []
      }   
      localStorage.setItem('localProduct', JSON.stringify(this.newProduct))
      this.router.navigate([this.saveNavigateRoute]);
      return;
    }

    this.modalRef = this.modalService.open(ConfirmModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Atualizar Produto',
      message: 'Realmente deseja atualizar esse produto?',
      confirmBtnMessage: 'Atualizar',
      cancelBtnMessage: 'Cancelar',
    };
    
    this.modalRef.closed.subscribe(() => {
      let updatedCard = {
        cardType: Number(this.cardForm.value.cardType),
      }
      this.productsService.updateProduct(this.companyProduct.id, updatedCard).subscribe({
        next: (res: any) => {
        
        },
        error: (err) => {
  
        }
      })
      this.router.navigate([this.saveNavigateRoute]);
    });
  }

  handleInputRadio(e: any){

    switch(e.value){

      case '1':
        this.cardChoose1 = true;
        this.cardChoose2 = false;
        this.cardChoose3 = false;
      break;

      case '2':
        this.cardChoose1 = false;
        this.cardChoose2 = true;
        this.cardChoose3 = false;
      break;

      case '3':
        this.cardChoose1 = false;
        this.cardChoose2 = false;
        this.cardChoose3 = true;
      break;

      default:
        this.cardChoose1 = true;
        this.cardChoose2 = false;
        this.cardChoose3 = false;
      break;
    }
  }
}
