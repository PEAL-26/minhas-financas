'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@/libs/material-tailwind";
import { ColorMTType } from "@/styles/colors";
import { ReactNode } from "react";
import Chart from "@/libs/react-apexcharts";

interface StatisticsChartProps {
  color?: ColorMTType;
  chart: Object;
  title: ReactNode;
  description: ReactNode;
  footer?: ReactNode;
}

export function StatisticsChart(props: StatisticsChartProps) {
  const { color, chart, title, description, footer } = props;

  return (
    <Card>
      <CardHeader variant="gradient" color={color}>
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
