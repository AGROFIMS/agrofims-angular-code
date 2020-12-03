import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RespAuthentication, RespLogin, RespPassword, RespProfile, RespSignup } from '../models/resp';
import { Tokens } from '../models/tokens';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USERNAME = 'USERNAME';
  private loggedUser: string;

  baseUrl = environment.baseUrl;
  baseUrlAuth = environment.baseUrlAuth;

  environmentDev = (this.baseUrl.includes('dev') ? true : (this.baseUrlAuth.includes('localhost') ? true : false));

  constructor(private http: HttpClient) { }


  signup(user: {
    username: string,
    personTypeId: string,
    personTypeOther: string,
    firstName: string,
    lastName: string,
    affiliationId: string,
    affiliationName: string,
    affiliationNameOther: string,
    affiliationCenterId: string,
    orcid: string,
    country: string
  }): Observable<RespSignup> {
    const response = new RespSignup();
    return this.http.post<any>(`${this.baseUrlAuth}/signup`, user)
      .pipe(
        tap(
          (_response: RespSignup) => {
            response.flag = _response.flag;
            response.msg = _response.msg;
          }
        ),
        mapTo(response),
        catchError(error => {
          console.log(error);
          response.flag = error.error.flag;
          response.msg = error.error.msg;
          return of(response);
        })
      );
  }

  login(user: { username: string, password: string }): Observable<RespLogin> {
    const response = new RespLogin();
    if (user.username === 'admin' && user.password === 'Nv8HRBD8' && this.environmentDev) {
      const _tokens: Tokens = { jwt: 'jwt_admin', refreshToken: 'refreshToken_admin' };
      const _response: RespLogin = { flag: true, msg: 'Successful login!', tokens: _tokens };
      this.doLoginUser(user.username, _response.tokens);
      return Observable.of(new RespLogin()).map(() => _response);
    } else {
      return this.http.post<any>(`${this.baseUrlAuth}/login`, user)
        .pipe(
          tap(
            (_response: RespLogin) => {
              response.flag = _response.flag;
              if (response.flag) {
                response.msg = _response.msg;
                this.doLoginUser(user.username, _response.tokens);
              } else {
                response.msg = _response.msg;
              }
            }
          ),
          mapTo(response),
          catchError(error => {
            response.flag = error.error.flag;
            response.msg = error.error.msg;
            return of(response);
          })
        );
    }
  }

  // reset password
  password(user: { username: string }): Observable<RespPassword> {
    const response = new RespPassword();
    return this.http.post<any>(`${this.baseUrlAuth}/password`, user)
      .pipe(
        tap(
          (_response: RespPassword) => {
            response.flag = _response.flag;
            response.msg = _response.msg;
          }),
        mapTo(response),
        catchError(error => {
          response.flag = error.error.flag;
          response.msg = error.error.msg;
          return of(response);
        })
      );
  }

  // change password
  authentication(user: { username: string, oldPassword: string, newPassword: string }): Observable<RespAuthentication> {
    const response = new RespAuthentication();
    return this.http.post<any>(`${this.baseUrlAuth}/authentication`, user)
      .pipe(
        tap(
          (_response: RespAuthentication) => {
            response.flag = _response.flag;
            response.msg = _response.msg;
          }),
        mapTo(response),
        catchError(error => {
          response.flag = error.error.flag;
          response.msg = error.error.msg;
          return of(response);
        })
      );
  }

  profile(user: { username: string }): Observable<RespProfile> {

    const response = new RespProfile();
    if (user.username === 'admin' && this.environmentDev) {
      const _response: RespProfile = {
        emailAddress: 'admin',
        personTypeId: '',
        personTypeOther: '',
        firstName: 'Admin',
        lastName: '',
        affiliationId: '',
        affiliationName: '',
        affiliationNameOther: '',
        affiliationCenterId: '',
        orcid: '',
        country: '',
        image: ''
      };
      return Observable.of(new RespProfile()).map(() => _response);
    } else {
      return this.http.post<any>(`${this.baseUrlAuth}/profile`, user)
        .pipe(
          tap(
            (_response: RespProfile) => {
              response.emailAddress = _response.emailAddress;
              response.personTypeId = _response.personTypeId;
              response.personTypeOther = _response.personTypeOther;
              response.firstName = _response.firstName;
              response.lastName = _response.lastName;
              response.affiliationId = _response.affiliationId;
              response.affiliationName = _response.affiliationName;
              response.affiliationNameOther = _response.affiliationNameOther;
              response.affiliationCenterId = _response.affiliationCenterId;
              response.orcid = _response.orcid;
              response.country = _response.country;
              response.image = _response.image;
            }),
          mapTo(response)
        );
    }
  }

  logout(): Observable<boolean> {

    if (this.getUsername() === 'admin' && this.environmentDev) {
      this.doLogoutUser();
      return Observable.of(Boolean()).map(() => true);
    } else {
      return this.http.post<any>(`${this.baseUrlAuth}/logout`, {
        'refreshToken': this.getRefreshToken()
      }).pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
    }

  }

  isLoggedIn() {
    if (this.getUsername() === 'admin' && this.environmentDev) { return true; }
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${this.baseUrlAuth}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getUsername() {
    return localStorage.getItem(this.USERNAME);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
    this.storeUsername(username);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeUsername(username: string) {
    localStorage.setItem(this.USERNAME, username);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USERNAME);
  }

}
