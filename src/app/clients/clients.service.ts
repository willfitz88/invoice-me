import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Client } from './client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients: Client[] = [];
  private clientsUpdated = new Subject<Client[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getClients() {
    this.http
      .get<{ message: string; clients: any }>('http://localhost:3000/api/clients')
      .pipe(
        map(clientsData => {
          return clientsData.clients.map(client => {
            return {
              company: client.company,
              id: client._id

            };
          });
        })
      )
      .subscribe(transformedClients => {
        this.clients = transformedClients;
        this.clientsUpdated.next([...this.clients]);
      });
  }

  getClientUpdateListener() {
    return this.clientsUpdated.asObservable();
  }

  getClient(id: string) {
    return this.http.get<{ _id: string, fname: string, lname: string, company: string, email: string}>(
      'http://localhost:3000/api/clients/' + id
    );
  }

  addClient(
    fname: string,
    lname: string,
    company: string,
    email: string
    ) {
    const client: Client = {
      id: null,
      fname: fname,
      lname: lname,
      company: company,
      email: email
    };

    this.http
      .post<{ message: string; clientId: string }>(
        'http://localhost:3000/api/clients',
        client
      )
      .subscribe(responseData => {
        const id = responseData.clientId;
        client.id = id;
        this.clients.push(client);
        this.clientsUpdated.next([...this.clients]);
        // this.router.navigate(['/']);
      });
  }

  updateClient(
    id: string,
    fname: string,
    lname: string,
    company: string,
    email: string) {
    let clientData: Client | FormData;

    clientData = {
      id: id,
      fname: fname,
      lname: lname,
      company: company,
      email: email
    };

    this.http
      .put('http://localhost:3000/api/invoices/' + id, clientData)
      .subscribe(response => {
        const updatedClients = [...this.clients];
        const oldPostIndex = updatedClients.findIndex(p => p.id === id);
        const client: Client = {
          id: id,
          fname: fname,
          lname: lname,
          company: company,
          email: email
        };
        updatedClients[oldPostIndex] = client;
        this.clients = updatedClients;
        this.clientsUpdated.next([...this.clients]);
        this.router.navigate(['/']);
      });
  }

  deleteClient(clientId: string) {
    this.http
      .delete('http://localhost:3000/api/clients/' + clientId)
      .subscribe(() => {
        const updatedClients = this.clients.filter(client => client.id !== clientId);
        this.clients = updatedClients;
        this.clientsUpdated.next([...this.clients]);
      });
  }
}
