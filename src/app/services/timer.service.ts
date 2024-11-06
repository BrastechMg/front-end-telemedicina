import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeLeftSubject: BehaviorSubject<number>;
  private intervalId: any;

  constructor() { 
    this.timeLeftSubject = new BehaviorSubject<number>(30);
    this.intervalId = null;
  }

  get tempoRestante$(): Observable<number> {
    return this.timeLeftSubject.asObservable();
  }

  startTimer(time: number = 0): void {
    if (this.intervalId !== null) return;

    this.intervalId = setInterval(() => {
      let currentTime = this.timeLeftSubject.value;
      
      if (currentTime > 0) {
        this.timeLeftSubject.next(currentTime - 1);
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  addTime(time: number = 30): void {
    const currentTime = this.timeLeftSubject.value;
    this.timeLeftSubject.next(currentTime + time);
  }
}
