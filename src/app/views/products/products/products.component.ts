import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              ) {
  }

  products: ProductType[] = [];
  loading: boolean = true;

  private subscriptionProduct: Subscription | null = null;

  ngOnInit() {
    this.loading = true;
    this.subscriptionProduct = this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            this.router.navigate(['/'])
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe()
  }


}
