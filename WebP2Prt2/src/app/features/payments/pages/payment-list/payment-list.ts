import { Component, inject } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { PaymentCard } from '../payment-card/payment-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-payment-list',
  standalone:true,
  imports: [PaymentCard, PaymentCard, RouterLink, MatButtonModule, MatProgressBarModule, MatFormFieldModule],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.scss',
})
export class PaymentList {

  //injecting the payment service into this component 
  private paymentService = inject(PaymentService);

  //this is for the lazy loading of the state on the webpage, but im going to
  //speed it up compared to the worksheets. 
  state = toSignal(withLoadState(this.paymentService.getPayments()),
{requireSync:true});
}
