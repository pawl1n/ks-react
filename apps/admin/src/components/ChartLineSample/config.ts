import moment from "moment";
import type {
  OrderReport,
  OrderReportDetails,
  PossibleStatuses,
} from "shared/types/order";

export const chartColors = {
  default: {
    CREATED: "#00D1B2",
    CONFIRMED: "#209CEE",
    CANCELED: "#FF3860",
  },
};

const randomChartData = (n: number) => {
  const data = [];

  for (let i = 1; i < n + 1; i++) {
    data.push({ x: `0${i}`, y: Math.round(Math.random() * 200) });
  }

  return data;
};

export type PointData = {
  x: string;
  y: number;
};

export const datasetObject = (
  color: keyof (typeof PossibleStatuses)[number],
  data: PointData[] | undefined,
) => {
  if (!data) {
    return;
  }

  return {
    fill: false,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data,
    tension: 0.5,
    cubicInterpolationMode: "default",
    label: color,
  };
};

export const sampleChartData = (
  report: OrderReport | undefined = undefined,
) => {
  const labels = [];
  const points = 9;

  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`);
  }

  if (report?.details) {
    const details = report.details;
    const defaultData: PointData[] = [];
    const endDate = moment(report.endDate);

    for (
      const date = moment(report.startDate);
      !date.isAfter(endDate);
      date.add(1, "day")
    ) {
      defaultData.push({ x: date.format("YYYY-MM-DD"), y: 0 });
    }

    return {
      datasets: Object.keys(details).map((key) => {
        return datasetObject(
          key as keyof (typeof PossibleStatuses)[number],
          // Object.keys(details[key as keyof OrderReportDetails]).map(
          //   (innerKey) => {
          //     return {
          //       x: innerKey,
          //       y: details[key as keyof OrderReportDetails][innerKey],
          //     };
          //   },
          // )
          defaultData.map((data) => {
            return {
              x: data.x,
              y: details[key as keyof OrderReportDetails][data.x] || 0,
            };
          }),
        );
      }),
    };
  }

  return {
    labels,
    datasets: [
      datasetObject("CREATED", randomChartData(points)),
      datasetObject("CONFIRMED", randomChartData(points)),
      datasetObject("CANCELED", randomChartData(points)),
    ],
  };
};
