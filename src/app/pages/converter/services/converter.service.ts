import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConvertRequestInterface } from '../types/convertRequest.interface';
import { Observable } from 'rxjs';
import { ConvertResponseInterface } from '../types/convertResponse.interface';
import { environment } from 'src/environments/environment';
import { ErrorService } from 'src/app/shared/services/error.service';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  constructor(private http: HttpClient) {}
  public getResult(
    data: ConvertRequestInterface
  ): Observable<ConvertResponseInterface> {
    const { from, to, amount } = data;
    return this.http.get<ConvertResponseInterface>(
      `${environment.apiUrl}convert?access_key=${environment.apiKey}&from=${from}&to=${to}&amount=${amount}`
    );
  }
}
