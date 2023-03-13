import { mdiPlus, mdiTshirtCrew } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import BaseButton from 'components/BaseButton';
import CardBox from 'components/CardBox';
import LayoutAuthenticated from 'layouts/Authenticated';
import SectionMain from 'components/SectionMain';
import SectionTitleLineWithButton from 'components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableProducts from 'components/tables/TableProducts';

const TablesPage = () => {
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
          <TableProducts />
        </CardBox>
      </SectionMain>
    </>
  );
};

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TablesPage;
