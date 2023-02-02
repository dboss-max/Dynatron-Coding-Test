import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';

const routes: Routes = [
  { 
    path: 'listing',
    component: CustomerListingComponent
  },

  { 
    path: 'detail/:id',
    component: CustomerDetailComponent
  },

  { 
    path: 'edit/:id',
    component: CustomerEditComponent
  },

  {
    path: '**',
    redirectTo: 'listing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
