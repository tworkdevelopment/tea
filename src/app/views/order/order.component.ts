import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {ProductService} from "../../shared/services/product.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  checkoutForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+( {0,1}[a-zA-Zа-яА-Я]+){0,3}$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+(\s{0,1}[a-zA-Zа-яА-Я]+){0,2}$')]],
    phone: ['', [Validators.required, Validators.pattern('[\+]?([0-9]{11})')]],
    country: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я ]{1,200}$')]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z\-]{0,8}$')]],
    address: ['', [Validators.required, Validators.pattern('^[\/A-Za-zА-ЯЁа-яё\d -]+$'),]],
    product: [{value: '', disabled: true}],
    comment: [''],
  })


  hideForm: boolean | undefined;
  showError: boolean;
  isButtonDisabled: boolean | null;

  public formValues = {
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    zip: '',
    address: '',
    product: '',
    comment: '',
  }

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder
  ) {
    this.hideForm = undefined;
    this.showError = false;
    this.isButtonDisabled = false;
  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    this.isButtonDisabled = false;
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.product= params['product'];
      }
    })

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }


  public createOrder() {
    this.isButtonDisabled = true;
    this.subscriptionOrder = this.productService.createOrder({
      name: this.checkoutForm.value.firstName,
      last_name: this.checkoutForm.value.lastName,
      phone: this.checkoutForm.value.phone,
      country: this.checkoutForm.value.country,
      zip: this.checkoutForm.value.zip,
      address: this.checkoutForm.value.address,
      product: this.formValues.product,
      comment: this.checkoutForm.value.comment,
    })
      .pipe(
        tap(() => {
          console.log(this.isButtonDisabled);
        })
      )
      .subscribe(response => {
        if (response.success && !response.message) {
          this.hideForm = true;
        } else {
          this.isButtonDisabled = false;
          this.checkoutForm.reset();
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
      })
  }
}
