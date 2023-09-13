import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";

const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private service: LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add the jwt token(local storage) into request header
        const token = this.service.getToken();
        let authReq = req;
        if (token != null) {
            authReq.clone({setHeaders:{TOKEN_HEADER:`Bearer ${token}`}});
        }

        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
]