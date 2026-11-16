import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentList } from './features/pyments/pages/payment-list/payment-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaymentList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('WebP2Prt2');
}
