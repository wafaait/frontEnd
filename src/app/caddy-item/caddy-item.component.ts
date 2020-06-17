import { Component, OnInit } from '@angular/core';
import {CaddyService} from '../services/caddy.service';
import {Articl} from '../model/articls.model';
import {Router} from '@angular/router';
import {Caddy} from '../model/caddy.model';
import {PannierserviceService} from '../services/pannierservice.service';

@Component({
  selector: 'app-caddy-item',
  templateUrl: './caddy-item.component.html',
  styleUrls: ['./caddy-item.component.css']
})
export class CaddyItemComponent implements OnInit {
  caddy: Caddy;
  articls:Articl[];

  constructor(public caddyService:CaddyService, private router:Router, public pannierservice:PannierserviceService) { }

  ngOnInit(): void {
    this.articls = this.caddyService.articls;
  }

  addToCady(article){
    this.caddyService.articls.push(article);
  }


  onRemoveArticlFromCaddy(a: Articl) {
    this.caddyService.removeArticl(a.id);

  }

  onNewOrder() {
    this.router.navigateByUrl("/beneficiaire");

  }
}
