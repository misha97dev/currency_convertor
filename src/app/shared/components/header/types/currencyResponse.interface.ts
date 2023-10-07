import { SimpleCurrencyInterface } from 'src/app/shared/components/header/types/simpleCurrency.interface';

export interface CurrencyResponseInterface {
  success: boolean;
  source: string;
  quotes: SimpleCurrencyInterface;
}
