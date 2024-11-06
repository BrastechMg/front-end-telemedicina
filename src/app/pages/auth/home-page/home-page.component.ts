import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InputComponent } from 'src/app/components/input/input.component';
import { CustomerDto } from 'src/app/models/dto/customer.dto';
import { ClientService } from 'src/app/services/client.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  login!: string;
  logoPath: string | SafeUrl = '/assets/default-logo.png';

  constructor(
    private router: Router,
    private shared: SharedService,
    private toastr: ToastBasicService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer,
   ) {

  }

  ngOnInit() {
    localStorage.removeItem('encryptedLoginData')
    this.getLogo()
  }

   checkClientTypeAndVerify(event:InputComponent) {
     this.login = event.value?.toString()!;
     this.login.length == 11 ? this.verifyCustomer():this.verifyCompany();
   }

   verifyCompany() {
      this.clientService.getCompanyData(this.login).subscribe({
        next:(res:any) => {
            this.shared.setSharedValue({
              login: this.login,
            })
          this.router.navigate(['/login'])
        },
        error:(err: any) => {
          this.toastr.error('', 'Usuário CNPJ não encontrado!');
          this.router.navigate(['/contact'])
        },
      })
   }

   verifyCustomer() {
     this.clientService.verifyIfExists(this.login).subscribe({
         next:(res:CustomerDto) => {
            this.navigateBasedStatusAndResponse(res);
         },
         error:(err: any) => {
                this.toastr.error('', 'Usuário CPF não encontrado!');
                this.router.navigate(['/signup'])
              },
         })
        }

  navigateBasedStatusAndResponse(customerDTO: CustomerDto){
    const customerStatus = {
      firstAccess:1,
      validated:2,
      quizAttemptExceeded:3,
    }
    switch(customerDTO.statusCode) {
      case 1:
                this.shared.setSharedValue({
                  login: this.login,
                  isFirstAccess: true,
                  customerData: customerDTO
                })
                this.router.navigate(['/bithyday-validation'])
            break;
           case 2: this.shared.setSharedValue({
                   login: this.login,
                   name: customerDTO?.name
                 })
               this.router.navigate(['/login'])
             break;
           case 3:
                 this.toastr.error('', 'Tentativas de validação excedidas, entre em contato com o suporte!')
             break;
           default:
           this.toastr.error('', 'CPF não encontrado!')
                this.router.navigate(['/signup'])
                break;
    }
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
          this.toastr.error("Um erro inesperado ocorreu ao buscar a logo, tente novamente mais tarde!","Um erro ocorreu!") 
        }
      })
    }
  }
}
