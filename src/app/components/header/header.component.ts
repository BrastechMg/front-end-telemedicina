import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = 'Cliente';
  userRole: string = 'CUSTOMER';
  picturePath: string | SafeUrl = "assets/default-user.png"
  userData: any;
  localStorageKey: string = environment.localStorageKey

  constructor(
    private router: Router,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private clientService: ClientService,
    private toastService: ToastBasicService,
    private sanitizer: DomSanitizer){

  }

  ngOnInit(){
    this.getUserData()
    if(this.userData.role == 'CUSTOMER'){
      this.getCustomerData()
      this.getProfilePicture()
    }else{
      this.getCompanyData()
    }
  }

  getCustomerData(){
    this.clientService.getEncryptClientData(this.userData.id).subscribe({
      next: (res: any) => {
        this.username = res.name;
        this.userRole = ''
      },
      error: (err) => {
        this.username = 'User'
        this.userRole = ''
      }
    })
  }

  getCompanyData(){
    this.clientService.getCompanyData(this.userData.cnpj).subscribe({
      next: (res: any) => {
        this.username = res.name;
        this.userRole = res.role
      },
      error: (err) => {
        this.username = 'User'
        this.userRole = ''
      }
    })
  }

  redirectToProfile(){
    this.router.navigate(['/feature/account'])
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
}
