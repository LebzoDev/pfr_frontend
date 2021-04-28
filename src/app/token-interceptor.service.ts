import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private injector: Injector,private auth:AuthServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // console.log('requete avant:');
    // console.log(request);
    let authService = this.injector.get(AuthServiceService);
       
    let tokenizedReq = request.clone({
      setHeaders : {
        Authorization: `Bearer ${authService.getToken()}`,
        Accept: 'application/json'
      }
    })
    // console.log('requete apres:');
    // console.log(tokenizedReq);
   
    if(!this.auth.getToken()){
      tokenizedReq = request;
    }
    return next.handle(tokenizedReq);
  }
}
