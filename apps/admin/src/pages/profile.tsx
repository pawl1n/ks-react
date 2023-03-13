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
import { useGetMeQuery, useUpdateMeMutation } from '../services/users';

const ProfilePage = () => {
  const result = useGetMeQuery();
  const user = result.data;

  const [updateUser] = useUpdateMeMutation();

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
              initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    label="Current password"
                    help="Required. Your current password"
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
                    label="New password"
                    help="Required. New password"
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
                    label="Confirm password"
                    help="Required. New password one more time"
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
                    <BaseButton color="info" type="submit" label="Submit" />
                    <BaseButton color="info" label="Options" outline />
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
