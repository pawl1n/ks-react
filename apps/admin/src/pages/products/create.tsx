import { mdiArrowLeft, mdiPlus, mdiUpload } from '@mdi/js';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
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
import FormFilePicker from 'components/FormFilePicker';
import Image from 'next/image';
import { ProductRequest } from 'interfaces/Product';
import { useCreateProductMutation } from 'services/products';
import { useGetCategoriesQuery } from 'services/categories';
import ImagePicker from 'components/ImagePicker';
import ImageType from 'interfaces/Image';
import { useCreateImageMutation } from '../../services/images';

const CreateProductPage = () => {
  const response = useGetCategoriesQuery();
  const categories = response.data ?? [];

  const [createProduct] = useCreateProductMutation();
  const [createImage] = useCreateImageMutation();

  const [imageFile, setImageFile] = useState(null as File | null);
  const [selectedImage, setSelectedImage] = useState(null as ImageType | null);

  const handleSelectImage = (image: ImageType | null) => {
    setSelectedImage(image);
    setImageFile(null);
  };

  const handleSelectImageFile = (file: File | null): void => {
    if (file) {
      setImageFile(file);
      setSelectedImage(null);
    } else {
      setImageFile(null);
      return;
    }
  };

  const handleSubmit = async (product: ProductRequest) => {
    if (imageFile) {
      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];

        createImage({
          base64Image: base64,
          name: product.name,
        })
          .unwrap()
          .then((data) => {
            product.mainImage = data.url;
            createProduct(product);

            Router.back();
          });
      };

      return;
    }

    if (selectedImage) {
      product.mainImage = selectedImage.url;
    }

    createProduct(product)
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

        <CardBox className="mb-6">
          <FormField label="Зображення">
            <FormFilePicker
              label="Завантажити"
              color="info"
              icon={mdiUpload}
              handleChange={handleSelectImageFile}
            />
          </FormField>
          <ImagePicker selectImage={handleSelectImage} />

          {imageFile && (
            <div className="relative h-[150px]">
              <Image
                src={URL.createObjectURL(imageFile)}
                alt={imageFile.name}
                fill
                className="object-contain"
              />
            </div>
          )}

          {selectedImage && (
            <div className="relative h-[150px]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.name}
                fill
                className="object-contain"
              />
            </div>
          )}
        </CardBox>

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
