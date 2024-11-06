import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { SharedService } from 'src/app/services/shared.service';
import { SmsService } from 'src/app/services/sms.service';
import { TimerService } from 'src/app/services/timer.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit{
  path: string = 'recoverData';
  cpfCnpj!: string;
  isDisabledResendBtn: boolean = true;
  interval: any;
  isPhoneNumber: boolean = true;
  handleCheckPhone: boolean = true;
  handleCheckEmail: boolean = false;
  phoneNumber: string = '';
  recoverToken!: any;
  errorMessageToken: any;
  submitedToken: any;
  formPassword!: any; 
  passwordEqual: boolean = false;
  // submitedPassword: any;
  hasletter: boolean= false;
  hasNumber: boolean = false;
  hasLength: boolean = false;
  loginData: any;
  subscription!: Subscription;
  timeLeft!: number;
  isPasswordShow!: boolean;
  isFirstAccess: boolean = false;
  inputPhoneNumber: any;
  pageTitle: string = 'Recuperar senha';
  logoPath: string | SafeUrl = '/assets/default-logo.png';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private sharedService: SharedService,
    private toastr: ToastBasicService,
    private smsService: SmsService,
    private timerService: TimerService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer
  ){
  }

  ngOnInit(): void {
    this.getUserData()
    this.createPasswordForm()
    this.createTokenForm()
    this.getRouteElements()

    this.subscription = this.timerService.tempoRestante$.subscribe(
    time => { 
      this.timeLeft = time
      if(time === 0 ){
        this.isDisabledResendBtn = false;
      }
    });
    this.getLogo()
  }

  getRouteElements(){
    let route = this.router.url;

    if(route == '/validate/first/access'){
      this.pageTitle = 'Insira seu número de telefone para receber o token de validação';
      this.isFirstAccess = true;
    }
  }

  createPasswordForm(){
    this.formPassword = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      repeatedPassword: new FormControl('', Validators.required)
    })
  }

  createTokenForm(){
    this.recoverToken = this.formBuilder.group({
      token: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

  getUserData(){
    this.sharedService.sharedValue$.subscribe(value=> {
      this.cpfCnpj = value.login
    })    
  }

  //Send CPF/CNPJ
  onSubmitCpf(){

    if(this.isFirstAccess){
      this.getFirstAccessToken(this.inputPhoneNumber.value)
      return
    }

    //Send to phone number
    if(this.isPhoneNumber){
      this.getTokenToPhoneNumber(this.cpfCnpj)
      return
    }
    
    //Send to email
    this.getTokenToEmail(this.cpfCnpj)
  }

  getTokenToPhoneNumber(cpfCnpj: string){
    this.authService.getRecoverTokenToPhoneNumber(cpfCnpj).subscribe({
      next: (res: any) => {
        this.toastr.sucess('Token enviado', '')
        this.phoneNumber = res.phoneNumber
        this.path = 'insertToken';
        this.timerService.startTimer();
        return;   
      },
      error: (err) => {
        this.toastr.error('Ocorreu um erro no envio do token, tente novamente!', '')
        return;
      } 
    })
  }

  getTokenToEmail(cpfCnpj: string){
    // this.authService.getRecoverTokenToEmail(cpfCnpj).subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem('cpfCnpj', this.submited.login)
    //     this.path = 'insertToken';
    //     return;   
    //   },
    //   error: (err) => {
    //     this.submited = "CPF/CNPJ não encontrado!"
    //     this.errorMessageCPF =  this.submited;
    //     return;
    //   }
    // })
  }
  
  getFirstAccessToken(phoneNumber: string){
    const phoneNumberFormated = phoneNumber.replaceAll("(","").replaceAll(")","").replaceAll(" ","").replaceAll("-","")

    this.smsService.getToken(phoneNumberFormated).subscribe({
      next: (res) => {
        this.toastr.sucess('Token enviado', '')
        this.phoneNumber = phoneNumberFormated
        this.path = 'insertToken';
        this.timerService.startTimer();
      },
      error: (err) => {
        this.toastr.error("Um erro ocorreu ao enviar o número de telefone, tente novamente mais tarde.","Ocorreu um erro ao enviar o número de telefone")
      }
    })
  }

  //Send Token
  validateSmsToken(){
    if (!this.recoverToken.valid) {
      this.errorMessageToken = 'Token é um campo obrigatório!';
      return;
    }

    this.submitedToken = {
      token: this.recoverToken.value.token,
    }

    this.authService.sendRecoverToken(this.phoneNumber, this.submitedToken).subscribe({
        next: (res: any) => {   
          if(res.isValid == "Token expirado ou inválido"){
            this.toastr.error('Token expirado ou inválido', '')
            return;
          }
            this.path = 'createPassword';
            this.timerService.stopTimer()
            return;   
        },
        error: (err) => {
          this.toastr.error('Token expirado ou inválido', '')
          return;
        }
      }) 
    
  }

  //Send New Password
  onSubmitPassword(): void {
    if(this.passwordEqual && this.hasNumber && this.hasletter && this.hasLength) {
      this.loginData = {
        password: this.formPassword.value.password,
      }

      this.authService.updatePassword(this.loginData, this.cpfCnpj).subscribe({
        next: (res: any) => {
          this.toastr.sucess('Senha atualizada com sucesso!', '')
            this.router.navigate(['login'])
            return;   
        },
        error: (err) => {
          this.toastr.error('Ocorreu um erro na atualização da senha, tente novamente.', '')
          return;
        }
      })
    } 
    else {
      this.toastr.warning('', 'Preencha os campos obrigatórios!')
    }
      
  }

  //Utils
  handleInputRadio(e: any){
    if(e.value == 'email'){
      this.isPhoneNumber = false
      this.handleCheckEmail = true;
      this.handleCheckPhone = false;
      return;
    }
    this.isPhoneNumber = true;
    this.handleCheckEmail = false;
    this.handleCheckPhone = true;
  }

  passwordValidation() {
    const {password, repeatedPassword} = this.formPassword.value.password; 
    const regexNumber =  /^[a-zA-Z]+$/;
    const regexLetterNumber = /^(?=.*[A-Za-z])[A-Za-z\d]{1,}$/;
    const regexLength = /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/;

    this.passwordEqual = password == repeatedPassword;
    this.hasNumber = regexNumber.test(password);
    this.hasletter = regexLetterNumber.test(password);
    this.hasLength = true == regexLength.test(password);
  }

  resendToken(){
    if(!this.isDisabledResendBtn){     
      
        this.smsService.resendToken(this.phoneNumber).subscribe({
          next: (res: any) => {
            this.toastr.sucess('Token reenviado!', '')
            this.timerService.addTime(60)
            this.isDisabledResendBtn = true
          },
          error: (err) => {
            this.toastr.error('Token não enviado! Tente novamente!', '')
          } 
        })
    }
  }

  enableResendBtn(){
    if(this.timeLeft == 0){
      this.isDisabledResendBtn = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.timerService.stopTimer();
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
