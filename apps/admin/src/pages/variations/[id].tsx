import { mdiArrowLeft, mdiPlus } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import BaseButton from 'components/BaseButton';
import BaseButtons from 'components/BaseButtons';
import BaseDivider from 'components/BaseDivider';
import CardBox from 'components/CardBox';
import FormField from 'components/FormField';
import SectionMain from 'components/SectionMain';
import SectionTitleLineWithButton from 'components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import Router from 'next/router';
import LayoutAuthenticated from 'layouts/Authenticated';
import { VariationRequest } from 'types/request';
import {
  useGetVariationByIdQuery,
  useUpdateVariationMutation,
} from 'services/variations';
import Variations from '../../components/Variations';
import { useAppDispatch } from '../../stores/hooks';
import { addToast } from '../../stores/toastSlice';
import { ToastType } from '../../types/toast';

const CreateVariationPage = () => {
  const id = Router.query.id as string;
  const dispatch = useAppDispatch();

  if (!parseInt(id)) {
    dispatch(
      addToast({
        toast: {
          type: ToastType.danger,
          message: 'Варіацію не знайдено',
        },
      }),
    );
    Router.back();
  }

  const variationResponse = useGetVariationByIdQuery(parseInt(id));
  const variation = variationResponse?.data;

  const [updateVariation] = useUpdateVariationMutation();

  const handleSubmit = async (changed: VariationRequest) => {
    if (!variation) {
      return;
    }

    updateVariation({
      entity: variation,
      data: changed,
    });
  };

  if (!variation) {
    return <>Завантаження...</>;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Редагування варіації')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPlus}
          title="Редагування варіації"
          main
        >
          <BaseButton
            icon={mdiArrowLeft}
            color="contrast"
            onClick={() => {
              Router.back();
            }}
          />
        </SectionTitleLineWithButton>

        <CardBox>
          <Formik
            initialValues={
              {
                name: variation?.name,
              } as VariationRequest
            }
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField label="Назва">
                <Field name="name" placeholder="Назва" />
              </FormField>

              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" color="info" label="Зберегти" />
                <BaseButton
                  type="reset"
                  color="info"
                  outline
                  label="Очистити"
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>

      <Variations variation={variation} />
    </>
  );
};

CreateVariationPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default CreateVariationPage;
