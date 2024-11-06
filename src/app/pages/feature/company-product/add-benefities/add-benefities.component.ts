import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitDto } from 'src/app/models/dto/benefit.dto';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { PageService } from 'src/app/services/page-service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-benefities',
  templateUrl: './add-benefities.component.html',
  styleUrls: ['./add-benefities.component.scss']
})
export class AddBenefitiesComponent implements OnInit {
  allBenefits!: BenefitDto[];
  productId: number = 0;
  newProduct: any;
  companyProduct!: ProductDto;

  //Route variables
  pageTitle: string = 'Benefícios';
  pageIcon: string = 'add_circle'
  backButtonRoute: string = '/feature/company/products/create';
  addBenefitNavigate: string = '/feature/company/products';
  

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private pageService: PageService
  ){
    this.pageService.setPageName('Adicionar Benefícios');
  }

  ngOnInit(): void {
    this.getRouteId()
    if(this.productId){
      this.getProduct(this.productId)
    }
    this.getAllBenefits()
    let storageProduct = localStorage.getItem('localProduct')
    if(storageProduct) this.newProduct = JSON.parse(storageProduct);     
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
      },
      error: (err) => {

      }
    })
  }

  getAllBenefits(){
    this.productsService.getAllBenefits().subscribe({
      next: (res: BenefitDto[]) => {
        this.allBenefits =  res;
        this.getRouteElements()
      },
      error: (err) => {

      }
    })
  }

  //Troca variáveis baseado na rota
  getRouteElements(){
    let route = this.router.url;

    switch (route){
      case '/feature/company/products/create/add-benefities':
        this.pageTitle = 'Adicionar Novos Benefícios';
        this.pageIcon = 'add_circle';
        this.backButtonRoute = '/feature/company/create/product-benefities';
        this.addBenefitNavigate = 'feature/company/products/create/add/benefit/';
        break;
      case '/feature/company/products/edit/add-benefities/'+this.productId:
          this.pageTitle = 'Adicionar Novos Benefícios ';
          this.pageIcon = 'add_circle';
          this.backButtonRoute = '/feature/company/edit/product-benefities/'+this.productId;
          this.addBenefitNavigate = 'feature/company/products/'+this.productId+'/add/benefit/';
        break;
      default:

      break;
    }
  }
}
