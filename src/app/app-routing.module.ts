import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomePageComponent } from './pages/auth/home-page/home-page.component';
import { RecoverPasswordComponent } from './pages/auth/recover-password/recover-password.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { PasswordPageComponent } from './pages/auth/password-page/password-page.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { DashboardComponent } from './pages/feature/dashboard/dashboard.component';
import { BookAppointmentComponent } from './pages/feature/dashboard/telemedicina/book-appointment/book-appointment.component';
import { TelemedicinaComponent } from './pages/feature/dashboard/telemedicina/telemedicina.component';
import { AppointmentsComponent } from './pages/feature/dashboard/telemedicina/appointments/appointments.component';
import { CompanyProductComponent } from './pages/feature/company-product/company-product.component';
import { ProductBenefitComponent } from './pages/feature/company-product/product-benefit/product-benefit.component';
import { CreateEditProductComponent } from './pages/feature/company-product/create-edit-product/create-edit-product.component';
import { CreateEditCardComponent } from './pages/feature/company-product/create-edit-card/create-edit-card.component';
import { AddBenefitiesComponent } from './pages/feature/company-product/add-benefities/add-benefities.component';
import { DetailedBenefitComponent } from './pages/feature/company-product/detailed-benefit/detailed-benefit.component';
import { DetailedProductComponent } from './pages/feature/company-product/detailed-product/detailed-product.component';
import { ProductSettingsComponent } from './pages/feature/company-product/product-settings/product-settings.component';
import { GeneralistComponent } from './pages/feature/dashboard/telemedicina/book-appointment/generalist/generalist.component';
import { SpecialistComponent } from './pages/feature/dashboard/telemedicina/book-appointment/specialist/specialist.component';
import { SpecialtyComponent } from './pages/feature/dashboard/telemedicina/book-appointment/specialist/specialty/specialty.component';
import { ScheduleComponent } from './pages/feature/dashboard/telemedicina/book-appointment/specialist/schedule/schedule.component';
import { CompanyContactComponent } from './pages/auth/company-contact/company-contact.component';
import { ProductClientsComponent } from './pages/feature/company-product/product-clients/product-clients.component';
import { ConfigServicesComponent } from './pages/feature/company-product/config-services/config-services.component';
import {
  authGuard,
  permissionCustomerGuard,
  productAuth,
} from './guards/auth.guard';
import { AccountComponent } from './pages/feature/account/account.component';
import { CompanyUsersComponent } from './pages/feature/company-users/company-users.component';
import { AddressRegisterComponent } from './pages/auth/sign-up/address-register/address-register.component';
import { TokenConfirmationComponent } from './pages/auth/sign-up/phone-email-confirmation/token-confirmation.component';
import { CreateCompanyComponent } from './pages/feature/create-company/create-company.component';
import { adressGuard } from './guards/signUp.guard';
import { ForbiddenComponent } from './components/auth-templates/forbidden/forbidden.component';
import { NotAuthorizatedComponent } from './components/auth-templates/not-authorizated/not-authorizated.component';
import { BirthdayQuizComponent } from './pages/auth/birthday-quiz/birthday-quiz.component';
import { FuneralInsuranceComponent } from './pages/feature/dashboard/insurance/funeral-insurance/funeral-insurance.component';
import { PersonalAccidentComponent } from './pages/feature/dashboard/insurance/personal-accident/personal-accident.component';
import { PrizeDrawPageComponent } from './pages/feature/dashboard/prize-draw-page/prize-draw-page.component';
import { MedicineDiscountComponent } from './pages/feature/dashboard/insurance/medicine-discount/medicine-discount.component';
import { PaymentMethodRegisterComponent } from './pages/auth/payment-method-register/payment-method-register.component';
import { LoginUsersComponent } from './pages/auth/login-users/login-users.component';
import { RegisterUsersComponent } from './pages/auth/register-users/register-users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'signup', component: SignUpComponent },
      { path: 'token-validation', component: TokenConfirmationComponent },
      {
        path: 'address-register',
        component: AddressRegisterComponent,
        canDeactivate: [adressGuard],
      },
      { path: 'login', component: LoginComponent },
      { path: 'login-users', component: LoginUsersComponent },
      { path: 'register-users', component: RegisterUsersComponent },
      { path: 'recover', component: RecoverPasswordComponent },
      { path: 'validate/first/access', component: RecoverPasswordComponent },
      { path: 'contact', component: CompanyContactComponent },
      { path: 'password-creation', component: PasswordPageComponent },
      { path: 'bithyday-validation', component: BirthdayQuizComponent },
      { path: 'payment', component: PaymentMethodRegisterComponent },
    ],
  },
  {
    path: 'feature',
    component: FeatureComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'book', component: BookAppointmentComponent },
      { path: 'book/generalist', component: GeneralistComponent },
      {
        path: 'book/specialist',
        component: SpecialistComponent,
        children: [
          { path: '', redirectTo: 'specialty', pathMatch: 'full' },
          { path: 'specialty', component: SpecialtyComponent },
          { path: 'schedule', component: ScheduleComponent },
        ],
      },
      {
        path: 'benefit/1',
        component: TelemedicinaComponent,
        canActivate: [productAuth],
      },
      {
        path: 'benefit/2',
        component: PrizeDrawPageComponent,
        canActivate: [productAuth],
      },
      {
        path: 'benefit/3',
        component: MedicineDiscountComponent,
        canActivate: [productAuth],
      },
      {
        path: 'benefit/4',
        component: FuneralInsuranceComponent,
        canActivate: [productAuth],
      },
      {
        path: 'benefit/5',
        component: PersonalAccidentComponent,
        canActivate: [productAuth],
      },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'recover-prescriptions', component: AppointmentsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'configuration-users', component: CompanyUsersComponent },
      { path: 'create-company', component: CreateCompanyComponent },

      //ROTAS FLUXO PRODUTO
      {
        path: 'company/products',
        component: CompanyProductComponent,
        canActivate: [permissionCustomerGuard],
      },
      {
        path: 'company/products/:productId/config-services',
        component: ConfigServicesComponent,
      },

      //ROTAS PARA CRIAR PRODUTO
      {
        path: 'company/products/create/config-services',
        component: ConfigServicesComponent,
      },
      {
        path: 'company/products/create',
        component: CreateEditProductComponent,
      },
      {
        path: 'company/products/create/card',
        component: CreateEditCardComponent,
      },
      {
        path: 'company/create/product-benefities',
        component: ProductBenefitComponent,
      },
      {
        path: 'company/products/create/add-benefities',
        component: AddBenefitiesComponent,
      },
      {
        path: 'company/products/create/add/benefit/:benefitId',
        component: DetailedBenefitComponent,
      },
      {
        path: 'company/products/create/remove/benefit/:benefitId',
        component: DetailedBenefitComponent,
      },
      {
        path: 'company/products/create/details',
        component: DetailedProductComponent,
      },

      //ROTAS PARA EDITAR PRODUTO
      {
        path: 'company/products/:productId',
        component: DetailedProductComponent,
      },
      {
        path: 'company/product/:productId/clients',
        component: ProductClientsComponent,
      },
      {
        path: 'company/products/settings/:productId',
        component: ProductSettingsComponent,
      },
      {
        path: 'company/edit/product-benefities/:productId',
        component: ProductBenefitComponent,
      },
      {
        path: 'company/products/:productId/edit/remove/benefit/:benefitId',
        component: DetailedBenefitComponent,
      },
      {
        path: 'company/products/:productId/edit/add/benefit/:benefitId',
        component: DetailedBenefitComponent,
      },
      {
        path: 'company/products/edit/add-benefities/:productId',
        component: AddBenefitiesComponent,
      },
      {
        path: 'company/products/edit/product/:productId',
        component: CreateEditProductComponent,
      },
      {
        path: 'company/products/edit/card/:productId',
        component: CreateEditCardComponent,
      },
      {
        path: 'company/products/:productId/add/benefit/:benefitId',
        component: DetailedBenefitComponent,
      },
      {
        path: 'company/products/edit/product/:productId',
        component: CreateEditProductComponent,
      },
      {
        path: 'company/products/edit/card/:productId',
        component: CreateEditCardComponent,
      },
    ],
  },
  {
    path: 'funeral',
    component: FuneralInsuranceComponent,
    canActivate: [productAuth],
  },
  { path: '403', component: ForbiddenComponent },
  { path: '401', component: NotAuthorizatedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
