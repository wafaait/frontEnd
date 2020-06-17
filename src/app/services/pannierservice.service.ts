import { Injectable } from '@angular/core';
import {Articl} from '../model/articls.model';
import {Caddy} from '../model/caddy.model';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PannierserviceService {
  public articles:Articl[]=[];
  public caddies:Map<string,Caddy>=new Map<string, Caddy>();
  public  currentCaddyName:string='Caddy1';

  constructor( public authService:AuthenticationService) { }

  public addArticle(articl:Articl){
    this.articles.push(articl);
    this.saveCadies();

  }
  saveCadies(){
    let caddy=this.caddies[this.currentCaddyName];
    localStorage.setItem("myCaddy_"+this.authService.userAutheticated.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }


}
