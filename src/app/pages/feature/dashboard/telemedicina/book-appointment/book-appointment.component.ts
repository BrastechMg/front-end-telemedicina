import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})

export class BookAppointmentComponent {
  doctorType!: string;
  hasclicked!: boolean;
  formatedDate:any[] = [];
  isClicked!: boolean;

    
 @Output() getScheduleGeneralist = {
      day : '',
      hour: '',
    }

 @Output() getScheduleSpecialist = {
      day : '',
      hour: '',
      unavailiability: ''
    }

  constructor(public router: Router, private pageService: PageService){
    this.pageService.setPageName('Telemedicina');
  }

  Onclick(e: any) {
    this.doctorType = e.target.value;
    this.hasclicked = !this.hasclicked
  }

  OnReturn(){
    this.doctorType = '';
    this.hasclicked = !this.hasclicked;
  }
  

  //Pega o array de datas da docway e tranforma em um novo array de objetos com dia e horário
  transformData(dataList: any){  
    let hasUnavailiability = false;
    dataList.forEach((fullDate: any) => {

      if(typeof fullDate.unavailiability !== 'undefined'){
        this.transformDataSpecialty(fullDate)
      } else {
        this.transformDataGeneralist(fullDate)
      }
    });

    return this.agroupData(this.formatedDate);
  }

  transformDataSpecialty(fullDate: any) {
    const date = new Date(fullDate);
    const day = date.toLocaleDateString();
    const hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : + date.getMinutes());
    const unavailiability = fullDate.unavailiability;
    this.getScheduleSpecialist = {
      day,
      hour,
      unavailiability

    } 

    this.formatedDate.push(this.getScheduleSpecialist);
  }

  transformDataGeneralist(fullDate: any) {
    const date = new Date(fullDate);
    const day = date.toLocaleDateString();
    const hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : + date.getMinutes());
    const unavailiability = fullDate.unavailiability;
    this.getScheduleSpecialist = {
      day,
      hour,
      unavailiability

    } 

    this.formatedDate.push(this.getScheduleSpecialist);
  }


 
  //pega o novoa array da função acima e agrupa horário por dias
  agroupData(dataList: any[]) {
    const newArray = dataList.reduce((acc, {day, hour}) => {
      const index = acc.findIndex((item: any) => item.day === day)
      index === -1 ? acc.push({day, hour: [hour]}) : acc[index].hour.push(hour)
      return acc
    }, [])  
    return newArray; 
  }

}
