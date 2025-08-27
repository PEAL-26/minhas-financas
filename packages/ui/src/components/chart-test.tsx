'use client';

import { Bar, BarChart, XAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';

export const description = 'A stacked bar chart with a legend';
export const iframeHeight = '600px';
export const containerClassName =
  '[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh';

const chartData = [
  { date: '2024-06-01', income: 178, expenses: 200 },
  { date: '2024-06-02', income: 470, expenses: 410 },
  { date: '2024-06-03', income: 103, expenses: 160 },
  { date: '2024-06-04', income: 439, expenses: 380 },
  { date: '2024-06-05', income: 88, expenses: 140 },
  { date: '2024-06-06', income: 294, expenses: 250 },
  { date: '2024-06-07', income: 323, expenses: 370 },
  { date: '2024-06-08', income: 385, expenses: 320 },
  { date: '2024-06-09', income: 438, expenses: 480 },
  { date: '2024-06-10', income: 155, expenses: 200 },
  { date: '2024-06-11', income: 92, expenses: 150 },
  { date: '2024-06-12', income: 492, expenses: 420 },
  { date: '2024-06-13', income: 81, expenses: 130 },
  { date: '2024-06-14', income: 426, expenses: 380 },
  { date: '2024-06-15', income: 307, expenses: 350 },
  { date: '2024-06-16', income: 371, expenses: 310 },
  { date: '2024-06-17', income: 475, expenses: 520 },
  { date: '2024-06-18', income: 107, expenses: 170 },
  { date: '2024-06-19', income: 341, expenses: 290 },
  { date: '2024-06-20', income: 408, expenses: 450 },
  { date: '2024-06-21', income: 169, expenses: 210 },
  { date: '2024-06-22', income: 317, expenses: 270 },
  { date: '2024-06-23', income: 480, expenses: 530 },
  { date: '2024-06-24', income: 132, expenses: 180 },
  { date: '2024-06-25', income: 141, expenses: 190 },
  { date: '2024-06-26', income: 434, expenses: 380 },
  { date: '2024-06-27', income: 448, expenses: 490 },
  { date: '2024-06-28', income: 149, expenses: 200 },
  { date: '2024-06-29', income: 103, expenses: 160 },
  { date: '2024-06-30', income: 446, expenses: 400 },
];

const chartConfig = {
  income: {
    label: 'Renda',
    color: '#2AB546',
  },
  expenses: {
    label: 'Despesas',
    color: '#bbf7d0',
  },
} satisfies ChartConfig;

const getPath = (x: number, y: number, width: number, height: number) =>
  `M${x},${y + height}
     C${x + width / 3},${y + height}, ${y}
     C${x + width / 2},${y + height / 3}, ${y + height}
     Z`;

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;

  console.log({ x, y, height, width });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25.4mm"
      height="16.9332mm"
      version="1.1"
      viewBox="0 0 2540 1693.32"
    ></svg>
  );
};

export function ChartTooltipDefault() {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            return new Date(value)
              .toLocaleDateString('pt-PT', { day: 'numeric', month: 'long' })
              .toLocaleLowerCase()
              .split(' de ')
              .map((v) => v.slice(0, 3))
              .join(' ');
          }}
        />
        <Bar
          dataKey="income"
          stackId="a"
          fill="#2AB546"
          radius={[0, 0, 4, 4]}
          //shape={<TriangleBar />}
        />
        <Bar dataKey="expenses" stackId="a" fill="#bbf7d0" radius={[4, 4, 0, 0]} />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} defaultIndex={1} />
      </BarChart>
    </ChartContainer>
  );
}
