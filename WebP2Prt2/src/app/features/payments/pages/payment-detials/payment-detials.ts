import { Component,inject,input,signal} from '@angular/core';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../service/payment.service';
import { Observable,switchMap } from 'rxjs';
import { LoadState,withLoadState } from '../../../../shared/load-state';
import { toObservable,toSignal } from '@angular/core/rxjs-interop';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-payment-detials',
  imports: [RouterLink],
  templateUrl: './payment-detials.html',
  styleUrl: './payment-detials.scss',
})
export class PaymentDetials {
private paymentService = inject(PaymentService);
private router = inject(Router);
readonly id = input.required<string>();
readonly initial: LoadState<Payment> = {status :'loading'};
readonly deleting = signal(false);
readonly deleteError = signal<string | null>(null);

//using a switch map to find the id for the spesific object 
//from my understatanding , mapping the detials you obtain 
//from there it grabs everything (detials) then maps it to the object on the page 
state = toSignal(
  toObservable(this.id).pipe(
    switchMap((id) => withLoadState(this.paymentService.getPaymentById(id)))
  ),
  {initialValue: this.initial},
);

//deleting the payment that the user has taken 
//theres an if statemnet that means that if its not confirmed 
// then dont switch deleting to false, otherwise 
//delete the payment.
deletePayment(payment:Payment):void{
  if(!confirm(`Delete${payment.amount}${payment.type}?`)) return;
  this.deleting.set(true);
  this.deleteError.set(null);
  this.paymentService.deletePayment(payment._id!).subscribe({
    //this is to bring it back to /payments page 
    //where we set the delete to false 
    next:() => this.router.navigate(['/payments']),
    error:(error) =>{
      this.deleteError.set(error.message);
      this.deleting.set(false);
    }
  });
}

}
