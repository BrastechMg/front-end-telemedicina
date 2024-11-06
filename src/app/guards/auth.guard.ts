import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/guard-services/auth-guard.service';
import { ToastBasicService } from '../utils/toastr.basic.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
  const router = inject(Router); 
 if( localStorage.getItem("encryptedLoginData") == null) {
  router.navigate(['/401']);  
  return false;
  }  
 return true;
};

export const permissionCustomerGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
  const service = inject(AuthGuardService);
  const router = inject(Router)
  const toastr = inject(ToastBasicService)
  const verifyRoleroleMethod = service.decryptData();

  if(verifyRoleroleMethod.role == "CUSTOMER") {
    toastr.error("Usuário não autorizado!", "Erro")
    router.navigate(['/403']);
    return false;
  }
  return true;
}

 export  const   productAuth: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  const guardService = inject(AuthGuardService);
  const toastr = inject(ToastBasicService)
  //TODO - testar a lógica para validar se cliente pode acessar produtos;
//   try {
//     const productService = await firstValueFrom(guardService.verifyProductsPermission());
//     const benefitList = productService.customerProducts.map((product: any, i: number) => product.productBenefits[i].id);
//     console.log(benefitList);
    
//     const routeId = Number(route.url[1].path) 

//   if(!benefitList.includes(routeId)) {
//      return  false;
// }

//   return true;
//   } catch (err) {
//     return false;
//   }
  return true
} 
