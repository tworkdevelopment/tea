import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private observable: Observable<string>;
  public display: string;
  private subscription: Subscription | null = null;

  constructor() {
    this.display = '';
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next('block');
      }, 10000);
    })
  }

  ngOnInit() {
    this.subscription = this.observable.subscribe((param: string) => {
      if (param === 'block') {
        this.display = param;
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  close() {
    this.display = 'none';
    this.subscription?.unsubscribe();
  }
}
