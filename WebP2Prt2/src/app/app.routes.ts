import { Routes } from '@angular/router';
import { PaymentList } from './features/payments/pages/payment-list/payment-list';

export const routes: Routes = [
    {path:'',redirectTo:'payments',pathMatch:'full'},
    {path:'payments',component:PaymentList},
    
];
