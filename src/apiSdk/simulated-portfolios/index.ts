import axios from 'axios';
import queryString from 'query-string';
import { SimulatedPortfolioInterface, SimulatedPortfolioGetQueryInterface } from 'interfaces/simulated-portfolio';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSimulatedPortfolios = async (
  query?: SimulatedPortfolioGetQueryInterface,
): Promise<PaginatedInterface<SimulatedPortfolioInterface>> => {
  const response = await axios.get('/api/simulated-portfolios', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSimulatedPortfolio = async (simulatedPortfolio: SimulatedPortfolioInterface) => {
  const response = await axios.post('/api/simulated-portfolios', simulatedPortfolio);
  return response.data;
};

export const updateSimulatedPortfolioById = async (id: string, simulatedPortfolio: SimulatedPortfolioInterface) => {
  const response = await axios.put(`/api/simulated-portfolios/${id}`, simulatedPortfolio);
  return response.data;
};

export const getSimulatedPortfolioById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/simulated-portfolios/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSimulatedPortfolioById = async (id: string) => {
  const response = await axios.delete(`/api/simulated-portfolios/${id}`);
  return response.data;
};
