import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UrlBuilderService } from "../url.builder";

@Injectable()
export class ProductService {
  constructor(
    private http: HttpClient,
    private urlbuilder: UrlBuilderService
  ) { }

  listAllProducts() {
    return this.http
      .get<any>(
        this.urlbuilder.listProducts()
      )
      .toPromise();
  }
  changePictureProducts(formData:any,id:string) {
    return this.http
      .post<any>(
        this.urlbuilder.changePictureProducts(id),formData
      )
      .toPromise();
  }
  saveProduct(data:any) {
    return this.http
      .post<any>(
        this.urlbuilder.saveProduct(),data
      )
      .toPromise();
  }
  updateProduct(data:any,id:string) {
    return this.http
      .put<any>(
        this.urlbuilder.updateProduct(id),data
      )
      .toPromise();
  }

  readByIdProduct(id:string) {
    return this.http
      .get<any>(
        this.urlbuilder.readByIdProduct(id)
      )
      .toPromise();
  }
  saveEntry(data:any,id:string) {
    return this.http
      .post<any>(
        this.urlbuilder.saveEntry(id),data
      )
      .toPromise();
  }
  saveExit(data:any,id:string) {
    return this.http
      .post<any>(
        this.urlbuilder.saveExit(id),data
      )
      .toPromise();
  }
}
