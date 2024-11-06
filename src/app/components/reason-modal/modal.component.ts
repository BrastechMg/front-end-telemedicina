import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalParamsDto } from './modal-params.dto';
import { ModalSharedService } from 'src/app/services/modal-shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ReasonModalComponent {
  @Input() params!: ModalParamsDto;
  @Input() buttonText: string = 'Continuar';
  modalForm!: FormGroup;
  file!: File;
  
  constructor(
    public activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder
    ) {}
  
    ngOnInit() {
      this.createForm();
    }

    createForm() {
      this.modalForm = this.formBuilder.group ({
        reason: ['', Validators.required]
      })
    }

  confirm() {
    if(this.modalForm.valid) { 
      this.activeModal.close(this.modalForm.get('reason')?.value);
    }
  }
}
