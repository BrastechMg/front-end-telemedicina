import { ComponentFixture, TestBed } from "@angular/core/testing";

import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FastLoaderComponent } from "./fast-loader.component";


describe('BirthdayQuizComponent', () => {
  let fixture: ComponentFixture<FastLoaderComponent>;
    let component: FastLoaderComponent;
    let httpClient = inject(HttpClient);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FastLoaderComponent]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(FastLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })


    it('shoul create it', () => {
        expect(component).toBeTruthy;
    })
});