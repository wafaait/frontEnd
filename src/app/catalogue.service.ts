import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Articl} from './model/articls.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public  host="http://localhost:8080"
  private jwtToken;



  constructor(private http: HttpClient) { }
  public  getRessource(url){
    return this.http.get(this.host+url);

  }
  public  getArticl(url):Observable<Articl>{
    return this.http.get<Articl>(url);

  }


  uploadedPhotoArticl(file:File,idArticl): Observable<HttpEvent<{}>> {
    let formData:FormData= new FormData();

    formData.append('file',file);
    const req=new HttpRequest('POST',this.host+'/uploadPhoto/'+idArticl,formData,{
      reportProgress:true,
      responseType:'text'
    });
    return this.http.request(req);

  }
  public saveRessource(url,data):Observable<Articl>{
    return this.http.post<Articl>(url,data);
  }


  patchResource(url: string, data: any) {
    return this.http.patch(url,data);

  }
  public getVille(){
    return this.http.get(this.host+"villes");
  }
  public getCategories(v){
    return this.http.get(v._links.categories.href);
  }

  public getArticls(page:number,size:number){
    return this.http.get(this.host+"/articls?page="+page+"&size="+size);
  }

  public getArticlsByKeyword(mc:string,page:number,size:number){

    return this.http.get(this.host+"/articls/search/chercherPage?mc="+mc+"&page="+page+"&size="+size);
  }
}
