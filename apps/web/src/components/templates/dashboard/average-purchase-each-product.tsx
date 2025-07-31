'use client';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { averagePurchasePeriod } from '@/services/despesas';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Média de despesas em dias por item',
    },
  },
};

export function AveragePurchaseEachProduct() {
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await averagePurchasePeriod();

      setLabels(Object.keys(response));
      setData(Object.values(response));
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            label: 'a cada (dias)',
          },
        ],
      }}
    />
  );
}
