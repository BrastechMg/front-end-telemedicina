import { ActivatedRouteSnapshot, CanDeactivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AddressRegisterComponent } from '../pages/auth/sign-up/address-register/address-register.component';

export const adressGuard: CanDeactivateFn<AddressRegisterComponent> = (component: AddressRegisterComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return component.canDeactivate ? component.canDeactivate() : true;
}
