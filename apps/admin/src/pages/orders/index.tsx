import { mdiPackage } from "@mdi/js";
import Head from "next/head";
import React, { type ReactElement } from "react";
import CardBox from "components/CardBox";
import LayoutAuthenticated from "layouts/Authenticated";
import SectionMain from "components/SectionMain";
import SectionTitleLineWithButton from "components/SectionTitleLineWithButton";
import { getPageTitle } from "config";
import Table from "components/tables/Table";
import { useGetOrdersQuery } from "../../services/orders";
import type { Order } from "shared/types/order";

const OrdersPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle("Замовлення")}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiPackage} title="Замовлення" main />
        <CardBox className="mb-6" hasTable>
          <Table<Order>
            columns={[
              { key: "id", label: "Номер" },
              { key: "customerFullName", label: "Клієнт" },
              { key: "description", label: "Опис" },
              { key: "currentStatus", label: "Статус" },
              { key: "paymentType", label: "Тип оплати" },
              { key: "shippingMethod", label: "Метод доставки" },
              { key: "totalPrice", label: "Сума" },
            ]}
            useGetAll={useGetOrdersQuery}
            dataKey={"orders"}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default OrdersPage;
