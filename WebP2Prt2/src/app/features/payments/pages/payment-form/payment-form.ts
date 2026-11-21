import { Component,inject,OnInit,signal } from '@angular/core';
import { FormBuilder,Validator,ReactiveFormsModule,FormsModule, Validators,NonNullableFormBuilder } from '@angular/forms';
import { CreatePaymentDto, PurchaseType ,TransactionType} from '../../models/payment.model';
import { CommonModule } from '@angular/common';
import { RouterModule,Router ,RouterLink} from '@angular/router';
import { PaymentService } from '../../service/payment.service';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatError} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { input } from '@angular/core';
import {notBlank} from '../../../../shared/validators/not-blank.validator';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';




@Component({
  selector: 'app-payment-form',
  imports: [
    ReactiveFormsModule, CommonModule,
    FormsModule,RouterModule,
    MatButtonModule,MatFormFieldModule,
    MatInputModule,MatCardModule,
    MatProgressBarModule,MatSelectModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})

export class PaymentForm {
  public formBuilder = inject(FormBuilder);
  public paymentService = inject(PaymentService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  saving = signal(false);
  saveError = signal<String | null>(null);
  readonly id = input<string>();

  //getting todays date 
  private readonly currentDate = new Date();//this is for the current date
  //this is to get it displayed on the frontend 
  readonly purchaseTypes = Object.values(PurchaseType);
  readonly transactionTypes = Object.values(TransactionType);

  //had to create these for mininum date 
 minDate(min: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const value = new Date(control.value);
    return value < min ? { minDate: { min, actual: value } } : null;
  };
}

//and max date
 maxDate(max: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const value = new Date(control.value);
    return value > max ? { maxDate: { max, actual: value } } : null;
  };
}

 paymentForm = this.formBuilder.nonNullable.group({
  type: this.formBuilder.control<PurchaseType | null>(null, Validators.required),
  amount: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0.01)]),
  transaction : this.formBuilder.control<TransactionType | null>(null),
  date: this.formBuilder.control<Date | null>(null, [
    this.minDate(new Date(2000, 0, 1)), // replace with whatever your minimum should be
    this.maxDate(this.currentDate),
  ]),
});

onSubmit():void{
  
  if(this.paymentForm.invalid){
    this.paymentForm.markAllAsTouched();
    return;
  }
  const {type,amount,transaction,date} = this.paymentForm.getRawValue();
  if(type === null || amount === null) return; //to ensure the enum is done correctly 
 const newPurchase :CreatePaymentDto = {type ,amount ,transaction: transaction ?? undefined, date:date?? undefined }
 const id = this.id();

 const request = id
 ? this.paymentService.updatePayment(id,newPurchase)
 : this.paymentService.addPayment(newPurchase);
 
 this.saving.set(true);
 this.saveError.set(null);
 request.subscribe({
  next:(response) =>{
    this.snackBar.open(`${newPurchase.amount}${newPurchase.type} added sucessfully!`,'Close',
      {duration:5000});
      console.log('Car added succesfully:',response);
      this.router.navigate(['/payments']);
  },
  error:(err:Error) =>{
    this.saveError.set(err.message);
    this.saving.set(false);
  },
 });
 console.log('sending:',newPurchase);
}

  ngOnInit():void{
    const id = this.id();

    if(!id) return; //adding a new car 

    this.paymentService.getPaymentById(id).subscribe({
      next:(payment) =>
        this.paymentForm.patchValue(
          {
            type:payment.type ,
            amount: payment.amount,
            transaction:payment.transaction ?? null,
            date:payment.date ? new Date(String(payment.date).slice(0, 10)) : null
          }
        ),
        error:(err:Error) => this.saveError.set(err.message), 
    });
  }
}
