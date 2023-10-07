import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _spinner = false;
  constructor() {}

  isLoading(): boolean {
    return this._spinner;
  }

  show() {
    this._spinner = true;
  }
  hide() {
    this._spinner = false;
  }
}
