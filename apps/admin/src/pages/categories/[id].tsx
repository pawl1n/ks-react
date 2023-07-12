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
import { CategoryRequest } from 'types/request';
import {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from '../../services/categories';

const CreateProductPage = () => {
  const id = Router.query.id as string;
  if (!parseInt(id)) {
    throw new Error('Invalid id');
  }

  const categoryResponse = useGetCategoryByIdQuery(parseInt(id));
  const category = categoryResponse?.data;

  const response = useGetCategoriesQuery();
  const categories = response?.data?._embedded?.categories ?? [];

  const [updateCategory] = useUpdateCategoryMutation();

  const handleSubmit = async (categoryRequest: CategoryRequest) => {
    if (!category) {
      return;
    }

    updateCategory({
      entity: category,
      data: categoryRequest,
    })
      .unwrap()
      .then(() => {
        Router.back();
      });
  };

  if (!category) {
    return <>Не знайдено</>;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Додавання товару')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPlus}
          title="Додавання товару"
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
                name: category.name,
                parentCategory: category.parentCategory,
              } as CategoryRequest
            }
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField label="Назва">
                <Field name="name" placeholder="Назва" />
              </FormField>

              <FormField
                label="Батьківська категорія"
                labelFor="parentCategory"
              >
                <Field
                  name="parentCategory"
                  id="parentCategory"
                  component="select"
                >
                  <option>Відсутня</option>
                  {categories
                    .filter((cat) => cat.id !== category.id)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Field>
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
    </>
  );
};

CreateProductPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default CreateProductPage;
