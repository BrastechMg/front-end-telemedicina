import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocwayApiService } from 'src/app/services/docway-api.service';
import { AppointmentDto } from 'src/app/models/dto/appointment.dto';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-generalist',
  templateUrl: './generalist.component.html',
  styleUrls: ['./generalist.component.scss']
})
export class GeneralistComponent implements OnInit {
  //VARIABLES
  confirmSchedule!: boolean;
  schedulePath: string = '';
  dateList: any[] = [];
  dateObject: any[] = [];
  dateObj: any[] = []
  scheduleInfo: any = []
  formatedDate: any[] = []

  constructor(
    public router: Router, 
    private docwayApiService: DocwayApiService,
    private pageService: PageService
  ){
    this.pageService.setPageName('Telemedicina');
  }

  scheduleObject = {
    day: '',
    hour: ''
  }
  doctorType: string = ''; 


  //OBJECTS
  scheduleBody = {
    day: '',
    hour: ''
  }

  getScheduleGeneralist = {
    day: '',
    hour: ''
  } 

  ngOnInit(){
    this.docwayApiService.getGeneralistSchedule().subscribe({
      next:(res: any) => {
        
        this.dateList.push(res)
        this.dateObj = this.transformData(this.dateList[0])             
        this.confirmDayAndHour(this.dateObj)
        this.scheduleInfo = {
          id: 1,
        }

      }, error: (err) => {
        alert("Não foi possível obter a agenda, tente novamente mais tarde")
      }
    })    
  }

  //FUNCTIONS
  confirmDayAndHour(e: any): void{
    this.schedulePath = "Schedule" //apenas mostra o caminho para poder mostrar o component filho
    }

  transformData(dataList: any) {
    dataList.forEach((fullDate: any) => {     
      const date = new Date(fullDate);  
      const day = date.toLocaleDateString();
      const hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : + date.getMinutes());
      this.getScheduleGeneralist = {
        day,
        hour
      }  
      this.formatedDate.push(this.getScheduleGeneralist);
    });

    return this.agroupData(this.formatedDate);
  }

  agroupData(dataList: any[]) {
    const newArray = dataList.reduce((acc, {day, hour}) => {
      const index = acc.findIndex((item: any) => item.day === day)
      index === -1 ? acc.push({day, hour: [hour]}) : acc[index].hour.push(hour)
      return acc
    }, [])  
    return newArray; 
  }

  onConfirmDayAndHour(e: any){
    let dataInfo = e.target.value.split(',') 
    this.confirmSchedule = !this.confirmSchedule;
    const day = dataInfo[0]
    const hour = dataInfo[1]
    this.doctorType = '';
    this.schedulePath = 'confirmDate'

    this.scheduleObject = {
      day,
      hour
    }
  }

}

