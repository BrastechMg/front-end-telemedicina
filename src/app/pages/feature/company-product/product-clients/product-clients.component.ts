import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductDto } from 'src/app/models/dto/product.dto';
import { ProductsService } from 'src/app/services/products.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ModalSharedService } from 'src/app/services/modal-shared.service';
import { ClientService } from 'src/app/services/client.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { CsvDto } from 'src/app/models/dto/csv.dto';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from 'src/app/services/interceptors/loader-interceptor.service';
import { environment } from 'src/environments/environment';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-product-clients',
  templateUrl: './product-clients.component.html',
  styleUrls: ['./product-clients.component.scss'],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }]
})
export class ProductClientsComponent implements OnInit{
  companyProduct!: ProductDto;
  productId: number = 0; 
  modalRef!: NgbModalRef;
  userData: any;
  csvList: CsvDto[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  paginatedCsvItems: any[] = [];
  localStorageKey: string = environment.localStorageKey
  constructor(
    private activatedRoute: ActivatedRoute, 
    public router: Router, 
    private productsService: ProductsService,
    private modalService: NgbModal,
    private modalShared: ModalSharedService,
    private clientService: ClientService,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private toastService: ToastBasicService,
    private pageService: PageService
  ){
    this.pageService.setPageName('Editar clientes')
  }

  ngOnInit(): void {
    this.getUserData()
    this.getRouteId()
    if (this.productId) {
      this.getProduct(this.productId)
    } 
    this.getCsvList(this.productId)
    this.getUserData()
    this.updatePaginatedItems();
  }

  getProduct(productId: number){
    this.productsService.getProduct(productId).subscribe({
      next: (res: ProductDto) => {
        this.companyProduct = res;
      },
      error: (err) => {
        this.toastService.error(
          'Erro na busca do produto',
          'Ocorreu um erro na busca do produto, tente novamente!'
        )
      }
    })
  }

  getRouteId(){
    if(this.activatedRoute.snapshot.paramMap.get("productId")){
      this.productId = Number(this.activatedRoute.snapshot.paramMap.get("productId"));   
    } 
  }

  updateClients(){
    this.modalRef = this.modalService.open(ModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Atualizar clientes',
      message: `
      Selecione um arquivo csv contendo todos os clientes ATIVOS do produto.
      `,
      confirmBtn: true,
      cancelBtn: false,
      importFile: true,
    };
    
    this.modalRef.closed.subscribe(() => {
      let csvData = this.modalShared.getData();
      
      this.clientService.createAndDeleteClientsByCsv(csvData, this.userData.cnpj , this.productId).subscribe({
        next: (res: CsvDto) => {
          this.toastService.sucess(
            'Clientes atualizados com sucesso',
            'Os clientes foram atualizados com sucesso!'
          )
          this.updateCsvList(res)
        },
        error: (err) => {    
          this.updateCsvList(err)     
          this.modalRef = this.modalService.open(ModalComponent)
          this.modalRef.componentInstance.params = {
            title: 'Erro no processamento do csv',
            message: `
            Ocorreu um erro no processamento do csv, possíveis erros:
            - Cpf sem 11 dígitos
            - Campos em branco`,
            confirmBtn: false,
            cancelBtn: false,
            importFile: false,
          };
        }
      })
    });
  }

  getUserData(){
    const encryptedData = localStorage.getItem('encryptedLoginData')

    if(encryptedData){
      this.userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey); 
    }
  }

  getCsvList(productId: number){
    this.clientService.getCsvList(productId).subscribe({
      next: (res: CsvDto[]) => {
        this.csvList = res
        this.updatePaginatedItems()
      },
      error: (err) => {

      }
    })
  }

  updateCsvList(csvItem: CsvDto){
    this.csvList.push(csvItem) 
    this.updatePaginatedItems()
  }

  updatePaginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCsvItems = this.csvList.slice(start, end);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }
}
