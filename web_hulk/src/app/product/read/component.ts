import { Component, OnInit } from "@angular/core";

import { ProductService } from "../service";



@Component({
  selector: "app-product",
  styleUrls: ["../styles.scss"],
  templateUrl: "./template.html",

})
export class ProductReadComponent implements OnInit {
  id: string = '';
  message: any;
  toast: boolean = false;
  obj: any = { items: null, unit: null, total: null, quantity: null };
  date: any;
  document: any;
  quantity: any;
  value_unit: any;
  modalUpCreate: boolean = false;
  modalUp: boolean = false;
  type: any;

  constructor(
    private service: ProductService,
  ) {

  }

  ngOnInit() {
    this.id = window.location.pathname.substring(1);
    this.service.readByIdProduct(this.id).then(resp => {

      if (resp && resp._id) {

        this.value_unit =
          this.obj.items = resp.entries.concat(resp.exits),
          this.obj.unit = resp.value_unit,
          this.obj.total = resp.value_total,
          this.obj.quantity = resp.quantity
        this.obj.items = this.obj.items.sort((a: any, b: any) => a.date > b.date)


      }
    }).catch(e => {


      if (e && e.error?.msg) {
        this.message = e.error.msg;
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 3000);
      }

    })
  }

  typeEntrada(e: any) {
    this.type = e

  }
  saveEntry() {
    const obj = {
      date: this.date,
      document: this.document,
      quantity: this.quantity,
      value_unit: this.value_unit,
      types: this.type
    }
    this.service.saveEntry(obj, this.id).then(resp => {

      this.modalUpCreate = false;
      this.modalUp = false;
      location.reload();
    }).catch(e => {

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
  saveExit() {
    const obj = {
      date: this.date,
      document: this.document,
      quantity: this.quantity,
      value_unit: this.obj.unit,
      types: this.type
    }
    this.service.saveExit(obj, this.id).then(resp => {

      this.modalUpCreate = false;
      this.modalUp = false;
      location.reload();
    }).catch(e => {

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
