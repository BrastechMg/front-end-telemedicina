import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { ProductDto } from '../models/dto/product.dto';
import { CreateProductDto } from '../models/dto/createProduct.dto';
import { BenefitDto } from '../models/dto/benefit.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productPath: string = '/product/'
  customerPath: string = '/asset/'

  constructor(private http: HttpClient) {

  }

  createProduct(cnpj: string, product: CreateProductDto){
    return this.http.post(
      `${API_CONFIG.baseUrl}${this.productPath}${cnpj}`, 
      product
    );
  }

  getAllCompanyProducts(cnpj: string) {
    return this.http.get<ProductDto[]>(
      `${API_CONFIG.baseUrl}${this.productPath}${cnpj}/all`
    );
  }

  getAllClientProducts(productId: number[]){
    const queryProductId = productId.toString()
    
    return this.http.get(
      `${API_CONFIG.baseUrl}/product?ids=${queryProductId}`
    );
  }

  getProduct(productId: number){
    return this.http.get<ProductDto>(
      `${API_CONFIG.baseUrl}${this.productPath}${productId}`
    );
  }

  deleteProduct(productId: number){
    return this.http.delete(
      `${API_CONFIG.baseUrl}${this.productPath}${productId}`
    );
  }

  updateProduct(productId: number, updatedValues: any){
    return this.http.put(
      `${API_CONFIG.baseUrl}${this.productPath}${productId}`, 
      updatedValues
    );
  }

  deleteProductBenefit(benefits: any){
    return this.http.put(
      `${API_CONFIG.baseUrl}${this.productPath}remove`, 
      benefits
    );
  }

  addProductBenefit(benefits: any){
    return this.http.put(
      `${API_CONFIG.baseUrl}${this.productPath}add`, 
      benefits
    );
  }

  getAllBenefits(){
    return this.http.get<BenefitDto[]>(
      `${API_CONFIG.baseUrl}/benefit`
    )
  }
}
