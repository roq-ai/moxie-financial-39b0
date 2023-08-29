import * as yup from 'yup';

export const stockAdviceValidationSchema = yup.object().shape({
  advice: yup.string().nullable(),
  stock_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
