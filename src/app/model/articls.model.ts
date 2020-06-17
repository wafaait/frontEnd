export  class Articl {
  id:number;
  name:string;
  description:string;
  datePublication:Date;
  selected:boolean;
  available:boolean;
  photoName:string;
  _links:{
    self:{
      href:string
    },
    articl:{
      href:string
    },
    category:{
      href:string
    }
  }



}
