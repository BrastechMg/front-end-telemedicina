import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { PageService } from 'src/app/services/page-service';
import { ProductsService } from 'src/app/services/products.service'

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit {
  companyProduct!: ProductDto;
  productId: number = 0; 

  constructor(
    private activatedRoute : ActivatedRoute, 
    public router: Router, 
    private productsService: ProductsService,
    private pageService: PageService
  ){
    this.pageService.setPageName('Editar produto')
  }

  ngOnInit(): void {
    this.getRouteId()
    if (this.productId) {
      this.getProduct(this.productId)
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

  getRouteId(){
    if(this.activatedRoute.snapshot.paramMap.get("productId")){
      this.productId = Number(this.activatedRoute.snapshot.paramMap.get("productId"));
    }
  }

}
