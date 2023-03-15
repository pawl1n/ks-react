import CardBox from './CardBox';
import React, { useState } from 'react';
import BaseButton from './BaseButton';
import BaseButtons from './BaseButtons';
import { mdiBrushVariant, mdiPlus } from '@mdi/js';
import Product, { ProductItem } from '../interfaces/Product';
import { useGetProductItemsQuery } from '../services/products';
import SectionTitleLineWithButton from './SectionTitleLineWithButton';
import SectionMain from './SectionMain';
import ProductItemForm from './ProductItem';

type Props = {
  product?: Product;
};

const ProductItems = ({ product }: Props) => {
  if (!product) {
    return <></>;
  }

  const { data } = useGetProductItemsQuery(product);
  const productItems: ProductItem[] = data?._embedded?.productItems ?? [];
  const [addOption, setAddOption] = useState(false);

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
            <ProductItemForm productItem={productItem} key={productItem.id} />
          ))}
          {addOption && (
            <ProductItemForm product={product} setAddNew={setAddOption} />
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