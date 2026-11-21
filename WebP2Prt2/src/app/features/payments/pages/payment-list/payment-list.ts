import { Component, computed,inject } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { PaymentCard } from '../payment-card/payment-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

//adding the slice colours 
const SLICE_COLOURS = [
   '#4285f4', '#ea4335', '#fbbc04', '#34a853', '#9c27b0',
  '#ff7043', '#00acc1', '#8d6e63', '#78909c',
];

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

//since state holds all of the data im going to make a pi chart to display all of the information and the amount of spending 

readonly chart = computed(()=>{
  const slice = this.state();//creating a slice out of the state. 
  //if the slice isint loaded or there isint an array of slice dat a then it will return null
  if(slice.status !== 'loaded'|| !Array.isArray(slice.data)) return null;

  //creating a new totals map of each segemnt
  const totals = new Map<string,number>();
  //so getting the purchase data of each part of the slice. 
  //im calling it piece as im sick of writing purchases
  for(const piece of slice.data){
    totals.set(piece.type,(totals.get(piece.type)?? 0)+ piece.amount);
  }

  const total = [...totals.values()].reduce((a,b) => a + b, 0);
  if(total === 0) return null;

  let start = 0;
  const slices = [...totals.entries()]
  .sort((a,b) => b[1]-a[1])//bigger slices first 
  .map(([type,amount],i)=>{
  const fraction = amount/total;
  const slice ={
    type,amount,fraction,
    color: SLICE_COLOURS[i % SLICE_COLOURS.length],
    start,
    end:start + fraction *100,
  };
  start = slice.end;
  return slice;
  });
const graident = `conic-gradient(${slices
      .map((sl) => `${sl.color} ${sl.start}% ${sl.end}%`)
      .join(', ')})`;

return {slice,total,graident};

});
}
