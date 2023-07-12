import { mdiPlus, mdiTshirtCrew } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import BaseButton from 'components/BaseButton';
import CardBox from 'components/CardBox';
import LayoutAuthenticated from 'layouts/Authenticated';
import SectionMain from 'components/SectionMain';
import SectionTitleLineWithButton from 'components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import Table from '../../components/tables/Table';
import {
  useDeleteVariationMutation,
  useGetVariationsQuery,
} from '../../services/variations';
import { Variation } from 'shared/types/variation';

const TablesPage = () => {
  const [deleteVariation] = useDeleteVariationMutation();

  return (
    <>
      <Head>
        <title>{getPageTitle('Варіації')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTshirtCrew} title="Варіації" main>
          <BaseButton
            icon={mdiPlus}
            color="contrast"
            href="/variations/create"
          />
        </SectionTitleLineWithButton>
        <CardBox className="mb-6" hasTable>
          <Table<Variation>
            columns={[{ key: 'name', label: 'Назва' }]}
            useGetAll={useGetVariationsQuery}
            dataKey={'variations'}
            deleteItem={deleteVariation}
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
