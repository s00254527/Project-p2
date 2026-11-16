import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  //injecting http client so we can use it. 
  private http = inject(HttpClient);
  //this is to read the db when its on localhost 3k
  private apiUrl = 'http://localhost:3000/payments';

  //get payments constructor to use both urls to get 
  //firstly the string to connect to the db
  //then to get the payments 
  getPayments():Observable<Payment[]>{
    return this.http.get<Payment[]>(this.apiUrl);
  }
}
