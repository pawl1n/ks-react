import CardBox from "./CardBox";
import React, { useState } from "react";
import BaseButton from "./BaseButton";
import BaseButtons from "./BaseButtons";
import { mdiBrushVariant, mdiPlus } from "@mdi/js";
import type { Product, ProductItem } from "shared/types/product";
import { useGetProductItemsQuery } from "../services/products";
import SectionTitleLineWithButton from "./SectionTitleLineWithButton";
import SectionMain from "./SectionMain";
import ProductItemForm from "./ProductItem";
import { useGetCategoryVariationsQuery } from "services/categories";

type Props = {
  product: Product;
};

const ProductItems = ({ product }: Props) => {
  const { data, isSuccess } = useGetProductItemsQuery(product);
  const productItems: ProductItem[] = data?._embedded?.productItems ?? [];
  const [addOption, setAddOption] = useState(false);
  const { data: variationsData, isSuccess: isVariationsSuccess } =
    useGetCategoryVariationsQuery(product.category.id);
  const variations = variationsData?._embedded?.variations ?? [];

  if (!isSuccess || !isVariationsSuccess) {
    return <>Завантаження</>;
  }

  return (
    <>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiBrushVariant}
          title="Варіації"
          main
        />
        <CardBox>
          {productItems?.map((productItem) => (
            <ProductItemForm
              productItem={productItem}
              key={productItem.id}
              variations={variations}
            />
          ))}
          {addOption && (
            <ProductItemForm
              product={product}
              setAddNew={setAddOption}
              variations={variations}
            />
          )}
          <BaseButtons>
            <BaseButton
              color="info"
              label="Додати"
              icon={mdiPlus}
              onClick={() => setAddOption(true)}
            />
          </BaseButtons>
        </CardBox>
      </SectionMain>
    </>
  );
};

export default ProductItems;
