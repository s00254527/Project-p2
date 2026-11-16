import { Component, OnInit ,inject} from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { Observable } from 'rxjs';
import { Payment } from '../../models/payment.model';
import { AsyncPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-payment-list',
  standalone:true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.scss',
})
export class PaymentList implements OnInit{

  //injecting the payment service into this component 
  private paymentService = inject(PaymentService);

  //getting the payment model
  payments$!: Observable<Payment[]>;

  //when the page is loaded get all of the payments from 
  //the payment service. 
  ngOnInit(): void {
    this.payments$ = this.paymentService.getPayments();
  }
}
