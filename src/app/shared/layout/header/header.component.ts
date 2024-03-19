import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchForm = this.fb.group({
    search: ['', Validators.required]
  })

  public searchValue = {
    search: "",
  }

  // private search$: Subject<string> = new Subject<string>()
  private subscriptionSearch: Subscription | null = null;

  // public productList: Array<any> = [];
  searchShowError: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router) {
    this.searchShowError = false;
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptionSearch?.unsubscribe();
  }


  // search() {
    // this.search$.next(this.searchForm.value);
    // if (this.searchForm.value) {
    //   this.router.navigate(['/products'], {
    //     queryParams: {search: this.searchForm.value}
    //   })} else {
    //   this.router.navigate(['/products'])}
    // }
    //
  // }
}
