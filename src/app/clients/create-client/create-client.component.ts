import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Client } from '../client.model';
import { ClientsService } from '../clients.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  client: Client;

  private mode = 'create';
  private clientId: string;

  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,
    public clientsService: ClientsService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Client) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form = new FormGroup({
      fname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      company: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('clientId')) {
        this.mode = 'edit';
        this.clientId = paramMap.get('clientId');
        this.isLoading = true;
        this.clientsService.getClient(this.clientId).subscribe(clientData => {
          this.isLoading = false;
          this.client = {
            id: clientData._id,
            fname: clientData.fname,
            lname: clientData.lname,
            company: clientData.company,
            email: clientData.email,
          };
          this.form.setValue({
            fname: this.client.fname,
            lname: this.client.lname,
            company: this.client.company,
            email: this.client.email
          });
        });
      } else {
        this.mode = 'create';
        this.clientId = null;
      }
    });
  }

  onSaveClient() {
    console.log('in save client');
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.clientsService.addClient(
        this.form.value.fname,
        this.form.value.lname,
        this.form.value.company,
        this.form.value.email
      );
    } else {
      this.clientsService.updateClient(
        this.clientId,
        this.form.value.fname,
        this.form.value.lname,
        this.form.value.company,
        this.form.value.email
      );
    }
    this.form.reset();
  }

}
