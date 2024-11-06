import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupGuardService {
  canChangeRoute: boolean = false;

  constructor() { }

  showConfirmMessage($event: any, formChanged: boolean) {
    console.log($event);
  }
}
