import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { SignupGuardService } from 'src/app/services/guard-services/signup-guard.service';
import { SharedService } from 'src/app/services/shared.service';
import { SmsService } from 'src/app/services/sms.service';
import { TimerService } from 'src/app/services/timer.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-token-confirmation',
  templateUrl: './token-confirmation.component.html',
  styleUrls: ['./token-confirmation.component.scss']
})
export class TokenConfirmationComponent implements OnInit {
  subscription!: Subscription;
  timeLeft!: number;
  phoneTokenForm!: FormGroup;
  emailForm!: FormGroup;
  recoverToken!: FormGroup;
  pathOfValidation: string = 'phoneToken';
  errorMessage!: string;
  actualForm: any;
  signUpForm: any;
  errorMessageToken!: string;
  submitedValue: any;
  isFirstAcess: boolean = false;
  isDisabledResendBtn: boolean = true;
  formChanged: boolean = false;
  logoPath: string | SafeUrl = '/assets/default-logo.png';

 constructor(private formBuilder: FormBuilder, 
  private router: Router, 
  private shared: SharedService,
  private smsService: SmsService,
  private toastr: ToastBasicService,
  private guard: SignupGuardService,
  private timerService: TimerService,
  private clientService: ClientService,
  private sanitizer: DomSanitizer){
 }

 ngOnInit(): void {
  this.getSharedValue();
  this.setTimeLeft();
  this.createPhoneForm();
  this.createEmailForm();
  this.createTokenForm();
  this.getLogo();
 } 
 
 getSharedValue(){
  this.shared.sharedValue$.subscribe(res => {
    this.signUpForm = res;
    if(res.isFirstAccess){
      this.isFirstAcess = res.isFirstAccess
    }
  })
 }

 setTimeLeft(){
  this.subscription = this.timerService.tempoRestante$.subscribe(
    time => { 
      this.timeLeft = time
      if(time === 0 ){
        this.isDisabledResendBtn = false;
      }
    });
 };

 createTokenForm() {
  this.recoverToken = this.formBuilder.group({
    token: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  })
 }

  createPhoneForm() {
    this.phoneTokenForm = this.formBuilder.group({
      phoneNumber: new FormControl('')
    })    
  }

  createEmailForm(){
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', Validators.email)
    })
  }   

  submitNumber(){
    if (!this.phoneTokenForm.valid ) {
      this.errorMessage = 'Insira um número válido!';
      return;
    }

    this.actualForm = {
      ...this.phoneTokenForm.value,
      phoneNumber: this.phoneTokenForm.get('phoneNumber')?.value.replaceAll('-','').replaceAll('(','').replaceAll(')','').replaceAll(' ',''),
      } 
      
      this.submitedValue = this.actualForm;

      this.smsService.getToken(this.actualForm.phoneNumber).subscribe({
        next: () => {
          this.pathOfValidation = 'insertToken';
          this.timerService.startTimer()
        },
        error: () => {
          this.toastr.error('Tente novamente!', 'Token não enviado!');
    
      } 
})
  }

  onSubmitToken(){
    if (!this.recoverToken.valid) {
      this.errorMessageToken = 'Token é um campo obrigatório!';
      return;
    }

    const token = this.recoverToken.get('token')?.value;
    const phoneNumber = this.actualForm.phoneNumber;

    this.smsService.validateToken({token}, phoneNumber).subscribe({
      next: (res: any) =>  {
        if(res.valid == false) {
          return this.toastr.error('Tente novamente!', 'Token não enviado!');
        }
        this.toastr.sucess("Token Validado com sucesso!", '');
        this.pathOfValidation = 'emailToken';
          if(this.isFirstAcess){ //verifica se o cliente é primeiro acesso, visto que o mesmo já possui endereço
            this.router.navigate(['/password-creation'])
            return
          }
      },
      error: () => {
        this.toastr.error('Tente novamente!', 'Token não enviado!');
      }
    })
  }

  onSubmitEmail(){
    this.actualForm = {
      ...this.signUpForm,
      ...this.actualForm,
      ...this.emailForm.value
      }
      
      this.submitedValue = this.actualForm;
    this.shared.setSharedValue(this.submitedValue) 
    if(this.emailForm.valid){
      this.router.navigate(['/address-register'])
    } else {
      this.toastr.error("Insira um email válido", "Campo inválido!")
    }
  }

  resendToken(){
    if(!this.isDisabledResendBtn){     
      
        this.smsService.resendToken(this.actualForm.phoneNumber).subscribe({
          next: (res: any) => {
            this.toastr.sucess('Token reenviado!', ''),
            this.timerService.addTime(60)
            this.isDisabledResendBtn = true
          },
          error: (err) => {
            this.toastr.error('Tente novamente!', 'Token não enviado!');  
          } 
        })
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
