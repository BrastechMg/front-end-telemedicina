import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastBasicService } from 'src/app/utils/toastr.basic.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private toastService: ToastBasicService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorObject: HttpErrorResponse) => {
        const errorMessage = `Código do erro: ${errorObject.status}\nMensagem: ${errorObject.message}`;

        if(errorObject.status === 401 && errorObject.error === "Token expired or invalid!"){
          this.toastService.error("Seu token de acesso foi expirado, por favor faça login novamente.","Token de acesso expirado!")
          localStorage.clear()
          this.router.navigate([''])
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
