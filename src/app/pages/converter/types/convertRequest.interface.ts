export class ConvertRequestInterface {
  from: string;
  to: string;
  amount: number;
  constructor(from: string, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}
