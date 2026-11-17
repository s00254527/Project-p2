import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, input } from '@angular/core';
import { Payment } from '../models/payment.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { error } from 'console';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CreateCarDto,UpdateCarDto } from '../models/car.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  //injecting http client so we can use it. 
  private http = inject(HttpClient);
  //this is to read the db when its on localhost 3k
  private apiUrl = 'http://localhost:3000/Api/v1/Purchases';
 private readonly router = inject(Router);
  //get payments constructor to use both urls to get 
  //firstly the string to connect to the db
  //then to get the payments 
  getPayments():Observable<Payment[]>{
    return this.http.get<Payment[]>(this.apiUrl);
  }
}
