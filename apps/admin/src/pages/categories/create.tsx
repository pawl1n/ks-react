import { mdiArrowLeft, mdiPlus } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import { ReactElement } from 'react';
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
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from '../../services/categories';

const CreateProductPage = () => {
  const response = useGetCategoriesQuery();
  const categories = response?.data?._embedded?.categories ?? [];

  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (category: CategoryRequest) => {
    createCategory(category)
      .unwrap()
      .then(() => {
        Router.back();
      });
  };

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
                name: '',
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
                  {categories.map((category) => (
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
