import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/dto/login.dto';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { ClientService } from 'src/app/services/client.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logoPath: string | SafeUrl = '/assets/default-logo.png';
  isPasswordShow: boolean = false;
  loginForm = this.formBuilder.group({
    password: new FormControl(null, [Validators.required]),
  });
  submited: any;
  errorMessageCPF: any;
  errorMessagePassword: any;
  login!: string;
  name!: string;
  formatedLogin!: string;
  localStorageKey: string = environment.localStorageKey

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    public router: Router,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private sharedService: SharedService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer,
    private toastService: ToastBasicService
  ){
  }

  ngOnInit(): void {
    this.sharedService.sharedValue$.subscribe(value => {
      if(value.login){
        this.name = value.name;
        this.login = value.login
        this.formatedLogin = this.formatText(value.login)
        return
      }
      this.router.navigate([''])
    })
    this.getLogo()
  }

  submitLogin(): void {
    if(!this.isValidForm(this.loginForm)){
      this.errorMessageCPF = 'CPF/CNPJ inválidos!';
      this.errorMessagePassword = 'Senha inválida!';
      return;
    }

    this.submited = {
      login: this.login,
      password: this.loginForm.value.password
    }
    this.authService.login(this.submited).subscribe({
      next: (res: any) => {
        const encryptedData = this.encryptAndDecrypt.encryptData(res, this.localStorageKey)   
        if(encryptedData){    
          localStorage.setItem('encryptedLoginData', encryptedData)          
          this.router.navigate(['feature/dashboard']);
          return;
        }  
      },
      error: (err) => {
        this.submited = "CPF/CNPJ ou Senha inválidos!"
        this.errorMessageCPF =  this.submited;
        this.errorMessagePassword = this.submited;
      }
    })
    
  }

  handlePasswordView(){
    this.isPasswordShow = !this.isPasswordShow;
  }

  isValidForm(form: any){
    if(!form.valid || form.value.password.startsWith(" ' "))return false;
  
    return true;
  }

  formatText(login: string){
    if (login.length === 11) {
      return login.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return login.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
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
