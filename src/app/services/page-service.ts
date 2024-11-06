import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  // Cria um BehaviorSubject para armazenar o nome da página atual
  private pageNameSubject = new BehaviorSubject<string>(''); // Nome padrão
  pageName$ = this.pageNameSubject.asObservable(); // Observable para ser usado em outros componentes

  // Método para atualizar o nome da página
  setPageName(name: string) {
    this.pageNameSubject.next(name);
  }
}