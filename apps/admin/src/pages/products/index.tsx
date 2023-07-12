import { mdiPlus, mdiTshirtCrew } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import BaseButton from 'components/BaseButton';
import CardBox from 'components/CardBox';
import LayoutAuthenticated from 'layouts/Authenticated';
import SectionMain from 'components/SectionMain';
import SectionTitleLineWithButton from 'components/SectionTitleLineWithButton';
import { getPageTitle } from 'config';
import Table from 'components/tables/Table';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from 'services/products';
import { Product } from 'shared/types/product';

const TablesPage = () => {
  const [deleteProduct] = useDeleteProductMutation();

  return (
    <>
      <Head>
        <title>{getPageTitle('Речі')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTshirtCrew} title="Речі" main>
          <BaseButton icon={mdiPlus} color="contrast" href="/products/create" />
        </SectionTitleLineWithButton>
        <CardBox className="mb-6" hasTable>
          <Table<Product>
            columns={[
              { key: 'name', label: 'Назва' },
              { key: 'description', label: 'Опис' },
              { key: 'category', label: 'Категорія' },
            ]}
            useGetAll={useGetProductsQuery}
            dataKey={'products'}
            deleteItem={deleteProduct}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TablesPage;
