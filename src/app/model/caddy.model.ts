
import {Articl} from './articls.model';
import {Beneficiare} from './beneficiare.model';

export class Caddy {

  constructor(name:string){this.name=name;}
  public name:string;
  public items:Map<number,Articl>=new Map();
  public beneficiaire:Beneficiare;

}
