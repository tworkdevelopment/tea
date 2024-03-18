import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0,
    }
  }

  private subscriptionAboutProduct: Subscription | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.subscriptionAboutProduct = this.productService.getProduct(+params['id'])
          .subscribe({
            next: (data) => {
              this.product = data
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          })
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionAboutProduct?.unsubscribe()
  }

}
