import {assertNumber} from "@angular/core/src/render3/assert";

export class Menu {

  id: number;
  categoryFk: number;
  mainId: number;
  name: string;
  description: string;
  price?:number;
  img?:string;
}
