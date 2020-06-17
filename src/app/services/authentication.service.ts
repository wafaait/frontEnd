import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public users=[
    {username:'admin',password:'1234',roles:['ADMIN','USER','DONNEUR']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']},
  ]
  public authenticated:boolean;
  public  userAutheticated;
  public token:string;

  constructor() { }
  public login(username:string,password:string){
    let user=undefined;
    this.users.forEach(u=>{
      if (u.username==username && u.password==password){
        user=u;
        this.token= btoa(JSON.stringify({username:u.username,roles:u.roles}));
      }
    });
    if (user){
      this.authenticated=true;
      this.userAutheticated=user;
    }
    else {
      this.authenticated=false;
      this.userAutheticated=undefined;
    }
  }
  public  idAdmin(){
    if (this.userAutheticated){
      if (this.userAutheticated.roles.indexOf('ADMIN')> -1){
        return true;
      }
      return  false;
    }
  }
  public  saveAutheticatedUser(){
    if(this.userAutheticated){
      localStorage.setItem('authToken',this.token);
    }
  }
  public loadAuthenticatedUserFromLocalStorage(){
    let t=localStorage.getItem('authToken');
    if (t){
      let user=JSON.parse(atob(t));
      console.log(user);
      this.userAutheticated={username:user.username,roles:user.roles};
      console.log(this.userAutheticated);
      this.authenticated=true;
      this.token=t;

    }

  }
  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.authenticated=false;
    this.token=undefined;
    this.userAutheticated=undefined;
  }
  isAuthenticated(){
    return this.authenticated;
  }
}
