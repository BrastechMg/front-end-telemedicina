import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  pageName: string = '';

  constructor(
    public router: Router,
    private location: Location,
    private pageService: PageService
  ){ }

  ngOnInit(): void {
    this.pageService.pageName$.subscribe((name) => {
      this.pageName = name;
    })
  }

  goBack() {
    this.location.back();
  }
}
