import {Beneficiare} from './beneficiare.model';
import {Articl} from './articls.model';

export class Order {
  public id:number;
  public beneficiaire:Beneficiare={name:"",address:"",phoneNumber:"",email:"",username:""};
  public articls:Array<Articl>=[];
  public date:Date;

}
