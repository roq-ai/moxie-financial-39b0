import { StockAdviceInterface } from 'interfaces/stock-advice';
import { TransactionInterface } from 'interfaces/transaction';
import { GetQueryInterface } from 'interfaces';

export interface StockInterface {
  id?: string;
  name: string;
  current_price?: number;
  historical_data?: string;
  relevant_news?: string;
  created_at?: any;
  updated_at?: any;
  stock_advice?: StockAdviceInterface[];
  transaction?: TransactionInterface[];

  _count?: {
    stock_advice?: number;
    transaction?: number;
  };
}

export interface StockGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  historical_data?: string;
  relevant_news?: string;
}
