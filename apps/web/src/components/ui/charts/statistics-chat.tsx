'use client';
import Chart from '@/libs/react-apexcharts';
import { ReactNode } from 'react';

interface StatisticsChartProps {
  color?: string;
  chart: Object;
  title: ReactNode;
  description: ReactNode;
  footer?: ReactNode;
}

export function StatisticsChart(props: StatisticsChartProps) {
  const { color, chart, title, description, footer } = props;

  return <Chart {...chart} />;
}
