import { ComboboxItem, OptionsFilter } from "@mantine/core";

export const optionsInterval: string[] = [
  "Daglig",
  "Ukentlig",
  "Månedlig",
  "Kvartal",
  "Halvår",
  "Årlig",
];

export const multipliers: Record<string, number> = {
  [optionsInterval[0]]: 365,
  [optionsInterval[1]]: 52,
  [optionsInterval[2]]: 12,
  [optionsInterval[3]]: 4,
  [optionsInterval[4]]: 2,
  [optionsInterval[5]]: 1,
};

export const validChartTypes = [
  { value: "area", label: "Area Chart" },
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
];

export const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(" ");
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(" ");
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord)),
    );
  });
};
