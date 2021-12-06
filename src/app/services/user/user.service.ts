import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { User } from 'src/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url='http://localhost:3000/api/users';
  private token: string = '';
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  createUser(user:User) {
    this.http.post(`${this.url}/signup`, user).subscribe((response) =>{
      console.log(response);
      this.router.navigate(['/login']);
    });
  }

  login(email: string, password: string) {
    this.http.post<{token: string; expiresIn: number}>(`${this.url}/login`, {email, password})
    .subscribe(response => {
      this.token = response.token;

      if(this.token !==''){
        const expirationInSeconds = response.expiresIn;
        this.setAuthTimer(expirationInSeconds);

        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);
        localStorage.setItem('expiration', expirationInSeconds.toString());
        this.authStatusListener.next(true);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expirationInSeconds * 1000);
        this.saveAuthData(this.token, expirationDate);
      }

      this.router.navigate(['/']);
    });
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated(){
    return this.isAuthenticated;
  }

  getToken(){
    return this.token;
  }

  logout(){
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(durationInSeconds: number){
    setTimeout(() =>{this.logout();
    }, durationInSeconds * 1000);
  }

  private clearAuthData(){
    localStorage.removeItem('toke');
    localStorage.removeItem('expireIn');
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token', this.token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  autoAuth(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn >0){
      this.token = localStorage.getItem('token')!;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expiration')!);

    if(!token || !expirationDate){
      return;
    }
    return { token:token, expirationDate:expirationDate}
  }

}
