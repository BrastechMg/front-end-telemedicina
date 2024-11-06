import { ComponentFixture, TestBed } from "@angular/core/testing";

import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PaymentMethodRegisterComponent } from "./payment-method-register.component";

describe('BirthdayQuizComponent', () => {
  let fixture: ComponentFixture<PaymentMethodRegisterComponent>;
    let component: PaymentMethodRegisterComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaymentMethodRegisterComponent]
        })
        .compileComponents();
    
        fixture = TestBed.createComponent(PaymentMethodRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })


    it('shoul create it', () => {
        expect(component).toBeTruthy;
    })
});