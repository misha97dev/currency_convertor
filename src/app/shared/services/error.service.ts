import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  private _message: string = '';

  public errorMessage() {
    return this._message;
  }

  show(error: any) {
    return (this._message = error.error.info.toString());
  }
  hide() {
    return (this._message = '');
  }
}
