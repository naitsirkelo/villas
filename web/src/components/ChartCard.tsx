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

  const state = {
    options: {
      chart: {
        id: chartType,
      },
      xaxis: {
        categories: xAxisCategories,
      },
    },
    series: [
      {
        type: chartType,
        name: "series-1",
        data: xAxisData,
      },
    ],
    fill: {
      colors: [theme.colors.teal[7], "#E91E63", "#9C27B0"],
    },
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <ReactApexChart
        key={chartType}
        options={state.options}
        series={state.series}
        width="750"
      />
    </div>
  );
};
