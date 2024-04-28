import { mdiChartTimelineVariant } from "@mdi/js";
import { sampleChartData } from "components/ChartLineSample/config";
import Head from "next/head";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import type React from "react";
import { useGetReportQuery } from "services/orders";
import SectionMain from "../components/SectionMain";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton";
import { getPageTitle } from "../config";
import LayoutAuthenticated from "../layouts/Authenticated";
import CardBox from "components/CardBox";
import ChartLineSample from "components/ChartLineSample";
import "chartjs-adapter-moment";
import {
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
  TimeScale,
);

const Dashboard = () => {
  // const { clients } = useSampleClients();
  // const { transactions } = useSampleTransactions();
  //
  // const clientsListed = clients.slice(0, 4);
  //
  //
  const dateFrom = moment().subtract(7, "days");
  const [startDate, setStartDate] = useState(dateFrom);
  const [endDate, setEndDate] = useState(moment());

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
  };
  const ordersResponse = useGetReportQuery({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });
  const [chartData, setChartData] = useState(sampleChartData());
  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault();

    setChartData(sampleChartData());
  };

  useEffect(() => {
    setChartData(sampleChartData(ordersResponse.data?.details));
  }, [ordersResponse]);

  return (
    <>
      <Head>
        <title>{getPageTitle("Dashboard")}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title="Огляд"
          main
        />
        {/*<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">*/}
        {/*  <CardBoxWidget*/}
        {/*    trendLabel="12%"*/}
        {/*    trendType="up"*/}
        {/*    trendColor="success"*/}
        {/*    icon={mdiAccountMultiple}*/}
        {/*    iconColor="success"*/}
        {/*    number={512}*/}
        {/*    label="Clients"*/}
        {/*  />*/}
        {/*  <CardBoxWidget*/}
        {/*    trendLabel="16%"*/}
        {/*    trendType="down"*/}
        {/*    trendColor="danger"*/}
        {/*    icon={mdiCartOutline}*/}
        {/*    iconColor="info"*/}
        {/*    number={7770}*/}
        {/*    numberPrefix="$"*/}
        {/*    label="Sales"*/}
        {/*  />*/}
        {/*  <CardBoxWidget*/}
        {/*    trendLabel="Overflow"*/}
        {/*    trendType="warning"*/}
        {/*    trendColor="warning"*/}
        {/*    icon={mdiChartTimelineVariant}*/}
        {/*    iconColor="danger"*/}
        {/*    number={256}*/}
        {/*    numberSuffix="%"*/}
        {/*    label="Performance"*/}
        {/*  />*/}
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
        {/*</div>*/}
        {/*<SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">*/}
        {/*  <BaseButton*/}
        {/*    icon={mdiReload}*/}
        {/*    color="whiteDark"*/}
        {/*    onClick={fillChartData}*/}
        {/*  />*/}
        {/*</SectionTitleLineWithButton>*/}
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
