import { Component } from '@angular/core';
import { ModalParamsDto } from 'src/app/components/modal/modal-params.dto';
import { PageService } from 'src/app/services/page-service';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';

@Component({
  selector: 'app-prize-draw-page',
  templateUrl: './prize-draw-page.component.html',
  styleUrls: ['./prize-draw-page.component.scss']
})
export class PrizeDrawPageComponent {
  constructor(private toastService: ToastBasicService, private pageservice: PageService) {
    this.pageservice.setPageName('Sorteio de Prêmios');

  }

  functionalityNotCreated(){
    this.toastService.info("","Funcionalidade ainda não criada!")
  }
}
