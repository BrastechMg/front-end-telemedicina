import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-card',
  templateUrl: './insurance-card.component.html',
  styleUrls: ['./insurance-card.component.scss']
})
export class InsuranceCardComponent {
  @Input() title: string = '';
  @Input() coverImg: string = '';
  @Input() navigateLink: string = '';

  constructor(
    public router: Router
  ){

  }
}
