'use client';
import { totalMonthlyExpenses } from '@/services/despesas';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total de Despesas Por Mês',
    },
  },
};

export function TotalMonthlyExpenses() {
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await totalMonthlyExpenses(new Date().getFullYear());

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
            label: 'Despesas',
          },
        ],
      }}
    />
  );
}
