import {
  mdiArrowDownBold,
  mdiArrowLeft,
  mdiArrowUpBold,
  mdiEye,
  mdiPackage,
  mdiTrashCan,
} from "@mdi/js";
import BaseButton from "components/BaseButton";
import BaseButtons from "components/BaseButtons";
import BaseDivider from "components/BaseDivider";
import CardBox from "components/CardBox";
import FormField from "components/FormField";
import SectionMain from "components/SectionMain";
import SectionTitleLineWithButton from "components/SectionTitleLineWithButton";
import { getPageTitle } from "config";
import { Field, Form, Formik } from "formik";
import LayoutAuthenticated from "layouts/Authenticated";
import Head from "next/head";
import Router from "next/router";
import React, { type ReactElement } from "react";
import type { Order, OrderItem, OrderStatus } from "shared/types/order";
import { PossibleStatuses } from "shared/types/order";
import { addToast } from "stores/toastSlice";
import { ToastType } from "types/toast";
import NestedTable from "../../components/tables/NestedTable";
import Table from "../../components/tables/Table";
import {
  useGetOrderByIdQuery,
  useGetOrderItemsQuery,
  useUpdateStatusMutation,
} from "../../services/orders";

const EditOrderPage = () => {
  const id = Router.query.id as string;
  if (!Number.parseInt(id)) {
    throw new Error("Invalid id");
  }

  const response = useGetOrderByIdQuery(Number.parseInt(id));
  const order = response?.data;

  const [updateStatus] = useUpdateStatusMutation();

  const handleSubmit = async ({ status }: { status: OrderStatus }) => {
    if (!order || !status) {
      return;
    }

    updateStatus({
      order,
      status,
    })
      .unwrap()
      .then(() => {
        Router.back();
      })
      .catch(() => {
        addToast({
          toast: {
            type: ToastType.danger,
            message: "Не вдалося змінити статус",
          },
        });
      });
  };

  if (!order) {
    return <>Не знайдено</>;
  }

  return (
    <>
      <Head>
        <title>{getPageTitle(`Замовлення №${id}`)}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiPackage}
          title={`Замовлення №${id}`}
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
            initialValues={{
              id: order.id,
              customerFullName: order.customerFullName,
              userEmail: order.userEmail,
              phoneNumber: order.phoneNumber,
              address: order.address,
              shippingMethod: order.shippingMethod,
              status: order.currentStatus,
            }}
            onSubmit={handleSubmit}
          >
            <Form>
              <fieldset disabled>
                <FormField label="Номер" labelFor="id">
                  <Field name="id" id="id" />
                </FormField>

                <FormField label="Імʼя" labelFor="customerFullName">
                  <Field name="customerFullName" id="customerFullName" />
                </FormField>

                <FormField label="Email" labelFor="userEmail">
                  <Field name="userEmail" id="userEmail" />
                </FormField>

                <FormField label="Номер телефону" labelFor="phoneNumber">
                  <Field name="phoneNumber" id="phoneNumber" />
                </FormField>

                <FormField label="Адреса" labelFor="address">
                  <Field name="address" id="address" />
                </FormField>

                <FormField label="Спосіб доставки" labelFor="shippingMethod">
                  <Field name="shippingMethod" id="shippingMethod" />
                </FormField>
              </fieldset>

              <FormField label="Статус" labelFor="status">
                <Field name="status" id="status" component="select">
                  <option>Виберіть статус</option>
                  {PossibleStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Field>
              </FormField>

              <BaseDivider />

              <NestedTable<OrderItem, Order>
                columns={[
                  { key: "productItem.productName", label: "Назва" },
                  { key: "productItem.description", label: "Опис" },
                  { key: "quantity", label: "Кількість" },
                  { key: "price", label: "Ціна" },
                ]}
                useGetAll={useGetOrderItemsQuery}
                dataKey={"orderItems"}
                parentEntity={order}
              />

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
    </>
  );
};

EditOrderPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditOrderPage;
