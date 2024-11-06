import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditCardValidationService {

  constructor() { }
  
  validate(cardNumber: string): boolean {
    const arrayNumbers = cardNumber
    .split('')
    .reverse()
    .map(arrayNumbers => Number
    .parseInt(arrayNumbers));

    const lastDigit = arrayNumbers.shift();
    return this.sumDigits(arrayNumbers, lastDigit!)
  }

  sumDigits(arrayNumbers: number[], lastNumber: number) {
    let sum = arrayNumbers.reduce(
      (acc, val, i) => 
        i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val), 0
    );
    sum += lastNumber;   

    return sum % 10 === 0;
  }
}
