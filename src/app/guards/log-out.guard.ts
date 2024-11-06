import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

export const logOutGuard: CanDeactivateFn<SidebarComponent> = (component: SidebarComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return component.checkIfCanLeave ? component.checkIfCanLeave() : true;
};
