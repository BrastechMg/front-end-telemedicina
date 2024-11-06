import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDto } from 'src/app/models/dto/customer.dto';
import { SharedService } from 'src/app/services/shared.service';
import { ViaCepService } from 'src/app/services/via-cep.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ClientService } from 'src/app/services/client.service';
import { CustomerAsaasService } from 'src/app/services/asaas/customer-asaas.service';

@Component({
  selector: 'app-address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.scss']
})
export class AddressRegisterComponent implements OnInit{
  formAddress!: FormGroup;
  btnText: string = "ENVIAR"
  clicked: boolean = false;
  previousForm!: any;
  formChanged: boolean = false;
  logoPath: string | SafeUrl = '/assets/default-logo.png';

  constructor(
    private toastr: ToastBasicService,
    private formBuilder: FormBuilder, 
    private shared: SharedService, 
    private route: Router, 
    private viaCep: ViaCepService,
    private authService: AuthService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer,
    private asaasService: CustomerAsaasService
  ) {}
  
  ngOnInit() {
    this.shared.sharedValue$.subscribe(res => {
      this.previousForm = res;
    })

    this.createCustomerForm(new CustomerDto())
    this.getLogo()
  }

  createCustomerForm(customer: CustomerDto){
  this.formAddress =  this.formBuilder.group({
      cep: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      number: new FormControl("", [Validators.required]),
      neighborhood: new FormControl("", [Validators.required]),
      complement: new FormControl(""),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required])
      });
}

getCep(event:any) {
  const cep = event.value;
  this.viaCep.getAdress(cep).subscribe(res => {
     this.addAddress(res);
   })
}

addAddress(res: any){
  this.formAddress.get('street')?.setValue(res.logradouro);
  this.formAddress.get('complement')?.setValue(res.complemento);
  this.formAddress.get('neighborhood')?.setValue(res.bairro);
  this.formAddress.get('city')?.setValue(res.localidade);
  this.formAddress.get('state')?.setValue(res.uf);
}

onSubmit() {
  if(this.formAddress.invalid) {
    return this.toastr.error("Preencha os campos obrigatórios", "Formulário Incorreto!");
  }

  const customerData: FormGroup = {
    ...this.previousForm,
    address: {
      ...this.formAddress.value,
      cep : this.formAddress.get('cep')?.value.replaceAll('.', '').replaceAll('-', '')
    } 
  }

  this.shared.setSharedValue(customerData);
  this.saveCustomer(customerData);
  }

  saveCustomer(customerData: FormGroup) {
    this.authService.saveCustomerData(customerData).subscribe(
      {
        next: () => {         
          this.setLogin();
          this.saveAsaasCustomer(customerData);
        },
        error: (error) => {
          this.toastr.error(error, 'Ocorreu um erro')
        }
      });
  }

  setLogin(){
    const cpf = this.previousForm.cpf;
    this.shared.setSharedValue({
      login:cpf
    })
  };

  //TODO - implementar id do produto dinâmico
  saveAsaasCustomer(submitedValue: FormGroup) {  
    this.asaasService.createAsaasCustomer(submitedValue, 1).subscribe({
      next: () => {
        this.toastr.sucess("Dados enviados com sucesso", '');
        this.route.navigate(["/payment"]);
      }, error: () => {
          this.toastr.error('Ocorreu um Erro!', 'Tente novamente mais tarde')
      }
    })
  }

  canDeactivate(): boolean{
    if(this.formChanged) {
      const confirmWindow = window.confirm("Você realmente quer sair?");
      
      if(!confirmWindow) {
        this.route.navigate([""]);
      }
    }
    return true;
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
