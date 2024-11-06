import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { ClientService } from 'src/app/services/client.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent implements OnInit {
  formPassword!: FormGroup;
  passwordEqual: boolean = false;
  hasNumberAndLetter: boolean = false;
  hasLength: boolean = false;
  loginData: any; //TODO - mudar para LoginDTO
  customerCpf!: string | undefined;
  isFirstAcess: boolean = false;
  erroMessage!: string;
  isPasswordShow!: boolean;
  logoPath: string | SafeUrl = '/assets/default-logo.png';


  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private sharedService: SharedService,
    private toastr: ToastBasicService,
    private clientService:ClientService,
    private router: Router,
    private sanitizer: DomSanitizer){

  }

  ngOnInit() {
    this.formPassword = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      repeatedPassword: new FormControl('', Validators.required)
    })
 
    this.sharedService.sharedValue$.subscribe(value=> {
      this.customerCpf = value.login;
    })
    this.getLogo()
  }

  passwordValidation() {
    const password = this.formPassword.get('password')?.value;  
    const repeatedPassword = this.formPassword.get('repeatedPassword')?.value;
    const regexLetterNumber = /([a-zA-Z](?=.*[0-9])|[0-9](?=.*[a-zA-Z]))/;

    if (password == null) {
      this.erroMessage = "A senha não pode ser vazia!"
      return;
    }
    
    if(this.formPassword.value.password.includes("'")) {
      this.erroMessage = "Senha inválida!"
      return;
    }
    this.hasNumberAndLetter = regexLetterNumber.test(password) 
    this.passwordEqual = password == repeatedPassword; 
    this.hasLength = password.length >= 6 
  }

  sendPassword(){
    if(this.passwordEqual && this.hasNumberAndLetter && this.hasLength) {
      this.loginData = {
        login: this.customerCpf,
        password: this.formPassword.get('password')?.value
      }
        
     this.createNewPassword()
    }
  }

  createNewPassword(){
    this.authService.createPassword(this.loginData).subscribe({
      next: (res) => {
        this.toastr.sucess("Senha criada com sucesso!", '')
        this.clientService.updateCustomerStatus(this.customerCpf,2).subscribe(res => {})
        this.router.navigate(['/login']);
      }, 
      error: (err) => {
       return this.toastr.error('Token Incorreto!', '')
      }
    })
  }

  createFirstAccessPassword(){
    this.authService.updatePassword(
      { password: this.loginData.password }, 
      this.loginData.login
    ).subscribe({
      next: () => {
        this.toastr.sucess("Senha criada com sucesso!", '')
        this.router.navigate(['/login']);
      }, 
      error: () => {
       return this.toastr.error('Token Incorreto!', '')
      }
    })
  }

  handlePasswordView(){
    this.isPasswordShow = !this.isPasswordShow;
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
