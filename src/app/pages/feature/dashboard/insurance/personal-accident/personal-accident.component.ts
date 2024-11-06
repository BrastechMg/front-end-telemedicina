import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page-service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-personal-accident',
  templateUrl: './personal-accident.component.html',
  styleUrls: ['./personal-accident.component.scss']
})
export class PersonalAccidentComponent {


  constructor(private toastService: ToastBasicService, private pageservice: PageService) {
    this.pageservice.setPageName('Acidente Pessoal');

  }

  functionalityNotCreated(){
    this.toastService.info("","Funcionalidade ainda não criada!")
  }
}
