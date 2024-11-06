import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-telemedicina',
  templateUrl: './telemedicina.component.html',
  styleUrls: ['./telemedicina.component.scss']
})
export class TelemedicinaComponent {
  constructor(public router: Router, private pageService: PageService) {
    this.pageService.setPageName('Telemedicina');
    
  }
}
