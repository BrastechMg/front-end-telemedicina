import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InsuranceModalComponent } from 'src/app/components/insurance-modal/insurance-modal.component';
import { ModalParamsDto } from 'src/app/components/modal/modal-params.dto';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent {
  paramsTest: ModalParamsDto = {
    title: "teste",
    message: "string",
    confirmBtn: true,
    cancelBtn: true,
    importFile:false
  }
  modalRef! : NgbModalRef;
  isModalShow: boolean = false;

  constructor(private modalService: NgbModal, private router: Router, private pageService: PageService) {
    this.pageService.setPageName('Seguro');

  }

  showModal() {
    this.modalRef = this.modalService.open(InsuranceModalComponent)
    this.modalRef.componentInstance.params = {
      title: "Sorteio",
      message: `Benefícios Plano de Capitalização Participação em sorteio mensal, no último sábado de
      cada mês a partir do mês posterior ao pagamento da fatura. Valor bruto do sorteio: R$ 50.000,00.
      Você receberá da seguradora a cessão gratuita do direito à participação em 01 (um) sorteio mensal.
      Promoção Comercial vinculada a Títulos de Capitalização da modalidade incentivo emitidos por:
      APLUB CAPITALIZAÇÃO S/A, CNPJ/MF nº 88.076.302-0001/94 e Processo SUSEP nº 15414.900090/2019-64. Período:
      01/04/2019 a prazo indeterminado. Prêmio no valor bruto a ser deduzido Imposto de Renda - IR, conforme
      legislação em vigor. O regulamento está disponível em www.mbmseguros.com.br/condicoes- gerais/,
      Nome APL 02.993.000.469 e regras. A participação ocorrerá por meio do número da sorte, composto de forma aleatória por 5 (cinco) algarismos. Será contemplado o número da sorte vigente na data do sorteio, desde que esteja em dia com o pagamento do custo do seguro, cuja combinação de sorteio coincida com os números da coluna formada pelos algarismos da unidade simples dos 05 (cinco) primeiros prêmios extraídos pela Loteria Federal, lidos de cima para baixo, conforme exemplo a seguir: 1º prêmio: 15.945 - 2° prêmio: 46.729 - 3º prêmio: 53.008
      - 4º prêmio: 40.143 - 5º prêmio: 30.123 - NÚMERO CONTEMPLADO: 459.833.`,
      confirmBtn: 'Ok',
      cancelBtn: 'Cancelar'
    }

    // this.modalRef.closed.subscribe(res => {
    //   this.router:
    // })
  }
}
