import { StockInterface } from 'interfaces/stock';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StockAdviceInterface {
  id?: string;
  advice?: string;
  stock_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  stock?: StockInterface;
  user?: UserInterface;
  _count?: {};
}

export interface StockAdviceGetQueryInterface extends GetQueryInterface {
  id?: string;
  advice?: string;
  stock_id?: string;
  user_id?: string;
}
