import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../_services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      console.log("000");
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    request = request.clone({
      headers: request.headers.set(
        "Access-Control-Allow-Headers",
        "accept, Content-Type, orign"
      )
    });
    request = request.clone({
      headers: request.headers.set("Access-Control-Allow-Origin", "*")
    });
    request = request.clone({
      headers: request.headers.set(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
      )
    });
    request = request.clone({
      headers: request.headers.set("Access-Control-Allow-Credentials", "false")
    });

    console.log(request);
    return next.handle(request);
  }
}
