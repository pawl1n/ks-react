import { mdiMagnify, mdiTrashCan } from "@mdi/js";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import type {
  Product,
  ProductItem,
  ProductItemRequest,
} from "shared/types/product";
import type { Variation, VariationOption } from "shared/types/variation";
import {
  useCreateProductItemMutation,
  useDeleteProductItemMutation,
  useUpdateProductItemMutation,
} from "../services/products";
import { useGetCategoryVariationsQuery } from "../services/categories";
import BaseButton from "./BaseButton";
import BaseButtons from "./BaseButtons";
import CardBoxModal from "./CardBoxModal";
import FormField from "./FormField";
import Variations from "./Variations";

type Props = {
  productItem?: ProductItem;
  product?: Product;
  setAddNew?: (state: boolean) => void;
};

const ProductItemForm = ({ productItem, product, setAddNew }: Props) => {
  const [createProductItem] = useCreateProductItemMutation();
  const [updateProductItem] = useUpdateProductItemMutation();
  const [deleteProductItem] = useDeleteProductItemMutation();

  let variations: Variation[] = [];

  if (product?.category) {
    variations =
      useGetCategoryVariationsQuery(product.category.id).data?._embedded
        ?.variations ?? [];
  }
  const [isPickerActive, setIsPickerActive] = useState(false);

  const [productVariationOptions, setProductVariationOptions] = useState<
    VariationOption[]
  >(productItem?.variationOptions ?? []);

  const filteredVariations = variations.filter(
    (variation) =>
      !productVariationOptions.find(
        (option) => option.variationId === variation.id,
      ),
  );

  const handleCreate = (productItem: ProductItemRequest) => {
    if (!product) {
      return;
    }

    createProductItem({
      product: product,
      productItem: {
        ...productItem,
        variationOptions: productVariationOptions,
      },
    })
      .unwrap()
      .then(() => {
        setAddNew?.(false);
      });
  };

  const handleDelete = (productItem: ProductItem) => {
    deleteProductItem(productItem);
  };

  const handleUpdate = (changed: ProductItemRequest) => {
    if (!productItem) {
      return;
    }

    updateProductItem({
      entity: productItem,
      data: {
        ...changed,
        variationOptions: productVariationOptions,
      },
    });
  };

  const handleDeleteVariationOption = (variationOption: VariationOption) => {
    setProductVariationOptions(
      productVariationOptions.filter(
        (option) =>
          option.value !== variationOption.value ||
          option.variationId !== variationOption.variationId,
      ),
    );
  };

  const [selectedVariation, setSelectedVariation] = useState(
    undefined as Variation | undefined,
  );
  const [selectedOption, setSelectedOption] = useState(
    undefined as VariationOption | undefined,
  );

  const pickVariationOption = (variation: Variation) => {
    setSelectedVariation(variation);
    setIsPickerActive(true);
  };

  const handleSelectedOption = () => {
    if (!selectedOption || !productItem) {
      return;
    }

    setProductVariationOptions([
      ...productVariationOptions.filter(
        (value) =>
          value.value !== selectedOption.value ||
          value.variationId !== selectedOption.variationId,
      ),
      selectedOption,
    ]);

    setIsPickerActive(false);
    setSelectedOption(undefined);
  };

  if (!productItem) {
    return (
      <Formik
        initialValues={
          {
            stock: 0,
          } as ProductItemRequest
        }
        onSubmit={handleCreate}
      >
        <Form className="mb-10">
          <FormField label="Кількість">
            <Field name="stock" />
          </FormField>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Додати" />
            <BaseButton type="reset" color="info" outline label="Очистити" />
          </BaseButtons>
        </Form>
      </Formik>
    );
  }

  return (
    <>
      <CardBoxModal
        title="Вибір варіації"
        buttonColor="info"
        buttonLabel="Вибрати"
        isActive={isPickerActive}
        onConfirm={handleSelectedOption}
      >
        {selectedVariation && (
          <Variations
            variation={selectedVariation}
            onSelect={setSelectedOption}
          />
        )}
      </CardBoxModal>
      <Formik
        initialValues={productItem}
        onSubmit={(changed) => handleUpdate(changed)}
        key={productItem.id}
      >
        <Form className="mb-10">
          <FormField label="Кількість">
            <Field name="stock" />
          </FormField>

          {productVariationOptions.map((option) => (
            <div
              key={`${option.variationId}-${option.value}`}
              className="flex my-5 px-5 py-2 rounded bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
            >
              <p className="flex-1">{option.value}</p>
              <BaseButton
                type="button"
                color="danger"
                icon={mdiTrashCan}
                onClick={() => handleDeleteVariationOption(option)}
              />
            </div>
          ))}
          <BaseButtons>
            {filteredVariations?.map((variation) => (
              <BaseButton
                key={variation.id}
                type="button"
                color="info"
                label={variation.name}
                icon={mdiMagnify}
                onClick={() => pickVariationOption(variation)}
              />
            ))}
          </BaseButtons>

          <BaseButtons className="my-5">
            <BaseButton type="submit" color="info" label="Зберегти" />
            <BaseButton type="reset" color="info" outline label="Очистити" />
            <BaseButton
              color="danger"
              label="Видалити"
              onClick={() => handleDelete(productItem)}
            />
          </BaseButtons>
        </Form>
      </Formik>
    </>
  );
};

export default ProductItemForm;
