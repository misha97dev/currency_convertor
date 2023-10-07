import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { Subject, takeUntil } from 'rxjs';
import { SimpleCurrencyInterface } from './types/simpleCurrency.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private currencyService: CurrencyService) {}
  unsubscribe$ = new Subject<void>();
  // currency: any[] = [];
  currency: any[] = [
    { code: 'EUR', price: 23.12 },
    { code: 'USD', price: 33.33 },
  ];
  ngOnInit(): void {
    // this.getData();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getData() {
    this.currencyService
      .getCurrency()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.currency = this.convertToArray(response.quotes);
        console.log(this.currency);
      });
  }
  // from quotes:{UAHEUR:33.3323, UAHUSD:22.22223} to
  // [{code:EUR, price:33.33},{code:USD, price:22.22}]
  convertToArray(
    quotes: SimpleCurrencyInterface
  ): { code: string; price: number }[] {
    let result = [];
    for (const currCode in quotes) {
      if (quotes.hasOwnProperty(currCode)) {
        result.push({
          code: this.convertCurrencyCode(currCode),
          price: this.convertCurrencyPrice(quotes[currCode]),
        });
      }
    }
    return result;
  }
  // from UAHUSD to USD
  convertCurrencyCode(code: string) {
    return code.substring(3);
  }
  // from 33.469345 to 33.47
  convertCurrencyPrice(value: number) {
    const result = parseFloat((1 / value).toFixed(2));
    return result;
  }
}
