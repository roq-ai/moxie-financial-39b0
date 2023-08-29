import * as yup from 'yup';

export const simulatedPortfolioValidationSchema = yup.object().shape({
  virtual_investment: yup.number().integer().nullable(),
  gains_losses: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
