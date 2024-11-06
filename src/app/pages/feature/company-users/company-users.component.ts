import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PageService } from 'src/app/services/page-service';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.scss'],
})
export class CompanyUsersComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pageService: PageService
  ) {
    this.pageService.setPageName('Configurar usuários');
  }

  navigateToCreateUser(): void {
    this.router.navigate(['/register-users'], { relativeTo: this.route });
  }
}
