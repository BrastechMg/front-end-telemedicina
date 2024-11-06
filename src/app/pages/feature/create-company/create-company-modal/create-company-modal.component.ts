import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCompanyModalParamsDto } from './create-company-modal-params.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-modal',
  templateUrl: './create-company-modal.component.html',
  styleUrls: ['./create-company-modal.component.scss']
})
export class CreateCompanyModalComponent{
  @Input() params!: CreateCompanyModalParamsDto;
  companyData!: FormGroup;
  isFormSubmited: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private toastr: ToastBasicService
  ) {
    this.createForm();
  }

  createForm(){
    this.companyData = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14)
      ]),
      email: new FormControl('', [
        Validators.required,]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      address: this.formBuilder.group({
        neighborhood: new FormControl(''),
        street: new FormControl(''),
        number: new FormControl(''),
        complement: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        cep: new FormControl('', [
          Validators.minLength(8),
          Validators.maxLength(8)
        ]),
      }),
      subdomain: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
    });
  }

  confirm() {
    this.isFormSubmited = true;
    if(this.companyData.valid){
      this.clientService.createCompany(this.companyData.value).subscribe({
        next: (res: any) => {
          this.activeModal.close();
          this.toastr.sucess('Empresa criada com sucesso!', '');
          this.isFormSubmited = false;
        },
        error: (err) => {
          this.activeModal.close();
          this.toastr.error('Ocorreu um erro na criação da empresa', 'Tente Novamente.');
          this.isFormSubmited = false;
        }
      })
    } 
  }

  getFormControls() {
    return this.companyData.controls;
  }
}
