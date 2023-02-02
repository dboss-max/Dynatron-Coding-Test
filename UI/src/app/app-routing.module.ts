import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) 
  },

  {
    path: '**',
    redirectTo: 'customer',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
