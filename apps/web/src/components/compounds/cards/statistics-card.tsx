import { Card, CardBody, CardFooter, CardHeader, Typography } from '@/libs/material-tailwind';
import { ColorMTType } from '@/styles/colors';
import { ElementType, ReactNode } from 'react';

export interface StatisticsCardProps {
  color: ColorMTType;
  icon: ElementType;
  title: ReactNode;
  value: ReactNode;
  footer: ReactNode;
}

export function StatisticsCard(props: StatisticsCardProps) {
  const { color = 'green', icon: Icon, title, value, footer } = props;

  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center"
      >
        <Icon className="h-6 w-6 text-white" />
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="text-blue-gray-600 font-normal">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && <CardFooter className="border-blue-gray-50 border-t p-4">{footer}</CardFooter>}
    </Card>
  );
}
