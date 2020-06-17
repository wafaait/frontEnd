import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ArticlsComponent } from './articls/articls.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { ArticlDetailComponent } from './articl-detail/articl-detail.component';
import { CaddiesComponent } from './caddies/caddies.component';
import { CaddyItemComponent } from './caddy-item/caddy-item.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NewArticlComponent } from './new-articl/new-articl.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlsComponent,
    LoginComponent,
    ArticlDetailComponent,
    CaddiesComponent,
    CaddyItemComponent,
    BeneficiaireComponent,
    OrderDetailComponent,
    NewArticlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
