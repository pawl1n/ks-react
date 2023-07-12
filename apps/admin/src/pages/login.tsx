import type { ReactElement } from 'react';
import Head from 'next/head';
import BaseButton from '../components/BaseButton';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/FormField';
import BaseDivider from '../components/BaseDivider';
import BaseButtons from '../components/BaseButtons';
import { getPageTitle } from '../config';
import { useLoginMutation } from '../services/auth';
import { LoginRequest } from 'shared/types/auth';

export default function Error() {
  const [login] = useLoginMutation();

  const handleSubmit = async (user: LoginRequest) => {
    login(user);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Вхід')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik
            initialValues={{
              email: 'admin@admin',
              password: 'admintest',
              remember: true,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField label="Email" help="Будь ласка, введіть пошту">
                <Field name="email" type="email" />
              </FormField>

              <FormField label="Password" help="Будь ласка, введіть пароль">
                <Field name="password" type="password" />
              </FormField>

              {/*<FormCheckRadio type="checkbox" label="Remember">*/}
              {/*  <Field type="checkbox" name="remember" />*/}
              {/*</FormCheckRadio>*/}

              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Увійти" color="info" />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  );
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
