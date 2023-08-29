import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSimulatedPortfolio } from 'apiSdk/simulated-portfolios';
import { simulatedPortfolioValidationSchema } from 'validationSchema/simulated-portfolios';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { SimulatedPortfolioInterface } from 'interfaces/simulated-portfolio';

function SimulatedPortfolioCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SimulatedPortfolioInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSimulatedPortfolio(values);
      resetForm();
      router.push('/simulated-portfolios');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SimulatedPortfolioInterface>({
    initialValues: {
      virtual_investment: 0,
      gains_losses: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: simulatedPortfolioValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Simulated Portfolios',
              link: '/simulated-portfolios',
            },
            {
              label: 'Create Simulated Portfolio',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Simulated Portfolio
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Virtual Investment"
            formControlProps={{
              id: 'virtual_investment',
              isInvalid: !!formik.errors?.virtual_investment,
            }}
            name="virtual_investment"
            error={formik.errors?.virtual_investment}
            value={formik.values?.virtual_investment}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('virtual_investment', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Gains Losses"
            formControlProps={{
              id: 'gains_losses',
              isInvalid: !!formik.errors?.gains_losses,
            }}
            name="gains_losses"
            error={formik.errors?.gains_losses}
            value={formik.values?.gains_losses}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('gains_losses', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/simulated-portfolios')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'simulated_portfolio',
    operation: AccessOperationEnum.CREATE,
  }),
)(SimulatedPortfolioCreatePage);
