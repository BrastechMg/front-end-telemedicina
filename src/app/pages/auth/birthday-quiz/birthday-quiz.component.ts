import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AttemptService } from 'src/app/services/attempt.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-birthday-quiz',
  templateUrl: './birthday-quiz.component.html',
  styleUrls: ['./birthday-quiz.component.scss']
})
export class BirthdayQuizComponent implements OnInit {
  isDayValidation: boolean = true;
  isMonthValidation: boolean = false;
  isYearValidation: boolean = false;
  sortedDaysArray!: string[];
  sortedMonthsArray!: string[];
  sortedYearsArray!: string[];
  date!: string;
  selectedDay!: EventTarget | null;
  selectedMonth!: EventTarget | null;
  selectedYear!: EventTarget | null;
  name!: string; 
  cpf!: string; 
  logoPath: string | SafeUrl = '/assets/default-logo.png';

  constructor(
    private toastr: ToastBasicService,
    private router: Router,
    private sharedService: SharedService,
    private attemptService:AttemptService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer
  ){ }

  ngOnInit(): void {
    this.getUserData()
    this.startQuiz() 
    this.getLogo()
  }

  getUserData(){
    this.sharedService.sharedValue$.subscribe(value=> {
      this.date = value?.customerData?.bornDate;
      this.cpf = value?.customerData.cpf;
      this.name = value.customerData.name;
  })
  }

  startQuiz(){
    this.sortDays()
    this.sortMonths()
    this.sortYears()
  }

  sortDays(){
    const rangedArray = this.getRangedDays(this.date)
    this.sortedDaysArray = this.shuffleArray(rangedArray)
  }

  sortMonths(){
    const rangedArray = this.getRangedMonths(this.date)
    this.sortedMonthsArray = this.shuffleArray(rangedArray)
  }

  sortYears(){
    const rangedArray = this.getRangedYears(this.date)
    this.sortedYearsArray = this.shuffleArray(rangedArray)
  }

  changeValidate(){
    if(this.isDayValidation && (this.selectedDay as HTMLInputElement).value != undefined){ 
      this.isMonthValidation = true
      this.isDayValidation = false
    }
    else if(this.isMonthValidation && (this.selectedMonth as HTMLInputElement).value != undefined){
      this.isMonthValidation = false
      this.isYearValidation = true
    }
  }

  shuffleArray(array: any[]): any[]{
    const shuffledArray = array.slice();

    // Aplica o algoritmo de Fisher-Yates
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }

  getRangedDays(dateString: string): string[]{
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    const dayOfMonth = date.getUTCDate();
    const result: string[] = [];

    if (dayOfMonth <= 2) {
      for (let i = dayOfMonth; i <= Math.min(31, dayOfMonth + 4); i++) {
          result.push(i.toString().padStart(2, '0'));
      }
    } 
    else if (dayOfMonth >= 30) {
      for (let i = Math.max(1, dayOfMonth - 4); i <= dayOfMonth; i++) {
        result.push(i.toString().padStart(2, '0'));
      }
    } 
    else {
      for (let i = Math.max(1, dayOfMonth - 2); i <= Math.min(31, dayOfMonth + 2); i++) {
        result.push(i.toString().padStart(2, '0'));
      }
    }

    return result;
  }

  getRangedMonths(dateString: string): string[]{
    const [year, month, day] = dateString.split('-').map(Number);
    const result: string[] = [];

    for (let i = -2; i <= 2; i++) {
      let newMonth = month + i;
      if (newMonth < 1) {
          newMonth += 12;
      } else if (newMonth > 12) {
          newMonth -= 12;
      }
      result.push(newMonth.toString().padStart(2, '0'));
    }

    return result;
  }

  getRangedYears(dateString: string){
    const [year] = dateString.split('-').map(Number);
    const result: string[] = [];

    for (let i = year - 2; i <= year + 2; i++) {
      result.push(i.toString());
    }

    return result;
  }

  validateDate(){
     const year = this.selectedYear as HTMLInputElement;
     const month = this.selectedMonth as HTMLInputElement;
     const day = this.selectedDay as HTMLInputElement;
     const selectedDate = `${year.value}-${month.value}-${day.value}`;

    if((this.selectedDay as HTMLInputElement).value == undefined){
      return
    }
    if(selectedDate == this.date){
      this.resetAttemptsQuiz()
    } 
    else {
      this.sendAttemptAndVerifyIfIsBlocked() 
    }    
  }

   sendAttemptAndVerifyIfIsBlocked() {
      this.attemptService.sendAttemptsQuiz(this.cpf).subscribe({
       next: (resRemainingChances : any) => {   
          const attemptsRemaining = resRemainingChances.attemptsRemaining;                 
          this.toastr.info(`Data inválida! Você tem ${attemptsRemaining} chances!`, 'Data Incorreta!')
          this.router.navigate(['']);
       }, error: () => {
         this.toastr.error("Entre em contato com suporte para prosseguir", "Usuário BLoqueado!")
         this.router.navigate([''])  
       }
     })  
 }

   resetAttemptsQuiz() {
    this.attemptService.resetAttemptQuiz(this.cpf).subscribe({
      next: () => {
        this.router.navigate(['token-validation'])
      }, 
      error: () => {
        this.toastr.error("tente novamente mais tarde!", "Não foi Possível Validar o Quiz")
      }   
    });
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

