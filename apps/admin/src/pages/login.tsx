import { useState } from 'react';
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
import { setToken } from '../stores/tokenSlice';
import CardBoxModal from '../components/CardBoxModal';
import { useAppDispatch } from '../stores/hooks';

type UserRequest = {
  email: string;
  password: string;
};

export default function Error() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalDangerActive, setIsModalDangerActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (user: UserRequest) => {
    fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((data) => {
      if (data.status === 200) {
        data
          .json()
          .then((data) => {
            console.log(data);
            dispatch(setToken(data));
          })
          .then(() => {
            // Router.push('/dashboard').then(console.log);
          });
      } else {
        setErrorMessage('Неправильний логін або пароль');
        setIsModalDangerActive(true);
      }
    });
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <CardBoxModal
        title="Помилка"
        buttonColor="danger"
        buttonLabel="Ок"
        isActive={isModalDangerActive}
        onConfirm={() => setIsModalDangerActive(false)}
      >
        <p>{errorMessage}</p>
      </CardBoxModal>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik
            initialValues={{
              email: 'admin@admin',
              password: 'admin',
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
