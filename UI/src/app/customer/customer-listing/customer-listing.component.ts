import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})
export class CustomerListingComponent implements OnInit, AfterViewInit {
  get selectedId() { return sessionStorage.getItem('selectedId') }
  customers: Customer[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'middleName', 'email', 'action'];
  
  // dataSource: Customer[] = [...this.customers];
  dataSource = new MatTableDataSource<Customer>(this.customers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Customer>;

  constructor(private customerService: CustomerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(res => { 
      this.customers = res;
      // this.dataSource = [...this.customers];
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
      this.table.renderRows();
    });
  }

  addData() {
    const dialogRef = this.dialog.open(CustomerEditComponent, {
      width: '800px',
      height: '500px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.customers.unshift(result);
      this.table.renderRows();
    });
  }

  editCustomer(customer: Customer) {

    sessionStorage.setItem('selectedId', JSON.stringify(customer.id));

    const dialogRef = this.dialog.open(CustomerEditComponent, {
      width: '800px',
      height: '500px',
      data: { customer: customer },
    });

    dialogRef.afterClosed().subscribe(result => {
      customer = result;
      const index = this.customers.findIndex(x => x.id == customer.id);
      
      if (index > -1) {
        this.customers[index] = customer;
        this.dataSource = new MatTableDataSource<Customer>(this.customers);
        this.table.renderRows();
      }
    });
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomerById(id).subscribe(() => {
      const index = this.customers.findIndex(x => x.id == id);
      if (index > -1) {
        this.customers.splice(index, 1);
        // this.dataSource = [...this.customers];
        this.dataSource = new MatTableDataSource<Customer>(this.customers);
        this.table.renderRows();
      }
    })
  }

  reloadData() {
    sessionStorage.removeItem('selectedId');
    this.getCustomers();
  }
}
