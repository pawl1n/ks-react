import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
} from "@mdi/js";
import { sampleChartData } from "components/ChartLineSample/config";
import Head from "next/head";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import type React from "react";
import { useGetOrderStatsQuery, useGetReportQuery } from "services/orders";
import SectionMain from "../components/SectionMain";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton";
import { getPageTitle } from "../config";
import LayoutAuthenticated from "../layouts/Authenticated";
import CardBox from "components/CardBox";
import "chartjs-adapter-moment";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  TimeScale,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import CardBoxWidget from "components/CardBoxWidget";
import type { PossibleStatuses } from "shared/types/order";
import { useGetUserStatsQuery } from "services/users";
import type { possibleRoles } from "shared/types/user";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
  TimeScale,
  Legend,
);

const Dashboard = () => {
  // const { clients } = useSampleClients();
  // const { transactions } = useSampleTransactions();
  //
  // const clientsListed = clients.slice(0, 4);
  //
  const dateFrom = moment().subtract(7, "days");
  const [startDate, setStartDate] = useState(dateFrom);
  const [endDate, setEndDate] = useState(moment());

  const orderStats = useGetOrderStatsQuery({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    orderStatus: "CREATED" as (typeof PossibleStatuses)[number],
  });

  const userStats = useGetUserStatsQuery({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    role: "ADMIN" as (typeof possibleRoles)[number],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    type: "line",
    scales: {
      x: {
        display: true,
        type: "time",
        time: {
          unit: "day",
        },
        min: startDate,
        max: endDate,
      },
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  const ordersResponse = useGetReportQuery({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });
  const [chartData, setChartData] = useState(sampleChartData());
  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    setChartData(sampleChartData(ordersResponse.data));
  }, [ordersResponse]);

  return (
    <>
      <Head>
        <title>{getPageTitle("Огляд")}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={`Огляд за ${startDate.format("DD.MM.YYYY")} - ${endDate.format(
            "DD.MM.YYYY",
          )}`}
          main
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            icon={mdiAccountMultiple}
            iconColor="success"
            number={userStats.data?.count || 0}
            label="Клієнтів"
          />
          <CardBoxWidget
            icon={mdiCartOutline}
            iconColor="info"
            number={orderStats.data?.count || 0}
            numberPrefix=""
            label="Замовлень"
          />
          <CardBoxWidget
            icon={mdiChartTimelineVariant}
            iconColor="success"
            number={orderStats.data?.sum || 0}
            numberSuffix=" грн."
            label="Замовлень на суму"
          />
          {/*</div>*/}
          {/*<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">*/}
          {/*  <div className="flex flex-col justify-between">*/}
          {/*    {transactions.map((transaction: Transaction) => (*/}
          {/*      <CardBoxTransaction*/}
          {/*        key={transaction.id}*/}
          {/*        transaction={transaction}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*  <div className="flex flex-col justify-between">*/}
          {/*    {clientsListed.map((client: Client) => (*/}
          {/*      <CardBoxClient key={client.id} client={client} />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="my-6">*/}
          {/*  <SectionBannerStarOnGitHub />*/}
        </div>
        <SectionTitleLineWithButton icon={mdiChartPie} title="Графік замовлень">
          {/*<BaseButton
            icon={mdiReload}
            color="whiteDark"
            onClick={fillChartData}
          />*/}
        </SectionTitleLineWithButton>
        <CardBox className="mb-6">
          <Line options={options} data={chartData} className="h-96" />
        </CardBox>
        {/*<SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />*/}
        {/*<NotificationBar color="info" icon={mdiMonitorCellphone}>*/}
        {/*  <b>Responsive table.</b> Collapses on mobile*/}
        {/*</NotificationBar>*/}
        {/*<CardBox hasTable>*/}
        {/*  <TableSampleClients />*/}
        {/*</CardBox>*/}
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
