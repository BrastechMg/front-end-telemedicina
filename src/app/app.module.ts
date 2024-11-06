import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { CourseService } from './services/course.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentService } from './services/student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { TableComponent } from './components/table/table.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColumnComponent } from './components/table/column/column.component';
import { IconComponent } from './components/icon/icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomePageComponent } from './pages/auth/home-page/home-page.component';
import { RecoverPasswordComponent } from './pages/auth/recover-password/recover-password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { PasswordPageComponent } from './pages/auth/password-page/password-page.component';
import { CpfCnpjValidator } from './utils/cpf-cnpj.validator';
import { FeatureComponent } from './pages/feature/feature.component';
import { DashboardComponent } from './pages/feature/dashboard/dashboard.component';
import { TelemedicinaComponent } from './pages/feature/dashboard/telemedicina/telemedicina.component';
import { AppointmentsComponent } from './pages/feature/dashboard/telemedicina/appointments/appointments.component';
import { BookAppointmentComponent } from './pages/feature/dashboard/telemedicina/book-appointment/book-appointment.component';
import { GeneralistComponent } from './pages/feature/dashboard/telemedicina/book-appointment/generalist/generalist.component';
import { SpecialistComponent } from './pages/feature/dashboard/telemedicina/book-appointment/specialist/specialist.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CompanyProductComponent } from './pages/feature/company-product/company-product.component';
import { BenefitCardComponent } from './components/benefit-card/benefit-card.component';
import { ProductBenefitComponent } from './pages/feature/company-product/product-benefit/product-benefit.component';
import { CreateEditProductComponent } from './pages/feature/company-product/create-edit-product/create-edit-product.component';
import { CreateEditCardComponent } from './pages/feature/company-product/create-edit-card/create-edit-card.component';
import { AddBenefitiesComponent } from './pages/feature/company-product/add-benefities/add-benefities.component';
import { DetailedBenefitComponent } from './pages/feature/company-product/detailed-benefit/detailed-benefit.component';
import { DetailedProductComponent } from './pages/feature/company-product/detailed-product/detailed-product.component';
import { ProductSettingsComponent } from './pages/feature/company-product/product-settings/product-settings.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SpecialtyComponent } from './pages/feature/dashboard/telemedicina/book-appointment/specialist/specialty/specialty.component';
import { ScheduleComponent } from './pages/feature/dashboard/telemedicina/book-appointment/specialist/schedule/schedule.component';
import { CompanyContactComponent } from './pages/auth/company-contact/company-contact.component';
import { ProductClientsComponent } from './pages/feature/company-product/product-clients/product-clients.component';
import { ConfigServicesComponent } from './pages/feature/company-product/config-services/config-services.component';
import { EncryptAndDecrypt } from './utils/encrypt-and-decrypt';
import { AccountComponent } from './pages/feature/account/account.component';
import { CompanyUsersComponent } from './pages/feature/company-users/company-users.component';
import { AddressRegisterComponent } from './pages/auth/sign-up/address-register/address-register.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthTemplatesComponent } from './components/auth-templates/auth-templates.component';
import { ForbiddenComponent } from './components/auth-templates/forbidden/forbidden.component';
import { NotAuthorizatedComponent } from './components/auth-templates/not-authorizated/not-authorizated.component';
import { SignupGuardService } from './services/guard-services/signup-guard.service';
import { InterceptorService } from './services/interceptors/interceptor.service';
import { CreateCompanyModalComponent } from './pages/feature/create-company/create-company-modal/create-company-modal.component';
import { CancelAppointmentModalComponent } from './pages/feature/dashboard/telemedicina/appointments/cancel-appointment-modal/cancel-appointment-modal.component';
import { BirthdayQuizComponent } from './pages/auth/birthday-quiz/birthday-quiz.component';
import { CreateCompanyComponent } from './pages/feature/create-company/create-company.component';
import { TokenConfirmationComponent } from './pages/auth/sign-up/phone-email-confirmation/token-confirmation.component';
import { TimerService } from './services/timer.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoaderInterceptorService } from './services/interceptors/loader-interceptor.service';
import { AppointmentDetailsModalComponent } from './pages/feature/dashboard/telemedicina/appointments/appointment-details-modal/appointment-details-modal.component';
import { SlowLoaderComponent } from './components/loaders/slow-loader/slow-loader.component';
import { FastLoaderComponent } from './components/loaders/fast-loader/fast-loader.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FuneralInsuranceComponent } from './pages/feature/dashboard/insurance/funeral-insurance/funeral-insurance.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { InsuranceComponent } from './pages/feature/dashboard/insurance/insurance.component';
import { InsuranceCardComponent } from './components/insurance-card/insurance-card.component';
import { PersonalAccidentComponent } from './pages/feature/dashboard/insurance/personal-accident/personal-accident.component';
import { PrizeDrawPageComponent } from './pages/feature/dashboard/prize-draw-page/prize-draw-page.component';
import { InsuranceModalComponent } from './components/insurance-modal/insurance-modal.component';
import { MedicineDiscountComponent } from './pages/feature/dashboard/insurance/medicine-discount/medicine-discount.component';
import { ErrorInterceptorService } from './services/interceptors/error-interceptor.service';
import { LoginUsersComponent } from './pages/auth/login-users/login-users.component';
import { RegisterUsersComponent } from './pages/auth/register-users/register-users.component';
import { PaymentMethodRegisterComponent } from './pages/auth/payment-method-register/payment-method-register.component';
import { ReasonModalComponent } from './components/reason-modal/modal.component';
@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    TableComponent,
    ColumnComponent,
    IconComponent,
    ModalComponent,
    LoginComponent,
    HomePageComponent,
    RecoverPasswordComponent,
    SidebarComponent,
    HeaderComponent,
    SignUpComponent,
    PasswordPageComponent,
    FeatureComponent,
    DashboardComponent,
    BackButtonComponent,
    TelemedicinaComponent,
    AppointmentsComponent,
    CompanyProductComponent,
    BenefitCardComponent,
    ProductBenefitComponent,
    CreateEditProductComponent,
    CreateEditCardComponent,
    AddBenefitiesComponent,
    DetailedBenefitComponent,
    DetailedProductComponent,
    ProductSettingsComponent,
    BookAppointmentComponent,
    GeneralistComponent,
    SpecialistComponent,
    SpecialtyComponent,
    ScheduleComponent,
    TokenConfirmationComponent,
    AddressRegisterComponent,
    ProductClientsComponent,
    AccountComponent,
    CompanyContactComponent,
    ConfigServicesComponent,
    CompanyUsersComponent,
    AddressRegisterComponent,
    PaginationComponent,
    CreateCompanyComponent,
    CreateCompanyModalComponent,
    CancelAppointmentModalComponent,
    BirthdayQuizComponent,
    AuthTemplatesComponent,
    ForbiddenComponent,
    NotAuthorizatedComponent,
    SlowLoaderComponent,
    FuneralInsuranceComponent,
    DownloadButtonComponent,
    InsuranceComponent,
    InsuranceCardComponent,
    AppointmentDetailsModalComponent,
    FastLoaderComponent,
    PersonalAccidentComponent,
    ConfirmModalComponent,
    PrizeDrawPageComponent,
    InsuranceModalComponent,
    MedicineDiscountComponent,
    LoginUsersComponent,
    RegisterUsersComponent,
    LoginUsersComponent,
    RegisterUsersComponent,
    PaymentMethodRegisterComponent,
    ReasonModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    CourseService,
    StudentService,
    CpfCnpjValidator,
    BookAppointmentComponent,
    provideNgxMask(),
    SpecialtyComponent,
    EncryptAndDecrypt,
    PasswordPageComponent,
    SignupGuardService,
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    TimerService,
    ToastrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
