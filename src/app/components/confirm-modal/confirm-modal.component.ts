import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponentParams } from './confirm-modal-params';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() params!: ConfirmModalComponentParams;


  constructor( public activeModal: NgbActiveModal){

  }

  confirm() {
    this.activeModal.close();
  }

}
