import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalParamsDto } from './modal-params.dto';
import { ModalSharedService } from 'src/app/services/modal-shared.service';

@Component({
  selector: 'app-basic-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() params!: ModalParamsDto;
  @Input() buttonText: string = 'Download';
  file!: File;

  constructor(public activeModal: NgbActiveModal, private modalShared: ModalSharedService) {}

  confirm() {
    if(this.params.importFile){
      this.modalShared.setData(this.file)
    }
    this.activeModal.close();
  }

  onChange(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  }
}
