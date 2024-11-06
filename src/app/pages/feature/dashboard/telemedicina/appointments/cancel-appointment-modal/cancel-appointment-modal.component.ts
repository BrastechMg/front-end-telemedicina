import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelAppointmentModalParamsDto } from './cancel-appointment-modal-params.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocwayApiService } from 'src/app/services/docway-api.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-modal',
  templateUrl: './cancel-appointment-modal.component.html',
  styleUrls: ['./cancel-appointment-modal.component.scss']
})
export class CancelAppointmentModalComponent{
  @Input() params!: CancelAppointmentModalParamsDto;
  cancelForm!:FormGroup 
  isFormSubmited: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private docwayService: DocwayApiService,
    private toastr: ToastBasicService,
    private pageService: PageService
  ) {
    this.cancelForm = new FormGroup({
      cancelReason: new FormControl('', [Validators.required]),
    })
    this.pageService.setPageName('Telemedicina');
  }


  confirm() {
    this.isFormSubmited = true;
      if(this.cancelForm.valid){
        this.docwayService.cancelAppointment(this.params.appointmentId, {cancelReason: this.params.message}).subscribe({
          next: (res: any) => {
            this.activeModal.close();
            this.toastr.sucess('Consulta cancelada com sucesso!', '');
            console.log(res);
            this.isFormSubmited = false;
          },
          error: (err) => {
            this.activeModal.close();
            this.toastr.error('tente novamente mais tarde!', 'Ocorreu um erro para cancelar a consulta');
            this.isFormSubmited = false;
          }
        })
      }
  }
}
