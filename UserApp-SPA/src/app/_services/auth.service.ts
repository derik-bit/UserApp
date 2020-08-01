import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiUrl;
    decodedToken: any;

    constructor(private http: HttpClient) { }

    login(model: any) {
        return this.http.post(this.baseUrl + 'auth/login', model)
          .pipe(
            catchError(err => {
              console.error('Unable to login', err);
              throw err;
            }),
            map((response: any) => {
              localStorage.setItem('token', response.user.userName);
              this.decodedToken = response.user.userName;
            })
          );
      }
}
