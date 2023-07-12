import { mdiArrowLeft, mdiPlus, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import BaseButton from 'components/BaseButton';
import CardBox from 'components/CardBox';
import SectionMain from 'components/SectionMain';
import SectionTitleLineWithButton from 'components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import Router from 'next/router';
import LayoutAuthenticated from 'layouts/Authenticated';
import { ImageRequest } from 'types/request';
import { useCreateImageMutation } from '../../services/images';
import FormField from '../../components/FormField';
import FormFilePicker from '../../components/FormFilePicker';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import BaseDivider from 'components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';

const CreateImagePage = () => {
  const [imageFile, setImageFile] = useState(null as File | null);
  const [createImage] = useCreateImageMutation();

  const handleSubmit = async (image: ImageRequest) => {
    if (!imageFile) {
      throw new Error('Виберіть зображення');
    }
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      const result = reader.result as string;
      image.base64Image = result.split(',')[1];

      createImage(image)
        .unwrap()
        .then(() => {
          Router.back();
        });
    };
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Додавання зображення')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPlus}
          title="Додавання зображення"
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
              accept="image/*"
              label="Обрати"
              color="info"
              icon={mdiUpload}
              handleChange={setImageFile}
            />
          </FormField>
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
        </CardBox>

        <CardBox>
          <Formik
            initialValues={
              {
                name: '',
                description: '',
              } as ImageRequest
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

CreateImagePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default CreateImagePage;
