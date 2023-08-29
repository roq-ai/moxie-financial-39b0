import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  buy_sell_indicator: yup.string().nullable(),
  quantity: yup.number().integer().nullable(),
  transaction_date: yup.date().nullable(),
  stock_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
