import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InsuranceModalParams } from './insurance-modal-params';

@Component({
  selector: 'app-insurance-modal',
  templateUrl: './insurance-modal.component.html',
  styleUrls: ['./insurance-modal.component.scss']
})
export class InsuranceModalComponent {
  @Input() params!: InsuranceModalParams

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close();
  }
}
