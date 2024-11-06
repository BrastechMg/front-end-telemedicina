import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { BenefitDto } from 'src/app/models/dto/benefit.dto';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-product-benefit',
  templateUrl: './product-benefit.component.html',
  styleUrls: ['./product-benefit.component.scss']
})
export class ProductBenefitComponent implements OnInit {
  productId: number = 0;
  companyProduct!: ProductDto;
  allBenefits!: BenefitDto[];
  newProduct: any = null;
  allBenefitsProduct: BenefitDto[] = [];

  //Route variables
  pageTitle: string = 'Benefícios';
  pageIcon: string = 'add_circle';
  backButtonRoute: string = '/feature/company/products/create';
  addBenefitNavigate: string = '/feature/company/products';
  saveRoute: string = '/feature/company/products/create/details';

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private toastService: ToastBasicService,
    private pageService: PageService
  ){ 
    this.pageService.setPageName('Configurar benefícios')
  }

  ngOnInit(): void {
    this.getRouteId()
    if(this.productId){
      this.getProduct(this.productId)
    }
    this.getAllBenefits()
    let newProduct = localStorage.getItem('localProduct')
    if(newProduct) this.newProduct = JSON.parse(newProduct);     
    this.getRouteElements()
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
        this.allBenefits =  res;
        this.getNewProductBenefities()
        this.getRouteElements()
      },
      error: (err) => {
        this.toastService.error("Um erro ocorreu na busca dos benefícios do produto, tente novamente mais tarde!","Um erro ocorreu")
      }
    })
  }

  //Troca variáveis baseado na rota
  getRouteElements(){
    let route = this.router.url;

    if(this.companyProduct && route == '/feature/company/edit/product-benefities/'+this.companyProduct.id){
      this.pageTitle = 'Benefícios '+this.companyProduct.name;
      this.pageIcon = 'inventory_2';
      this.backButtonRoute = 'feature/company/products/settings/'+this.companyProduct.id;
      this.addBenefitNavigate = '/feature/company/products/edit/add-benefities/'+this.companyProduct.id;
      this.saveRoute = '/feature/company/products/create/details'
    }
    else{
      this.pageTitle = 'Criar Benefícios';
      this.pageIcon = 'add_circle';
      this.backButtonRoute = '/feature/company/products/create/card';
      this.addBenefitNavigate = '/feature/company/products/create/add-benefities';
      this.saveRoute = '/feature/company/products/create/details'
    }
  }

  getNewProductBenefities(){
    this.newProduct?.benefits.forEach((benefit: number) => {
      this.allBenefits.forEach((item: BenefitDto) => {
        if(item.id === benefit){
          this.allBenefitsProduct.push(item)
        }
      })
    });
  }

  changeRouteOnClick(){
    let route = this.router.url;

    if(route == '/teste/company/create/product-benefities' && this.newProduct?.benefits.length == 0){
        this.toastService.warning("Escolha no mínimo 1 benefício para prosseguir.","Dados incompletos")
        return;
    }
    this.router.navigate([this.saveRoute])
  }
}


