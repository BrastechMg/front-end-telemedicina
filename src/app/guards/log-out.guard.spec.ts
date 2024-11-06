import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { logOutGuard } from './log-out.guard';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

describe('logOuted in logOutGuard should', () => {
  // const executeGuard: CanDeactivateFn<SidebarComponent> = (...guardParameters) => 
  //     TestBed.runInInjectionContext(() => logOutGuard(...guardParameters));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  // });

  // it('should be created', () => {
  //   expect(executeGuard).toBeTruthy();
  // });
});
