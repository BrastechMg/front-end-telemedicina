import { ComponentFixture, TestBed } from "@angular/core/testing";

import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DownloadButtonComponent } from "./download-button.component";

describe('BirthdayQuizComponent', () => {
  let fixture: ComponentFixture<DownloadButtonComponent>;
    let component: DownloadButtonComponent;
    let httpClient = inject(HttpClient);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DownloadButtonComponent]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(DownloadButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })


    it('shoul create it', () => {
        expect(component).toBeTruthy;
    })
});