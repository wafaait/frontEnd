import { Injectable } from '@angular/core';
import {Caddy} from '../model/caddy.model';
import {Articl} from '../model/articls.model';
import {Beneficiare} from '../model/beneficiare.model';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  public caddies:Map<string,Caddy>=new Map<string, Caddy>();
  public  currentCaddyName:string='Caddy1';
  public url="http://localhost:8080/caddies";
  public articl:Articl;
  public articls:Articl[];


  constructor( public authService:AuthenticationService,
              public http:HttpClient) {

    let caddies=localStorage.getItem("myCaddies");
    let caddy=new Caddy(this.currentCaddyName);
    this.caddies.set(this.currentCaddyName,caddy);
  }
  public addArticlToCaddy(articl:Articl):void{
    let caddy=this.caddies.get(this.currentCaddyName);
    let articlItem:Articl=caddy.items.get(articl.id);
    articlItem= new Articl();
    articlItem.id=articl.id;
    articlItem.datePublication=articl.datePublication;
    articlItem.name=articl.name;
    articlItem.available=articl.available;
    articlItem.description=articl.description;
    caddy.items.set(articl.id,articlItem);
    this.savetoCaddy(articl);


  }

  saveCadies(){
    let caddy=this.caddies[this.currentCaddyName];
    localStorage.setItem("myCaddy_"+this.authService.userAutheticated.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }
  public  getCurrentCaddy():Caddy{
    return this.caddies.get(this.currentCaddyName);
    console.log(this.articls);

  }

  removeArticl(id: number) :void{
    let caddy=this.caddies[this.currentCaddyName];
    delete caddy.items[id];
    this.savetoCaddy(this.articl);

  }

  public getCaddy():Caddy{
    let caddy=this.caddies[this.currentCaddyName];
    return caddy;
  }
  setBeneficiaire(beneficiaire: Beneficiare) {
    this.getCurrentCaddy().beneficiaire=beneficiaire;
    this.savetoCaddy(this.articl);
  }
  public savetoCaddy(articl:Articl):Observable<Articl>{
    return this.http.post<Articl>("http://localhost:8080/caddies",articl);
    console.log(articl);
  }
}
