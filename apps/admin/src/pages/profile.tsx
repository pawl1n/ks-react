import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiMail,
  mdiPhone,
} from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import type { ReactElement } from 'react';
import BaseButton from '../components/BaseButton';
import BaseButtons from '../components/BaseButtons';
import BaseDivider from '../components/BaseDivider';
import CardBox from '../components/CardBox';
import CardBoxComponentBody from '../components/CardBoxComponentBody';
import CardBoxComponentFooter from '../components/CardBoxComponentFooter';
import FormField from '../components/FormField';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import { getPageTitle } from '../config';
import {
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateMeMutation,
} from '../services/users';
import { useAppDispatch } from '../stores/hooks';
import { addToast } from '../stores/toastSlice';
import { ToastType } from '../interfaces/Toast';

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

const ProfilePage = () => {
  const result = useGetMeQuery();
  const user = result.data;

  const [updateUser] = useUpdateMeMutation();
  const [changePassword] = useChangePasswordMutation();

  const dispatch = useAppDispatch();

  const handleChangePassword = ({
    currentPassword,
    newPassword,
    newPasswordConfirmation,
  }: ChangePasswordFormValues) => {
    if (newPassword !== newPasswordConfirmation) {
      dispatch(
        addToast({
          toast: {
            type: ToastType.danger,
            message: 'Паролі не співпадають',
          },
        }),
      );

      return;
    }

    changePassword({
      currentPassword,
      newPassword,
    })
      .unwrap()
      .then(() => {
        dispatch(
          addToast({
            toast: {
              type: ToastType.success,
              message: 'Пароль успішно змінено',
            },
          }),
        );
      });
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Профіль')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiAccount}
          title="Профіль"
          main
        ></SectionTitleLineWithButton>

        {/*<UserCard className="mb-6" />*/}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            {/*<CardBox className="mb-6">*/}
            {/*  <FormField label="Avatar" help="Max 500kb">*/}
            {/*    <FormFilePicker label="Upload" color="info" icon={mdiUpload} />*/}
            {/*  </FormField>*/}
            {/*</CardBox>*/}

            {user && (
              <CardBox className="flex-1" hasComponentLayout>
                <Formik initialValues={user} onSubmit={updateUser}>
                  <Form className="flex flex-col flex-1">
                    <CardBoxComponentBody>
                      <FormField
                        label="Імʼя"
                        help="Обовʼязкове поле. Ваше імʼя"
                        labelFor="firstName"
                        icons={[mdiAccount]}
                      >
                        <Field
                          name="firstName"
                          id="firstName"
                          placeholder="Імʼя"
                        />
                      </FormField>

                      <FormField
                        label="По-батькові"
                        labelFor="middleName"
                        icons={[mdiAccount]}
                      >
                        <Field
                          name="middleName"
                          id="middleName"
                          placeholder="По-батькові"
                        />
                      </FormField>

                      <FormField
                        label="Прізвище"
                        labelFor="lastName"
                        icons={[mdiAccount]}
                      >
                        <Field
                          name="lastName"
                          id="lastName"
                          placeholder="Прізвище"
                        />
                      </FormField>
                      <FormField
                        label="E-mail"
                        help="Обовʼязкове поле. Ваш e-mail"
                        labelFor="email"
                        icons={[mdiMail]}
                      >
                        <Field name="email" id="email" placeholder="E-mail" />
                      </FormField>

                      <FormField
                        label="Номер телефону"
                        labelFor="phoneNumber"
                        icons={[mdiPhone]}
                      >
                        <Field
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="+380123456789"
                        />
                      </FormField>
                    </CardBoxComponentBody>
                    <CardBoxComponentFooter>
                      <BaseButtons>
                        <BaseButton
                          color="info"
                          type="submit"
                          label="Підтвердити"
                        />
                      </BaseButtons>
                    </CardBoxComponentFooter>
                  </Form>
                </Formik>
              </CardBox>
            )}
          </div>

          <CardBox hasComponentLayout>
            <Formik
              initialValues={
                {
                  currentPassword: '',
                  newPassword: '',
                  newPasswordConfirmation: '',
                } as ChangePasswordFormValues
              }
              onSubmit={handleChangePassword}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    label="Поточний пароль"
                    help="Обовʼязкове поле. Ваш поточний пароль"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormField>

                  <BaseDivider />

                  <FormField
                    label="Новий пароль"
                    help="Обовʼязкове поле. Ваш новий пароль"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>

                  <FormField
                    label="Підтвердіть новий пароль"
                    help="Обовʼязкове поле. Ваш новий пароль ще один раз"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <BaseButtons>
                    <BaseButton
                      color="info"
                      type="submit"
                      label="Підтвердити"
                    />
                  </BaseButtons>
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox>
        </div>
      </SectionMain>
    </>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ProfilePage;
