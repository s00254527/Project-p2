import { Component,inject,OnInit,signal } from '@angular/core';
import { FormBuilder,Validator,ReactiveFormsModule,FormsModule, Validators } from '@angular/forms';
import { CreatePaymentDto } from '../../models/payment.model';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
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

@Component({
  selector: 'app-payment-form',
  imports: [
    ReactiveFormsModule, CommonModule,
    FormsModule,RouterModule,
    MatButtonModule,MatFormFieldModule,
    MatInputModule,MatCardModule,
    MatProgressBarModule,MatError],
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
  type: this.formBuilder.control<PaymentType | null>(null, [Validators.required]),
  amount: this.formBuilder.control<number | null>(null, [Validators.min(0)]),
  date: this.formBuilder.control<Date | null>(null, [
    this.minDate(new Date(2000, 0, 1)), // replace with whatever your minimum should be
    this.maxDate(this.currentDate),
  ]),
});

}
