import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss'],
})
export class RegisterUsersComponent implements OnInit {
  registerForm!: FormGroup;
  logoPath: string = 'assets/logo-reduzida-saude-ouro.png';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe(
        (response) => {
          console.log('Usuário registrado com sucesso', response);
          this.location.back();
        },
        (error) => {
          console.error('Erro ao registrar usuário', error);
        }
      );
    }
  }
}
