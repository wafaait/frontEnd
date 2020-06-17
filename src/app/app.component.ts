import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {CaddyService} from './services/caddy.service';
import {Articl} from './model/articls.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ArticlDonnation-web';
  public categories;
  public villes;
  public currentVille;
  public currentCategorie;
  public articl:Articl;
  public timestamp:number=0;
  public size:number=5;
  public currentPage:number=0;
  public totalPages:number;
  public pages:Array<number>;
  private currentKeyword:string="";
  private articls:any;
  constructor(private catalogueService:CatalogueService,private router:Router,
              private authService:AuthenticationService,public caddyService:CaddyService,
              public catServise:CatalogueService) {
  }

  ngOnInit(): void {
    this.catalogueService.getVille()
      .subscribe(data=>{
        this.villes=data
      },err=>{
        console.log(err);
      })
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
    this.getVille();
  }

  private getCategories() {
    this.catalogueService.getRessource("/categories")
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err);

    })

  }
  private getVille() {

    this.catalogueService.getRessource("/villes")
      .subscribe(data=>{
        this.villes=data;
      },err=>{
        console.log(err);

      })

  }

  getArticlsByCat(c) {
    this.currentCategorie=c;
    this.router.navigateByUrl('/articls/2/'+c.id);
    this.catServise.getArticls(this.currentPage,this.size).subscribe(data=>{

      this.totalPages=data["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.articls =data;
    },err=>{
      console.log(err);
    })

  }
  getCategoriesbyVille(v){
    this.currentVille=v;

  }

  onSelectedArticls() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/articls/1/0");
  }

  onArticlDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/articls/3/0");

  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }

  onGetCategories(v) {
    this.articl=undefined;
    this.currentVille=v;
    this.catalogueService.getCategories(v)
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err);
      })

  }

  getTs() {
    return this.timestamp;
  }

  onPageArticl(i){
    this.currentPage=i;

  }


  onChercher(form: any) {
    this.currentKeyword=form.keyword;
    this.onChercherArticls();

  }
  onChercherArticls(){


    this.catServise.getArticlsByKeyword(this.currentKeyword,this.currentPage,this.size).subscribe(data=>{
      this.getArticlsByCat(this.currentCategorie);
      this.totalPages=data["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.articls=data;
    },err=>{
      console.log(err);
    })
  }
  onGetArticls(){
    this.catalogueService.getArticls(this.currentPage,this.size).subscribe(data=>{

      this.totalPages=data["page"].totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.articls=data;
    },err=>{
      console.log(err);
    })
  }
}
