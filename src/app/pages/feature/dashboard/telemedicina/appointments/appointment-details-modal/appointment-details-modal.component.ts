import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetAppointmentsDto } from 'src/app/models/dto/getAppointments.dto';
import { DocwayApiService } from 'src/app/services/docway-api.service';
import { PageService } from 'src/app/services/page-service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-appointment-details-modal',
  templateUrl: './appointment-details-modal.component.html',
  styleUrls: ['./appointment-details-modal.component.scss']
})
export class AppointmentDetailsModalComponent implements OnInit {
  @Input() appointmentId!: string;
  appointmentDetails!: GetAppointmentsDto | null;

  constructor(
    public activeModal: NgbActiveModal,
    private docwayService: DocwayApiService,
    private toastService: ToastBasicService,
    private pageService: PageService
  ){
    this.pageService.setPageName('Telemedicina');
  }

  ngOnInit(): void {
    this.getAppointmentDetails()
    
  }

  getAppointmentDetails(){
    this.docwayService.getDetailedAppointment(this.appointmentId).subscribe({
      next: (appointmentDetails: GetAppointmentsDto) => {
        this.appointmentDetails = appointmentDetails;
      },
      error: (err) => {
        this.activeModal.close()
        this.toastService.error("Infelizmente ocorreu um erro ao consultar os dados do atendimento, tente novamente mais tarde ou entre em contato com nosso suporte!","Ocorreu um erro ao buscar os dados da consulta!")
      }
    })
  }

  convertDate(date: any){
    const convertedDate = new Date(date)
    return convertedDate.toLocaleDateString()
  }

  convertStatus(status: any){
    switch(status) {
      case 7:
        return 'Finalizado'
      case 8:
        return 'Cancelado pelo sistema'
      case 10:
        return 'Cancelado pelo paciente'
      case 11:
        return 'Cancelado pelo médico'
      default:
        return ''
    }
  }

  convertAppointmentType(type: any){
    switch(type) {
      case 1:
        return 'Presencial'
      case 5:
        return 'Áudio'
      case 6:
        return 'Video'
      default:
        return ''
    }
  }
}
