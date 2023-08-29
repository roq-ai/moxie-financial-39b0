const mapping: Record<string, string> = {
  organizations: 'organization',
  'simulated-portfolios': 'simulated_portfolio',
  stocks: 'stock',
  'stock-advices': 'stock_advice',
  transactions: 'transaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
