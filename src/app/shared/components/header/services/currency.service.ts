import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CurrencyResponseInterface } from '../types/currencyResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  public getCurrency(
    base: string = 'UAH',
    currencies: string[] = ['EUR', 'USD']
  ): Observable<CurrencyResponseInterface> {
    let currencyStr: string = currencies.join(',');
    return this.http.get<CurrencyResponseInterface>(
      `${environment.apiUrl}live?access_key=${environment.apiKey}&source=${base}&currencies=${currencyStr}`
    );
  }
}
