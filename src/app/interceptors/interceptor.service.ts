import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'token-usuario': 'ABCDSDGS13241525125'
    });

    const reqClone = req.clone({
      headers,
      // params
    });
    return next.handle(req).pipe(
      catchError(this.manejarError)
    );
  }


  manejarError(error: HttpErrorResponse){
    console.log('Sucedió un error');
    console.log('Registrado en el log file');
    console.warn(error);
    return throwError(() => new Error('Error personalizado'))
  }

  
}
