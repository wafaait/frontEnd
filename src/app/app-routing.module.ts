import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticlsComponent} from './articls/articls.component';
import {LoginComponent} from './login/login.component';
import {ArticlDetailComponent} from './articl-detail/articl-detail.component';
import {CaddiesComponent} from './caddies/caddies.component';
import {CaddyItemComponent} from './caddy-item/caddy-item.component';
import {BeneficiaireComponent} from './beneficiaire/beneficiaire.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {NewArticlComponent} from './new-articl/new-articl.component';



const routes: Routes = [
  {path:'articls/:p1/:p2',component:ArticlsComponent},
  {path:'',redirectTo:'articls/1/0',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'articl-details/:url',component:ArticlDetailComponent},
  {path:'caddies',component:CaddiesComponent},
  {path:'caddy',component:CaddyItemComponent},
  {path:'beneficiaire',component:BeneficiaireComponent},
  {path:'OrderDetail',component:OrderDetailComponent},
  {path:'newArticl',component:NewArticlComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
