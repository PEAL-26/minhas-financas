'use client';
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

  return <Chart {...chart} />;
}
