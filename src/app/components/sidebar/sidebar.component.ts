import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { environment } from 'src/environments/environment';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { ClientService } from 'src/app/services/client.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isExpanded: boolean = true;
  innerWidth: any;
  isHidden: boolean = false;
  logoPath: string | SafeUrl = 'assets/default-logo.png';
  userData: any;
  localStorageKey: string = environment.localStorageKey
  modalRef!: NgbModalRef;

  constructor(
    public router: Router,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private modalService: NgbModal,
    private toastService: ToastBasicService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer
  ){
  }

  ngOnInit(): void {
    this.getUserData()
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 1290 && this.innerWidth > 880) {
      this.isHidden = true;
      this.isExpanded = false;
    }
    //const domain = window.location.hostname; //Para produção
    const domain = window.location.port; //Para testes
    this.getLogo()
  }


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 1290 && this.innerWidth > 880){
      this.isExpanded = true;
      this.isHidden = true;
    }
  }

  handleMobileSidebar(){
    this.isHidden = !this.isHidden;
    this.isExpanded = true;
  }

  logOutUser(){
    this.checkIfCanLeave()
  }

  checkIfCanLeave(): boolean {
    this.modalRef = this.modalService.open(ConfirmModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Tem certeza que deseja sair?',
      message: 'Caso saia você perderá todos os dados não salvos.',
      confirmBtnMessage: 'Sair',
      cancelBtnMessage: 'Não sair'
    };
    this.modalRef.closed.subscribe((res: any) => {
      localStorage.removeItem('encryptedLoginData');
      this.router.navigate([''])
      return true;
    })
   return false;
  }

  getUserData(){
    const encryptedData = localStorage.getItem('encryptedLoginData')

    if(encryptedData){
      this.userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey);
    }
  }

  functionalityNotCreated(){
    this.toastService.info("","Funcionalidade ainda não criada!")
  }

  getLogo(){
    const cnpj = localStorage.getItem('CNPJ')
    if(cnpj){
      this.clientService.getLogoByCnpj(cnpj).subscribe({
        next: (blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.logoPath = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (err) => {
          this.toastService.error("Um erro inesperado ocorreu ao buscar a logo, tente novamente mais tarde!","Um erro ocorreu!") 
        }
      })
    }
  }
}
