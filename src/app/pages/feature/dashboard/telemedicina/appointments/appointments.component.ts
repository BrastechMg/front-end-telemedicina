import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GetAppointmentsDto } from 'src/app/models/dto/getAppointments.dto';
import { DocwayApiService } from 'src/app/services/docway-api.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { CancelAppointmentModalComponent } from './cancel-appointment-modal/cancel-appointment-modal.component';
import { Router } from '@angular/router';
import { AppointmentStatus } from 'src/app/models/dto/appointments-status.dto';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { AppointmentDetailsModalComponent } from './appointment-details-modal/appointment-details-modal.component';
import { environment } from 'src/environments/environment';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit{
  userData: any;
  appointmentsList!: any;
  modalRef!: NgbModalRef;
  isPrescriptionsPage: boolean = false;
  pageTitle: string = 'Meus agendamentos'
  pageIcon: string = 'calendar_month';
  localStorageKey: string = environment.localStorageKey
  constructor(
    private docwayService: DocwayApiService,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private modalService: NgbModal,
    public router: Router,
    private toastr: ToastBasicService,
    private pageService: PageService
  ){
    this.pageService.setPageName('Telemedicina');
  }

  ngOnInit(): void {
    this.getRouteElements();
    this.getUserData()
    if(this.isPrescriptionsPage){
      this.getPassedFilteredAppointments(this.userData.id)  
      return;
    }
    this.getFutureFilteredAppointments(this.userData.id)
  }

  getRouteElements(){
    let route = this.router.url;

    if(route == '/feature/recover-prescriptions'){
      this.pageTitle = 'Recuperar receitas/prescrições';
      this.pageIcon = 'prescriptions';
      this.isPrescriptionsPage = true
    }
  }

  getUserData(): void{
    const encryptedData = localStorage.getItem('encryptedLoginData')

    if(encryptedData){
      this.userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey);
    }
  }

  getAllAppointments(id: number): void{
    this.docwayService.getAllAppointments(id).subscribe({
      next: (res: any) => {
        this.appointmentsList = res;
      },
      error: (err) => {
        this.appointmentsList = [];
        this.toastr.error('Ocorreu um erro na busca de agendamentos, tente novamente mais tarde!', "Não foi possível buscar os agendamentos!");
      }
    })
  }
  
  getFutureFilteredAppointments(customerId: number): void{
    this.docwayService.getFilteredAppointments({customerId, appointmentStatusCodeList: [AppointmentStatus.CREATED, AppointmentStatus.IN_PROCESS]}).subscribe({
      next: (res: any) => {
        this.appointmentsList = res;
      },
      error: (err) => {
        this.appointmentsList = []
        this.toastr.error('Ocorreu um erro na busca de agendamentos, tente novamente mais tarde!', "Não foi possível buscar os agendamentos!")
      }
    })
  }

  getPassedFilteredAppointments(customerId: number): void{
    this.docwayService.getFilteredAppointments({customerId, appointmentStatusCodeList: [AppointmentStatus.CANCELED_BY_DOCTOR, AppointmentStatus.FINISHED, AppointmentStatus.CANCELED_BY_PATIENT, AppointmentStatus.CANCELED_BY_SYSTEM]}).subscribe({
      next: (res: any) => {
        this.appointmentsList = res.reverse();
      },
      error: (err) => {
        this.appointmentsList = []
        this.toastr.error('Ocorreu um erro na busca de agendamentos, tente novamente mais tarde!', "Não foi possível buscar os agendamentos!")
      }
    })
  }

  cancelAppointment(index: number){
    const appointmentId = this.appointmentsList[index].appointmentId

    this.modalRef = this.modalService.open(CancelAppointmentModalComponent)
    this.modalRef.componentInstance.params = {
      title: 'Cancelar agendamento',
      message: 'Escreva o motivo para o cancelamento.',
      appointmentId
    };
    this.modalRef.closed.subscribe((res: any) => {
      this.getFutureFilteredAppointments(this.userData.id)
    })
  }

  openAppointmentDetailsModal(index: number){
    const appointmentId = this.appointmentsList[index].appointmentId
    this.modalRef = this.modalService.open(AppointmentDetailsModalComponent)
    this.modalRef.componentInstance.appointmentId = appointmentId;
  }

  getAppointmentDate(index: number): string{
    let data = new Date(this.appointmentsList[index].dateAppointment); 
    return data.toLocaleDateString();
  }

  getAppointmentHour(index: number): string{
    let hour = new Date(this.appointmentsList[index].dateAppointment).getHours();
    let minutes = new Date(this.appointmentsList[index].dateAppointment).getMinutes().toLocaleString().padStart(2, '0');
    return `${hour}:${minutes}`;
  }
}
