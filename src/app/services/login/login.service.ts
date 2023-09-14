import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // current user who is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  public generateTokenByLogin(userDetails: any) {
    return this.http.post(`${baseUrl}/generate-token`, userDetails);
  }

  // save token in localstorage
  public saveTokenIntoLocalStorage(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  // save userdetails into local storage
  public saveUserIntoLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  // check that user is currently login or not
  public userIsLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == null || token == undefined || token == '') {
      return false;
    } else {
      return true;
    }
  }

  // logoutUser: remove token from local storage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // get token from localstorage
  public getToken() {
    return localStorage.getItem("token");
  }

  // get userdetails from localstorage
  public getUser() {
    let user = localStorage.getItem('user');

    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
