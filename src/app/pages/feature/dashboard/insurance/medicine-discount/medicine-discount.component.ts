import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-medicine-discount',
  templateUrl: './medicine-discount.component.html',
  styleUrls: ['./medicine-discount.component.scss']
})
export class MedicineDiscountComponent {

  constructor(private pageSerice: PageService) {
    this.pageSerice.setPageName('Desconto em Medicamentos');
  }

}
