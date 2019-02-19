import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInvoicesComponent } from './invoices/list-invoices/list-invoices.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';

const routes: Routes = [
  { path: '', component: ListInvoicesComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: 'edit/:invoiceId', component: CreateInvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
