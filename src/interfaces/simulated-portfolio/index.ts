import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SimulatedPortfolioInterface {
  id?: string;
  virtual_investment?: number;
  gains_losses?: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SimulatedPortfolioGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
