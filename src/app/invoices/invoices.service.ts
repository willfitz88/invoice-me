import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Invoice } from './invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private invoices: Invoice[] = [];
  private invoicesUpdated = new Subject<Invoice[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getInvoices() {
    this.http
      .get<{ message: string; invoices: any }>('http://localhost:3000/api/invoices')
      .pipe(
        map(invoiceData => {
          return invoiceData.invoices.map(invoice => {
            return {
              id: invoice._id,
              invoiceNumber: invoice.invoiceNumber,
              date: invoice.date,
              client: invoice.client,
              total: invoice.total

            };
          });
        })
      )
      .subscribe(transformedInvoices => {
        this.invoices = transformedInvoices;
        this.invoicesUpdated.next([...this.invoices]);
      });
  }

  getInvoiceUpdateListener() {
    return this.invoicesUpdated.asObservable();
  }

  getInvoice(id: string) {
    return this.http.get<{
      _id: string,
      invoiceNumber: string,
      date: Date,
      client: string,
      total: string
    }>(
      'http://localhost:3000/api/invoices/' + id
    );
  }

  addInvoice(
    invoiceNumber: string,
    date: Date,
    client: string,
    total: string
    ) {
    const invoice: Invoice = {
      id: null,
      invoiceNumber: invoiceNumber,
      date: date,
      client: client,
      total: total
    };
    this.http
      .post<{ message: string; invoiceId: string }>(
        'http://localhost:3000/api/invoices',
        invoice
      )
      .subscribe(responseData => {
        const id = responseData.invoiceId;
        invoice.id = id;
        this.invoices.push(invoice);
        this.invoicesUpdated.next([...this.invoices]);
        this.router.navigate(['/']);
      });
  }

  updateInvoice(
    id: string,
    invoiceNumber: string,
    date: Date,
    client: string,
    total: string
    ) {
    let invoiceData: Invoice | FormData;

    invoiceData = {
      id: id,
      invoiceNumber: invoiceNumber,
      date: date,
      client: client,
      total: total
    };

    this.http
      .put('http://localhost:3000/api/invoices/' + id, invoiceData)
      .subscribe(response => {
        const updatedInvoices = [...this.invoices];
        const oldPostIndex = updatedInvoices.findIndex(p => p.id === id);
        const invoice: Invoice = {
          id: id,
          invoiceNumber: invoiceNumber,
          date: date,
          client: client,
          total: total
        };
        updatedInvoices[oldPostIndex] = invoice;
        this.invoices = updatedInvoices;
        this.invoicesUpdated.next([...this.invoices]);
        this.router.navigate(['/']);
      });
  }

  deleteInvoice(invoiceId: string) {
    this.http
      .delete('http://localhost:3000/api/invoices/' + invoiceId)
      .subscribe(() => {
        const updatedInvoices = this.invoices.filter(invoice => invoice.id !== invoiceId);
        this.invoices = updatedInvoices;
        this.invoicesUpdated.next([...this.invoices]);
      });
  }

}
