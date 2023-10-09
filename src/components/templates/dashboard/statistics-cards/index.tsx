import { Typography } from "@/libs/material-tailwind";
import { StatisticsCard } from "@/components/compounds/cards";

import { statisticsCardsData } from "./statistics-cards-data";
import { ColorMTType } from "@/styles/colors";

export function DashboardStatisticsCards() {
  return (
    <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
      {statisticsCardsData.map(({ icon, title, value, footer, color }) => (
        <StatisticsCard
          key={title}
          icon={icon}
          title={title}
          value={value}
          color={color as ColorMTType}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className={footer.color}>{footer.value}</strong>
              &nbsp;{footer.label}
            </Typography>
          }
        />
      ))}
    </div>
  );
}
