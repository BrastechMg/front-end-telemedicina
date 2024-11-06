import { Component, Output } from '@angular/core';
import { ScheduleDto } from 'src/app/models/dto/schedule.dto';
import { SpecialtyDto } from 'src/app/models/dto/specialty.dto';
import { DocwayApiService } from 'src/app/services/docway-api.service';
import { BookAppointmentComponent } from '../../book-appointment.component';
import { Route, Router } from '@angular/router';
import { SpecialistComponent } from '../specialist.component';
import { SpecialistScheduleDTO } from 'src/app/models/dto/specialistSchedule.dto';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent {
  schedulePath: string ='';
  day!: string;
  specialtyArray: SpecialtyDto[] = [];
  specialtyId!: number;
  dateList: any[] = [];
  dateObj: any[] = [];
  scheduleSpecialtyId: any = [];
  formatedDate: any[] = [];
  formatedHourDate: any[] = [];
  scheduleBody!: ScheduleDto;
  specialtyName!: string;
  filteredSpecialty: any[] =[]

  constructor(
    private docwayApiService: DocwayApiService, 
    private headerSpeacialist: SpecialistComponent,
    private toastr: ToastBasicService, 
    private router: Router){
      
    }


  specialtyObj: SpecialtyDto = {
    id: 0,
    name: '',
    appointmentDurationInMinutes: 0
  }

  getScheduleSpecialist!: SpecialistScheduleDTO; 

  ngOnInit() {
    this.docwayApiService.getSpecialties().subscribe(
      {
        next: (specialtyList) => {           
          this.tranformSpecialtyData(specialtyList)
        }, error: (err) => {
          alert("Não foi possível obter as especialidades, tente novamente mais tarde")
        }
      }
    )
  }

  tranformSpecialtyData(specialtyArray: any) {
    specialtyArray.forEach((specialty: any) => {
      const id = specialty.id
      const name = specialty.name;
      const appointmentDurationInMinutes = specialty.appointmentDurationInMinutes;
    
      this.specialtyObj = {
        id,
        name,
        appointmentDurationInMinutes
      }
      this.specialtyArray.push(this.specialtyObj)
      });
  } 

  setScheduleBody(specialtyInfo: any) {
    this.specialtyName = specialtyInfo.target.textContent;
    this.headerSpeacialist.label = this.specialtyName;
    const id = specialtyInfo.target.value;
    let actualDate = new Date();
    const startAt = actualDate.toJSON().slice(0,10);
    const endAt = this.addDays(actualDate, 14);
       
    const scheduleBody: ScheduleDto = {
      id: +id,
      startAt,
      endAt
      }
  
    this.setIdToGetSchedule(id);
    this.getSpecialtySchedule(scheduleBody);
  }

  getSpecialtySchedule(specialtyInfo: any) {
    this.docwayApiService.getSpecialtiesScheduleById(specialtyInfo).subscribe(
      {
        next: (scheduleList: any) => {
          this.dateList.push(scheduleList);
          this.dateObj = this.transformDate(scheduleList).reduce((acc: any[], item: any) => {
            if(!item.unavailiability){
              acc.push(item)
            }
            return acc
          }, []);;
          this.schedulePath = 'confirmDayAvaliability';
        }
      }
    )
  }

  setIdToGetSchedule(id: number) {
    this.specialtyId = id;
  }

  addDays(actualDate: Date, days: number) {
    let result = new Date(actualDate);
    result.setDate(result.getDate() + days);
    const finalDate = result.toJSON().slice(0, 10);
    return finalDate;
  }

  transformDate(dateList: any) {
    dateList.forEach((fullDate: any) => {     
      const date = new Date(fullDate.date);
      const day = date.toLocaleDateString();
      const hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : + date.getMinutes());
      const unavailiability = fullDate.unavailiability;

      this.getScheduleSpecialist = {
        day,
        hour,
        unavailiability
      }
      
      this.formatedDate.push(this.getScheduleSpecialist);
    });
    return this.agroupData(this.formatedDate);
  }

  receiveHourData(day: any){
    this.day = day.target;
    this.schedulePath = 'confirmHourSchedule';
    this.day = day

    this.getScheduleDay(this.specialtyId, this.day);
  }


  getScheduleDay(id: number, day: string) {
    this.docwayApiService.getSpecialtiesScheduleDay(id, day).subscribe({
      next:(hourList: any) => {
        
        this.transformHourOfDate(hourList);
      }, 
      error:(err) => {
        this.toastr.error("Ocorreu um erro!", "Erro");
      }
    });
  }

  transformHourOfDate(hourList: any) {
    hourList.forEach((hour: Date) => {
      const date = new Date(hour)
      const hours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : + date.getMinutes());
      this.formatedHourDate.push(hours);
    })
    return;
  }

  agroupData(dataList: any[]) {
    const newArray = dataList.reduce((acc, {day, hour, unavailiability}) => {
      const index = acc.findIndex((item: any) => item.day === day)
      index === -1 ? acc.push({day, hour: [hour], unavailiability: unavailiability}) : acc[index].hour.push(hour, unavailiability)
      return acc
    }, [])  
    return newArray; 
  }

  filterSpeciality(filter: any){
    let lowerCaseFilter = filter.value.toLowerCase()
    this.filteredSpecialty = []
    this.specialtyArray.forEach(({name, id}) => {
      if(name?.toLowerCase().startsWith(lowerCaseFilter)){
        this.filteredSpecialty.push({id, name})
        return
      }
    })
  }

  goToGeneralist(){
    this.router.navigate(['/feature/book/generalist'])
  }

}


