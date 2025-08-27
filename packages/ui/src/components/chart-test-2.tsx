import { Card } from '@/components/ui/card';
import React, { useState } from 'react';

interface DataPoint {
  date: string;
  income: number;
  expenses: number;
}

const DotChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    data: DataPoint;
  } | null>(null);

  // Sample data similar to the image
  const data: DataPoint[] = [
    { date: '2 Aug', income: 25000, expenses: 15000 },
    { date: '3 Aug', income: 32000, expenses: 18000 },
    { date: '4 Aug', income: 28000, expenses: 22000 },
    { date: '5 Aug', income: 45000, expenses: 25000 },
    { date: '6 Aug', income: 38000, expenses: 20000 },
    { date: '7 Aug', income: 42000, expenses: 28000 },
    { date: '8 Aug', income: 35000, expenses: 19000 },
    { date: '9 Aug', income: 48000, expenses: 31000 },
    { date: '10 Aug', income: 52000, expenses: 24000 },
    { date: '11 Aug', income: 39000, expenses: 26000 },
    { date: '12 Aug', income: 44000, expenses: 22000 },
    { date: '13 Aug', income: 41000, expenses: 29000 },
    { date: '14 Aug', income: 37000, expenses: 21000 },
    { date: '15 Aug', income: 65000, expenses: 35000 },
    { date: '16 Aug', income: 58000, expenses: 32000 },
    { date: '17 Aug', income: 71000, expenses: 38000 },
    { date: '18 Aug', income: 55000, expenses: 28000 },
    { date: '19 Aug', income: 49000, expenses: 31000 },
    { date: '20 Aug', income: 33000, expenses: 19000 },
    { date: '21 Aug', income: 38000, expenses: 23000 },
    { date: '22 Aug', income: 46000, expenses: 27000 },
    { date: '23 Aug', income: 54000, expenses: 31000 },
    { date: '24 Aug', income: 61000, expenses: 34000 },
    { date: '25 Aug', income: 48000, expenses: 26000 },
    { date: '26 Aug', income: 52000, expenses: 29000 },
    { date: '27 Aug', income: 67000, expenses: 36000 },
    { date: '28 Aug', income: 59000, expenses: 32000 },
    { date: '29 Aug', income: 44000, expenses: 25000 },
    { date: '30 Aug', income: 56000, expenses: 31000 },
  ];

  const maxValue = 100000;
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = 40;
  const dotSize = 8;

  const generateDots = (value: number, x: number, color: string, isIncome: boolean) => {
    const dots = [];
    const dotsCount = Math.ceil(value / 5000);
    const stackHeight = dotsCount * dotSize * 1.2;

    for (let i = 0; i < dotsCount; i++) {
      const y = chartHeight - padding - i * dotSize * 1.2 - (isIncome ? 0 : stackHeight + 5);
      dots.push(
        <circle
          key={`${x}-${i}-${isIncome ? 'income' : 'expenses'}`}
          cx={x}
          cy={y}
          r={dotSize / 2}
          fill={color}
          className="transition-all duration-200 hover:scale-110"
        />,
      );
    }
    return dots;
  };

  const handleMouseMove = (event: React.MouseEvent, dataPoint: DataPoint, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setHoveredPoint({ x, y, data: dataPoint });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <Card className="bg-chart-background border-chart-grid p-6">
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Performance</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-chart-income h-3 w-3 rounded-full"></div>
            <span className="text-chart-text text-sm">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-chart-expenses h-3 w-3 rounded-full"></div>
            <span className="text-chart-text text-sm">Expenses</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg
          width={chartWidth}
          height={chartHeight + 60}
          className="overflow-visible"
          onMouseLeave={handleMouseLeave}
        >
          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <text
                x={padding - 10}
                y={chartHeight - padding - (value / 100) * (chartHeight - padding * 2)}
                textAnchor="end"
                className="fill-chart-text text-xs"
                dominantBaseline="middle"
              >
                {value}K
              </text>
              <line
                x1={padding}
                y1={chartHeight - padding - (value / 100) * (chartHeight - padding * 2)}
                x2={chartWidth - padding}
                y2={chartHeight - padding - (value / 100) * (chartHeight - padding * 2)}
                stroke="hsl(var(--chart-grid))"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </g>
          ))}

          {/* X-axis and dots */}
          {data.map((dataPoint, index) => {
            const x = padding + (index * (chartWidth - padding * 2)) / (data.length - 1);
            const showLabel = index % 3 === 0 || index === data.length - 1;

            return (
              <g key={dataPoint.date}>
                {/* X-axis labels */}
                {showLabel && (
                  <text
                    x={x}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    className="fill-chart-text text-xs"
                  >
                    {dataPoint.date}
                  </text>
                )}

                {/* Invisible hover area */}
                <rect
                  x={x - 15}
                  y={0}
                  width={30}
                  height={chartHeight}
                  fill="transparent"
                  onMouseMove={(e) => handleMouseMove(e, dataPoint, index)}
                  className="cursor-pointer"
                />

                {/* Income dots */}
                {generateDots(dataPoint.income, x, 'hsl(var(--chart-income))', true)}

                {/* Expenses dots */}
                {generateDots(dataPoint.expenses, x, 'hsl(var(--chart-expenses))', false)}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full transform rounded-lg bg-foreground px-3 py-2 text-sm text-background shadow-lg"
            style={{
              left: hoveredPoint.x,
              top: hoveredPoint.y - 10,
            }}
          >
            <div className="mb-1 flex items-center gap-2">
              <div className="bg-chart-income h-2 w-2 rounded-full"></div>
              <span>{(hoveredPoint.data.income / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-chart-expenses h-2 w-2 rounded-full"></div>
              <span>{(hoveredPoint.data.expenses / 1000).toFixed(1)}K</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DotChart;
