import {
  ActionIcon,
  Anchor,
  Divider,
  Group,
  Tooltip,
  Text,
  Card,
  Select,
  Badge,
  useMantineTheme,
  rem,
  NumberInput,
} from "@mantine/core";
import {
  IconBookmark,
  IconChartBubble,
  IconChartDonut,
  IconCopy,
  IconFileExport,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { ChartCard } from "./ChartCard";
import CurrencyFormat from "react-currency-format";
import {
  multipliers,
  optionsInterval,
  optionsFilter,
  validChartTypes,
} from "../utils/constants";

export const GraphCard: React.FC = () => {
  const theme = useMantineTheme();
  const date = new Date().toDateString();

  const initialInputSum = 1000;
  const validFirstYear = 2023;
  const validEndYear = 2033;
  const optionsLastYear = 2123;
  const defaultInterval = "Månedlig";
  const validInterval: string = optionsInterval.includes(defaultInterval)
    ? defaultInterval
    : optionsInterval[0];

  const [selectedOption, setSelectedOption] = useState(
    validChartTypes[0].value,
  );
  const [startYear, setStartYear] = useState<number>(validFirstYear);
  const [endYear, setEndYear] = useState<number>(validEndYear);

  const [totalYears, setTotalYears] = useState<number[]>([2023, 2024]);
  const [dataArray, setDataArray] = useState<number[]>([
    initialInputSum,
    initialInputSum * 1.05,
  ]);

  const [interval, setInterval] = useState<string>(validInterval);
  const [variationPercentage, setVariationPercentage] = useState<number>(7.5);

  const [dcaSum, setDcaSum] = useState<number>(initialInputSum);
  const [dcaCleanSum, setDcaCleanSum] = useState<number>(initialInputSum);

  const [startSum, setStartSum] = useState<number>(initialInputSum*10);

  // Graph handlers
  const handleSelectChange = (value: any) => {
    setSelectedOption(value);
  };

  const handleStartYearChange = (value: any) => {
    const parsedValue = parseInt(value);
    if (parsedValue >= validFirstYear && parsedValue !== startYear) {
      setStartYear(parsedValue);
    }
  };

  const handleEndYearChange = (value: any) => {
    value = parseInt(value);
    if (value >= validFirstYear && value !== endYear) {
      setEndYear(value);
    }
  };

  const handleIntervalChange = (value: any) => {
    setInterval(value);
  };

  const handleDcaChange = (value: any) => {
    if (!value) value = 0;
    setDcaSum(parseInt(value));
  };

  const handleStartSumChange = (value: any) => {
    if (!value) value = 0;
    setStartSum(parseInt(value));
  };

  const handleVariationChange = (value: any) => {
    setVariationPercentage(value);
  };

  // Select option handling
  const options: string[] = Array.from(
    { length: optionsLastYear - validFirstYear + 1 },
    (_, index) => (validFirstYear + index + 1).toString(),
  );

  const optionsStart: string[] = Array.from(
    { length: optionsLastYear - validFirstYear + 1 },
    (_, index) => (validFirstYear + index).toString(),
  );

  // Graph rendering
  const updateGraph = (start: number, end: number) => {
    const years = Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index,
    );
    setTotalYears(years);
  };

  useEffect(() => {
    updateGraph(startYear, endYear);
  }, [startYear, endYear]);

  // Resulting sum calculation
  const Result = () => {
    const years = endYear - startYear;
    return (
      <Group>
        <Group>
          <Text style={{ marginBottom: "25px" }}>Resultat (0%):</Text>
          <Badge
            style={{ marginBottom: "25px" }}
            size="xl"
            variant="gradient"
            gradient={{
              from: theme.colors.teal[4],
              to: theme.colors.teal[5],
              deg: 90,
            }}
          >
            <CurrencyFormat
              value={dcaCleanSum}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Kr "}
            />
          </Badge>
        </Group>
        <Group>
          <Text style={{ marginBottom: "25px" }}>
            Resultat ({variationPercentage}%):
          </Text>
          <Badge
            style={{ marginBottom: "25px" }}
            size="xl"
            variant="gradient"
            gradient={{
              from: theme.colors.teal[4],
              to: theme.colors.teal[5],
              deg: 90,
            }}
          >
            <CurrencyFormat
              value={dataArray[dataArray.length - 1]}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Kr "}
            />
          </Badge>
        </Group>
        <Group>
          <Text style={{ marginBottom: "25px" }}>Forskjell:</Text>
          <Badge
            style={{ marginBottom: "25px" }}
            size="xl"
            variant="gradient"
            gradient={{
              from: theme.colors.green[3],
              to: theme.colors.green[7],
              deg: 90,
            }}
          >
            <CurrencyFormat
              value={(
                (dataArray[dataArray.length - 1] / dcaCleanSum - 1) *
                100
              ).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" %"}
              decimalScale={2}
            />
          </Badge>
        </Group>
      </Group>
    );
  };

  const generateData = () => {
    const data: number[] = [];
    const dataNoReturn: number[] = [];

    let val = 0;
    let valClean = 0;

    data.push(startSum); // Year 0 = initiell investert startSum, for graph output
    dataNoReturn.push(startSum);

    totalYears.slice(1).forEach((_year, index) => {

      if (startSum !== 0 && index === 0) {
        val += startSum;
        valClean += startSum;
      }

      val += dcaSum * multipliers[interval];
      val *= 1 + 0.01 * variationPercentage;

      valClean += dcaSum * multipliers[interval];

      data.push(Math.floor(val));
      dataNoReturn.push(Math.floor(valClean));
    });
    setDcaCleanSum(dataNoReturn[dataNoReturn.length - 1]);
    return data;
  };

  //TODO: Legg til DCA ut, som kan settes fra f.eks år 10.

  useEffect(() => {
    const generatedData = generateData();
    setDataArray(generatedData);
  }, [dcaSum, startSum, variationPercentage, interval, totalYears]);

  return (
    <Card style={{ width: "80%" }}>
      <Select
        data={validChartTypes}
        value={selectedOption}
        onChange={(value) => handleSelectChange(value)}
        placeholder="Select a chart type"
        style={{ marginBottom: "25px", width: "20%" }}
      />
      <Card.Section inheritPadding>
        <Group style={{ marginBottom: "25px" }}>
          <Select
            label="Fra"
            placeholder="Velg år"
            defaultValue={validFirstYear.toString()}
            data={optionsStart}
            filter={optionsFilter}
            searchable
            onChange={(value) => handleStartYearChange(value)}
            allowDeselect={false}
            style={{ width: "25%" }}
          />
          <Select
            label="Til"
            placeholder="Velg år"
            defaultValue={validEndYear.toString()}
            value={endYear.toString()}
            data={options}
            filter={optionsFilter}
            searchable
            onChange={(value) => handleEndYearChange(value)}
            allowDeselect={false}
            style={{ width: "25%" }}
          />
          <Badge
              size="lg"
              style={{
                marginTop: rem(25),
                backgroundColor: theme.colors.teal[1],
                color: theme.colors.blue[8],
              }}
          >
            {endYear - startYear} år
          </Badge>
          <Select
            label="Tidsintervall"
            placeholder={defaultInterval}
            defaultValue={defaultInterval}
            value={interval}
            data={optionsInterval}
            filter={optionsFilter}
            searchable
            onChange={(value) => handleIntervalChange(value)}
            allowDeselect={false}
            style={{ width: "30%" }}
          />
        </Group>

        <Group style={{ marginBottom: "25px" }}>
          <NumberInput
            style={{ width: "25%" }}
            label="Inne ved start"
            size="sm"
            placeholder="Velg sum"
            defaultValue={initialInputSum * 10}
            value={startSum}
            min={-10000000}
            max={10000000}
            allowDecimal={false}
            allowNegative={false}
            thousandSeparator=","
            rightSection={<IconChartBubble />}
            onChange={(value) => handleStartSumChange(value)}
          />
          <NumberInput
            style={{ width: "25%" }}
            label="Sparesum"
            size="sm"
            placeholder="Velg DCA"
            defaultValue={initialInputSum}
            value={dcaSum}
            min={0}
            max={100000}
            allowDecimal={false}
            allowNegative={false}
            thousandSeparator=","
            rightSection={<IconChartBubble />}
            onChange={(value) => handleDcaChange(value)}
          />
          <NumberInput
              style={{ width: "25%" }}
              label="Variasjon"
              size="sm"
              placeholder="Velg %"
              suffix=" %"
              defaultValue={0}
              value={variationPercentage}
              min={-100}
              max={10000}
              allowDecimal={true}
              allowNegative={true}
              thousandSeparator=","
              rightSection={<IconChartDonut />}
              onChange={(value) => handleVariationChange(value)}
          />
        </Group>

        <ChartCard
          chartType={selectedOption}
          xAxisCategories={totalYears.map((number) => number.toString())}
          xAxisData={dataArray}
        />

        <div style={{ display: "flex", marginLeft: "50px", marginTop: "5px" }}>
          <Result />
        </div>

        <Divider pb="sm" />
        <Group justify="space-between" style={{ marginBottom: "20px" }}>
          <Group>
            <Text c="red" fw="bold" fs="italic" size="xs">
              New
            </Text>
            <Text size="xs">Oppdatert: {date}</Text>
            <Text size="xs">
              Hentet fra:{" "}
              <Anchor href={"google.no"} target="_blank">
                URL
              </Anchor>
            </Text>
          </Group>
          <Group gap={4}>
            <Tooltip label="Copy">
              <ActionIcon variant="transparent">
                <IconCopy />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Save">
              <ActionIcon variant="transparent">
                <IconBookmark />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Export">
              <ActionIcon variant="transparent">
                <IconFileExport />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};
