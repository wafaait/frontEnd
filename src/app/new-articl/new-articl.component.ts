import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {Articl} from '../model/articls.model';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-new-articl',
  templateUrl: './new-articl.component.html',
  styleUrls: ['./new-articl.component.css']
})
export class NewArticlComponent implements OnInit {

  public currentArticl;
  public editPhoto: boolean;

  selectedFiles;
  progress: number;
  currentFileUpload: any;
  public currentTime: number;  public mode: number=0;
  authService: any;

  constructor( public catalogueService:CatalogueService,authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  onSaveArticl(data:any){
    this.catalogueService.saveRessource(this.catalogueService.host+"/articls",data)
      .subscribe(res=>{
        // this.router.navigateByUrl("/articls");
        this.currentArticl=res;
        this.mode=2;
      },err=>{
        console.log(err);
      });
  }

  onNewArticl(){
    this.mode=1;
  }

  onSelectFile(event) {
    this.selectedFiles=event.target.files;

  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalogueService.uploadedPhotoArticl(this.currentFileUpload, this.currentArticl.id).subscribe(event => {
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


  onEditPhoto(a: Articl) {
    this.currentArticl=a;
    this.editPhoto=true;

  }
}
