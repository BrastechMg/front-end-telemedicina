import { Component, HostListener} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { BaseComponentInterface } from 'src/app/components/base.component.interface';
import { CustomerDto } from 'src/app/models/dto/customer.dto';
import { SharedService } from 'src/app/services/shared.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sign-up',
  providers: [],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})  
export class SignUpComponent extends BaseComponentInterface {
  formSignUp!: FormGroup;
  formAddress!: FormGroup;
  isNotSubmited: any;
  submitedValue: any;
  clicked: boolean = false;
  cpfValid!: string;
  btnText: string = 'CONTINUAR';
  mask: string = 'CPF_CNPJ';
  cpf: string = "";
  customerData!: CustomerDto;
  private formChanged: boolean = false;
  canChangeRoute: boolean = false;
  logoPath: string | SafeUrl = '/assets/default-logo.png';

  constructor(
    private formBuilder: FormBuilder, 
    private route: Router,
    private shared: SharedService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer,
    private toastService: ToastBasicService
   ) 
   {
    super()
  }

  ngOnInit(): void {
    this.createCustomerForm(new CustomerDto());
    this.shared.sharedValue$.subscribe(value => {
     this.cpf = value;   
    })
    this.getLogo()
  }
  
  createCustomerForm(customer: CustomerDto){
    this.formSignUp = this.formBuilder.group({
    name: new FormControl(customer.name, [Validators.required]),
    cpf: new FormControl(customer.cpf, [Validators.required, Validators.minLength(11)]),
    bornDate: new FormControl(customer.bornDate, [Validators.required]),
    cnpj: [customer.cnpj]
  });
}

  onSubmit() {
    this.setCustomerData();
    if(this.customerData.cpf?.length != 11) {
      this.cpfValid = "Insira um CPF válido!"; 
      return;
    }
    if(this.formSignUp.get('name')?.hasError('required') || 
    this.formSignUp.get('cpf')?.hasError('required') || 
    this.formSignUp.get('bornDate')?.hasError('required')) {
      this.isNotSubmited = 'O campo não pode estar em branco!';
      return;
    }
        
        this.formChanged = false;
        this.submitedValue = this.customerData;
        this.shared.setSharedValue(this.submitedValue);
        this.route.navigate(['/token-validation']);
  }

  setCustomerData() {
    this.customerData = {
      ...this.formSignUp.value,
      cpf: this.formSignUp.get('cpf')?.value.replaceAll('.', '').replaceAll('-', ''),
      cnpj: localStorage.getItem("CNPJ")
    }
  }

  onInput() {
    this.formChanged = true;
  }

  @HostListener('window:beforeunload', ['$event'])
  showConfirmMessage($event: any) { 
    if(this.formChanged) {
      const confirmationMessage = "Você realmente quer sair?"
      $event.returnValue = confirmationMessage;      
      } 
    this.canChangeRoute = true;
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
        error: () => {
          this.toastService.error("Um erro inesperado ocorreu ao buscar a logo, tente novamente mais tarde!","Um erro ocorreu!") 
        }
      })
    }
  }
}