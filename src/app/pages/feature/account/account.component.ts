import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ClientService } from 'src/app/services/client.service';
import { PageService } from 'src/app/services/page-service';
import { WhiteLabelService } from 'src/app/services/white-label.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  previewBackground: string = '';
  previewTextColor: string = '';
  previewContrastColor: string = '';
  picturePath: string | SafeUrl = "assets/default-user.png"
  pictureFile!: File;
  userData: any; 
  clientData: any;
  localStorageKey: string = environment.localStorageKey

  constructor(
    private whiteLabelService: WhiteLabelService,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private clientService: ClientService,
    private toastService: ToastBasicService,
    private sanitizer: DomSanitizer,
    private pageService: PageService
  ){

  }

  ngOnInit(): void {
    this.pageService.setPageName('Minha conta')
    this.getUserData()
    if(this.userData.role == 'CUSTOMER'){
      this.getCustomerData()
      this.getProfilePicture()
    }else{
      this.picturePath = 'assets/default-logo.png';
      this.getCompanyData()
      this.getLogo()
    }
  }

  getUserData(){
    const encryptedData = localStorage.getItem('encryptedLoginData')

    if(encryptedData){
      this.userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey);
    }
  }

  getCustomerData(){
    this.clientService.getEncryptClientData(this.userData.id).subscribe({
      next: (customerData: any) => {  
        this.clientData = customerData
      },
      error: (err) => {
      }
    })
  }

  getCompanyData(){
    this.clientService.getCompanyData(this.userData.cnpj).subscribe({
      next: (res: any) => {
        this.clientData = res
      },
      error: (err) => {

      }
    })
  }

  changePicture(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.pictureFile = files[0]
    if(this.userData.role == 'CUSTOMER'){
      this.changeProfilePicture()
      return;
    }
    this.changeLogo();
  }


  changeLogo() {
    this.clientService.saveLogo(this.pictureFile, this.userData.cnpj).subscribe({
      next: (res) => {
        this.toastService.sucess("","Logo alterada com sucesso!")
        window.location.reload()
      },
      error: (err) => {
        this.toastService.error("Um erro inesperado ocorreu ao alterar a logo, tente novamente mais tarde!","Um erro ocorreu!")
      }
    })
  }

  changeProfilePicture(){
    const cnpj = localStorage.getItem('CNPJ');
    if(cnpj){
      this.clientService.saveProfilePicture(this.pictureFile, this.userData.id, cnpj).subscribe({
        next: (res) => {
          this.toastService.sucess("","Foto de perfil alterada com sucesso!")
          window.location.reload()
        },
        error: (err) => {
          this.toastService.error("Um erro inesperado ocorreu ao alterar a foto de perfil, tente novamente mais tarde!","Um erro ocorreu!")
        }
      })
    }
  }

  getLogo(){
    this.clientService.getLogoByCnpj(this.userData.cnpj).subscribe({
      next: (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.picturePath = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        this.toastService.error("Um erro inesperado ocorreu ao buscar a logo, tente novamente mais tarde!","Um erro ocorreu!") 
      }
    })
  }

  getProfilePicture(){
    const cnpj = localStorage.getItem('CNPJ');
    if(cnpj){
      this.clientService.getProfilePicture(this.userData.id, cnpj).subscribe({
        next: (blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.picturePath = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (err) => {
          this.toastService.error("Um erro inesperado ocorreu ao buscar a foto de perfil, tente novamente mais tarde!","Um erro ocorreu!") 
        }
      })
    }
  }

  previewMouseOver(event: Event){
    const htmlElement = event.target as HTMLElement
    htmlElement.setAttribute("style", "color:"+this.previewContrastColor+'!important')
  }

  previewMouseOut(event: Event){
    const htmlElement = event.target as HTMLElement
    htmlElement.setAttribute("style", "color:"+this.previewTextColor+'!important')
  }

  changePreviewBackground(event: any){
    this.previewBackground = event.target?.value;
  }

  changePreviewText(event: any){
    this.previewTextColor = event.target?.value;
  }

  changePreviewContrast(event: any){
    this.previewContrastColor = event.target?.value;
  }

  setWhiteLabelLayout(){
    if(this.previewContrastColor == '' || this.previewBackground == ''){
      return this.toastService.warning("","Preencha as cores necessárias para a aplicação!")
    }
    if(this.previewContrastColor == ''){
      this.previewTextColor = '#ffffff'
    }

    let whiteLabelLayout = {
      primaryColor: this.previewBackground,
      textColor: this.previewTextColor,
      contrastColor: this.previewContrastColor,
      url: window.location.port
    }//TODO: TROCAR URL PARA PEGAR O SUBDOMÍNIO

    this.whiteLabelService.setWhiteLabelLayout(whiteLabelLayout, this.userData.cnpj).subscribe({
      next:(res: any) => {
        window.location.reload()
        this.toastService.sucess("","White label atualizado com sucesso!")
        console.log(res);
      },
      error: (err) => {
        this.toastService.error("Um erro inesperado ocorreu, tente novamente mais tarde!","Um erro ocorreu!")
      }
    })
  }
}
