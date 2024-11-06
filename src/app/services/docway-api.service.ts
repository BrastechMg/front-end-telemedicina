import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { AppointmentDto } from '../models/dto/appointment.dto';
import { GetAppointmentsDto } from '../models/dto/getAppointments.dto';
import { CustomerDto } from '../models/dto/customer.dto';

@Injectable({
  providedIn: 'root'
})
export class DocwayApiService {
  generalist = '/docway/generalist/availibility'
  specialty = '/docway/specialties'
  userData: any;
  appointmentPath = '/appointments/'
  patientPath = '/patients/';

  constructor(private httpClient: HttpClient) {}
  createPatient(data: CustomerDto, id: number) {
    
    return this.httpClient.post(
      `${API_CONFIG.baseUrl}${this.patientPath}${id}`, 
      data
    );
  }

  getGeneralistSchedule(){
    return this.httpClient.get<AppointmentDto[]>(
      `${API_CONFIG.baseUrl}${this.appointmentPath}availability`
    )
  }

  getSpecialties(){
    return this.httpClient.get<AppointmentDto[]>(
      `${API_CONFIG.baseUrl}${this.appointmentPath}specialties`
    )
  }

  getSpecialtiesScheduleById({id, startAt, endAt}: any){
    return this.httpClient.get(
      `${API_CONFIG.baseUrl}${this.appointmentPath}specialties/${id}?startAt=${startAt}&endAt=${endAt}`
    )
  }

  getSpecialtiesScheduleDay(specialtyId: number, date: string) {
    return this.httpClient.get(
      `${API_CONFIG.baseUrl}${this.appointmentPath}availability/specialties/${specialtyId}?date=${date}`
    );
  }

  getPatientByCustomerId(id: number) {
    return this.httpClient.get(
      `${API_CONFIG.baseUrl}${this.patientPath}verify/${id}`
    )
  }

  getCustomerByCpf(cpf: number) {
    return this.httpClient.get(
      `${API_CONFIG.baseUrl}/customers/cpf/${cpf}`
    )
  }

  confirmVideoAppointment(body: AppointmentDto, patientId: string) {     
    return this. httpClient.post<AppointmentDto>(
      `${API_CONFIG.baseUrl}${this.appointmentPath}${patientId}`, 
      body
    )
  }

  getDetailedAppointment(appointmentId: string){
    return this.httpClient.get<GetAppointmentsDto>(
      `${API_CONFIG.baseUrl}${this.appointmentPath}${appointmentId}/details`
    )
  }

  getAllAppointments(clientId: number){
    return this.httpClient.get(
      `${API_CONFIG.baseUrl}${this.patientPath}${clientId}/appointments/${status}`
    )
  }

  getFilteredAppointments(filters: any){
    return this.httpClient.post(
      `${API_CONFIG.baseUrl}/patients`,
        filters,
    )
  }

  cancelAppointment(appointmentId: number, cancelReason: any){
    return this.httpClient.post(
      `${API_CONFIG.baseUrl}${this.appointmentPath}${appointmentId}/cancel`,
      cancelReason
    )
  }

}
