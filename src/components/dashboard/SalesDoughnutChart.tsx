// src/components/dashboard/SalesDoughnutChart.tsx
"use client";
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface SalesDoughnutChartProps {
  chartData: ChartData<'doughnut'>;
  chartOptions: ChartOptions<'doughnut'>;
}

const SalesDoughnutChart = ({ chartData, chartOptions }: SalesDoughnutChartProps) => {
  return (
    <div className="c-chart-container">
      <h2 className="c-chart-container__title">Sales by Region</h2>
      <Doughnut data={chartData} options={chartOptions} aria-label="Doughnut chart of sales by region (sample data)" role="img" />
    </div>
  );
};

export default SalesDoughnutChart;