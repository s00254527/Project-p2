import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetials } from './payment-detials';

describe('PaymentDetials', () => {
  let component: PaymentDetials;
  let fixture: ComponentFixture<PaymentDetials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetials],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentDetials);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
