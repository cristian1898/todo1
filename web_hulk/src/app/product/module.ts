import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "./service";
import { ProductComponent } from "./component";
import { ProductRoutingModule } from "./router.module";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductReadComponent } from './read/component';
@NgModule({
  declarations: [ProductComponent, ProductReadComponent],

  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [ProductService],
  exports: [],
})
export class ProductModule { }
