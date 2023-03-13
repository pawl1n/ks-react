import { mdiPlus, mdiTshirtCrew } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import BaseButton from 'components/BaseButton';
import LayoutAuthenticated from 'layouts/Authenticated';
import SectionMain from 'components/SectionMain';
import SectionTitleLineWithButton from 'components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import GridImages from '../../components/GridImages';

const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Зображення')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiTshirtCrew}
          title="Зображення"
          main
        >
          <BaseButton icon={mdiPlus} color="contrast" href="/images/create" />
        </SectionTitleLineWithButton>
        <GridImages />
      </SectionMain>
    </>
  );
};

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TablesPage;
