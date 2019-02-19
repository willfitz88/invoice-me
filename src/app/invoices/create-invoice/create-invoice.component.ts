import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CreateClientComponent } from '../../clients/create-client/create-client.component';

import { Invoice } from '../invoice.model';
import { InvoicesService } from '../invoices.service';

import { Client } from '../../clients/client.model';
import { ClientsService } from '../../clients/clients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {

  enteredTitle = '';
  invoice: Invoice;
  isLoading = false;
  form: FormGroup;
  clients: Client[] = [];
  client: string;
  private mode = 'create';
  private invoiceId: string;
  private clientsSub: Subscription;
  private date: Date;


  constructor(
    public invoicesService: InvoicesService,
    public clientsService: ClientsService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.date = new Date();
    this.form = new FormGroup({
      invoiceNumber: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      client: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('invoiceId')) {
        this.mode = 'edit';
        this.invoiceId = paramMap.get('invoiceId');
        this.isLoading = true;
        this.invoicesService.getInvoice(this.invoiceId).subscribe(invoiceData => {
          this.isLoading = false;
          this.invoice = {
            id: invoiceData._id,
            invoiceNumber: invoiceData.invoiceNumber,
            date: invoiceData.date,
            client: invoiceData.client,
            total: invoiceData.total,

          };
          this.form.setValue({
            invoiceNumber: invoiceData.invoiceNumber,
            date: invoiceData.date,
            client: invoiceData.client,
            total: invoiceData.total,
          });
        });
      } else {
        this.mode = 'create';
        this.invoiceId = null;
      }
    });

    this.clientsService.getClients();
    this.clientsSub = this.clientsService.getClientUpdateListener()
      .subscribe((clients: Client[]) => {
        this.isLoading = false;
        this.clients = clients;
      });
  }

  ngOnDestroy() {
    this.clientsSub.unsubscribe();
  }

  onSaveInvoice() {
    console.log('in save invoice');
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.invoicesService.addInvoice(
        this.form.value.invoiceNumber,
        this.date,
        this.form.value.client,
        this.form.value.total
      );
    } else {
      this.invoicesService.updateInvoice(
        this.invoiceId,
        this.form.value.invoiceNumber,
        this.form.value.date,
        this.form.value.client,
        this.form.value.total
      );
    }
    this.form.reset();
  }

  /*
  onClientSelect(val: any) {
    if (val === '0') {
        console.log('if');
    } else {
        console.log(val);
    }
  }
  */

  onClientSelect(val: any): void {
    if (val === 'newclient') {
      const dialogRef = this.dialog.open(CreateClientComponent, {
        width: '270px',
        data: {fname: 'testname', lname: 'test animal'}
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed. Result is: ' + result);
        // this.form.controls['client'].setValue(result);
      });
    }
  }

}
