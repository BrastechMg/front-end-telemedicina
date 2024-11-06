import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { ProductsService } from 'src/app/services/products.service';   
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent implements OnInit {
  //Route Variables
  pageTitle: string = 'Criar novo produto';
  pageIcon: string = 'add_circle'
  backButtonRoute: string = '/feature/company/products';
  saveNavigateRoute: string = '/feature/company/products/create/card';

  companyProduct!: ProductDto;
  productId: number = 0; 
  productForm = this.formBuilder.group({
    logoPath: new FormControl(''),
    name: new FormControl(''),
  });
  pathLogo: string = '';
  modalRef!: NgbModalRef;

  constructor(
    public router: Router, 
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private modalService: NgbModal,
    private toastService: ToastBasicService,
    private pageService: PageService
  ){
    this.pageService.setPageName('Configurar produto')
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

    if(this.companyProduct && '/feature/company/products/edit/product/'+this.companyProduct.id){
      this.pageTitle = 'Editar produto: '+this.companyProduct.name;
      this.pageIcon = 'edit';
      this.backButtonRoute = '/feature/company/products/settings/'+this.companyProduct.id;
      this.saveNavigateRoute = '/feature/company/products/'+this.companyProduct.id;
     
    }else{
      this.pageTitle = 'Criar novo produto';
      this.pageIcon = 'add_circle'
      this.backButtonRoute = '/feature/company/products/create/config-services';
      this.saveNavigateRoute = '/feature/company/products/create/card';
    }
  }
  
  showFileName(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.pathLogo = files[0].name
  }

  saveProduct(){
    let route = this.router.url;
    
    if(route === '/feature/company/products/create'){
      if(this.productForm.value.name == '' || this.productForm.value.logoPath == ''){
        this.toastService.warning('Insira todos os dados antes de prosseguir','Dados Incompletos')
        return;
      }

      localStorage.setItem('localProduct', JSON.stringify(this.productForm.value))
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
      let updatedValues = this.removeEmpty(this.productForm.value)
      this.productsService.updateProduct(this.companyProduct.id, updatedValues).subscribe({
        next: (res: any) => {
          this.toastService.sucess('Seu produto foi atualizado com sucesso!','Produto atualizado com sucesso!')
        },
        error: (err) => {
          this.toastService.error('Um erro ocorreu na atualização do produto, tente novamente mais tarde!','Ocorreu um erro para atualizar o produto!')
        }
      })
      this.router.navigate([this.saveNavigateRoute]);
    });
  }

  removeEmpty(obj: any){
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != ''));
  }
}
