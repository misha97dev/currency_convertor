import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ConverterService } from './services/converter.service';
import { ConvertResponseInterface } from './types/convertResponse.interface';
import { ConvertRequestInterface } from './types/convertRequest.interface';

import { ErrorService } from 'src/app/shared/services/error.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  converterForm!: FormGroup;
  unsubscribe$ = new Subject<void>();
  requestData!: ConvertRequestInterface;

  inputOne: string;
  inputTwo!: string;
  selectOne!: string;
  selectTwo!: string;

  selectedType: number;

  currencyArrayOne: string[] = ['UAH', 'EUR', 'USD'];
  currencyArrayTwo: string[] = ['UAH', 'EUR', 'USD'];
  constructor(
    private spinner: SpinnerService,
    private convertService: ConverterService,
    private errorService: ErrorService
  ) {
    this.selectedType = 1;
    this.inputOne = '1';
    this.inputTwo = '0';
    this.selectOne = 'USD';
    this.selectTwo = 'UAH';
    this.requestData = new ConvertRequestInterface(
      this.selectOne,
      this.selectTwo,
      Number(this.inputOne)
    );
  }
  ngOnInit(): void {
    this.convert();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  convert() {
    console.log('convert');
    this.spinner.show();
    this.convertService
      .getResult(this.requestData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        console.log(response);
        if (response.success && this.selectedType === 1) {
          this.inputTwo = this.convertCurrencyPrice(response.result).toString();
        }
        if (response.success && this.selectedType === 2) {
          this.inputOne = this.convertCurrencyPrice(response.result).toString();
        }
        if (!response.success) {
          this.errorService.show(response);
        }
        this.spinner.hide();
      });
  }
  submit(type: number) {
    this.selectedType = type;
    if (type === 1) {
      this.requestData = new ConvertRequestInterface(
        this.selectOne,
        this.selectTwo,
        Number(this.inputOne)
      );
    }
    if (type === 2) {
      this.requestData = new ConvertRequestInterface(
        this.selectTwo,
        this.selectOne,
        Number(this.inputTwo)
      );
    }
    this.convert();
  }
  convertCurrencyPrice(value: number) {
    const result = parseFloat(value.toFixed(2));
    return result;
  }
}
