import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import {
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListInvoicesComponent } from './invoices/list-invoices/list-invoices.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ListInvoicesComponent,
    HeaderComponent,
    FooterComponent,
    CreateInvoiceComponent,
    CreateClientComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  entryComponents: [ CreateClientComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
