import React from "react";
import ReactApexChart from "react-apexcharts";
import { useMantineTheme } from "@mantine/core";

interface ChartCardProps {
  chartType: string;
  xAxisCategories: string[];
  xAxisData: number[];
}

export const ChartCard = ({
  chartType,
  xAxisCategories,
  xAxisData,
}: ChartCardProps) => {
  const theme = useMantineTheme();

  const config = {
    options: {
      chart: {
        id: chartType,
      },
      xaxis: {
        categories: xAxisCategories,
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 500,
          },
          formatter: function (value: number) {
            return value.toLocaleString("no-NO");
          }
        }
      },
      fill: {
        opacity: [0.7],
        colors: [theme.colors.teal[3]],
      },
      stroke: {
        show: true,
        width: 2,
        colors: [theme.colors.teal[5]],
      },
    },
    series: [
      {
        type: chartType,
        name: "Sum",
        data: xAxisData,
      },
    ],
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <ReactApexChart
        key={chartType}
        options={config.options}
        series={config.series}
        width="750"
      />
    </div>
  );
};
