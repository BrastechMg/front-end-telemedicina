import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BirthdayQuizComponent } from "./birthday-quiz.component";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

describe('BirthdayQuizComponent', () => {
  let fixture: ComponentFixture<BirthdayQuizComponent>;
    let component: BirthdayQuizComponent;
    let httpClient = inject(HttpClient);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BirthdayQuizComponent]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(BirthdayQuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })


    it('shoul call the function and return ok', () => {
        expect(component.resetAttemptsQuiz()).toContain;
    })
});