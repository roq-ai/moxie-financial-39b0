import { StockInterface } from 'interfaces/stock';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TransactionInterface {
  id?: string;
  buy_sell_indicator?: string;
  quantity?: number;
  transaction_date?: any;
  stock_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  stock?: StockInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  buy_sell_indicator?: string;
  stock_id?: string;
  user_id?: string;
}
