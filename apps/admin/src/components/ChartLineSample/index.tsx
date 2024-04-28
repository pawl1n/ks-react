import React from "react";
import {
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: false,
    },
    x: {
      display: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

type ChartLineProps = {
  data: ChartData<"line">;
};

const ChartLineSample = ({ data }: ChartLineProps) => {
  return <Line options={options} data={data} className="h-96" />;
};

export default ChartLineSample;
