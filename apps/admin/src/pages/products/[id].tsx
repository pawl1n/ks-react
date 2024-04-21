import { mdiArrowLeft, mdiPlus, mdiUpload } from "@mdi/js";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import React, { type ReactElement, useState } from "react";
import BaseButton from "components/BaseButton";
import BaseButtons from "components/BaseButtons";
import BaseDivider from "components/BaseDivider";
import CardBox from "components/CardBox";
import FormField from "components/FormField";
import SectionMain from "components/SectionMain";
import SectionTitleLineWithButton from "components/SectionTitleLineWithButton";
import { getPageTitle } from "config";
import Router from "next/router";
import LayoutAuthenticated from "layouts/Authenticated";
import FormFilePicker from "components/FormFilePicker";
import Image from "next/image";
import type { Image as ImageType, ProductRequest } from "types/request";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "services/products";
import { useGetCategoriesQuery } from "services/categories";
import ImagePicker from "components/ImagePicker";
import { useCreateImageMutation } from "../../services/images";
import ProductItems from "../../components/ProductItems";

const EditProductPage = () => {
  const id = Router.query.id as string;
  if (!Number.parseInt(id)) {
    throw new Error("Invalid id");
  }

  const productResponse = useGetProductByIdQuery(Number.parseInt(id));
  const product = productResponse?.data;

  const response = useGetCategoriesQuery(undefined);
  const categories = response.data?._embedded?.categories ?? [];

  const [updateProduct] = useUpdateProductMutation();
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
    }
  };

  const handleSubmit = async (changed: ProductRequest) => {
    if (!product) {
      return;
    }

    if (imageFile) {
      const reader = new FileReader();

      reader.readAsDataURL(imageFile);

      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];

        createImage({
          base64Image: base64,
          name: changed.name,
        })
          .unwrap()
          .then((data) => {
            changed.mainImage = data.url;
            updateProduct({
              entity: product,
              data: changed,
            }).catch(() => {
              console.log("error");
            });

            Router.back();
          })
          .catch(() => {
            console.log("error");
          });
      };

      return;
    }

    if (selectedImage) {
      changed.mainImage = selectedImage.url;
    }

    updateProduct({
      entity: product,
      data: changed,
    })
      .unwrap()
      .then(() => {
        Router.back();
      })
      .catch(() => {
        console.log("error");
      });
  };

  if (!product) {
    return <>Не знайдено</>;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle("Редагування товару")}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPlus}
          title="Редагування товару"
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
              accept="image/*"
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

          {!imageFile && !selectedImage && product.mainImage && (
            <div className="relative h-[150px]">
              <Image
                src={product.mainImage}
                alt={product.name}
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
                name: product.name,
                description: product.description,
                mainImage: product.mainImage,
                category: product.category?.id,
                price: product.price,
                sku: product.sku,
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
                  <option>Виберіть категорію</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </FormField>

              <FormField label="Ціна">
                <Field name="price" />
              </FormField>

              <FormField label="Код">
                <Field name="sku" />
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
      <ProductItems product={product} />
    </>
  );
};

EditProductPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditProductPage;
