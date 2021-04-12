import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './component';
import { ProductReadComponent } from './read/component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: ':id', component: ProductReadComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
