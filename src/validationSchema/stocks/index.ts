import * as yup from 'yup';

export const stockValidationSchema = yup.object().shape({
  name: yup.string().required(),
  current_price: yup.number().integer().nullable(),
  historical_data: yup.string().nullable(),
  relevant_news: yup.string().nullable(),
});
