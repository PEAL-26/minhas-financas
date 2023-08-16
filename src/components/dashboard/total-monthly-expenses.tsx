"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { totalMonthlyExpenses } from "@/services/gastos";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
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
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            label: "Gastos",
          },
        ],
      }}
    />
  );
}
