import { StatisticsChart } from "@/components/compounds/charts";
import { Typography } from "@/libs/material-tailwind";
import { statisticsChartsData } from "./statistics-charts-data";
import { ClockIcon } from "@heroicons/react/24/solid";

export function DashboardStatisticsChart() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
      {statisticsChartsData.map((props) => (
        <StatisticsChart
          key={props.title}
          title={props.title}
          description={props.description}
          chart={props.chart}
          footer={
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
              <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
              &nbsp;{props.footer}
            </Typography>
          }
        />
      ))}
    </div>
  );
}
