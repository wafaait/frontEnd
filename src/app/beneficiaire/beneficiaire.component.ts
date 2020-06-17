import { Component, OnInit } from '@angular/core';
import {CaddyService} from '../services/caddy.service';
import {Beneficiare} from '../model/beneficiare.model';
import {AuthenticationService} from '../services/authentication.service';
import {OrderService} from '../services/order.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Articl} from '../model/articls.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PannierserviceService} from '../services/pannierservice.service';



@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.css']
})
export class BeneficiaireComponent implements OnInit {
  public mode:number=0;
  panelStyle:string= "panel-default";
  public articls;
  id: number;

  constructor(public caddyService:CaddyService,
              private authService:AuthenticationService,
              public orderService:OrderService,
              private router:Router,
              private Httpclient:HttpClient,
              public pannierservice:PannierserviceService) {


  }
  public  getArticl(id){
     this.Httpclient.get('http://localhost:8080/articls/'+id)
       .subscribe((data)=>{
         this.articls=data;
       })

  }

  ngOnInit(): void {
    this.getArticl("");

  }

  onSaveBeneficiare(beneficiaire:Beneficiare) {
    beneficiaire.username=this.authService.userAutheticated.username;
    this.orderService.setBeneficiaire(beneficiaire);
    this.caddyService.setBeneficiaire(beneficiaire);
    //this.orderService.loadArticlsFromCaddy();
    this.pannierservice.articles;
    this.getArticl("");
    console.log(this.getArticl(""));




    this.mode=1;



  }

  onOrder() {
    this.orderService.submitOrder().subscribe(data=>{
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      this.panelStyle="panel-success";
    },err=>{
      console.log(err);
    });

  }

  onPayOrder() {
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }

  changementDePage(){

      this.router.navigate(['/OrderDetail']);

  }

  onSubmit(f: NgForm) {
    console.log(f.value);
  }
}
