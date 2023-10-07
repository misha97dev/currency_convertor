import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor(private errorService: ErrorService) {}
  ngOnInit(): void {
    this.errorMessage();
  }
  message: string = '';
  errorMessage(): string {
    return (this.message = this.errorService.errorMessage());
  }

  close() {
    this.errorService.hide();
  }
}
