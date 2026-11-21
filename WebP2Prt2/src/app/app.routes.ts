import { Routes } from '@angular/router';
import { PaymentList } from './features/payments/pages/payment-list/payment-list';
import { PaymentForm } from './features/payments/pages/payment-form/payment-form';
import { PaymentDetials } from './features/payments/pages/payment-detials/payment-detials';

export const routes: Routes = [
    {path:'',redirectTo:'payments',pathMatch:'full'},
    {path:'payments',component:PaymentList},
    {path:'payments/new', component:PaymentDetials},
    {path:'payments/:id',component:PaymentDetials},
    {path:'payments/:id/edit',component:PaymentForm},
    
];
