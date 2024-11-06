import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InsuranceModalComponent } from '../insurance-modal/insurance-modal.component';
import { NgbModal, NgbModalRef, NgbNavContent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-benefit-card',
  templateUrl: './benefit-card.component.html',
  styleUrls: ['./benefit-card.component.scss']
})
export class BenefitCardComponent {
  @Input() isModal: boolean = false;
  @Input() modalComponent!: NgbNavContent;
  @Input() logoImg: string = '';
  @Input() benefitLogo: string = '';
  @Input() name: string = '';
  @Input() description: String = '';
  @Input() path: string = '';
  modalRef!: NgbModalRef;

  constructor(public router: Router, private modalService: NgbModal){} 
}
