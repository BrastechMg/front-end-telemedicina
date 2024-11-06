import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenizationCreditCardDTO } from 'src/app/models/dto/tokenizationCreditCardDTO';
import { CreditCardRegisterService } from 'src/app/services/asaas/credit-card-register.service';
import { SharedService } from 'src/app/services/shared.service';
import { CreditCardValidationService } from 'src/app/utils/credit-card-validation.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-payment-method-register',
  templateUrl: './payment-method-register.component.html',
  styleUrls: ['./payment-method-register.component.scss']
})
export class PaymentMethodRegisterComponent {
  paymentForm!: FormGroup;
  logoPath: string | SafeUrl = '/assets/default-logo.png';
  customerCpf!: string;
  nameValid: boolean = true;
  cardNumberLengthValid: boolean = true;
  CCVLengthValid: boolean = true;
  creditCardValid: boolean = true;
  dateValid: boolean = true;

  constructor(private formBuilder: FormBuilder, 
    private toast: ToastBasicService, 
    private service: CreditCardRegisterService,
    private sharedService: SharedService,
    private route: Router,
    private creditCardService: CreditCardValidationService){}

  ngOnInit(): void{
    this.createPaymentForm();
    this.sharedService.sharedValue$.subscribe(cpf => {
      this.customerCpf = cpf.login;
    })
  }

  createPaymentForm(): void {
    this.paymentForm = this.formBuilder.group({
      holderName: new FormControl('', Validators.required),
      number: new FormControl('', [Validators.minLength(13), Validators.required]),
      ccv: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dueDate: new FormControl('', Validators.required)
    })
  }

  validateInputsAndSubmit() {
    this.cardNumberLengthValid = !this.paymentForm.get('number')?.errors?.['minlength'];
    this.CCVLengthValid = !this.paymentForm.get('ccv')?.errors?.['minlength'];
    this.nameValid = !this.paymentForm.get('holderName')?.errors?.['required'];
    this.creditCardValid = !this.creditCardService.validate(this.paymentForm.get('number')?.value.replaceAll(" ", "")) 
    this.dateValid = this.verifyIfDateFildAreValid(); 
    
    if (this.verifyIfAllFildsAreValid()) this.submitForm();
  }

  verifyIfDateFildAreValid () {
    const transformedDate = this.paymentForm.value.dueDate.split('/').reverse().join('-'); 
    return new Date(transformedDate)
      .toString() != "Invalid Date";
  }

  verifyIfAllFildsAreValid(): boolean {
    return this.cardNumberLengthValid && this.CCVLengthValid 
    && this.nameValid && this.creditCardValid
    && this.dateValid
  }

  submitForm(): void {    
    const creditCardObject = this.transformFormToObject(this.paymentForm)!;
    this.service.registerCreditCard(creditCardObject).subscribe({
      next: () => {
        this.toast.sucess('', "Cadastro feito com Sucesso")
        this.route.navigate(['/password-creation']);
      }, error: () => {
        this.toast.error("Tente Novamente!", "Ocorreu um erro!")
      }
    })
  }

  transformFormToObject(paymentForm: FormGroup): void | TokenizationCreditCardDTO {
    if(paymentForm.valid) return  this.setObject(paymentForm); 
      return this.toast.warning("Insira os valores obrigatórios!", "Formulário Inválido")
  }

  setObject(paymentForm: FormGroup): TokenizationCreditCardDTO {
    const transformedDate = this.TransformDate(paymentForm.value.dueDate);
    const response: TokenizationCreditCardDTO = {
      cpf: this.customerCpf,
      creditCard: {
        holderName: paymentForm.value.holderName,
        ccv: paymentForm.value.ccv,
        number: paymentForm.value.number,
        expiryMonth: transformedDate.month,
        expiryYear: transformedDate.year,
      }
    }
    return response;
  }

  TransformDate(dateBody: string): {month: string, year:string} {
    let dateFormated = dateBody.split('/').reverse().join('-');
    const date = new Date(dateFormated);
    const month = (date.getMonth()+1).toString();
    const year = date.getFullYear().toString();
    return { month, year }
  }
}

