import { Component } from '@angular/core';
import { ModalParamsDto } from 'src/app/components/modal/modal-params.dto';
import { PageService } from 'src/app/services/page-service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-funeral-insurance',
  templateUrl: './funeral-insurance.component.html',
  styleUrls: ['./funeral-insurance.component.scss']
})
export class FuneralInsuranceComponent {
  constructor(private toastService: ToastBasicService, private pageservice: PageService) {
    this.pageservice.setPageName('Seguro Funeral');

  }

  functionalityNotCreated(){
    this.toastService.info("","Funcionalidade ainda não criada!")
  }
}
