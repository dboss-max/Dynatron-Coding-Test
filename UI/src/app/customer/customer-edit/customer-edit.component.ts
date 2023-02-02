import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {

  customer = {} as Customer;
  customerForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<CustomerEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.customerForm = this.fb.group({
      id: new FormControl(0),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if (this.data?.customer?.id) {
      this.customer = this.data.customer;
      this.customerForm.patchValue(this.customer);
    }
  }

  hasRequiredError(controlName: string) {
    const control = this.customerForm.get(controlName);
    return control != null && (control.dirty || control?.touched) && control?.hasError('required');
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const customer = this.customerForm.value;

    if (this.data?.customer?.id) { // edit customer
      this.customerService.updateCustomer(customer).subscribe(res => {
        this.dialogRef.close(res);
      });
    } 

     else { // create customer
      this.customerService.addCustomer(customer).subscribe(res => {
        this.dialogRef.close(res);
      })
     }
  }
}
