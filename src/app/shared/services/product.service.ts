import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  get(arg0: { search: string; }) {
    throw new Error('Method not implemented.');
  }

  private products: ProductType[] = [];
  private url: string = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.url}tea`)
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.url}tea?id=${id}`);
  }

  createOrder(
    data: {
      name: string | null | undefined,
      last_name: string | null | undefined,
      phone: string | null | undefined,
      country: string | null | undefined,
      zip: string | null | undefined,
      address: string | null | undefined,
      product: string,
      comment?: string | null | undefined,
    }
  ) {
    return this.http.post<{ success: boolean, message?: string }>(`${this.url}order-tea`, data)
  }

  searchProduct(query: string): Observable<ProductType[]> {
    console.log(query);
    return this.http.get<ProductType[]>(`${this.url}tea?q=` + query).pipe(
      map(
        (v: any) => v?.filter((v: any) => v.title.includes(query))),
      tap((v) => {
          console.log(v)
        }
      ),
    )
  }

  // getProducts(queryParams: string = ''):
  //   Observable<ProductType[] | Record<string, ProductType>> {
  //   return this.http.get<ProductType[] | Record<string, ProductType>>
  //   (this.url + (queryParams ? ('?search=' + queryParams) : ''));
  // }

}
