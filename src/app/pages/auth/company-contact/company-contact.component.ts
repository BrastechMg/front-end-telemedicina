import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.scss']
})
export class CompanyContactComponent {
  companyContactForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    amountWorkers: new FormControl('', [Validators.required]),
    meet: new FormControl(''),
    message: new FormControl(''),
  });
  submited: any;
  errorMessage: any;
  modalRef!: NgbModalRef;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    public router: Router,
    private toastService: ToastBasicService
  ){
  }

  onSubmit(): void {
    if(!this.isValidForm(this.companyContactForm)) {
      this.errorMessage = 'Preencha os campos obrigatórios!';
      return;
    }
  
    this.submited = {
      ...this.companyContactForm.value,
      phoneNumber: this.companyContactForm.value.phoneNumber?.replaceAll('(','').replaceAll(')','').replaceAll('-', '').replaceAll(' ', ''),
      cnpj: this.companyContactForm.value.cnpj?.replaceAll('.','').replaceAll('/','').replaceAll('-', '')
    } 
    
    this.authService.sendCompanyContactData(this.submited).subscribe({
      next: (res  : any) => {
        this.toastService.sucess(
          'Formulário enviado com sucesso!', 
          'O formulário foi enviado com sucesso! Responderemos o mais rápido possível!'
        )
        this.companyContactForm.reset()
      },
      error: (err) => {
        this.toastService.error(
          'Um erro inesperado ocorreu!', 
          'Desculpe, um erro inesperado ocorreu, estamos trabalhando o máximo possível para concertá-lo!'
        )
      }
    })
  }

  isValidForm(form: any){
    if (!this.companyContactForm.valid) {  
      return false;
    }   
    return true;
  }
}
