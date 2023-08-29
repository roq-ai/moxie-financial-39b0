import axios from 'axios';
import queryString from 'query-string';
import { StockAdviceInterface, StockAdviceGetQueryInterface } from 'interfaces/stock-advice';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getStockAdvices = async (
  query?: StockAdviceGetQueryInterface,
): Promise<PaginatedInterface<StockAdviceInterface>> => {
  const response = await axios.get('/api/stock-advices', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createStockAdvice = async (stockAdvice: StockAdviceInterface) => {
  const response = await axios.post('/api/stock-advices', stockAdvice);
  return response.data;
};

export const updateStockAdviceById = async (id: string, stockAdvice: StockAdviceInterface) => {
  const response = await axios.put(`/api/stock-advices/${id}`, stockAdvice);
  return response.data;
};

export const getStockAdviceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stock-advices/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStockAdviceById = async (id: string) => {
  const response = await axios.delete(`/api/stock-advices/${id}`);
  return response.data;
};
