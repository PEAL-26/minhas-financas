'use client';
import dynamic from 'next/dynamic';
export * from 'react-apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default Chart;
