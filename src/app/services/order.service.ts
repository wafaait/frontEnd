import { Injectable } from '@angular/core';
import {CaddyService} from './caddy.service';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../catalogue.service';
import {Beneficiare} from '../model/beneficiare.model';
import {Order} from '../model/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order=new Order();

  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatalogueService
  ) { }

  public setBeneficiaire(beneficiaire:Beneficiare){
    this.order.beneficiaire=beneficiaire;
  }
  public loadArticlsFromCaddy(){
    this.order.articls=[];
    for(let key in this.caddyService.getCurrentCaddy().items){
      this.order.articls.push(this.caddyService.getCurrentCaddy().items[key]);
    }

  }
  submitOrder() {
    return this.httpClient.post(this.catalService.host+"/orders",this.order);
  }
}
