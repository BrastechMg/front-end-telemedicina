import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EncryptAndDecrypt } from 'src/app/utils/encrypt-and-decrypt';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { ClientService } from 'src/app/services/client.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { LoginUsernameDto } from 'src/app/models/dto/loginUsername.dto';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.scss'],
})
export class LoginUsersComponent {
  logoPath: string | SafeUrl = '/assets/default-logo.png';
  isPasswordShow: boolean = false;
  loginForm = this.formBuilder.group({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  submited: any;
  errorMessagePassword: any;
  login!: string;
  name!: string;
  localStorageKey: string = environment.localStorageKey;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private encryptAndDecrypt: EncryptAndDecrypt,
    private sharedService: SharedService,
    private clientService: ClientService,
    private sanitizer: DomSanitizer,
    private toastService: ToastBasicService
  ) {}

  submitLogin(): void {
    if (!this.isValidForm(this.loginForm)) {
      this.errorMessagePassword = 'Nome de usuário ou senha inválidos!';
      return;
    }

    this.submited = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password,
    };
    this.authService.loginUsername(this.submited).subscribe({
      next: (res: LoginUsernameDto) => {
        const encryptedData = this.encryptAndDecrypt.encryptData(
          res,
          this.localStorageKey
        );
        if (encryptedData) {
          localStorage.setItem('encryptedLoginData', encryptedData);
          this.router.navigate(['feature/dashboard']);
          return;
        }
      },
      error: (err) => {
        this.errorMessagePassword = 'Nome de usuário ou senha inválidos!';
      },
    });
  }

  handlePasswordView() {
    this.isPasswordShow = !this.isPasswordShow;
  }

  isValidForm(form: any) {
    if (!form.valid || form.value.password.startsWith(" ' ")) return false;

    return true;
  }

  getLogo() {
    const cnpj = localStorage.getItem('CNPJ');
    if (cnpj) {
      this.clientService.getLogoByCnpj(cnpj).subscribe({
        next: (blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.logoPath = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (err) => {
          this.toastService.error(
            'Um erro inesperado ocorreu ao buscar a logo, tente novamente mais tarde!',
            'Um erro ocorreu!'
          );
        },
      });
    }
  }
}
