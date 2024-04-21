import { mdiArrowLeft, mdiPlus } from "@mdi/js";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import React, { useState, useEffect, type ReactElement } from "react";
import BaseButton from "components/BaseButton";
import BaseButtons from "components/BaseButtons";
import BaseDivider from "components/BaseDivider";
import CardBox from "components/CardBox";
import FormField from "components/FormField";
import SectionMain from "components/SectionMain";
import SectionTitleLineWithButton from "components/SectionTitleLineWithButton";
import { getPageTitle } from "../../config";
import Router from "next/router";
import LayoutAuthenticated from "layouts/Authenticated";
import type { CategoryRequest } from "types/request";
import {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../services/categories";
import Multiselect, { type ListValue } from "components/Multiselect";
import { useGetVariationsQuery } from "services/variations";

const CreateProductPage = () => {
  const id = Router.query.id as string;
  if (!Number.parseInt(id)) {
    throw new Error("Invalid id");
  }

  const categoryResponse = useGetCategoryByIdQuery(Number.parseInt(id));
  const category = categoryResponse?.data;

  const response = useGetCategoriesQuery(undefined);
  const categories = response?.data?._embedded?.categories ?? [];

  const variations =
    useGetVariationsQuery(undefined)?.data?._embedded?.variations ?? [];
  const variationsList: ListValue[] = variations.map((variation) => {
    return {
      id: variation.id,
      name: variation.name,
    };
  });

  const [selectedVariations, setSelectedVariations] = useState<number[]>([]);

  const [updateCategory] = useUpdateCategoryMutation();

  const handleSubmit = async (categoryRequest: CategoryRequest) => {
    if (!category) {
      return;
    }

    categoryRequest.variations = selectedVariations;

    updateCategory({
      entity: category,
      data: categoryRequest,
    })
      .unwrap()
      .then(() => {
        Router.back();
      });
  };

  useEffect(() => {
    if (categoryResponse.isSuccess && category) {
      setSelectedVariations(
        category.variations.map((variation) => variation.id) ?? [],
      );
    }
  }, [categoryResponse, category]);

  if (!category) {
    return <>Не знайдено</>;
  }

  if (response.isLoading) {
    return <>Завантаження...</>;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle("Редагування категорії")}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPlus}
          title="Редагування категорії"
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
                slug: category.slug,
              } as CategoryRequest
            }
            onSubmit={handleSubmit}
          >
            <Form>
              <FormField label="Назва">
                <Field name="name" placeholder="Назва" />
              </FormField>

              <FormField label={category.path}>
                <Field name="slug" placeholder="slug" />
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
                  <option value="null">Відсутня</option>
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
              {category.variations && (
                <Multiselect
                  values={variationsList}
                  selectedValues={selectedVariations}
                  onChange={setSelectedVariations}
                />
              )}
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
