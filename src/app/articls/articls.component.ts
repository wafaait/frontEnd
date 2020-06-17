import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Articl} from '../model/articls.model';
import {CaddyService} from '../services/caddy.service';
import {PannierserviceService} from '../services/pannierservice.service';

@Component({
  selector: 'app-articls',
  templateUrl: './articls.component.html',
  styleUrls: ['./articls.component.css']
})
export class ArticlsComponent implements OnInit {
  public articls;
  public editPhoto: boolean;
  public currectArticl: any;
  public selectedFiles;
  public progress: number;
  public currentFileUploaded: any;
  public title:String;
  public timestamp:number=0;
  public available;
  public villes;


  constructor(
    public catServise:CatalogueService,
    public route:ActivatedRoute, private router:Router,
    public authService:AuthenticationService,
    public  caddyService:CaddyService,
    public pannierservice:PannierserviceService,

  ) {}

  ngOnInit(): void {
    this.catServise.getVille()
      .subscribe(data=>{
        this.villes=data;
      },err=>{
        console.log(err);
      })
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);
        let p1=this.route.snapshot.params.p1;
        if(p1==1){
          this.title="Sélection";
          this.getArticls('/articls/search/selectedarticls');

        }
        else if (p1==2){
          let NameCat=this.route.snapshot.params.p2;
          this.title="Articls de la Catégorie"+NameCat;
          this.getArticls('/categories/'+NameCat+'/articls');
        }
        else if (p1==3){
          this.title="Articls disponibles"
          this.getArticls('/articls/search/dispoArticls');
        }
        else if (p1==5){
          this.getArticls('/articls/search/dispoArticls');
        }
      }
    });
    let p1=this.route.snapshot.params.p1;
    if(p1==1) {
      this.title="Articls recherchés"
      this.getArticls('/articls/search/selectedarticls');
    }
  }

  private getArticls(url) {
    this.catServise.getRessource(url)
      .subscribe(data=>{
        this.articls=data

      },err=>{
        console.log(err);
      })
  }

  onEditPhoto(a) {
    this.currectArticl=a;
    this.editPhoto=true;

  }


  onSelectedFile(event) {
    this.selectedFiles=event.target.files;

  }


  uploadPhoto() {

    this.progress=0;
    this.currentFileUploaded=this.selectedFiles.item(0);
    this.catServise.uploadedPhotoArticl(this.currentFileUploaded,this.currectArticl.id)
      .subscribe(event =>{
        if (event.type=== HttpEventType.UploadProgress){
          this.progress=Math.round(100* event.loaded / event.total);
          console.log(this.progress);
        }else if (event instanceof HttpResponse){
         //this.getArticls('/articls/search/selectedarticls');
          this.timestamp=Date.now();
         //location.reload();

        }
      },err=>{
        alert("Problème de chargement");
      })

    this.selectedFiles=undefined

  }

  getTs() {
    return this.timestamp;
  }

   public idAdmin() {
    return this.authService.idAdmin();
  }

  onArticlDetails(a:Articl) {
    let url=btoa(a._links.articl.href);
    this.router.navigateByUrl("articl-details/"+url);


  }

  onAddArticlToCaddy(a: Articl) {
    //this.caddyService.addArticlToCaddy(a);
    this.pannierservice.addArticle(a);
    console.log(this.pannierservice.articles);

  }
}
