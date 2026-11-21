import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, input } from '@angular/core';
import { Payment } from '../models/payment.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CreatePaymentDto,UpdatePaymentDto } from '../models/payment.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  //injecting http client so we can use it. 
  private http = inject(HttpClient);
  //this is to read the db when its on localhost 3k
  private apiUrl = 'http://localhost:3000/Api/V1/Purchases';
 private readonly router = inject(Router);
  //get payments constructor to use both urls to get 

//Below this is the section for the services crud operation and how it operates. 
  //then to get the payments 
  getPayments():Observable<Payment[]>{
    return this.http.get<Payment[]>(this.apiUrl)
    .pipe(catchError((err) => this.handleError(err)));
  }
//this is the service for getting paymetns by id 
 getPaymentById(id:string):Observable<Payment>{
  return this.http.get<Payment>(`${this.apiUrl}/${id}`)
  .pipe(catchError((err) => this.handleError(err)));
 }

 //this is ot add a payment 
 addPayment(payment:CreatePaymentDto):Observable<Payment>{
  return this.http.post<Payment>(this.apiUrl,payment)
  .pipe(
    catchError((err) => this.handleError(err))
  )
 }
//this is to upadate a payment 
updatePayment(id:string, changes:UpdatePaymentDto):Observable<Payment>{
  return this.http.put<Payment>(`${this.apiUrl}/${id}`,changes);
}


deletePayment(id:string):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
}

  //this is the handle error method that you gave us and im passing it into this. 
  private handleError(error:HttpErrorResponse):Observable<never>{
    let message: string;

    switch (error.status) {
      case 0:
        message = 'Cannot reach the server. Check that the API is running.';
        break;
      case 400:
        message = 'Some of the data was not valid.';
        break;
      case 401:
        message = 'Please log in to continue.';
        break;
      case 403:
        message = 'You are not allowed to do that.';
        break;
      case 404:
        message = 'That car could not be found.';
        break;
      default:
        message = 'Something went wrong on the server. Please try again later.';
    }


    // Full details for the developer, a short message for the user
    console.error(`HTTP ${error.status} from ${error.url}`, error);
    return throwError(() => new Error(message));
  }
}
