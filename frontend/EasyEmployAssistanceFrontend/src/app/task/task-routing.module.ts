import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task.component';


const routes: Routes = [
  {
    path: '',
    component: TaskComponent
  },
  {
    path: 'check',
    loadChildren: () => import('../equipment-check/equipment-check.module').then(m => m.EquipmentCheckModule),
  },
  {
    path: 'quiz',
    loadChildren: () => import('../quiz/quiz.module').then(m => m.QuizModule),
  },
  {
    path: 'result',
    loadChildren: () => import('../result/result.module').then(m => m.ResultModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }