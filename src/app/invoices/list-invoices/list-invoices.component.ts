import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Invoice } from '../Invoice.model';
import { InvoicesService } from '../invoices.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.scss']
})
export class ListInvoicesComponent implements OnInit, OnDestroy {

  invoices: Invoice[] = [];
  isLoading = false;
  private invoicesSub: Subscription;

  constructor(public invoicesService: InvoicesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.invoicesService.getInvoices();
    this.invoicesSub = this.invoicesService.getInvoiceUpdateListener()
      .subscribe((invoices: Invoice[]) => {
        this.isLoading = false;
        this.invoices = invoices;
      });
  }

  onDelete(invoiceId: string) {
    this.invoicesService.deleteInvoice(invoiceId);
  }

  ngOnDestroy() {
    this.invoicesSub.unsubscribe();
  }

}
