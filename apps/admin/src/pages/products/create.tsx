import { mdiArrowLeft, mdiPlus } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
import BaseButton from 'components/BaseButton';
import BaseButtons from 'components/BaseButtons';
import BaseDivider from 'components/BaseDivider';
import CardBox from 'components/CardBox';
import FormField from 'components/FormField';
import SectionMain from 'components/SectionMain';
import SectionTitleLineWithButton from 'components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import Router from 'next/router';
import { useCategories } from 'hooks/sampleData';
import CardBoxModal from 'components/CardBoxModal';
import LayoutAuthenticated from 'layouts/Authenticated';
import { useAppSelector } from '../../stores/hooks';

type ProductRequest = {
  name: string;
  description: string;
  category?: number;
};

const CreateProductPage = () => {
  const response = useCategories();
  const categories = response.data;

  const [errorMessage, setErrorMessage] = useState('');
  const [isModalDangerActive, setIsModalDangerActive] = useState(false);
  const token = useAppSelector((state) => state.token.token);

  const handleSubmit = async (product: ProductRequest) => {
    console.log(product);
    if (!product.category) {
      setErrorMessage('Виберіть категорію');
      setIsModalDangerActive(true);
      return;
    }
    fetch('http://localhost:8080/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    }).then((data) => {
      if (data.status === 200) {
        data.json().then(console.log);
      } else {
        setErrorMessage('Помилка при додаванні продукту');
        setIsModalDangerActive(true);
      }
    });
  };

  return (
    <>
      <CardBoxModal
        title="Помилка"
        buttonColor="danger"
        buttonLabel="Ок"
        isActive={isModalDangerActive}
        onConfirm={() => setIsModalDangerActive(false)}
      >
        <p>{errorMessage}</p>
      </CardBoxModal>

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
                description: '',
                category: categories[0]?.id ?? undefined,
              } as ProductRequest
            }
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField label="Назва">
                <Field name="name" placeholder="Назва" />
              </FormField>

              <FormField label="Опис" hasTextareaHeight>
                <Field name="description" as="textarea" placeholder="Опис" />
              </FormField>

              <FormField label="Категорія" labelFor="category">
                <Field name="category" id="category" component="select">
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
