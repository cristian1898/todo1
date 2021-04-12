import { Component, OnInit } from "@angular/core";

import { ProductService } from "./service";



@Component({
  selector: "app-product",
  styleUrls: ["styles.scss"],
  templateUrl: "./template.html",

})
export class ProductComponent implements OnInit {
  products: any;
  search: string ='';
  loading: boolean = true;
  modalUp: boolean = false;
  modalUpCreate: boolean = false;
  file: any = null;
  id: string = '';
  newScroll: any = null;
  backend: string = `${window.location.protocol}//${window.location.hostname}:3001/public/`
  name:string='';
  reference:string='';
  description: string = '';
  save: boolean = false;
  message: string = '';
  toast: boolean = false;
  constructor(
    private service: ProductService,
  ) {

  }

  ngOnInit() {
    console.log(window.location.hostname, '--------',
      window.location.protocol)
    this.service.listAllProducts().then(resp => {
      console.log(resp)
      this.products = resp.reverse();
      this.loading = false;
    })
    this.newScro()
  }
  onChange(event:any) {
    this.file = event.target.files[0];
}
onUpload() {
  this.loading = true;
  console.log(this.file);
  const formData = new FormData();
  formData.append("file", this.file, this.file.name);
  this.service.changePictureProducts(formData, this.id).then(resp => {
    this.modalUp = false;
    this.service.listAllProducts().then(resp => {
      console.log(resp)
      this.products = resp.reverse();
      this.loading = false;
    })
  })

}
newScro() {
  this.newScroll = window.scrollY;
  console.log(this.newScroll);
};
  saveUpdateProduct() {
    const obj = {
      name:this.name,reference : this.reference,description :this.description
    }
    if (this.save) {
      this.service.saveProduct(obj).then(resp => {
        console.log(resp);
        this.modalUpCreate = false;
        this.modalUp = false;
        if (resp && resp.mgs) {
          this.message = resp.mgs;
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);

        }
        this.clearData();
      }).catch(e => {
        console.log(e,'---')
        this.modalUp = false;
        this.modalUpCreate = false;
        if (e && e.error?.msg) {
          this.message = e.error.msg;
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }

      })
    } else {
      this.service.updateProduct(obj, this.id).then(resp => {
        console.log(resp);
        this.modalUp = false;
        this.modalUpCreate = false;
        if (resp && resp.msg) {
          this.message = resp.msg;
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }
        this.clearData()
      }).catch(e => {
        console.log(e,'---')
        this.modalUp = false;
        this.modalUpCreate = false;
        if (e && e.error?.msg) {
          this.message = e.error.msg;
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 3000);
        }

      })
      }
  }
  assingData(product:any) {
       this.name = product.name;
       this.reference = product.reference;
    this.description = product.description;
    this.modalUpCreate = true;
  }
  clearData() {
    this.name = '';
    this.reference = '';
    this.description = '';

}

}
