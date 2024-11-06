import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor  {

  constructor(private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loaderService.show();
    

    return next.handle(req).pipe(finalize(() => {      
        this.loaderService.hide()
    } 
  ));
  }
}
