import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateCompanyModalComponent } from './create-company-modal/create-company-modal.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { PageService } from 'src/app/services/page-service';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent {
  modalRef!: NgbModalRef;


  constructor(
    private modalService: NgbModal,
    private pageService: PageService
  ){
    this.pageService.setPageName('Configurar empresa');
  }

  openCreateModal(){
    this.modalRef = this.modalService.open(CreateCompanyModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Criar nova empresa',
    };
  }

  openUpdateModal(){
    this.modalRef = this.modalService.open(CreateCompanyModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Atualizar empresa',
    };
  }

  openDeleteModal(){
    this.modalRef = this.modalService.open(ConfirmModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Excluir empresa',
      message: 'Realmente deseja excluir essa empresa?',
      confirmBtnMessage: 'Excluir',
      cancelBtnMessage: 'Cancelar',
    };
  }
}
