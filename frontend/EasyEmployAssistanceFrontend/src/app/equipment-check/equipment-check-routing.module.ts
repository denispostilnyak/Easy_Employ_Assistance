import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentCheckComponent } from './equipment-check.component';


const routes: Routes = [
  {
    path: '',
    component: EquipmentCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentCheckRoutingModule { }