import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedValue = new BehaviorSubject<any>('');
  sharedValue$ = this.sharedValue.asObservable();
  constructor() { }

  setSharedValue(value: any) { 
    this.sharedValue.next(value);
  }
}
