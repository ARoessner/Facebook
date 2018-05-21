import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from '../app/app.component';
import { LoginComponent } from '../app/login/login.component';

const routes: Routes =[
  {
    path: '',
    component: LoginComponent
  }
];
@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
