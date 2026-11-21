import { Component } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-card',
  imports: [MatCardModule, MatButtonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.scss',
})
export class PaymentCard {
  //this is the input for the payment cards
  payment = input.required<Payment>()
}
