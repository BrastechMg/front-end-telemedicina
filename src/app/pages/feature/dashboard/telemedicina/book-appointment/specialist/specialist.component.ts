import { Component, OnInit, Output } from '@angular/core';
import { SpecialtyComponent } from './specialty/specialty.component';
import { PageService } from 'src/app/services/page-service';
@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {
  @Output() label: string = "MÉDICO ESPECIALISTA"
  constructor(private pageService: PageService) {
    this.pageService.setPageName('Telemedicina');
  }

  ngOnInit() {
  }


}
