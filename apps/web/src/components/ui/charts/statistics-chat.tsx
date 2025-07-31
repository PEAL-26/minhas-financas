'use client';
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@/libs/material-tailwind';
import Chart from '@/libs/react-apexcharts';
import { ColorMTType } from '@/styles/colors';
import { ReactNode } from 'react';

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
        <Typography variant="small" className="text-blue-gray-600 font-normal">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-blue-gray-50 border-t px-6 py-5">{footer}</CardFooter>
      )}
    </Card>
  );
}
