import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DocwayApiService } from 'src/app/services/docway-api.service';
import { AppointmentDto } from 'src/app/models/dto/appointment.dto';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { ClientService } from 'src/app/services/client.service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { ScheduleDto } from 'src/app/models/dto/schedule.dto';
import { SpecialtyDto } from 'src/app/models/dto/specialty.dto';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReasonModalComponent } from 'src/app/components/reason-modal/modal.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{
  @Input() dateObj!: any;
  @Input() scheduleSpecialtyInfo!: any;
  @Input() scheduleDayAndHour!: any;
  @Input() SpecialtyDay!: any;
  @Input() specialtyId!: number;
  @Output() hourOutput: EventEmitter<string> = new EventEmitter<string>();
  @Input() specialistName: string = 'Clínico geral';
  @Input() schedulePath: string = '';
  specialyHour!: [String];
  scheduleInfo!: ScheduleDto;
  confirmSchedule!: boolean;
  isClicked!: boolean; 
  doctorType: string = ''; 
  expandedIndex: number = -1;
  clientData!: any;
  userId!: any;
  specialtyArray: SpecialtyDto[] = [];
  dayOfWeek: string[] = []
  weekday: string[] = ["Domingo", "Segunda Feira", "Terça Feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sábado",];
  isCollapsed: boolean[] = [];
  reason: string = "Motivo de vídeo";
  localStorageKey: string = environment.localStorageKey
  modalRef!: NgbModalRef;

  scheduleObject = {
    day: '',
    hour: ''
  }
  constructor( 
    private router: Router, 
    private docwayApiService: DocwayApiService,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private clientService: ClientService,
    private toastr: ToastBasicService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getClientData();
    this.getFormatedDays()   
  }
  
  getFormatedDays(){
    this.dateObj?.forEach((date:any) => {
    this.isCollapsed.push(true)
    const [day, month, year] = date.day.split("/").map(Number);
    const dateName = new Date(year, month - 1, day);
    this.dayOfWeek.push(this.weekday[dateName.getDay()])    
  })
}

  getClientData() {
    this.userId = this.getUserLocalStorageData()
    this.clientService.getCustomerDataById(this.userId).subscribe({
      next: (res) => {;   
        this.clientData = res;
      }, 
      error: () => {
        this.toastr.error("Não foi possível marcar o agendamento, tente novamente mais tarde", "")
      }
    })
  }

  onConfirmSchedule() { 
    this.docwayApiService.getPatientByCustomerId(this.userId).subscribe({
      next:(patientId: any) => {
          this.createAppointment(this.clientData, patientId);   
      }, 
      error: () => {
        this.createDocwayPatientAndBookAppointment(this.clientData);
      }
    });
  }

  createDocwayPatientAndBookAppointment(clientData: any){ 
      const {name, cpf} = this.clientData;
      this.docwayApiService.createPatient({name, cpf}, this.userId).subscribe({
        next: (patientData: any) => {
          const patientId = { patientId: patientData.id }
          this.createAppointment(clientData, patientId);
        }, error: (err) => {
          this.toastr.error("Ocorreu um erro ao criar o paciente, tente novamente mais tarde", "")
        }
      }) 
  } 
  
  createAppointment(clientData: any, patientId: any) {
    const appointmentForm = this.createAppointmentForm(clientData, patientId.patientId)
      this.docwayApiService.confirmVideoAppointment(appointmentForm, patientId.patientId).subscribe(res => {
        this.toastr.sucess("Consulta criada com sucesso!", "");
        this.router.navigate(['feature/appointments'])
      })
  }

  getUserLocalStorageData(){
    const encryptedData = localStorage.getItem('encryptedLoginData')
    let userData!: any;
    if(encryptedData){
      userData = this.encryptAndDecrypt.decryptData(encryptedData, this.localStorageKey);
    }
    return userData.id;
  }

  createAppointmentForm(clientData: any, patientId: string): AppointmentDto{
    let data = this.scheduleObject.day.replaceAll("/", "-");       
    let hour = this.scheduleObject.hour;        
    let appointmentDate = data.split('-').reverse().join('-') + "T" + hour + ":00";
   
    
    const appointment: AppointmentDto = {
      dateAppointment: appointmentDate,
      buyerId: patientId,
      specialty: {
        id: this.specialtyId,
      },
      address: {
        neighborhood: clientData.address.neighborhood,
        postalCode: clientData.address.cep,
        street: clientData.address.street,
        number: clientData.address.number,
        complement: clientData.address.complement,
        city: clientData.address.city,
        state: clientData.address.state
      },
      type: 6,
      reason: this.reason,
      contactNumber: clientData.phoneNumber,
    }
    return appointment;
  }

  expandAndCollapse(index: any) {
    this.expandedIndex = (this.expandedIndex === index) ? -1 : index;
  }
  
  onConfirmDayAndHour(e: any){
    let dataInfo = e.target.value.split(',') 
    this.confirmSchedule = !this.confirmSchedule;
    const day = dataInfo[0]
    const hour = dataInfo[1]
    this.doctorType = '';
    
    this.createReasonModal()

    this.scheduleObject = {
      day,
      hour
    }
  }

  onConfirmDayAndHourSpecialty(event: any){
    let eventValue = event.target.value;
    this.confirmSchedule = !this.confirmSchedule;
    const day = this.SpecialtyDay.split('-').reverse().join('-');
    const hour = eventValue;
    this.doctorType = '';

    this.scheduleObject = {
      day,
      hour
    }

    this.createReasonModal()
    
  }
  
  createReasonModal(): void {
    let options: NgbModalOptions = {backdrop: 'static'};
    this.modalRef = this.modalService.open(ReasonModalComponent, options);
    this.modalRef.componentInstance.params = {
      title: 'Informe o motivo da consulta',
      confirmBtn: true,
      cancelBtn: true,
    }
    this.getReasonText() 
  }

  getReasonText() {
    this.modalRef.result.then(
      (result) => {
        this.reason = result; 
        this.SendToConfirmSchedule()
      }
    );
  }

  SendToConfirmSchedule(){
    this.schedulePath = 'confirmSchedule'}

  onConfirmDay(date: any) {
    let formatedDate = date.replaceAll("/", "-").split("-").reverse().join("-");
    this.hourOutput.emit(formatedDate);
  }

  cancelAppointment(){
    this.router.navigate(['feature/dashboard'])
    this.toastr.info("Seu agendamento fo cancelado com sucesso.", "Agendamento cancelado com sucesso!")
  }
}

