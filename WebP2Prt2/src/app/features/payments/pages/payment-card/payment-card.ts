import { Component } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-payment-card',
  imports: [RouterLink],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.scss',
})
export class PaymentCard {
  //this is the input for the payment cards
  payment = input.required<Payment>()
}
