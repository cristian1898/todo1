import { Injectable } from "@angular/core";


const DOMAIN = window.location.hostname + ':3001';
const PROTOCOL = window.location.protocol + "//";
/** Software Version string */

@Injectable()
export class UrlBuilderService {
  constructor() { }
  listProducts() {
    return PROTOCOL.concat(DOMAIN)
      .concat(`/products`);
  }
  changePictureProducts(id:string) {
    return PROTOCOL.concat(DOMAIN)
      .concat(`/product/${id}/upload`);
  }

  saveProduct() {
    return PROTOCOL.concat(DOMAIN)
      .concat(`/product`);
  }
  updateProduct(id:string) {
    return PROTOCOL.concat(DOMAIN)
      .concat(`/product/${id}`);
  }
  readByIdProduct(id:string){
    return PROTOCOL.concat(DOMAIN)
      .concat(`/product/${id}`);
  }
  saveEntry(id:string) {
    return PROTOCOL.concat(DOMAIN)
      .concat(`/entrie/${id}`);
  }
  saveExit(id:string) {
    return PROTOCOL.concat(DOMAIN)
      .concat(`/exit/${id}`);
  }


}
