import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../catalogue.service';
import {Articl} from '../model/articls.model';
import {AuthenticationService} from '../services/authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-articl-detail',
  templateUrl: './articl-detail.component.html',
  styleUrls: ['./articl-detail.component.css']
})
export class ArticlDetailComponent implements OnInit {
  public currentArticl;
  public editPhoto: boolean;

  selectedFiles;
  progress: number;
  currentFileUpload: any;
  public currentTime: number;  public mode: number=0;

  constructor(private router:Router, private route:ActivatedRoute,public catalService:CatalogueService,public authService:AuthenticationService) { }

  ngOnInit(): void {
    let url=atob(this.route.snapshot.params.url);
    this.catalService.getArticl(url).subscribe(data=>{
      this.currentArticl=data;

    })

  }

  onEditArticl() {
    this.mode=1;

  }

  onEditPhoto(a: Articl) {
    this.currentArticl=a;
    this.editPhoto=true;

  }

  onSelectFile(event) {
    this.selectedFiles=event.target.files;

  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalService.uploadedPhotoArticl(this.currentFileUpload, this.currentArticl.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined

  }

  onAddArticlToCaddy(currentArticl: Articl) {

  }

  getTs() {
    return this.currentTime;
  }



  onUpdateArticl(data) {
    let url=this.currentArticl._links.self.href;
    this.catalService.patchResource(url,data)
      .subscribe(d=>{
        this.currentArticl=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }



}
